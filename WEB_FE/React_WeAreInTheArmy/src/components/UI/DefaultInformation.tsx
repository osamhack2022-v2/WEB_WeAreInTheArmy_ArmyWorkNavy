import FlexContainer from './FlexContantainer';
import Text from './Text';
import EssentialMark from '../Templates/Apply/atom/EssentialMark';

interface DefaultInformation {
  label: string;
  isEssential?: boolean;
  children: React.ReactNode;
}

export default function DefaultInformation({
  label,
  isEssential,
  children,
}: DefaultInformation) {
  return (
    <FlexContainer className="w-full justify-evenly items-center">
      <Text size="text-xl" className="w-1/5 font-center font-semibold">
        {label}
        {isEssential && <EssentialMark />}
      </Text>
      {children}
    </FlexContainer>
  );
}
