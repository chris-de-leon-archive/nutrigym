import { BodyMeasurementsDialog } from "./measurements.dialog"
import { BodyGoalEditorDialog } from "./goal-editor.dialog"
import { withUserInfo } from "@nutrigym/components/user"
import { BodyDataTable } from "./page.data-table"
import { BodyCharts } from "./page.charts"
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
      <PageHeadingWithDatePicker name="Body" />
      <PageSubContainer>
        <div className="flex flex-row items-center justify-between">
          <PageSubHeading name="Goals" />
          <BodyGoalEditorDialog date={date} goal={ctx.goal} />
        </div>
        <BodyCharts log={log} goal={ctx.goal} />
      </PageSubContainer>
      <PageSubContainer>
        <div className="flex flex-row items-center justify-between">
          <PageSubHeading name="Measurements" />
          <BodyMeasurementsDialog log={log} date={date} />
        </div>
        <BodyDataTable log={log} />
      </PageSubContainer>
    </PageContainer>
  )
})
