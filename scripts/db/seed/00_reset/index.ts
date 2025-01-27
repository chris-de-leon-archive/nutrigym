import { schema } from "@nutrigym/lib/server/db/schema"
import { reset } from "drizzle-seed"
import { db } from "../../db"

export default async function main() {
  await reset(db, schema)
}
