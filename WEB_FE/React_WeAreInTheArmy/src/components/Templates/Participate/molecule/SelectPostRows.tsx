import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow';

export default function SelectPostRows({
  idx,
  title,
  location,
  description,
  setSelectPost,
}: {
  idx: number;
  title: string;
  location: string;
  description: string;
  setSelectPost: ({ idx, title }: { idx: number; title: string }) => void;
}) {
  return (
    <TableRow onClick={() => setSelectPost({ idx, title })}>
      <TableCell>{idx}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>{description}</TableCell>
    </TableRow>
  );
}
