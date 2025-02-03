export type CacheEntityRecord = {
  id?: number | string
  typename: string
}

type CacheInvalidationDependency = {
  rootFieldName: string
  invalidations: CacheEntityRecord[]
}

type CacheInvalidation = {
  request: Request
  invalidations: CacheEntityRecord[]
}

export class CacheInvalidator {
  private static readonly dependencies = new Map<string, CacheEntityRecord[]>()
  private readonly invalidations = new WeakMap<Request, CacheEntityRecord[]>()

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

  registerInvalidation(args: CacheInvalidation) {
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
      invalidations: this.invalidations.get(req),
      dependencies: CacheInvalidator.dependencies,
    }
  }
}

export const invalidator = new CacheInvalidator()
