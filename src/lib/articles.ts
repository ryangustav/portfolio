import fs from 'node:fs/promises';
import path from 'node:path';
import { cache } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

// Only lowercase letters, numbers and hyphens: blocks path traversal via the URL slug.
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const SHOW_DRAFTS = process.env.NODE_ENV === 'development';

export type ArticleFrontmatter = {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  tags: string[];
  draft?: boolean;
};

export type ArticleMeta = ArticleFrontmatter & {
  slug: string;
  readingTime: number;
  lang: string; // language the content is actually written in
};

export type Article = ArticleMeta & {
  content: React.ReactElement;
};

function normalizeDate(value: unknown): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

function readingTimeOf(source: string): number {
  const words = source.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

async function compile(slug: string, source: string) {
  const { content, frontmatter } = await compileMDX<ArticleFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypePrettyCode, { theme: 'github-dark-dimmed', keepBackground: false }],
        ],
      },
    },
  });

  const missing = (['title', 'description', 'date'] as const).filter((k) => !frontmatter[k]);
  if (missing.length) {
    throw new Error(`Article "${slug}" is missing frontmatter: ${missing.join(', ')}`);
  }

  return {
    content,
    meta: {
      ...frontmatter,
      // YAML parses unquoted dates (date: 2026-01-01) as Date objects
      date: normalizeDate(frontmatter.date as unknown),
      tags: frontmatter.tags ?? [],
      slug,
      readingTime: readingTimeOf(source),
    } satisfies Omit<ArticleMeta, 'lang'>,
  };
}

// Original articles are written in English: <slug>.mdx
// Translations live next to them: <slug>.<locale>.mdx (e.g. <slug>.pt.mdx)
const BASE_LANG = 'en';
const LOCALE_PATTERN = /^[a-z]{2}$/;

async function readFile(name: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(ARTICLES_DIR, name), 'utf8');
  } catch {
    return null;
  }
}

async function readSource(slug: string, locale: string): Promise<{ source: string; lang: string } | null> {
  if (!SLUG_PATTERN.test(slug)) return null;

  if (locale !== BASE_LANG && LOCALE_PATTERN.test(locale)) {
    const translated = await readFile(`${slug}.${locale}.mdx`);
    if (translated) return { source: translated, lang: locale };
  }

  const original = await readFile(`${slug}.mdx`);
  return original ? { source: original, lang: BASE_LANG } : null;
}

export const getArticle = cache(async (slug: string, locale: string): Promise<Article | null> => {
  const file = await readSource(slug, locale);
  if (!file) return null;

  const { content, meta } = await compile(slug, file.source);
  if (meta.draft && !SHOW_DRAFTS) return null;

  return { ...meta, lang: file.lang, content };
});

export const getAllArticles = cache(async (locale: string): Promise<ArticleMeta[]> => {
  let files: string[];
  try {
    files = await fs.readdir(ARTICLES_DIR);
  } catch {
    return [];
  }

  // Only the original files define which articles exist; translations are picked per locale.
  const slugs = files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.slice(0, -'.mdx'.length))
    .filter((slug) => SLUG_PATTERN.test(slug));

  const articles = await Promise.all(slugs.map((slug) => getArticle(slug, locale)));

  return articles
    .filter((a): a is Article => a !== null)
    .map(({ slug, title, description, date, tags, draft, readingTime, lang }) => ({
      slug, title, description, date, tags, draft, readingTime, lang,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
});
