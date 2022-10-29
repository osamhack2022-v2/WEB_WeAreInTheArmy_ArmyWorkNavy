import Input from 'src/components/UI/Input';
import Text from 'src/components/UI/Text';
import CombiInfo from '../Post/atom/CombiInfo';

export default function ManagementInput({
  setUnit,
  setPassword,
}: {
  setUnit: (unit: string) => void;
  setPassword: (password: string) => void;
}) {
  return (
    <div className="p-4">
      <Text size="text-2xl" className="font-bold mb-4">
        3. 부대 설정
      </Text>
      <CombiInfo label="부대명" isEssential>
        <Input
          type="text"
          className="w-full"
          onChange={(e) => setUnit(e.target.value)}
        />
      </CombiInfo>
      <CombiInfo label="부대 암호" isEssential>
        <Input
          type="text"
          className="w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
      </CombiInfo>
    </div>
  );
}
