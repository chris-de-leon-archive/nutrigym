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
  NutritionMeasurementsDropdownMenu,
  NutritionGoalDropdownMenu,
  NutritionMeasurements,
  NutritionCharts,
} from "./_components"

export default withUserInfo(async (ctx) => {
  const date = DateTime.asApiDateString(ctx.searchParams.date)

  // TODO: paginate or add virtualization
  const { foods } = await makeRequestOrThrow(FoodsDocument, {})

  const { foodMeasurementsByDate } = await makeRequestOrThrow(
    FoodMeasurementsByDateDocument,
    { date },
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
            <NutritionGoalDropdownMenu date={date} goal={ctx.user.goal} />
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
            <NutritionMeasurementsDropdownMenu
              measurements={foodMeasurementsByDate}
              foods={foods}
              date={date}
            />
          </PageSubHeadingActions>
        </PageHeadingContainer>
        <NutritionMeasurements
          measurements={foodMeasurementsByDate}
          foods={foods}
          date={date}
        />
      </PageSubContainer>
    </PageMainContainer>
  )
})
