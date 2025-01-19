import { withUserInfo } from "@nutrigym/components/user"
import {
  PageHeadingWithDatePicker,
  PageContainer,
} from "@nutrigym/components/page"

export default withUserInfo(async () => {
  return (
    <PageContainer>
      <PageHeadingWithDatePicker name="Training" />
    </PageContainer>
  )
})
