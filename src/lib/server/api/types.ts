import { clerk } from "@nutrigym/lib/server/providers/clerk"
import { Cache } from "@graphql-yoga/plugin-response-cache"
import { db } from "@nutrigym/lib/server/providers/db"
import { YogaInitialContext } from "graphql-yoga"
import { env } from "@nutrigym/lib/server/env"

export type BaseContext = Readonly<{
  date: Date
  env: typeof env
  providers: Readonly<{
    clerk: typeof clerk
    cache: Cache
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
