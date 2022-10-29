import { Link } from 'react-router-dom';
import Button from 'src/components/UI/Button';
import { client } from 'src/util/client';
import { URL } from '../../../../data/url';
import FlexContainer from '../../../UI/FlexContantainer';
import Menu from '../atom/Menu';

export default function HeaderMenu() {
  const menus = URL.slice(1);
  return (
    <ul className="flex whitespace-nowrap justify-between w-[700px] items-center">
      <FlexContainer>
        {menus.map(({ name, to, src = '' }) => (
          <Menu key={to} name={name} to={to} src={src} className="mr-6" />
        ))}
      </FlexContainer>
      {localStorage.getItem('jwtToken') === null ? (
        <li>
          <Link to="/login" className="flex">
            <img
              src={'/assets/imgs/Header/people.png'}
              className="w-[25px] h-[25px]"
            />
            <strong>로그인</strong>
          </Link>
        </li>
      ) : (
        <Button
          onClick={() => {
            localStorage.removeItem('jwtToken');
            client.defaults.headers.common['Authorization'] = '';
            window.location.reload();
          }}
        >
          로그아웃
        </Button>
      )}
    </ul>
  );
}
