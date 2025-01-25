import { stripNull } from "@nutrigym/lib/utils"
import { isBirthdayInFuture } from "../utils"
import { schema } from "@nutrigym/lib/schema"
import { Gender } from "@nutrigym/lib/enums"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  ERR_BIRTHDAY_IN_FUTURE,
  allValuesUndefined,
  GraphQLAuthContext,
  parseZodDateString,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  id: z.string().uuid(),
  data: z.object({
    birthday: z.string().date().nullish(),
    gender: z.nativeEnum(Gender).nullish(),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (allValuesUndefined(input.data)) {
    return []
  }

  if (input.data.birthday != null) {
    const bday = parseZodDateString(input.data.birthday)
    if (isBirthdayInFuture(ctx.date, bday)) {
      throw ERR_BIRTHDAY_IN_FUTURE
    }
  }

  return await ctx.providers.db.transaction(async (tx) => {
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
      .returning()
  })
}
