import { PothosOutputFieldConfig } from "@pothos/core"
import { GraphQLResolveInfo } from "graphql"
import { BuilderContext } from "../../types"

type Trace = {
  field: PothosOutputFieldConfig<
    PothosSchemaTypes.ExtendDefaultTypes<BuilderContext>
  >
  opts: BuilderContext["Tracing"]
  info: GraphQLResolveInfo
  err: unknown
  dur: number
}

export const tracer = new (class {
  // NOTE: requests will automatically be removed from the map once they are garbage collected
  private readonly traces = new WeakMap<Request, Trace[]>()

  record(req: Request, t: Trace) {
    const val = this.traces.get(req)
    if (val == null) {
      this.traces.set(req, [t])
    } else {
      this.traces.set(req, val.concat(t))
    }
  }

  get(req: Request) {
    return this.traces.get(req) ?? []
  }
})()
