import { Table } from 'flowbite-react';
import { TableBody } from 'flowbite-react/lib/esm/components/Table/TableBody';
import { TableHead } from 'flowbite-react/lib/esm/components/Table/TableHead';
import { TableHeadCell } from 'flowbite-react/lib/esm/components/Table/TableHeadCell';
import { useEffect, useState } from 'react';
import Divider from 'src/components/UI/Divider';
import FlexContainer from 'src/components/UI/FlexContantainer';
import Paper from 'src/components/UI/Paper';
import SemiHeader from 'src/components/UI/SemiHeader';
import { Post } from 'src/type';
import { client } from 'src/util/client';
import ManagementTableRows from '../Management/ManagementTableRows';
import StatusBody from '../Status/molecule/StatusBody';
import StatusHead from '../Status/molecule/StatusHead';

export function MyBoardTemplate() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    client.get('/api/board/getBoardsByAuth').then((res) => setPosts(res.data));
  }, []);
  return (
    <Paper className="w-[900px]">
      <SemiHeader
        title="내 대민신청 신청 현황"
        subTitle="내가 신청한 대민지원을 확인할 수 있습니다."
      />
      <Divider />
      <FlexContainer className="flex-col w-full p-4">
        <FlexContainer className="flex-col w-full p-5">
          <div className="mb-3">{posts.length}개의 게시물이 있습니다.</div>
          <Table>
            <TableHead className="font-bold bg-gray-200">
              <TableHeadCell className="w-[15%]">번호</TableHeadCell>
              <TableHeadCell className="w-[15%]">상태</TableHeadCell>
              <TableHeadCell className="w-[30%]">장소</TableHeadCell>
              <TableHeadCell>제목</TableHeadCell>
            </TableHead>
            <TableBody className="bg-white">
              {posts.map((post) => (
                <ManagementTableRows
                  key={post.idx}
                  idx={post.idx}
                  status={post.status}
                  location={post.location}
                  title={post.title}
                />
              ))}
            </TableBody>
          </Table>
        </FlexContainer>
      </FlexContainer>
    </Paper>
  );
}
