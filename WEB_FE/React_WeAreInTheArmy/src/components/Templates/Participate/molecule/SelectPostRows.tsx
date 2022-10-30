import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow';

export default function SelectPostRows({
  idx,
  title,
  location,
  description,
  likes,
  setSelectPost,
}: {
  idx: number;
  title: string;
  location: string;
  description: string;
  likes?: string;
  setSelectPost: ({
    idx,
    title,
    likes,
  }: {
    idx: number;
    title: string;
    likes?: string;
  }) => void;
}) {
  return (
    <TableRow onClick={() => setSelectPost({ idx, title, likes })}>
      <TableCell>{idx}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>{description}</TableCell>
    </TableRow>
  );
}
