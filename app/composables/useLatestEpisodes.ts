export function useLatestEpisodes(limit = 6) {
  return useAsyncData(
    `content-latest-episodes-${limit}`,
    () =>
      queryCollection('episodes')
        .where('published', '=', true)
        .order('date', 'DESC')
        .limit(limit)
        .all(),
  )
}
