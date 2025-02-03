import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { makeRequestOrThrow } from "@nutrigym/lib/server"
import { withUserInfo } from "@nutrigym/components/user"
import { DateTime } from "@nutrigym/lib/client/common"
import {
  FoodMeasurementsByDateDocument,
  FoodsDocument,
} from "@nutrigym/lib/client/graphql"
import {
  PageMainContainer,
  PageSubContainer,
  PageSubHeading,
  PageHeadingContainer,
  PageMainHeading,
  PageSubHeadingActions,
} from "@nutrigym/components/page"
import {
  NutritionMeasurementsDeleteButton,
  NutritionMeasurementsDialog,
  NutritionGoalDeleteButton,
  NutritionGoalEditorDialog,
  NutritionDataTable,
  NutritionCharts,
} from "./_components"

export default withUserInfo(async (ctx) => {
  // TODO: paginate or add virtualization
  const { foods } = await makeRequestOrThrow(FoodsDocument, {})

  const { foodMeasurementsByDate } = await makeRequestOrThrow(
    FoodMeasurementsByDateDocument,
    { date: DateTime.asApiDateString(ctx.searchParams.date) },
  )

  return (
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Nutrition" />
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
            <NutritionGoalEditorDialog
              date={ctx.searchParams.date}
              goal={ctx.user.goal}
            />
            <NutritionGoalDeleteButton goal={ctx.user.goal} />
          </PageSubHeadingActions>
        </PageHeadingContainer>
        <NutritionCharts
          measurements={foodMeasurementsByDate}
          goal={ctx.user.goal}
        />
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Measurements" />
          <PageSubHeadingActions>
            <NutritionMeasurementsDialog
              date={ctx.searchParams.date}
              foods={foods}
            />
            <NutritionMeasurementsDeleteButton
              measurements={foodMeasurementsByDate}
              date={ctx.searchParams.date}
            />
          </PageSubHeadingActions>
        </PageHeadingContainer>
        <NutritionDataTable
          date={ctx.searchParams.date}
          measurements={foodMeasurementsByDate}
        />
      </PageSubContainer>
    </PageMainContainer>
  )
})
