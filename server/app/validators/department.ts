import vine from '@vinejs/vine'

export const departmentInput = vine.compile(
  vine.object({
    name: vine.string().minLength(4),
    description: vine.string().nullable(),
  })
)
