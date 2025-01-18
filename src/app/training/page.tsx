import { withUserInfo } from "@nutrigym/components/user"
import {
  PageTitleWithDatePicker,
  PageContainer,
} from "@nutrigym/components/page"

export default withUserInfo(async () => {
  return (
    <PageContainer>
      <PageTitleWithDatePicker name="Training" />
    </PageContainer>
  )
})
