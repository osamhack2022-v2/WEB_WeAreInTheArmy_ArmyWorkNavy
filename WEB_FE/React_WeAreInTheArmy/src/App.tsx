import { Route, Routes, useLocation } from 'react-router-dom';
import AdminTemplate from './components/Templates/Admin/AdminTemplate';
import ApplyTemplate from './components/Templates/Apply/ApplyTemplate';
import HeaderTemplate from './components/Templates/Header/HeaderTemplate';
import IntroduceTemplate from './components/Templates/Introduce/IntroduceTemplate';
import LoginTemplate from './components/Templates/Login/LoginTemplate';
import MainTemplate from './components/Templates/Main/MainTemplate';
import SignupTemplate from './components/Templates/Signup/SignupTemplate';
import StatusTemplate from './components/Templates/Status/StatusTemplate';
import FlexContainer from './components/UI/FlexContantainer';
import TemplateWrapper from './components/UI/TemplateWrapper';
import ApplyContextProvider from './context/ApplyContext';
import { Url } from './data/url';

function App() {
  const location = useLocation();
  const title = Url.find((v) => v.to === location.pathname);
  console.log(title);
  return (
    <div className="App h-full font-Noto Sans KR">
      <HeaderTemplate />
      <FlexContainer className="items-center flex-col bg-main h-full">
        <FlexContainer className="min-w-[800px] w-full flex-col items-center">
          {title?.name !== '메인' && (
            <div className="w-[800px] text-slate-400 mt-[30px]">
              여긴 군대지 &gt;{' '}
              <span className="text-orrange font-semi">{title?.name}</span>
            </div>
          )}

          <Routes>
            <Route path="/" element={<MainTemplate />} />
          </Routes>
          <TemplateWrapper>
            <Routes>
              <Route path="/login" element={<LoginTemplate />} />
              <Route path="/status" element={<StatusTemplate />} />
              <Route path="/signup" element={<SignupTemplate />} />
              <Route path="/introduce" element={<IntroduceTemplate />} />
              <Route
                path="/apply"
                element={
                  <ApplyContextProvider>
                    <ApplyTemplate />
                  </ApplyContextProvider>
                }
              />
              <Route path="/admin" element={<AdminTemplate />} />
            </Routes>
          </TemplateWrapper>
        </FlexContainer>
      </FlexContainer>
    </div>
  );
}

export default App;
