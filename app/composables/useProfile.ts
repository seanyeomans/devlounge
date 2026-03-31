import type { Database } from '~/types/database.types'

export function useProfile() {
  const user = useSupabaseUser()
  const client = useSupabaseClient<Database>()

  const profile = ref<Database['public']['Tables']['profiles']['Row'] | null>(
    null,
  )
  const pending = ref(true)
  const error = ref<string | null>(null)

  async function load() {
    error.value = null
    if (!user.value) {
      profile.value = null
      pending.value = false
      return
    }

    const { data, error: err } = await client
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .maybeSingle()

    if (err) {
      error.value = err.message
      profile.value = null
    } else {
      profile.value = data
    }
    pending.value = false
  }

  watch(
    () => user.value?.id,
    () => {
      pending.value = true
      load()
    },
    { immediate: true },
  )

  async function update(fields: {
    display_name?: string | null
    bio?: string | null
    avatar_url?: string | null
  }) {
    if (!user.value) {
      return { error: new Error('Not signed in') as Error | null }
    }

    const { error: err } = await client
      .from('profiles')
      .update(fields)
      .eq('id', user.value.id)

    if (err) {
      error.value = err.message
      return { error: err as Error }
    }

    await load()
    return { error: null as Error | null }
  }

  return { profile, pending, error, load, update }
}
