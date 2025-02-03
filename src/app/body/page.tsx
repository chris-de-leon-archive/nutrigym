import { BodyMeasurementByDateDocument } from "@nutrigym/lib/client/graphql"
import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { withUserInfo } from "@nutrigym/components/user"
import { DateTime } from "@nutrigym/lib/client/common"
import {
  PageHeadingContainer,
  PageMainContainer,
  PageMainHeading,
  PageSubContainer,
  PageSubHeading,
  PageSubHeadingActions,
} from "@nutrigym/components/page"
import {
  BodyMeasurementsDeleteButton,
  BodyMeasurementsDialog,
  BodyGoalEditorDialog,
  BodyGoalDeleteButton,
  BodyCharts,
  BodyTable,
} from "./_components"

export default withUserInfo(async (ctx) => {
  const { bodyMeasurementByDate } = await makeRequestOrThrow(
    BodyMeasurementByDateDocument,
    { date: DateTime.asApiDateString(ctx.searchParams.date) },
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
          <PageSubHeadingActions>
            <BodyGoalEditorDialog
              date={ctx.searchParams.date}
              goal={ctx.user.goal}
            />
            <BodyGoalDeleteButton goal={ctx.user.goal} />
          </PageSubHeadingActions>
        </PageHeadingContainer>
        <BodyCharts measurement={bodyMeasurementByDate} goal={ctx.user.goal} />
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Measurements" />
          <PageSubHeadingActions>
            <BodyMeasurementsDialog
              measurement={bodyMeasurementByDate}
              date={ctx.searchParams.date}
            />
            <BodyMeasurementsDeleteButton
              measurements={
                bodyMeasurementByDate != null ? [bodyMeasurementByDate] : []
              }
              date={ctx.searchParams.date}
            />
          </PageSubHeadingActions>
        </PageHeadingContainer>
        <BodyTable measurement={bodyMeasurementByDate} />
      </PageSubContainer>
    </PageMainContainer>
  )
})
