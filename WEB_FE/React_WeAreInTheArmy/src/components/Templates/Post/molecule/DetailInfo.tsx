import HLText from 'src/components/UI/HLText';
import Text from 'src/components/UI/Text';
import { RequestTypes } from 'src/type';
import { statusConverter, typeConverter } from 'src/util/utils';
import CombiInfo from '../atom/CombiInfo';

export default function DetailInfo({
  title,
  type,
  description,
}: {
  title: string;
  type: RequestTypes;
  description: string;
}) {
  return (
    <div className="p-4">
      <Text size="text-2xl" className="font-bold mb-4">
        2. 신청내용
      </Text>
      <CombiInfo label="제목" isEssential>
        <HLText>{title}</HLText>
      </CombiInfo>
      <CombiInfo label="요청 종류" isEssential>
        <HLText>{typeConverter(type)}</HLText>
      </CombiInfo>
      <CombiInfo label="문의내용" isEssential>
        <HLText>{description}</HLText>
      </CombiInfo>
    </div>
  );
}
