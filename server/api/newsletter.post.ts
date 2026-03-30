import { z } from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  source: z.string().max(64).optional(),
})

/**
 * MVP: validates email and returns success. Wire to Buttondown, ConvertKit, or
 * Resend + audience table in a follow-up (use newsletterProviderSecret for HMAC).
 */
export default defineEventHandler(async (event) => {
  const parsed = bodySchema.safeParse(await readBody(event))
  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email',
    })
  }

  return {
    ok: true,
    message: 'Thanks — check your inbox to confirm.',
  }
})
