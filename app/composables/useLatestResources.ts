export function useLatestResources(limit = 5) {
  return useAsyncData(
    `content-latest-resources-${limit}`,
    () =>
      queryCollection('resources')
        .where('published', '=', true)
        .order('date', 'DESC')
        .limit(limit)
        .all(),
  )
}
