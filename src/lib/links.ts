/** Skroutz search results for a (Greek) phrase. */
export function skroutzSearchUrl(term: string): string {
  return `https://www.skroutz.gr/search?keyphrase=${encodeURIComponent(term)}`
}
