import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow';
import { useNavigate } from 'react-router-dom';
import { Post } from 'src/type';
import ColorAccept from './ColorAccept';

export default function StatusRow({
  idx,
  admit,
  title,
  createdAt,
  description,
  image,
  location,
  type,
  updatedAt,
  status,
}: Post) {
  const navigate = useNavigate();
  return (
    <TableRow className="text-center">
      <TableCell className="p-5 font-bold">{idx}</TableCell>
      <TableCell>
        <div className="font-bold">
          <ColorAccept status={status}></ColorAccept>
        </div>
      </TableCell>
      <TableCell className="text-left px-10 font-bold">{location}</TableCell>
      <TableCell className="text-left px-10 font-bold">{title}</TableCell>
    </TableRow>
  );
}

//  <ColorAccept accept={location} />
