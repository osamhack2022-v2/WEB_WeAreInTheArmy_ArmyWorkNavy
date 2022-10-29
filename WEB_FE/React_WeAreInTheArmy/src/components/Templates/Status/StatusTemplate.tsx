import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Divider from 'src/components/UI/Divider';
import FlexContainer from 'src/components/UI/FlexContantainer';
import Paper from 'src/components/UI/Paper';
import SemiHeader from 'src/components/UI/SemiHeader';
import { usePostState } from 'src/context/PostContext';
import { Accept, Post } from 'src/type';
import { client } from 'src/util/client';
import StatusBody from './molecule/StatusBody';
import StatusHead from './molecule/StatusHead';

export default function StatusTemplate() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    client.get('/api/board/getAllBoards').then((res) => {
      setPosts(res.data);
    });
  }, []);
  return (
    <Paper className="w-[900px]">
      <SemiHeader
        title="대민지원 신청 현황"
        subTitle="도움을 필요로 하는 곳들의 현황을 모았습니다."
      />
      <Divider />
      <FlexContainer className="flex-col w-full p-4">
        <div className="mb-3">{posts.length}개의 게시물이 있습니다.</div>
        <Table>
          <StatusHead />
          <StatusBody posts={posts} />
        </Table>
      </FlexContainer>
    </Paper>
  );
}
