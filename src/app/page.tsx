import { ProgressLineChart } from "@nutrigym/components/charts/progress.line-chart"
import { Tabs, TabsList, TabsTrigger } from "@nutrigym/components/ui/tabs"
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs"
import { TabsContent } from "@radix-ui/react-tabs"

// TODO: allow users to export all data

export default function Home() {
  // TODO: fetch from API using tanstack query
  const randVals = () =>
    Array.from({ length: 100 })
      .map((_, i) => {
        return {
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          value: Math.random() * 1000,
        }
      })
      .reverse()

  const deadliftLbs = randVals()
  const benchLbs = randVals()
  const squatLbs = randVals()
  const weights = randVals()
  const sleep = randVals()
  const water = randVals()
  const carbs = randVals()
  const prtns = randVals()
  const steps = randVals()
  const fats = randVals()
  const cals = randVals()

  return (
    <div className="container mx-auto">
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col justify-start gap-y-5">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex w-1/2 flex-col justify-start">
              <span className="text-3xl font-bold">Home</span>
            </div>
          </div>
          <div className="w-full">
            <Tabs defaultValue="nutrition" className="flex flex-col gap-y-5">
              <TabsList className="flex flex-row items-center justify-around">
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="body">Body</TabsTrigger>
              </TabsList>
              <TabsContent value="nutrition">
                <ProgressLineChart
                  title="Macros"
                  defaults={{
                    datasetId: "calories",
                    timeRange: "7d",
                  }}
                  datasets={[
                    {
                      id: "calories",
                      label: "Calories",
                      units: "",
                      color: "hsl(var(--chart-1))",
                      points: cals,
                    },
                    {
                      id: "protein",
                      label: "Protein",
                      units: "(g)",
                      color: "hsl(var(--chart-2))",
                      points: prtns,
                    },
                    {
                      id: "fats",
                      label: "Fats",
                      units: "(g)",
                      color: "hsl(var(--chart-3))",
                      points: fats,
                    },
                    {
                      id: "carbs",
                      label: "Carbs",
                      units: "(g)",
                      color: "hsl(var(--chart-4))",
                      points: carbs,
                    },
                  ]}
                />
              </TabsContent>
              <TabsContent value="training">
                {/* TODO: display average training time */}
                {/* TODO: display info about sets and reps? */}
                {/* TODO: display info about total number of sessions */}
                <ProgressLineChart
                  title="Exercise Strength"
                  defaults={{
                    datasetId: "bench",
                    timeRange: "7d",
                  }}
                  datasets={[
                    {
                      id: "bench",
                      label: "Bench",
                      units: "(lbs)",
                      color: "hsl(var(--chart-1))",
                      points: benchLbs,
                    },
                    {
                      id: "squat",
                      label: "Squat",
                      units: "(lbs)",
                      color: "hsl(var(--chart-3))",
                      points: squatLbs,
                    },
                    {
                      id: "deadlift",
                      label: "Deadlift",
                      units: "(lbs)",
                      color: "hsl(var(--chart-4))",
                      points: deadliftLbs,
                    },
                  ]}
                />
              </TabsContent>
              <TabsContent value="body">
                <ProgressLineChart
                  title="Personal"
                  defaults={{
                    datasetId: "weight",
                    timeRange: "7d",
                  }}
                  datasets={[
                    {
                      id: "weight",
                      label: "Weight",
                      units: "(lbs)",
                      color: "hsl(var(--chart-1))",
                      points: weights,
                    },
                    {
                      id: "sleep",
                      label: "Sleep",
                      units: "(hrs)",
                      color: "hsl(var(--chart-2))",
                      points: sleep,
                    },
                    {
                      id: "water",
                      label: "Water",
                      units: "(ml)",
                      color: "hsl(var(--chart-3))",
                      points: water,
                    },
                    {
                      id: "steps",
                      label: "Steps",
                      units: "",
                      color: "hsl(var(--chart-4))",
                      points: steps,
                    },
                  ]}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SignedIn>
    </div>
  )
}
