import { PageMainContainer, PageMainHeading } from "@nutrigym/components/page"
import { BodyContent, NutritionContent, TrainingContent } from "./_components"
import { Tabs, TabsList, TabsTrigger } from "@nutrigym/components/ui/tabs"
import { withUserInfo } from "@nutrigym/components/user"
import { TabsContent } from "@radix-ui/react-tabs"

// TODO: allow users to export data to CSV / JSON file

export default withUserInfo(async (ctx) => {
  return (
    <PageMainContainer>
      <PageMainHeading name="Home" />
      <div className="flex flex-col justify-start gap-y-5">
        <div className="w-full">
          <Tabs defaultValue="nutrition" className="flex flex-col gap-y-5">
            <TabsList className="flex flex-row items-center justify-around">
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="training">Training</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
            </TabsList>
            <TabsContent value="nutrition">
              <NutritionContent />
            </TabsContent>
            <TabsContent value="training">
              <TrainingContent />
            </TabsContent>
            <TabsContent value="body">
              <BodyContent today={ctx.meta.today} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageMainContainer>
  )
})
