import { NutritionDataTable } from "./nutrition.data-table"
import { FoodCreatorDialog } from "./food-creator.dialog"
import { withUserInfo } from "@nutrigym/components/user"
import { Button } from "@nutrigym/components/ui/button"
import { NutritionCharts } from "./nutrition.charts"
import { EditIcon } from "lucide-react"
import {
  PageContainer,
  PageTitleWithDatePicker,
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
      <PageTitleWithDatePicker name="Nutrition" />
      <div className="flex flex-col justify-start gap-y-2">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-bold">Goals</span>
          <Button variant="secondary">
            <EditIcon />
          </Button>
        </div>
        <NutritionCharts log={log} goal={ctx.goal} />
      </div>
      <div className="flex flex-col justify-start gap-y-2">
        <div className="flex flex-row items-center justify-between">
          <span className="text-2xl font-bold">Foods</span>
          <FoodCreatorDialog date={date} foods={foods} />
        </div>
        <NutritionDataTable log={log} />
      </div>
    </PageContainer>
  )
})
