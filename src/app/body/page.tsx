import { withUserInfo } from "@nutrigym/components/user"
import { Button } from "@nutrigym/components/ui/button"
import { Title } from "@nutrigym/components/title"
import { BodyDataTable } from "./body.data-table"
import { BodyCharts } from "./body.charts"
import { EditIcon } from "lucide-react"
import {
  BodyMeasurementByDateDocument,
  makeRequestOrThrow,
} from "@nutrigym/lib/client"
import { MeasurementsDialog } from "./measurements.dialog"

export default withUserInfo(async (ctx) => {
  // TODO: modify <Title> component to make date updatable
  const date = new Date()

  const { measurementsByDate: log } = await makeRequestOrThrow(
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
          <BodyCharts log={log} goal={ctx.goal} />
        </div>
        <div className="flex flex-col justify-start gap-y-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-2xl font-bold">Measurements</span>
            <MeasurementsDialog log={log} date={date} />
          </div>
          <BodyDataTable log={log} />
        </div>
      </div>
    </div>
  )
})
