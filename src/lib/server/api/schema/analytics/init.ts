import { CacheInvalidator } from "../../providers/cache-invalidator"
import { foodMeasurements } from "../measurements/food"
import { bodyMeasurements } from "../measurements/body"
import { types } from "./types"

CacheInvalidator.registerDependency({
  rootFieldName: foodMeasurements.operations.create.schema.name,
  invalidations: [{ typename: types.objects.statistic.name }],
})
  .registerDependency({
    rootFieldName: foodMeasurements.operations.update.schema.name,
    invalidations: [{ typename: types.objects.statistic.name }],
  })
  .registerDependency({
    rootFieldName: foodMeasurements.operations.remove.schema.name,
    invalidations: [{ typename: types.objects.statistic.name }],
  })
  .registerDependency({
    rootFieldName: bodyMeasurements.operations.create.schema.name,
    invalidations: [{ typename: types.objects.statistic.name }],
  })
  .registerDependency({
    rootFieldName: bodyMeasurements.operations.update.schema.name,
    invalidations: [{ typename: types.objects.statistic.name }],
  })
  .registerDependency({
    rootFieldName: bodyMeasurements.operations.remove.schema.name,
    invalidations: [{ typename: types.objects.statistic.name }],
  })
