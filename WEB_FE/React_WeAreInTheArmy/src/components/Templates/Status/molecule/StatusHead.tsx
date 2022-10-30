import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead';
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell';

export default function StatusHead() {
  return (
    <TableHead className="font-bold bg-gray-200">
      <TableHeadCell className="p-3 w-[15%]">번호</TableHeadCell>
      <TableHeadCell className="w-[15%]">상태</TableHeadCell>
      <TableHeadCell className="w-[30%]">장소</TableHeadCell>
      <TableHeadCell>제목</TableHeadCell>
    </TableHead>
  );
}
