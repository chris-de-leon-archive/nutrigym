import { withUserInfo } from "@nutrigym/components/user"
import { Title } from "@nutrigym/components/title"

export default withUserInfo(async () => {
  return (
    <div className="container mx-auto">
      <Title name="Training"></Title>
    </div>
  )
})
