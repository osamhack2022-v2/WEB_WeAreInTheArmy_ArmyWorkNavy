import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'src/components/UI/Button';
import Divider from 'src/components/UI/Divider';
import FlexContainer from 'src/components/UI/FlexContantainer';
import Paper from 'src/components/UI/Paper';
import SemiHeader from 'src/components/UI/SemiHeader';
import { AcceptanceStatus, Board, Post, RequestTypes } from 'src/type';
import { client } from 'src/util/client';
import DefaultInfo from './molecule/DefaultInfo';
import DetailInfo from './molecule/DetailInfo';

export default function PostTemplate() {
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
  });
  const locations = useLocation();
  useEffect(() => {
    client
      .get('/api/board/getBoardByIndex/' + locations.pathname.match(/\d+/)?.[0])
      .then((res) => setPost(res.data));
  }, []);
  console.log(post);
  console.log(post);
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
        <FlexContainer className="w-full p-4 justify-between">
          <Button className="bg-error">거절</Button>
          <Button className="bg-introduce">보류</Button>
          <Button>수락</Button>
        </FlexContainer>
      </FlexContainer>
    </Paper>
  );
}
