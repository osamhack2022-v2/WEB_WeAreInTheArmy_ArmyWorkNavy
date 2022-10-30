import Option from '../../../UI/Option';
import Select from '../../../UI/Select';
import DefaultInformation from '../../../UI/DefaultInformation';
import { RequestTypes } from 'src/type';

interface RequestCategorySelectProps {
  label: string;
  options: Options[];
  dispatch: any;
}

type Options = {
  label: string;
  value: RequestTypes;
};

export default function RequestCategorySelect({
  label,
  options,
  dispatch,
}: RequestCategorySelectProps) {
  return (
    <DefaultInformation label={label} isEssential>
      <Select
        className="w-3/4"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          dispatch(event.target.value)
        }
      >
        {options.map(({ label, value }: Options) => (
          <Option key={label} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    </DefaultInformation>
  );
}
