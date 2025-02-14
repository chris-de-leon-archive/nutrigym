import { PageMainContainer, PageMainHeading } from "@nutrigym/components/page"
import { BodyContent, NutritionContent, TrainingContent } from "./_components"
import { withUserInfo } from "@nutrigym/components/user"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@nutrigym/components/ui/tabs"

// TODO: allow users to export data to CSV / JSON file

export default withUserInfo(async (ctx) => {
  return (
    <PageMainContainer>
      <PageMainHeading name="Home" />
      <div className="flex flex-col justify-start gap-y-5">
        <Tabs defaultValue="nutrition" className="flex flex-col gap-y-5">
          <TabsList className="flex w-full flex-row items-center justify-around">
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="body">Body</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>
          <TabsContent value="nutrition">
            <NutritionContent today={ctx.meta.today} />
          </TabsContent>
          <TabsContent value="body">
            <BodyContent today={ctx.meta.today} />
          </TabsContent>
          <TabsContent value="training">
            <TrainingContent />
          </TabsContent>
        </Tabs>
      </div>
    </PageMainContainer>
  )
})
