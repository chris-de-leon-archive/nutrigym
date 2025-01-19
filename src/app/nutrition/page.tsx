import { NutritionDataTable } from "./nutrition.data-table"
import { FoodCreatorDialog } from "./food-creator.dialog"
import { withUserInfo } from "@nutrigym/components/user"
import { Button } from "@nutrigym/components/ui/button"
import { NutritionCharts } from "./nutrition.charts"
import { EditIcon } from "lucide-react"
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
          <Button variant="secondary">
            <EditIcon />
          </Button>
        </div>
        <NutritionCharts log={log} goal={ctx.goal} />
      </PageSubContainer>
      <PageSubContainer>
        <div className="flex flex-row items-center justify-between">
          <PageSubHeading name="Foods" />
          <FoodCreatorDialog date={date} foods={foods} />
        </div>
        <NutritionDataTable log={log} />
      </PageSubContainer>
    </PageContainer>
  )
})
