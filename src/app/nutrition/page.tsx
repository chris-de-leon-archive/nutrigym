import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { NutritionMeasurementsDialog } from "./measurements.dialog"
import { NutritionGoalEditorDialog } from "./goal-editor.dialog"
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
  // TODO: modify <Title> component to make date updatable
  const date = new Date()

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
          <DatePickerPopover />
        </PageHeadingContainer>
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Goals" />
          <NutritionGoalEditorDialog date={date} goal={ctx.goal} />
        </PageHeadingContainer>
        <NutritionCharts log={log} goal={ctx.goal} />
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
