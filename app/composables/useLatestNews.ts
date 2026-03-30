export function useLatestNews(limit = 6) {
  return useAsyncData(
    `content-latest-news-${limit}`,
    () =>
      queryCollection('news')
        .where('published', '=', true)
        .order('date', 'DESC')
        .limit(limit)
        .all(),
  )
}
