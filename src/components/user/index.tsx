import { PersonalGoalsSetter } from "./personal-goals-setter"
import { PersonalInfoSetter } from "./personal-info-setter"
import { NextSearchParams } from "@nutrigym/lib/types"
import {
  BodyDocument,
  BodyQuery,
  GoalByLatestDocument,
  GoalByLatestQuery,
  makeRequestOrThrow,
} from "@nutrigym/lib/client"

type NextContext = NextSearchParams

type UserContext = Required<{
  goal: NonNullable<GoalByLatestQuery["goalByLatest"]>
  body: NonNullable<BodyQuery["body"]>
}>

type Context = Required<{
  user: UserContext
  next: NextContext
}>

// TODO: rename?
// TODO: cache results
export function withUserInfo(cb: (ctx: Context) => Promise<React.ReactNode>) {
  return async function Component({ searchParams }: NextSearchParams) {
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
      next: {
        searchParams,
      },
      user: {
        goal: userGoal,
        body: userBody,
      },
    })
  }
}
