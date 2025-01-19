import { computeAge } from "@nutrigym/lib/datetime"
import { Body } from "@nutrigym/lib/client"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@nutrigym/components/ui/table"

export type PersonalInfoTableProps = {
  body: Body
}

export function PersonalInfoTable(props: PersonalInfoTableProps) {
  const birthday = new Date(props.body.birthday)
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Birthday</TableCell>
          <TableCell>{birthday.toLocaleDateString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Gender</TableCell>
          <TableCell>{props.body.gender}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Age</TableCell>
          <TableCell>{computeAge(birthday)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
