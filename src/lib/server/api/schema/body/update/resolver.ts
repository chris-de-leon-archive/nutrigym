import { schema } from "@nutrigym/lib/server/db/schema"
import { Gender } from "@nutrigym/lib/server/enums"
import { isBirthdayInFuture } from "../utils"
import { eq } from "drizzle-orm"
import { types } from "../types"
import { z } from "zod"
import {
  defineOperationResolver,
  ERR_BIRTHDAY_IN_FUTURE,
  allValuesUndefined,
  GraphQLAuthContext,
  parseZodDateString,
  stripNull,
} from "@nutrigym/lib/server/api"

const zInput = z.object({
  data: z.object({
    birthday: z.string().date().nullish(),
    gender: z.nativeEnum(Gender).nullish(),
  }),
})

const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (allValuesUndefined(input.data)) {
    return []
  } else {
    ctx.providers.invalidator.registerInvalidation({
      request: ctx.yoga.request,
      invalidations: [{ typename: types.objects.body.name }],
    })
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
      .where(eq(schema.userBody.userId, ctx.auth.user.id))
      .returning()
  })
}

export const resolver = defineOperationResolver({
  input: zInput,
  handler,
})
