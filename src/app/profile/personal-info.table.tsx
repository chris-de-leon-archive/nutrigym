import { Border } from "@nutrigym/components/border"
import { DateTime } from "@nutrigym/lib/datetime"
import { Body } from "@nutrigym/lib/client"
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
    <Border>
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
            <TableCell>{DateTime.computeAge(props.today, birthday)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Border>
  )
}
