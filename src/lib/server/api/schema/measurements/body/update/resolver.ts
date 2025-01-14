import { schema } from "@nutrigym/lib/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import {
  isValidUpdateObject,
  GraphQLAuthContext,
  stripNull,
} from "@nutrigym/lib/server/api"

export const zInput = z.object({
  id: z.string().uuid(),
  data: z.object({
    sleepInHours: z.number().min(0).max(24).optional().nullable(),
    waterInMilliliters: z.number().min(0).optional().nullable(),
    shouldersInInches: z.number().min(0).optional().nullable(),
    forearmsInInches: z.number().min(0).optional().nullable(),
    calvesInInches: z.number().min(0).optional().nullable(),
    thighsInInches: z.number().min(0).optional().nullable(),
    waistInInches: z.number().min(0).optional().nullable(),
    chestInInches: z.number().min(0).optional().nullable(),
    armsInInches: z.number().min(0).optional().nullable(),
    neckInInches: z.number().min(0).optional().nullable(),
    hipsInInches: z.number().min(0).optional().nullable(),
    steps: z.number().int().min(0).optional().nullable(),
    heightInInches: z.number().min(0).optional().nullable(),
    weightInPounds: z.number().min(0).optional().nullable(),
  }),
})

export const handler = async (
  input: z.infer<typeof zInput>,
  ctx: GraphQLAuthContext,
) => {
  if (isValidUpdateObject(input.data)) {
    return { count: 0 }
  }

  const resp = await ctx.providers.db.transaction(async (tx) => {
    const log = await tx.query.userMeasurementLog.findFirst({
      where: and(
        eq(schema.userMeasurementLog.userId, ctx.auth.user.id),
        eq(schema.userMeasurementLog.month, ctx.date.getUTCMonth()),
        eq(schema.userMeasurementLog.year, ctx.date.getUTCFullYear()),
        eq(schema.userMeasurementLog.day, ctx.date.getUTCDay()),
      ),
    })
    if (log == null) {
      return { rowsAffected: 0 }
    }

    return await tx
      .update(schema.bodyMeasurement)
      .set({
        ...input.data,
        heightInInches: stripNull(input.data.heightInInches),
        weightInPounds: stripNull(input.data.weightInPounds),
      })
      .where(
        and(
          eq(schema.bodyMeasurement.logId, log.id),
          eq(schema.bodyMeasurement.id, input.id),
        ),
      )
  })

  return {
    count: resp.rowsAffected,
  }
}
