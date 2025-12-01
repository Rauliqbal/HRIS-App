import vine from '@vinejs/vine'

export const roleInput = vine.compile(
  vine.object({
    name: vine.string().minLength(4),
  })
)
