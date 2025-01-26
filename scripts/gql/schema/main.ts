import { schema } from "@nutrigym/lib/server/api/schema"
import { printSchema } from "graphql"

if (require.main === module) {
  console.log(printSchema(schema))
}
