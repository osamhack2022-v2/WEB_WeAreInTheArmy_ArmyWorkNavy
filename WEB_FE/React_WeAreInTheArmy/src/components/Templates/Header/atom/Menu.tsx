import { useNavigate } from 'react-router-dom';
import FlexContainer from 'src/components/UI/FlexContantainer';
import { useUserState } from 'src/context/UserContext';
import { AccountTypes } from 'src/type';

interface Menu extends React.LiHTMLAttributes<HTMLLIElement> {
  name: string;
  src: string;
  to: string;
}

export default function Menu({ name, src, to, ...props }: Menu) {
  const jwtToken = localStorage.getItem('jwtToken');
  const navigate = useNavigate();
  const state = useUserState();

  return (
    <li {...props}>
      <FlexContainer
        className="cursor-pointer"
        onClick={() => {
          // 로그인이 되었고, 관리자라면 로그인이 되었고 관리자가 아니라면
          if (jwtToken === null) {
            alert('로그인 후 이용해주세요.');
          } else {
            if (to === '/management') {
              if (state.user.type !== AccountTypes.ADMINISTRATOR) {
                alert('관리자만 이용할 수 있습니다.');
              } else {
                navigate(to);
              }
            } else if (to === '/participate') {
              if (state.user.type !== AccountTypes.MILLITARY) {
                alert('장병만 이용할 수 있습니다.');
              } else {
                navigate(to);
              }
            } else {
              navigate(to);
            }
          }
        }}
      >
        <img src={src} className="w-[25px] h-[25px]" />
        <strong>{name}</strong>
      </FlexContainer>
    </li>
  );
}
