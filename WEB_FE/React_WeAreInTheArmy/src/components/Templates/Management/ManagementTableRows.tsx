import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow';
import { useNavigate } from 'react-router-dom';
import { AcceptanceStatus } from 'src/type';
import Colorstatus from '../Status/atom/ColorAccept';

export default function ManagementTableRows({
  idx,
  status,
  location,
  title,
}: {
  idx: number;
  status: AcceptanceStatus;
  location: string;
  title: string;
}) {
  const navigate = useNavigate();
  return (
    <TableRow
      className="w-full cursor-pointer"
      onClick={() => navigate(`/status/${idx}`)}
    >
      <TableCell>{idx}</TableCell>
      <TableCell>
        <Colorstatus status={status}></Colorstatus>
      </TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>{title}</TableCell>
    </TableRow>
  );
}
