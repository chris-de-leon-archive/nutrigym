import * as fs from "node:fs"
import { env } from "../env"

if (require.main === module) {
  fs.rmSync(env.DATABASE_URL.replace(/^file:/, ""))
}
