import { MeasurementsDialog } from "./measurements.dialog"
import { withUserInfo } from "@nutrigym/components/user"
import { Button } from "@nutrigym/components/ui/button"
import { BodyDataTable } from "./body.data-table"
import { BodyCharts } from "./body.charts"
import { EditIcon } from "lucide-react"
import {
  PageContainer,
  PageHeadingWithDatePicker,
  PageSubContainer,
  PageSubHeading,
} from "@nutrigym/components/page"
import {
  BodyMeasurementByDateDocument,
  makeRequestOrThrow,
} from "@nutrigym/lib/client"

export default withUserInfo(async (ctx) => {
  // TODO: modify <Title> component to make date updatable
  const date = new Date()

  const { measurementsByDate: log } = await makeRequestOrThrow(
    BodyMeasurementByDateDocument,
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
        <BodyCharts log={log} goal={ctx.goal} />
      </PageSubContainer>
      <PageSubContainer>
        <div className="flex flex-row items-center justify-between">
          <PageSubHeading name="Measurements" />
          <MeasurementsDialog log={log} date={date} />
        </div>
        <BodyDataTable log={log} />
      </PageSubContainer>
    </PageContainer>
  )
})
