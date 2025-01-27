import { clerk } from "@nutrigym/lib/server/api/providers/clerk"
import { db } from "@nutrigym/lib/server/api/providers/db"
import { YogaInitialContext } from "graphql-yoga"
import { env } from "@nutrigym/lib/server/env"
import { cache } from "./providers/cache"

export type BaseContext = Readonly<{
  date: Date
  env: typeof env
  providers: Readonly<{
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
