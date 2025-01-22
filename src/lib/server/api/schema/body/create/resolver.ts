import { schema } from "@nutrigym/lib/schema"
import { Gender } from "@nutrigym/lib/enums"
import { randomUUID } from "node:crypto"
import { types } from "../types"
import { z } from "zod"
import {
  ERR_BIRTHDAY_IN_FUTURE,
  GraphQLAuthContext,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  data: z.object({
    birthday: z.date(),
    gender: z.nativeEnum(Gender),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  await ctx.providers.cache.invalidate([{ typename: types.body.name }])

  if (input.data.birthday > ctx.date) {
    throw ERR_BIRTHDAY_IN_FUTURE
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
