import { schema } from "@nutrigym/lib/server/db/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  allValuesUndefined,
  GraphQLAuthContext,
  stripNull,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  id: z.string().uuid(),
  date: z.string().date(),
  data: z.object({
    heightInInches: z.number().min(0).nullish(),
    weightInPounds: z.number().min(0).nullish(),
    sleepInHours: z.number().min(0).max(24).nullish(),
    waterInMilliliters: z.number().min(0).nullish(),
    shouldersInInches: z.number().min(0).nullish(),
    forearmsInInches: z.number().min(0).nullish(),
    calvesInInches: z.number().min(0).nullish(),
    thighsInInches: z.number().min(0).nullish(),
    waistInInches: z.number().min(0).nullish(),
    chestInInches: z.number().min(0).nullish(),
    armsInInches: z.number().min(0).nullish(),
    neckInInches: z.number().min(0).nullish(),
    hipsInInches: z.number().min(0).nullish(),
    steps: z.number().int().min(0).nullish(),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (allValuesUndefined(input.data)) {
    return []
  }

  return await ctx.providers.db.transaction(async (tx) => {
    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
        eq(schema.userMeasurementLog.date, input.date),
      ),
    })
    if (log == null) {
      return []
    }

    return await tx
      .update(schema.bodyMeasurement)
      .set({
        ...input.data,
        weightInPounds: stripNull(input.data.weightInPounds),
        heightInInches: stripNull(input.data.heightInInches),
      })
      .where(
        and(
          eq(schema.bodyMeasurement.logId, log.id),
          eq(schema.bodyMeasurement.id, input.id),
        ),
      )
      .returning()
  })
}
