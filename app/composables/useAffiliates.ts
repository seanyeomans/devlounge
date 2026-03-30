export function useAffiliates() {
  return useAsyncData('content-affiliates', () =>
    queryCollection('affiliates').order('order', 'ASC').all(),
  )
}
