import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { searchParams } from "@nutrigym/lib/search-params"
import { withUserInfo } from "@nutrigym/components/user"
import {
  PageMainContainer,
  PageSubContainer,
  PageMainHeading,
  PageHeadingContainer,
} from "@nutrigym/components/page"

export default withUserInfo(async (ctx) => {
  const date = await searchParams.date.parse(ctx.next)

  return (
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Training" />
          <DatePickerPopover date={date} />
        </PageHeadingContainer>
      </PageSubContainer>
    </PageMainContainer>
  )
})
