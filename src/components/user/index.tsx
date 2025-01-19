import { PersonalGoalsSetter } from "./personal-goals-setter"
import { PersonalInfoSetter } from "./personal-info-setter"
import {
  BodyDocument,
  BodyQuery,
  GoalByLatestDocument,
  GoalByLatestQuery,
  makeRequestOrThrow,
} from "@nutrigym/lib/client"

type UserContext = Required<{
  goal: NonNullable<GoalByLatestQuery["goalByLatest"]>
  body: NonNullable<BodyQuery["body"]>
}>

// TODO: cache results
export function withUserInfo(
  cb: (ctx: UserContext) => Promise<React.ReactNode>,
) {
  return async function Component() {
    const { body: userBody } = await makeRequestOrThrow(BodyDocument, {})

    if (userBody == null) {
      return <PersonalInfoSetter />
    }

    const { goalByLatest: userGoal } = await makeRequestOrThrow(
      GoalByLatestDocument,
      {},
    )

    if (userGoal == null) {
      return <PersonalGoalsSetter />
    }

    return await cb({
      goal: userGoal,
      body: userBody,
    })
  }
}
