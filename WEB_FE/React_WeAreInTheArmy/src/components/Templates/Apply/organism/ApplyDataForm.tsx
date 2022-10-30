import { RequestTypes } from 'src/type';
import { useApplyDataDispatch } from '../../../../context/ApplyContext';
import FlexContainer from '../../../UI/FlexContantainer';
import Text from '../../../UI/Text';
import DescriptionArea from '../molecule/DescriptionArea';
import RequestCategorySelect from '../molecule/RequestCategorySelect';
import TitleInput from '../molecule/TitleInput';

export default function ApplyDataForm() {
  const dispatch = useApplyDataDispatch();
  const setTitle = (value: string) =>
    dispatch({ type: 'SET_TITLE', title: value });
  const setRequestCategory = (value: RequestTypes) =>
    dispatch({ type: 'SET_REQUEST_TYPES', requestTypes: value });
  const setDescription = (value: string) =>
    dispatch({ type: 'SET_DESCRIPTION', description: value });

  return (
    <div className="mb-4">
      <Text size="text-3xl" className="font-bold p-4">
        2. 신청 내용
      </Text>
      <FlexContainer className="flex-col h-[200px] justify-between">
        <TitleInput
          label="제목"
          placeholder="제목을 입력해주세요"
          dispatch={setTitle}
        />
        <RequestCategorySelect
          label="요청분류"
          options={[
            { label: '일반', value: RequestTypes.DEFAULT },
            { label: '재난', value: RequestTypes.DISASTOR },
            { label: '환경', value: RequestTypes.ENVIROMENTAL },
            { label: '사회', value: RequestTypes.SOCIAL },
          ]}
          dispatch={setRequestCategory}
        />
        <DescriptionArea label="내용" dispatch={setDescription} />
      </FlexContainer>
    </div>
  );
}
