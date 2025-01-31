import { Card, CardContent } from "@nutrigym/components/ui/card"
import { DateTime } from "@nutrigym/lib/client/common"
import { Body } from "@nutrigym/lib/client/graphql"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@nutrigym/components/ui/table"

export type PersonalInfoTableProps = {
  today: Date
  body: Body
}

export function PersonalInfoTable(props: PersonalInfoTableProps) {
  const birthday = DateTime.parseApiDateString(props.body.birthday)
  return (
    <Card>
      <CardContent className="p-2">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Birthday</TableCell>
              <TableCell>{DateTime.formatLocalDate(birthday)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Gender</TableCell>
              <TableCell>{props.body.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Age</TableCell>
              <TableCell>
                {DateTime.computeAge(props.today, birthday)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
