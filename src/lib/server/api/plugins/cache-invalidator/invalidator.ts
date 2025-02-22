import { CacheInvalidation } from "./types"

type CacheInvalidationDependency = {
  rootFieldName: string
  invalidations: CacheInvalidation[]
}

type CacheInvalidations = {
  request: Request
  invalidations: CacheInvalidation[]
}

export class CacheInvalidator {
  private static readonly dependencies = new Map<string, CacheInvalidation[]>()
  private readonly invalidations = new WeakMap<Request, CacheInvalidation[]>()

  static registerDependency(args: CacheInvalidationDependency) {
    const val = CacheInvalidator.dependencies.get(args.rootFieldName)
    if (val == null) {
      CacheInvalidator.dependencies.set(args.rootFieldName, args.invalidations)
    } else {
      CacheInvalidator.dependencies.set(
        args.rootFieldName,
        val.concat(args.invalidations),
      )
    }
    return this
  }

  registerInvalidation(args: CacheInvalidations) {
    const val = this.invalidations.get(args.request)
    if (val == null) {
      this.invalidations.set(args.request, args.invalidations)
    } else {
      this.invalidations.set(args.request, val.concat(args.invalidations))
    }
    return this
  }

  state(req: Request) {
    return {
      invalidations: this.invalidations.get(req) ?? [],
      dependencies: CacheInvalidator.dependencies,
    }
  }
}
