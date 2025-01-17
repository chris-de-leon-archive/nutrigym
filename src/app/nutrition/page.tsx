import { NutritionGoalCharts } from "./nutrition-goal-charts"
import { withUserInfo } from "@nutrigym/components/user"
import { NutritionFoodLog } from "./nutrition-food-log"
import { Button } from "@nutrigym/components/ui/button"
import { Title } from "@nutrigym/components/title"
import { EditIcon, PlusIcon } from "lucide-react"
import {
  FoodMeasurementsByDateDocument,
  makeRequestOrThrow,
} from "@nutrigym/lib/client"

export default withUserInfo(async (ctx) => {
  const date = new Date()

  const { foodMeasurementsByDate: measurements } = await makeRequestOrThrow(
    FoodMeasurementsByDateDocument,
    { date },
  )

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-10">
        <Title name="Nutrition" />
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Goals</span>
            <Button variant="secondary">
              <EditIcon />
            </Button>
          </div>
          <NutritionGoalCharts measurements={measurements} goal={ctx.goal} />
        </div>
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Foods</span>
            <Button variant="secondary">
              <PlusIcon />
            </Button>
          </div>
          <NutritionFoodLog measurements={measurements} />
        </div>
      </div>
    </div>
  )
})
