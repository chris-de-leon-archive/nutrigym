import { PersonalInfoEditorDialog } from "./personal-info-editor.dialog"
import { PersonalInfoTable } from "./personal-info.table"
import { withUserInfo } from "@nutrigym/components/user"
import { UserButton } from "@clerk/nextjs"
import {
  PageContainer,
  PageHeading,
  PageSubContainer,
  PageSubHeading,
} from "@nutrigym/components/page"

export default withUserInfo(async (ctx) => {
  return (
    <PageContainer>
      <PageSubContainer>
        <div className="flex flex-row items-center justify-between">
          <PageHeading name="Profile" />
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-[50px] h-[50px]",
              },
            }}
          />
        </div>
      </PageSubContainer>
      <PageSubContainer>
        <div className="flex flex-row items-center justify-between">
          <PageSubHeading name="Personal Info" />
          <PersonalInfoEditorDialog body={ctx.body} />
        </div>
        <div className="rounded border p-2">
          <PersonalInfoTable body={ctx.body} />
        </div>
      </PageSubContainer>
    </PageContainer>
  )
})
