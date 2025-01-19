import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { BodyMeasurementsDialog } from "./measurements.dialog"
import { BodyGoalEditorDialog } from "./goal-editor.dialog"
import { withUserInfo } from "@nutrigym/components/user"
import { BodyDataTable } from "./page.data-table"
import { BodyCharts } from "./page.charts"
import {
  PageHeadingContainer,
  PageMainContainer,
  PageMainHeading,
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
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Body" />
          <DatePickerPopover />
        </PageHeadingContainer>
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Goals" />
          <BodyGoalEditorDialog date={date} goal={ctx.goal} />
        </PageHeadingContainer>
        <BodyCharts log={log} goal={ctx.goal} />
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Measurements" />
          <BodyMeasurementsDialog log={log} date={date} />
        </PageHeadingContainer>
        <BodyDataTable log={log} />
      </PageSubContainer>
    </PageMainContainer>
  )
})
