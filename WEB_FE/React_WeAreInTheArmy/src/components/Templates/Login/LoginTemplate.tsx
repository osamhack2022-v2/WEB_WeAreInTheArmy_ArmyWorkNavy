import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DangerToast } from 'src/components/UI/Toast';
import { useUserDispatch } from 'src/context/UserContext';
import { User } from 'src/type';
import { client } from 'src/util/client';
import { setAuthroizationToken } from 'src/util/utils';
import Button from '../../UI/Button';
import FlexContainer from '../../UI/FlexContantainer';
import Input from '../../UI/Input';
import Paper from '../../UI/Paper';
import Text from '../../UI/Text';

export default function LoginTemplate() {
  const dispatch = useUserDispatch();
  const setUser = (user: User) => {
    dispatch({ type: 'SET_USER', user: user });
  };
  const navigate = useNavigate();
  const signin = () => {
    try {
      client
        .post('/api/auth/signin', {
          identifier,
          password,
        })
        .then((res) => {
          console.log(res.data.user);
          setUser(res.data.user);
          const token = res.data.accessToken;
          localStorage.setItem('jwtToken', token);
          setAuthroizationToken(token);
        })
        .then(() => navigate('/'))
        .catch(() => setOpen(true));
    } catch (e) {
      console.log('error!', e);
    }
  };
  const [identifier, setIdentifier] = useState<string>('');
  const handleChangeIdentifier = (newIdentifier: string) => {
    setIdentifier(newIdentifier);
  };
  const [password, setPassword] = useState<string>('');
  const handleChangePassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  const [open, setOpen] = useState<boolean>(false);

  return (
    <FlexContainer className="mt-[50px]">
      <Paper className="w-[900px] h-[500px] justify-evenly">
        <div className="w-full text-center mt-5">
          <Text size="text-3xl" className="font-bold">
            로그인
          </Text>
        </div>
        <span className="w-full p-0.5 bg-slate-200 my-5"></span>
        <FlexContainer className="flex-col">
          <FlexContainer className="items-center mb-5">
            <Text size="text-base" className="mr-5 font-bold">
              아이디
            </Text>
            <Input
              value={identifier}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangeIdentifier(event.target.value)
              }
              type="text"
              placeholder="identifier"
              className="w-[300px] h-[50px] "
            />
          </FlexContainer>
          <FlexContainer className="items-center mb-5">
            <Text size="text-base" className="mr-5 font-bold">
              아이디
            </Text>
            <Input
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChangePassword(event.target.value)
              }
              type="password"
              placeholder="Password"
              className="w-[300px] h-[50px]"
            />
          </FlexContainer>
        </FlexContainer>
        <FlexContainer className="flex-col justify-center ">
          <Button size="base" className="mb-3" onClick={signin}>
            로그인
          </Button>
          <Text size="text-sm" className="text-slate-400">
            아이디가 없으신가요?
            <span className="font-bold underline">
              <Link to="/signup">회원가입하기</Link>
            </span>
          </Text>
        </FlexContainer>
      </Paper>
      <Modal show={open} size="md" popup={open} onClose={() => setOpen(false)}>
        <Modal.Header />
        <Modal.Body>
          <FlexContainer className="flex-col w-full h-full items-center">
            <DangerToast message="로그인에 실패했습니다." />
          </FlexContainer>
        </Modal.Body>
      </Modal>
    </FlexContainer>
  );
}
