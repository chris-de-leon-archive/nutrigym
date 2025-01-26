import { PersonalInfoEditorDialog, PersonalInfoTable } from "./_components"
import { withUserInfo } from "@nutrigym/components/user"
import { UserButton } from "@clerk/nextjs"
import {
  PageHeadingContainer,
  PageMainContainer,
  PageMainHeading,
  PageSubContainer,
  PageSubHeading,
} from "@nutrigym/components/page"

export default withUserInfo(async (ctx) => {
  return (
    <PageMainContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageMainHeading name="Profile" />
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-[50px] h-[50px]",
              },
            }}
          />
        </PageHeadingContainer>
      </PageSubContainer>
      <PageSubContainer>
        <PageHeadingContainer>
          <PageSubHeading name="Personal Info" />
          <PersonalInfoEditorDialog
            today={ctx.meta.today}
            body={ctx.user.body}
          />
        </PageHeadingContainer>
        <PersonalInfoTable today={ctx.meta.today} body={ctx.user.body} />
      </PageSubContainer>
    </PageMainContainer>
  )
})
