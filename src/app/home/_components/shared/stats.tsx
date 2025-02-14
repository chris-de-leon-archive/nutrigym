import { Card, CardContent, CardHeader } from "@nutrigym/components/ui/card"
import { Fmt } from "@nutrigym/lib/client/common"
import { Dataset } from "../../_lib"

export type StatsProps<T extends string> = {
  dataset: Dataset<T>
}

export function Stats<T extends string>(props: StatsProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {props.dataset.stats.data.map(({ key, value }, i) => {
        return (
          <Card key={i}>
            <CardHeader className="border-b text-center text-3xl font-bold">
              {value == null ? "N/A" : Fmt.formatNumber(value)}
            </CardHeader>
            <CardContent className="p-2 text-center text-sm">{key}</CardContent>
          </Card>
        )
      })}
    </div>
  )
}
