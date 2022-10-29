import Text from 'src/components/UI/Text';
import { AcceptanceStatus } from 'src/type';
import { statusConverter } from 'src/util/utils';

export default function Colorstatus({ status }: { status: AcceptanceStatus }) {
  const text = statusConverter(status);
  switch (status) {
    case AcceptanceStatus.ACCPEPTED:
      return (
        <Text size="text-base" className="font-semibold">
          {text}
        </Text>
      );
    case AcceptanceStatus.PENDING:
      return (
        <Text size="text-base" className="text-cyan-400 font-semibold">
          {text}
        </Text>
      );
    case AcceptanceStatus.DENIED:
      return (
        <Text size="text-base" className="text-red-600 font-semibold">
          {text}
        </Text>
      );
    default:
      return (
        <Text size="text-base" className="text-red-600 font-semibold">
          Error
        </Text>
      );
  }
}
