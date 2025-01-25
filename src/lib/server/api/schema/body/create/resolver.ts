import { schema } from "@nutrigym/lib/schema"
import { isBirthdayInFuture } from "../utils"
import { Gender } from "@nutrigym/lib/enums"
import { randomUUID } from "node:crypto"
import { types } from "../types"
import { z } from "zod"
import {
  ERR_BIRTHDAY_IN_FUTURE,
  GraphQLAuthContext,
  parseZodDateString,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  data: z.object({
    birthday: z.string().date(),
    gender: z.nativeEnum(Gender),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  const birthday = parseZodDateString(input.data.birthday)
  if (isBirthdayInFuture(ctx.date, birthday)) {
    throw ERR_BIRTHDAY_IN_FUTURE
  } else {
    await ctx.providers.cache.invalidate([{ typename: types.body.name }])
  }

  return await ctx.providers.db.transaction(async (tx) => {
    return await tx
      .insert(schema.userBody)
      .values({
        birthday: input.data.birthday,
        gender: input.data.gender,
        userId: ctx.auth.user.id,
        id: randomUUID(),
      })
      .onConflictDoUpdate({
        target: schema.userBody.userId,
        set: {
          birthday: input.data.birthday,
          gender: input.data.gender,
        },
      })
      .returning()
  })
}
