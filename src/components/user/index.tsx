import { PersonalGoalsSetter } from "./personal-goals-setter"
import { PersonalInfoSetter } from "./personal-info-setter"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import {
  GoalByClosestDateDocument,
  BodyDocument,
  Goal,
  Body,
} from "@nutrigym/lib/client/graphql"
import {
  NextSearchParams,
  SearchParams,
  DateTime,
} from "@nutrigym/lib/client/common"

type ParsedSearchParams = {
  date: Date
}

type MetaContext = {
  today: Date
}

type UserContext = {
  goal: Goal
  body: Body
}

type Context = {
  searchParams: ParsedSearchParams
  user: UserContext
  meta: MetaContext
}

export function withUserInfo(cb: (ctx: Context) => Promise<React.ReactNode>) {
  return async function Component({ searchParams }: NextSearchParams) {
    const date = await SearchParams.date.parse({ searchParams })
    const today = new Date()

    const { body: userBody } = await makeRequestOrThrow(BodyDocument, {})
    if (userBody == null) {
      return <PersonalInfoSetter today={today} />
    }

    const { goalByClosestDate: userGoal } = await makeRequestOrThrow(
      GoalByClosestDateDocument,
      { date: DateTime.asApiDateString(date) },
    )
    if (userGoal == null) {
      return <PersonalGoalsSetter date={date} />
    }

    return await cb({
      searchParams: {
        date,
      },
      meta: {
        today,
      },
      user: {
        goal: userGoal,
        body: userBody,
      },
    })
  }
}
