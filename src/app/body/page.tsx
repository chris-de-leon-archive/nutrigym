import { withUserInfo } from "@nutrigym/components/user"
import { Button } from "@nutrigym/components/ui/button"
import { BodyGoalCharts } from "./body-goal-charts"
import { Title } from "@nutrigym/components/title"
import { EditIcon, PlusIcon } from "lucide-react"
import { BodyMeasurementsLog } from "./body-measurements-log"
import {
  BodyMeasurementByDateDocument,
  makeRequestOrThrow,
} from "@nutrigym/lib/client"

export default withUserInfo(async (ctx) => {
  const date = new Date()

  const { bodyMeasurementByDate: measurements } = await makeRequestOrThrow(
    BodyMeasurementByDateDocument,
    { date },
  )

  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-start gap-y-10">
        <Title name="Body" />
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Goals</span>
            <Button variant="secondary">
              <EditIcon />
            </Button>
          </div>
          <BodyGoalCharts measurements={measurements} goal={ctx.goal} />
        </div>
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Measurements</span>
            <Button variant="secondary">
              <PlusIcon />
            </Button>
          </div>
          <BodyMeasurementsLog measurements={measurements} />
        </div>
      </div>
    </div>
  )
})
