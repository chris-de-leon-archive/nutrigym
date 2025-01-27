import { builder } from "@nutrigym/lib/server/api"
import { Body } from "@nutrigym/lib/server/db/schema"
import { scalars } from "../scalars"
import { enums } from "../enums"

const body = builder.objectRef<Body>("Body")

builder.objectType(body, {
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: scalars.datetimeISO }),
    birthday: t.expose("birthday", { type: scalars.localdate }),
    gender: t.expose("gender", { type: enums.gender }),
    userId: t.exposeString("userId"),
    id: t.exposeString("id"),
  }),
})

export const types = {
  body,
}
