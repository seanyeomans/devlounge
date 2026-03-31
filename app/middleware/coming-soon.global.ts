export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  const allowForGuests = new Set(['/coming-soon', '/login', '/register', '/confirm'])

  if (!user.value && !allowForGuests.has(to.path)) {
    return navigateTo({
      path: '/coming-soon',
      query: { redirect: to.fullPath },
    })
  }

  // Signed-in members should not stay on the gate page.
  if (user.value && to.path === '/coming-soon') {
    const redirect = to.query.redirect
    if (typeof redirect === 'string' && redirect.startsWith('/')) {
      return navigateTo(redirect)
    }
    return navigateTo('/')
  }
})
