import { useNavigate } from 'react-router-dom';
import FlexContainer from '../../UI/FlexContantainer';
import Text from '../../UI/Text';
import HeaderLogo from './atom/HeaderLogo';
import HeaderMenu from './molecule/HeaderMenu';

export default function HeaderTemplate() {
  const navigate = useNavigate();
  const onClickNavi = () => {
    navigate('/');
  };
  return (
    <div className="border-b-2 box-border">
      <header className="w-screen h-[120px]">
        <FlexContainer className="h-1/4 justify-center items-center bg-secondary text-white">
          <Text size="text-base" className="font-bold">
            힘들 땐 함께,
            <span role="img" aria-label="writing hand">
              🤝
            </span>{' '}
            함께 잘사는 국민의 나라
          </Text>
        </FlexContainer>
        <FlexContainer className="justify-center h-3/4 bg-main drop-shadow-lg">
          <FlexContainer className="items-center w-full justify-evenly ">
            <div onClick={onClickNavi} className="cursor-pointer">
              <HeaderLogo />
            </div>
            <HeaderMenu />
            <div></div>
          </FlexContainer>
        </FlexContainer>
      </header>
    </div>
  );
}
