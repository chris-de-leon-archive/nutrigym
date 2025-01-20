import { stripNull } from "@nutrigym/lib/utils"
import { schema } from "@nutrigym/lib/schema"
import { Gender } from "@nutrigym/lib/enums"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  isValidUpdateObject,
  GraphQLAuthContext,
  ERR_UPDATE_BODY,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  id: z.string().uuid(),
  data: z.object({
    birthday: z.date().nullish(),
    gender: z.nativeEnum(Gender).nullish(),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (isValidUpdateObject(input.data)) {
    return null
  }

  const resp = await ctx.providers.db.transaction(async (tx) => {
    return await tx
      .update(schema.userBody)
      .set({
        ...input.data,
        birthday: stripNull(input.data.birthday),
        gender: stripNull(input.data.gender),
      })
      .where(
        and(
          eq(schema.userBody.userId, ctx.auth.user.id),
          eq(schema.userBody.id, input.id),
        ),
      )
  })

  if (resp.rowsAffected === 0) {
    throw ERR_UPDATE_BODY
  } else {
    return null
  }
}
