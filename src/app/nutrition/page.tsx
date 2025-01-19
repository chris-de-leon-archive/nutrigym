import { NutritionGoalEditorDialog } from "./goal-editor.dialog"
import { NutritionMeasurementsDialog } from "./measurements.dialog"
import { withUserInfo } from "@nutrigym/components/user"
import { NutritionDataTable } from "./page.data-table"
import { NutritionCharts } from "./page.charts"
import {
  PageContainer,
  PageSubContainer,
  PageSubHeading,
  PageHeadingWithDatePicker,
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
    <PageContainer>
      <PageHeadingWithDatePicker name="Nutrition" />
      <PageSubContainer>
        <div className="flex flex-row items-center justify-between">
          <PageSubHeading name="Goals" />
          <NutritionGoalEditorDialog date={date} goal={ctx.goal} />
        </div>
        <NutritionCharts log={log} goal={ctx.goal} />
      </PageSubContainer>
      <PageSubContainer>
        <div className="flex flex-row items-center justify-between">
          <PageSubHeading name="Foods" />
          <NutritionMeasurementsDialog date={date} foods={foods} />
        </div>
        <NutritionDataTable log={log} />
      </PageSubContainer>
    </PageContainer>
  )
})
