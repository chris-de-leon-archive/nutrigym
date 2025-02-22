import { GraphQLBaseContext } from "../../types"
import { typenameAlias } from "./constants"
import { CacheEntity } from "./types"
import { z } from "zod"

const entity = z.object({
  id: z.union([z.string(), z.number()]),
  [typenameAlias]: z.string(),
})

export const collectEntities = <T extends Record<string, unknown>>(
  data: T,
): CacheEntity[] => {
  const entities = new Array<CacheEntity>()

  const res = entity.safeParse(data)
  if (res.success) {
    entities.push({ id: res.data.id, typename: res.data[typenameAlias] })
  }

  for (const val of Object.values(data ?? {})) {
    if (val == null) {
      continue
    }

    if (Array.isArray(val)) {
      entities.push(...val.flatMap(collectEntities))
    }

    if (typeof val === "object") {
      entities.push(...collectEntities(val as Record<string, unknown>))
    }
  }

  return entities
}

export const collectInvalidations = (ctx: GraphQLBaseContext) => {
  const state = ctx.providers.invalidator.state(ctx.yoga.request)
  return state.invalidations.concat(
    ctx.providers.tracer.get(ctx.yoga.request).flatMap((t) => {
      return state.dependencies.get(t.info.fieldName) ?? []
    }),
  )
}
