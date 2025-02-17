import { schema } from "@nutrigym/lib/server/db/schema";
import { reset } from "drizzle-seed";
import { db } from "../db";

if (require.main === module) {
  reset(db, schema)
}
