import vine from '@vinejs/vine'

export const createUpdatePlayerValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
    fullName: vine.string().trim(),
    birthDate: vine
      .string()
      .regex(new RegExp('^[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])')),
    nationality: vine.string().trim(),
  })
)
