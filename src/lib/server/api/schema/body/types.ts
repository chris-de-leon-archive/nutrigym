import { builder } from "@nutrigym/lib/server/api"
import { Body } from "@nutrigym/lib/schema"
import { scalars } from "../scalars"

const body = builder.objectRef<Body>("Body")

builder.objectType(body, {
  fields: (t) => ({
    birthday: t.expose("birthday", { type: scalars.date }),
    userId: t.exposeString("userId"),
    gender: t.exposeString("gender"),
    id: t.exposeString("id"),
  }),
})

export const types = {
  body,
}
