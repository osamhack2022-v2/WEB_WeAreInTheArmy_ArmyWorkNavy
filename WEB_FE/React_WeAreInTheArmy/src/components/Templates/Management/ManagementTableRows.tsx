import classNames from 'classnames';
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow';
import { useNavigate } from 'react-router-dom';
import { useUserState } from 'src/context/UserContext';
import { AcceptanceStatus, AccountTypes, RequestTypes } from 'src/type';
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
  const state = useUserState();
  const type = state.user.type;
  return (
    <TableRow
      className={classNames(
        'w-full',
        type === AccountTypes.ADMINISTRATOR && 'cursor-pointer',
      )}
      onClick={() => {
        if (type === AccountTypes.ADMINISTRATOR) navigate(`/status/${idx}`);
      }}
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
