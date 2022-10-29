import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from 'src/util/client';
import '/assets/imgs/MainPage/Main.png';
import Button from '../../UI/Button';
import FlexContainer from '../../UI/FlexContantainer';
import Text from '../../UI/Text';
import HelpMap from './atom/HelpMap';
import Actions from './molecule/Actions';

export default function MainTemplate() {
  const [count, setCount] = useState<number>(0);
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    client.get('/api/board/getAllBoards').then((res) => {
      setPosts(res.data);
      setCount(res.data.length);
    });
  }, []);
  return (
    <div className="w-full h-full">
      <FlexContainer className="flex-col">
        <FlexContainer>
          <div>
            <img src="/assets/imgs/MainPage/Main.png" />
          </div>
        </FlexContainer>
        <Actions />
        <FlexContainer className="w-full flex-col items-center mb-10">
          {posts.length > 0 ? (
            <>
              <Text
                size="text-4xl"
                className="text-secondary mt-10 mb-2 font-medium"
              >
                현재 {count}곳에서 도움을 요청중입니다.
              </Text>
              <Text size="text-base" className="mb-3">
                최대한 빨리 조치할 수 있도록 노력하겠습니다.
              </Text>
              <HelpMap posts={posts} />
            </>
          ) : (
            <Text size="text-4xl" className="p-5 font-bold">
              로그인 후 확인하실 수 있습니다.
            </Text>
          )}
          <Button
            size="lg"
            onClick={() => {
              if (localStorage.getItem('jwtToken') === null) {
                alert('로그인 후 이용하실 수 있습니다.');
              } else {
                navigate('/apply');
              }
            }}
          >
            신청하기
          </Button>
        </FlexContainer>
      </FlexContainer>
    </div>
  );
}
