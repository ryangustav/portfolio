export function formatDate(date: string, locale: string): string {
  // Parse as UTC so the day doesn't shift with the viewer's timezone.
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
