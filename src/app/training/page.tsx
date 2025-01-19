import { DatePickerPopover } from "@nutrigym/components/date-picker"
import { withUserInfo } from "@nutrigym/components/user"
import {
  PageMainContainer,
  PageSubContainer,
  PageMainHeading,
  PageHeadingContainer,
} from "@nutrigym/components/page"

export default withUserInfo(async () => {
  return (
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Training" />
          <DatePickerPopover />
        </PageHeadingContainer>
      </PageSubContainer>
    </PageMainContainer>
  )
})
