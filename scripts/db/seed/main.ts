import { default as reset } from "./00_reset"
import { default as user } from "./01_user"
import { default as measurements } from "./02_measurements"

export default async function main() {
  await reset()
  await user({ foodCount: 20 })
  await measurements({ year: 2024 })
}

if (require.main === module) {
  main()
}
