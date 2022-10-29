import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/UI/Button';
import { DangerToast, SuccessToast } from 'src/components/UI/Toast';
import { client } from 'src/util/client';
import {
  useApplyDataState,
  useDefaultInformationState,
} from '../../../context/ApplyContext';
import FlexContainer from '../../UI/FlexContantainer';
import Paper from '../../UI/Paper';
import SemiHeader from '../../UI/SemiHeader';
import AgreePersonData from './organism/AgreePersonData';
import ApplyDataForm from './organism/ApplyDataForm';
import DefaultInformationForm from './organism/DefaultInformationForm';

// {
//   "type": "string",
//   "title": "string",
//   "description": "string",
//   "location": "string",
//   "admit": true,
//   "image": "string"
// }

export default function ApplyTemplate() {
  const [modal, setModal] = useState<string>('');
  const defaultInformationState = useDefaultInformationState();
  const applyDataState = useApplyDataState();
  const createBoard = () => {
    client
      .post(
        '/api/board/createBoard',
        {
          type: applyDataState.requestCategory,
          title: applyDataState.title,
          description: applyDataState.description,
          location: defaultInformationState.location,
          admit: true,
          image: 'string',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        },
      )
      .then((res) => {
        setModal('success');
      })
      .catch((e) => {
        setModal('error');
      });
  };
  const navigate = useNavigate();
  return (
    <Paper className="w-[900px]">
      <SemiHeader
        title="대민지원 신청 양식"
        subTitle="아래 양식을 작성해주세요"
      />
      <span className="w-full p-0.5 bg-slate-200 my-5" />
      <FlexContainer className="flex-col w-full divide-y divide-slate-200">
        <DefaultInformationForm />
        <ApplyDataForm />
        <AgreePersonData />
      </FlexContainer>
      <FlexContainer className="my-5 justify-between w-full px-5">
        <Button size="lg" onClick={() => navigate('/')}>
          취소하기
        </Button>
        <Button
          size="lg"
          onClick={() => {
            createBoard();
          }}
        >
          제출하기
        </Button>
      </FlexContainer>
      <Modal
        show={modal !== ''}
        popup={modal !== ''}
        onClose={() => setModal('')}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          {modal === 'success' && <SuccessToast message="제출되었습니다." />}
          {modal === 'error' && (
            <>
              <DangerToast message="제출에 실패하였습니다." />
              <div>입력값을 확인해주세요.</div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Paper>
  );
}
