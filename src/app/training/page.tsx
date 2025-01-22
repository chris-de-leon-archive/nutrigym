import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { withUserInfo } from "@nutrigym/components/user"
import {
  PageMainContainer,
  PageSubContainer,
  PageMainHeading,
  PageHeadingContainer,
} from "@nutrigym/components/page"

export default withUserInfo(async (ctx) => {
  return (
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Training" />
          <DatePickerPopover
            today={ctx.meta.today}
            date={ctx.searchParams.date}
          />
        </PageHeadingContainer>
      </PageSubContainer>
    </PageMainContainer>
  )
})
