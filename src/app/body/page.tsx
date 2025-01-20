import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { BodyMeasurementsDialog } from "./measurements.dialog"
import { BodyGoalEditorDialog } from "./goal-editor.dialog"
import { searchParams } from "@nutrigym/lib/search-params"
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
  const date = await searchParams.date.parse(ctx.next)

  const { measurementsByDate: log } = await makeRequestOrThrow(
    BodyMeasurementByDateDocument,
    { date },
  )

  return (
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Body" />
          <DatePickerPopover date={date} />
        </PageHeadingContainer>
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Goals" />
          <BodyGoalEditorDialog date={date} goal={ctx.user.goal} />
        </PageHeadingContainer>
        <BodyCharts log={log} goal={ctx.user.goal} />
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
