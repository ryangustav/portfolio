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
    } satisfies ArticleMeta,
  };
}

async function readSource(slug: string): Promise<string | null> {
  if (!SLUG_PATTERN.test(slug)) return null;
  try {
    return await fs.readFile(path.join(ARTICLES_DIR, `${slug}.mdx`), 'utf8');
  } catch {
    return null;
  }
}

export const getArticle = cache(async (slug: string): Promise<Article | null> => {
  const source = await readSource(slug);
  if (!source) return null;

  const { content, meta } = await compile(slug, source);
  if (meta.draft && !SHOW_DRAFTS) return null;

  return { ...meta, content };
});

export const getAllArticles = cache(async (): Promise<ArticleMeta[]> => {
  let files: string[];
  try {
    files = await fs.readdir(ARTICLES_DIR);
  } catch {
    return [];
  }

  const slugs = files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.slice(0, -'.mdx'.length))
    .filter((slug) => SLUG_PATTERN.test(slug));

  const articles = await Promise.all(slugs.map((slug) => getArticle(slug)));

  return articles
    .filter((a): a is Article => a !== null)
    .map(({ slug, title, description, date, tags, draft, readingTime }) => ({
      slug, title, description, date, tags, draft, readingTime,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
});
