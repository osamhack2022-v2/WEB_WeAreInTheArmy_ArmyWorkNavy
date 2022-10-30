import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'src/components/UI/Button';
import Divider from 'src/components/UI/Divider';
import FlexContainer from 'src/components/UI/FlexContantainer';
import Paper from 'src/components/UI/Paper';
import SemiHeader from 'src/components/UI/SemiHeader';
import Text from 'src/components/UI/Text';
import { DangerToast, SuccessToast } from 'src/components/UI/Toast';
import { AcceptanceStatus, Board, Post, RequestTypes } from 'src/type';
import { client } from 'src/util/client';
import DefaultInfo from '../Post/molecule/DefaultInfo';
import DetailInfo from '../Post/molecule/DetailInfo';
import ManagementInput from './ManagementInput';
import Participants from './Participants';

export default function ManagementAcceptTemplate() {
  const [post, setPost] = useState<Post>({
    admit: true,
    createdAt: '',
    description: '',
    idx: 1,
    image: '',
    location: '',
    title: '',
    type: '',
    updatedAt: '',
    done: false,
    identifier: '',
    participants: '',
    status: AcceptanceStatus.PENDING,
    likes: '',
  });
  const locations = useLocation();
  const navigate = useNavigate();
  const id = locations.pathname.match(/\d+/)?.[0];
  useEffect(() => {
    client
      .get('/api/board/getBoardByIndex/' + id)
      .then((res) => setPost(res.data));
  }, []);
  const [modal, setModal] = useState<string>('');

  const patchStatus = (status: AcceptanceStatus) => {
    client
      .patch('/api/board/setStatus', {
        board_idx: post.idx,
        status,
      })
      .then(() => setModal('success'))
      .catch(() => setModal('error'));
    client.patch('/api/board/unitParticipate', {
      board_idx: post.idx,
      unit,
      password,
    });
  };

  const [unit, setUnit] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Paper className="w-[900px]">
      <SemiHeader
        title="대민지원 신청 관리"
        subTitle="내용을 읽고 수락여부를 결정해주세요."
      />
      <Divider />
      <FlexContainer className="flex-col w-full divide-y divide-slate-200">
        <DefaultInfo
          identifier={post.identifier}
          createdAt={post.createdAt}
          location={post.location}
        />
        <DetailInfo
          title={post.title}
          type={post.type as RequestTypes}
          description={post.description}
        />
        <ManagementInput setUnit={setUnit} setPassword={setPassword} />
        <div className="p-5">
          <Text size="text-2xl" className="font-bold mb-4">
            4.신청대원
          </Text>
          {post.participants && (
            <Participants participants={post.participants} />
          )}
        </div>
        <FlexContainer className="w-full p-4 justify-between">
          <Button
            className="bg-error"
            onClick={() => {
              patchStatus(AcceptanceStatus.DENIED);
            }}
          >
            거절
          </Button>
          <Button
            className="bg-introduce"
            onClick={() => {
              patchStatus(AcceptanceStatus.PENDING);
            }}
          >
            보류
          </Button>
          <Button
            onClick={() => {
              patchStatus(AcceptanceStatus.ACCPEPTED);
            }}
          >
            수락
          </Button>
        </FlexContainer>
      </FlexContainer>
      <Modal show={modal !== ''} onClose={() => setModal('')}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <FlexContainer className="flex-col justify-center items-center">
            {modal === 'success' && (
              <>
                <SuccessToast message="변경 되었습니다."></SuccessToast>
                <Button
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  메인
                </Button>
              </>
            )}
            {modal === 'error' && (
              <>
                <DangerToast message="데이터를 다시 입력해주세요."></DangerToast>
              </>
            )}
          </FlexContainer>
        </Modal.Body>
      </Modal>
    </Paper>
  );
}
