import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { NutritionMeasurementsDialog } from "./measurements.dialog"
import { NutritionGoalEditorDialog } from "./goal-editor.dialog"
import { searchParams } from "@nutrigym/lib/search-params"
import { withUserInfo } from "@nutrigym/components/user"
import { NutritionDataTable } from "./page.data-table"
import { NutritionCharts } from "./page.charts"
import {
  PageMainContainer,
  PageSubContainer,
  PageSubHeading,
  PageHeadingContainer,
  PageMainHeading,
} from "@nutrigym/components/page"
import {
  FoodMeasurementsByDateDocument,
  makeRequestOrThrow,
  FoodsDocument,
} from "@nutrigym/lib/client"

export default withUserInfo(async (ctx) => {
  const date = await searchParams.date.parse(ctx.next)

  const { foods } = await makeRequestOrThrow(FoodsDocument, {})

  const { measurementsByDate: log } = await makeRequestOrThrow(
    FoodMeasurementsByDateDocument,
    { date },
  )

  return (
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Nutrition" />
          <DatePickerPopover date={date} />
        </PageHeadingContainer>
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Goals" />
          <NutritionGoalEditorDialog date={date} goal={ctx.user.goal} />
        </PageHeadingContainer>
        <NutritionCharts log={log} goal={ctx.user.goal} />
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Foods" />
          <NutritionMeasurementsDialog date={date} foods={foods} />
        </PageHeadingContainer>
        <NutritionDataTable log={log} />
      </PageSubContainer>
    </PageMainContainer>
  )
})
