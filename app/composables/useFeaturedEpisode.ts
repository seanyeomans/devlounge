export function useFeaturedEpisode() {
  return useAsyncData('content-featured-episode', async () => {
    const featured = await queryCollection('episodes')
      .where('featured', '=', true)
      .where('published', '=', true)
      .order('date', 'DESC')
      .first()

    if (featured) return featured

    return queryCollection('episodes')
      .where('published', '=', true)
      .order('date', 'DESC')
      .first()
  })
}
