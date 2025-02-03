import { tracer } from "@nutrigym/lib/server/api/providers/tracer"
import { cache } from "@nutrigym/lib/server/api/providers/cache"
import { clerk } from "@nutrigym/lib/server/api/providers/clerk"
import { invalidator } from "./providers/cache-invalidator"
import { db } from "@nutrigym/lib/server/api/providers/db"
import { YogaInitialContext } from "graphql-yoga"
import { env } from "@nutrigym/lib/server/env"

export type BuilderContext = {
  DefaultFieldNullability: false
  Context: GraphQLBaseContext
  Tracing: boolean
  Scalars: {
    DateTimeISO: {
      Input: Date
      Output: Date
    }
    LocalDate: {
      Input: string
      Output: string
    }
    Uuid: {
      Input: string
      Output: string
    }
  }
}

export type BaseContext = Readonly<{
  date: Date
  env: typeof env
  providers: Readonly<{
    invalidator: typeof invalidator
    tracer: typeof tracer
    clerk: typeof clerk
    cache: typeof cache
    db: typeof db
  }>
}>

export type YogaContext = Readonly<{
  yoga: YogaInitialContext
}>

export type AuthContext = Readonly<{
  auth: {
    user: {
      id: string
    }
  }
}>

export type GraphQLAuthContext = BaseContext & YogaContext & AuthContext
export type GraphQLBaseContext = BaseContext & YogaContext
