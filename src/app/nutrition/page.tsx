import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { NutritionMeasurementsDialog } from "./measurements.dialog"
import { NutritionGoalEditorDialog } from "./goal-editor.dialog"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { withUserInfo } from "@nutrigym/components/user"
import { NutritionDataTable } from "./page.data-table"
import { DateTime } from "@nutrigym/lib/datetime"
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
  FoodsDocument,
} from "@nutrigym/lib/client"

export default withUserInfo(async (ctx) => {
  // TODO: paginate or add virtualization
  const { foods } = await makeRequestOrThrow(FoodsDocument, {})

  const { foodMeasurementsByDate: log } = await makeRequestOrThrow(
    FoodMeasurementsByDateDocument,
    { date: DateTime.formatDate(ctx.searchParams.date) },
  )

  return (
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Nutrition" />
          <DatePickerPopover
            today={ctx.meta.today}
            date={ctx.searchParams.date}
          />
        </PageHeadingContainer>
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Goals" />
          <NutritionGoalEditorDialog
            date={ctx.searchParams.date}
            goal={ctx.user.goal}
          />
        </PageHeadingContainer>
        <NutritionCharts measurements={log} goal={ctx.user.goal} />
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Foods" />
          <NutritionMeasurementsDialog
            date={ctx.searchParams.date}
            foods={foods}
          />
        </PageHeadingContainer>
        <NutritionDataTable date={ctx.searchParams.date} measurements={log} />
      </PageSubContainer>
    </PageMainContainer>
  )
})
