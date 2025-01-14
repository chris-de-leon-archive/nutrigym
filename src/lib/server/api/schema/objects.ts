import { builder } from "@nutrigym/lib/server/api"

const count = builder.objectRef<{ count: number }>("Count")
builder.objectType(count, {
  fields: (t) => ({ count: t.exposeInt("count") }),
})

const id = builder.objectRef<{ id: string }>("GenericID")
builder.objectType(id, {
  fields: (t) => ({ id: t.exposeString("id") }),
})

export const objects = {
  count,
  id,
}
