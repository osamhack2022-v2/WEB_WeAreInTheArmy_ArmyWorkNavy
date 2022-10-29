import { Modal, Table } from 'flowbite-react';
import { ModalFooter } from 'flowbite-react/lib/esm/components/Modal/ModalFooter';
import { ModalHeader } from 'flowbite-react/lib/esm/components/Modal/ModalHeader';
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody';
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';
import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead';
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell';
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/UI/Button';
import DefaultInformation from 'src/components/UI/DefaultInformation';
import FlexContainer from 'src/components/UI/FlexContantainer';
import HLText from 'src/components/UI/HLText';
import Input from 'src/components/UI/Input';
import Paper from 'src/components/UI/Paper';
import SemiHeader from 'src/components/UI/SemiHeader';
import Text from 'src/components/UI/Text';
import { DangerToast, SuccessToast } from 'src/components/UI/Toast';
import { usePostState } from 'src/context/PostContext';
import { AcceptanceStatus, Post } from 'src/type';
import { client } from 'src/util/client';
import DefaultInformationInput from '../Apply/atom/DefaultInformationInput';
import StatusHead from '../Status/molecule/StatusHead';
import StatusTable from '../Status/organism/StatusTable';
import SelectPostRows from './molecule/SelectPostRows';

export default function ParticipateTemplate() {
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [selectPost, setSelectPost] = useState<{
    idx: number;
    title: string;
  }>({ idx: 0, title: '' });
  const [name, setName] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [sn, setSn] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [modal, setModal] = useState<string>('');
  const navigate = useNavigate();
  const handleSubmitParticipate = () => {
    client
      .patch('/api/board/soldierParticipate', {
        board_idx: selectPost.idx,
        name,
        unit,
        serial_number: sn,
        password,
      })
      .then((res) => {
        setModal('success');
      })
      .catch((e) => {
        setModal('error');
      });
  };

  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    client.get('/api/board/getAllBoards').then((res) => setPosts(res.data));
  }, []);

  return (
    <Paper className="w-[900px]">
      <SemiHeader
        title="대민지원 참여하기"
        subTitle="주변 이웃들이 요청한 대민지원에 참여해주세요"
      />
      <FlexContainer>
        <Button onClick={() => setOpen(true)}>참여할 대민지원 선택하기</Button>
      </FlexContainer>

      <FlexContainer className="flex-col w-full">
        <div className="p-3">
          <Text size="text-2xl" className="font-bold">
            신청양식
          </Text>
        </div>
        <FlexContainer className="flex-col h-[300px] justify-evenly">
          <DefaultInformation label="선택한 게시글">
            <div className="w-3/4 border-4 rounded-md bg-white p-[8px]">
              <Text size="text-base" className="h-[24px]">
                {selectPost.title}
              </Text>
            </div>
          </DefaultInformation>
          <DefaultInformationInput
            label="이름"
            placeholder="이름을 적어주세요."
            dispatch={setName}
            isEssential
          />
          <DefaultInformationInput
            label="군 부대"
            placeholder="어느 부대에서 복무하고 계시는지 알려주세요."
            dispatch={setUnit}
            isEssential
          />
          <DefaultInformationInput
            label="군번"
            placeholder="본인의 군번을 적어주세요."
            dispatch={setSn}
            isEssential
          />
          <DefaultInformationInput
            label="비밀번호"
            placeholder="간부님께서 알려주신 비밀번호를 적어주세요."
            dispatch={setPassword}
            isEssential
          />
        </FlexContainer>
        <FlexContainer className="w-full justify-between p-5">
          <Button className="bg-white text-black">❤️ {count}</Button>
          <Button onClick={handleSubmitParticipate}>참여하기</Button>
        </FlexContainer>
      </FlexContainer>
      <Modal show={open} onClose={() => setOpen(false)}>
        <Modal.Header>
          <strong>대민지원 선택하기</strong>
        </Modal.Header>
        <Modal.Body>
          {/* 고쳐야 함 */}
          <Table>
            <TableHead className="font-bold bg-gray-200 ">
              <TableHeadCell>id</TableHeadCell>
              <TableHeadCell>제목</TableHeadCell>
              <TableHeadCell>위치</TableHeadCell>
              <TableHeadCell>설명</TableHeadCell>
            </TableHead>
            <TableBody>
              {posts
                .filter((post) => post.status === AcceptanceStatus.ACCPEPTED)
                .map((post: Post) => (
                  <SelectPostRows
                    key={post.idx}
                    idx={post.idx}
                    title={post.title}
                    location={post.location}
                    description={post.description}
                    setSelectPost={setSelectPost}
                  />
                ))}
            </TableBody>
          </Table>
          <FlexContainer className="items-center justify-end p-3">
            <strong className="mr-3">선택한 게시글: {selectPost.title}</strong>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </FlexContainer>
        </Modal.Body>
      </Modal>
      <Modal
        show={modal !== ''}
        onClose={() => {
          setModal('');
        }}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <FlexContainer className="flex-col justify-center items-center">
            {modal === 'success' && (
              <>
                <SuccessToast message="지원되었습니다."></SuccessToast>
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
                <DangerToast message="입력을 다시 해주세요."></DangerToast>
              </>
            )}
          </FlexContainer>
        </Modal.Body>
      </Modal>
    </Paper>
  );
}
