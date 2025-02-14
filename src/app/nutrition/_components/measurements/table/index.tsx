import { Food, FoodMeasurement, MealType } from "@nutrigym/lib/client/graphql"
import { NutritionMeasurementsDataTable } from "./data-table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@nutrigym/components/ui/tabs"

export type NutritionMeasurementsProps = {
  measurements: FoodMeasurement[]
  foods: Food[]
  date: string
}

export function NutritionMeasurements(props: NutritionMeasurementsProps) {
  return (
    <Tabs defaultValue="breakfast" className="flex flex-col">
      <TabsList className="flex w-full flex-row items-center justify-around">
        <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
        <TabsTrigger value="lunch">Lunch</TabsTrigger>
        <TabsTrigger value="dinner">Dinner</TabsTrigger>
        <TabsTrigger value="snacks">Snacks</TabsTrigger>
      </TabsList>
      <TabsContent value="breakfast">
        <NutritionMeasurementsDataTable
          measurements={props.measurements.filter(
            (m) => m.mealType === MealType.Breakfast,
          )}
          foods={props.foods}
          date={props.date}
        />
      </TabsContent>
      <TabsContent value="lunch">
        <NutritionMeasurementsDataTable
          measurements={props.measurements.filter(
            (m) => m.mealType === MealType.Lunch,
          )}
          foods={props.foods}
          date={props.date}
        />
      </TabsContent>
      <TabsContent value="dinner">
        <NutritionMeasurementsDataTable
          measurements={props.measurements.filter(
            (m) => m.mealType === MealType.Dinner,
          )}
          foods={props.foods}
          date={props.date}
        />
      </TabsContent>
      <TabsContent value="snacks">
        <NutritionMeasurementsDataTable
          measurements={props.measurements.filter(
            (m) => m.mealType === MealType.Snacks,
          )}
          foods={props.foods}
          date={props.date}
        />
      </TabsContent>
    </Tabs>
  )
}
