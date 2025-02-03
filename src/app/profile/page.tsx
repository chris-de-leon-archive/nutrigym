import { withUserInfo } from "@nutrigym/components/user"
import { UserButton } from "@clerk/nextjs"
import {
  PageHeadingContainer,
  PageMainContainer,
  PageMainHeading,
  PageSubContainer,
  PageSubHeading,
  PageSubHeadingActions,
} from "@nutrigym/components/page"
import {
  PersonalInfoDeleteButton,
  PersonalInfoEditorDialog,
  PersonalInfoTable,
} from "./_components"

export default withUserInfo(async (ctx) => {
  // TODO: number of calories your body consumes to sustain itself
  // TODO: number of calories to eat in order to maintain current weight
  // TODO: use the latest calorie measurement to decide whether the user is in a caloric surplus/deficit/maintenance
  // TODO: categorize the diet type as keto, muscle-building, etc. based on the user's goal macro percentages

  {
    /* <Border> */
  }
  {
    /*     <span className="font-bold">Basal Metabolic Rate (BMR)</span> */
  }
  {
    /*     <p>High/Low/Moderate</p> */
  }
  {
    /*   </Border> */
  }
  {
    /*   <Border> */
  }
  {
    /*     <span className="font-bold"> */
  }
  {
    /*       Total Daily Energy Expenditure (TDEE) */
  }
  {
    /*     </span> */
  }
  {
    /*     <p>High/Low/Moderate</p> */
  }
  {
    /*   </Border> */
  }
  {
    /*   <Border> */
  }
  {
    /*     <span className="font-bold">Caloric Intake</span> */
  }
  {
    /*     <p>Surplus</p> */
  }
  {
    /*   </Border> */
  }
  {
    /*   <Border> */
  }
  {
    /*     <span className="font-bold">Diet Type</span> */
  }
  {
    /*     <p>Keto</p> */
  }
  {
    /*   </Border> */
  }
  {
    /**/
  }

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
          <PageSubHeadingActions>
            <PersonalInfoEditorDialog
              today={ctx.meta.today}
              body={ctx.user.body}
            />
            <PersonalInfoDeleteButton />
          </PageSubHeadingActions>
        </PageHeadingContainer>
        <PersonalInfoTable today={ctx.meta.today} body={ctx.user.body} />
      </PageSubContainer>
    </PageMainContainer>
  )
})
