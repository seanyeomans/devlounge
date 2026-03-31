export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  const allowForGuests = new Set(['/coming-soon', '/login', '/register', '/confirm'])

  if (!user.value && !allowForGuests.has(to.path)) {
    return navigateTo({
      path: '/coming-soon',
      query: { redirect: to.fullPath },
    })
  }
})
