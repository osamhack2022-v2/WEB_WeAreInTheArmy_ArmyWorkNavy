import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { client } from 'src/util/client';
import Button from '../../UI/Button';
import FlexContainer from '../../UI/FlexContantainer';
import Input from '../../UI/Input';
import Paper from '../../UI/Paper';
import Text from '../../UI/Text';
import Select from '../../UI/Select';
import Option from 'src/components/UI/Option';
import { Modal } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { AccountTypes, RequestTypes } from 'src/type';
import ModalPortal from 'src/components/UI/PortalModal';
import { DangerToast } from 'src/components/UI/Toast';

// {
//   "identifierentifier": "string",
//   "password": "string",
//   "type": "string",
//   "name": "string",
//   "phone": "string",
//   "organization": "string",
//   "email": "string",
//   "address": "string"
// }
export default function SignupTemplate() {
  const [open, setOpen] = useState<boolean>(false);
  const handleModalOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false);
  const handleSubmitSignup = () => {
    client
      .post('/api/auth/signup', {
        identifier,
        password,
        type,
        name,
        phone,
        organization,
        email,
        address,
      })
      .then((res) => {
        handleModalOpen();
      })
      .catch((e) => {
        setError(true);
      });
  };
  const [identifier, setIdentifier] = useState<string>('');
  const handleChangeidentifier = (newidentifier: string) => {
    setIdentifier(newidentifier);
  };

  const [password, setPassword] = useState<string>('');
  const handleChangePassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  const [type, setType] = useState<AccountTypes>(AccountTypes.ADMINISTRATOR);
  const handleChangeType = (newtype: AccountTypes) => {
    setType(newtype);
  };

  const [name, setName] = useState<string>('');
  const handleChangeName = (newName: string) => {
    setName(newName);
  };

  const [phone, setPhone] = useState<string>('');
  const handleChangePhone = (newPhone: string) => {
    setPhone(newPhone);
  };

  const [organization, setOrganization] = useState<string>('');
  const handleChangeOrganization = (newOrganization: string) => {
    setOrganization(newOrganization);
  };

  const [email, setEmail] = useState<string>('');
  const handleChangeEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const [address, setAddress] = useState<string>('');
  const handleChangeAddress = (newAddress: string) => {
    setAddress(newAddress);
  };
  const [error, setError] = useState<boolean>(false);
  const naviate = useNavigate();

  const [timer, setTimer] = useState<number>(3);
  useEffect(() => {
    if (open) {
      const time = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        naviate('/login');
      }, 3000);
      if (timer < 0) naviate('/login');
      return () => {
        clearInterval(time);
      };
    }
  }, [open]);

  return (
    <FlexContainer className="mt-[50px]">
      <Paper className="w-[900px] h-[700px] justify-evenly">
        <div className="w-full text-center mt-5">
          <Text size="text-3xl" className="font-bold">
            회원가입
          </Text>
        </div>
        <span className="w-full p-0.5 bg-slate-200 my-5"></span>

        <FlexContainer className="flex-col h-[600px] ">
          <FlexContainer className="h-full">
            <FlexContainer className="flex-col h-full justify-evenly mr-10">
              <Text
                size="text-base"
                className="mr-5 font-bold h-[50px] leading-12"
              >
                아이디
              </Text>
              <Text
                size="text-base"
                className="mr-5 font-bold h-[50px] leading-12"
              >
                비밀번호
              </Text>
              <Text
                size="text-base"
                className="mr-5 font-bold h-[50px] leading-12"
              >
                신분
              </Text>
              <Text
                size="text-base"
                className="mr-5 font-bold h-[50px] leading-12"
              >
                이름
              </Text>
              <Text
                size="text-base"
                className="mr-5 font-bold h-[50px] leading-12"
              >
                전화번호
              </Text>
              <Text
                size="text-base"
                className="mr-5 font-bold h-[50px] leading-12"
              >
                조직
              </Text>
              <Text
                size="text-base"
                className="mr-5 font-bold h-[50px] leading-12"
              >
                이메일
              </Text>
              <Text
                size="text-base"
                className="mr-5 font-bold h-[50px] leading-12"
              >
                주소
              </Text>
            </FlexContainer>
            <FlexContainer className="flex-col h-full justify-evenly">
              <Input
                value={identifier}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeidentifier(event.target.value)
                }
                type="text"
                placeholder="아이디"
                className="w-[400px] h-[50px] "
              />
              <Input
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangePassword(event.target.value)
                }
                type="password"
                placeholder="Password (영문, 숫자, 특수문자 포함 8자 이상)"
                className="w-[400px] h-[50px] "
              />
              <Select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChangeType(e.target.value as AccountTypes)
                }
              >
                <Option value={AccountTypes.ADMINISTRATOR}>관리자</Option>
                <Option value={AccountTypes.CITIZEN}>시민</Option>
                <Option value={AccountTypes.MILLITARY}>현역 장병</Option>
                <Option value={AccountTypes.DEFAULT}>기타</Option>
              </Select>
              <Input
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeName(event.target.value)
                }
                type="text"
                placeholder="성함을 입력해주세요"
                className="w-[400px] h-[50px] "
              />
              <Input
                value={phone}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangePhone(event.target.value)
                }
                type="tel"
                placeholder="전화번호"
                className="w-[400px] h-[50px] "
              />
              <Input
                value={organization}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeOrganization(event.target.value)
                }
                type="text"
                placeholder="조직 이름을 작성해주세요."
                className="w-[400px] h-[50px] "
              />
              <Input
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeEmail(event.target.value)
                }
                type="email"
                placeholder="gundaemin@mnd.com"
                className="w-[400px] h-[50px] "
              />
              <Input
                value={address}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleChangeAddress(event.target.value)
                }
                type="text"
                placeholder="주소를 입력해주세요."
                className="w-[400px] h-[50px] "
              />
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
        <FlexContainer className="flex-col justify-center ">
          <Button
            size="base"
            className="mb-3"
            onClick={() => {
              handleSubmitSignup();
            }}
          >
            회원가입
          </Button>
        </FlexContainer>
      </Paper>
      <Modal show={open} size="md" popup={open} onClose={handleModalClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="text-center">회원가입이 신청되었습니다. </div>
          <div className="text-center">
            {timer}초 뒤 로그인화면으로 돌아갑니다.{' '}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={error}
        size="md"
        popup={error}
        onClose={() => setError(false)}
      >
        <Modal.Body>
          <Modal.Header></Modal.Header>
          <DangerToast message="회원가입에 실패하였습니다. " />
          <div>값을 다시 입력해주세요.</div>
        </Modal.Body>
      </Modal>
    </FlexContainer>
  );
}
