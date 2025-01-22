import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { BodyMeasurementByDateDocument } from "@nutrigym/lib/client"
import { BodyMeasurementsDialog } from "./measurements.dialog"
import { BodyGoalEditorDialog } from "./goal-editor.dialog"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { withUserInfo } from "@nutrigym/components/user"
import { DateTime } from "@nutrigym/lib/datetime"
import { BodyDataTable } from "./page.data-table"
import { BodyCharts } from "./page.charts"
import {
  PageHeadingContainer,
  PageMainContainer,
  PageMainHeading,
  PageSubContainer,
  PageSubHeading,
} from "@nutrigym/components/page"

export default withUserInfo(async (ctx) => {
  const { bodyMeasurementByDate: log } = await makeRequestOrThrow(
    BodyMeasurementByDateDocument,
    { date: DateTime.formatDate(ctx.searchParams.date) },
  )

  return (
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Body" />
          <DatePickerPopover
            today={ctx.meta.today}
            date={ctx.searchParams.date}
          />
        </PageHeadingContainer>
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Goals" />
          <BodyGoalEditorDialog
            date={ctx.searchParams.date}
            goal={ctx.user.goal}
          />
        </PageHeadingContainer>
        <BodyCharts measurement={log} goal={ctx.user.goal} />
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Measurements" />
          <BodyMeasurementsDialog
            measurement={log}
            date={ctx.searchParams.date}
          />
        </PageHeadingContainer>
        <BodyDataTable measurement={log} />
      </PageSubContainer>
    </PageMainContainer>
  )
})
