import { BodySetter } from "./body-setter"
import { GoalSetter } from "./goal-setter"
import {
  BodyDocument,
  BodyQuery,
  GoalByLatestDocument,
  GoalByLatestQuery,
  makeRequestOrThrow,
} from "@nutrigym/lib/client"

type UserContext = Required<{
  goal: GoalByLatestQuery["goalByLatest"]
  body: BodyQuery["body"]
}>

export function withUserInfo(
  cb: (ctx: UserContext) => Promise<React.ReactNode>,
) {
  return async function Component() {
    const { body: userBody } = await makeRequestOrThrow(BodyDocument, {})

    if (userBody == null) {
      return <BodySetter />
    }

    const { goalByLatest: userGoal } = await makeRequestOrThrow(
      GoalByLatestDocument,
      {},
    )

    if (userGoal == null) {
      return <GoalSetter />
    }

    return await cb({
      goal: userGoal,
      body: userBody,
    })
  }
}
