import { ERR_CREATE_BODY, GraphQLAuthContext } from "@nutrigym/lib/server/api"
import { schema } from "@nutrigym/lib/schema"
import { Gender } from "@nutrigym/lib/enums"
import { randomUUID } from "node:crypto"
import { z } from "zod"

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
  const uuid = randomUUID()

  const resp = await ctx.providers.db.transaction(async (tx) => {
    return await tx
      .insert(schema.userBody)
      .values({
        birthday: input.data.birthday,
        gender: input.data.gender,
        userId: ctx.auth.user.id,
        id: uuid,
      })
      .onConflictDoNothing()
  })

  if (resp.rowsAffected === 0) {
    throw ERR_CREATE_BODY
  } else {
    return { id: uuid }
  }
}
