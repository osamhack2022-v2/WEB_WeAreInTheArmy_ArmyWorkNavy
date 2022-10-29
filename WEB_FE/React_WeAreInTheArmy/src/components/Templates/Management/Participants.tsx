import { Table } from 'flowbite-react';
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody';
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';
import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead';
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell';
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow';
import { useState } from 'react';

export default function Participants({
  participants,
}: {
  participants: string;
}) {
  const part = JSON.parse(participants);
  const soldiers: { name: string; serial_number: string; unit: string }[] =
    Array.from(Object.values(part.soldiers));
  console.log(soldiers);

  return (
    <Table>
      <TableHead>
        <TableHeadCell>이름</TableHeadCell>
        <TableHeadCell>군번</TableHeadCell>
        <TableHeadCell>부대명</TableHeadCell>
      </TableHead>
      <TableBody>
        {soldiers.map(
          (
            {
              name,
              serial_number,
              unit,
            }: {
              name: string;
              serial_number: string;
              unit: string;
            },
            index,
          ) => (
            <TableRow
              key={name + serial_number + unit + index}
              className="bg-white"
            >
              <TableCell>{name}</TableCell>
              <TableCell>{serial_number}</TableCell>
              <TableCell>{unit}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
