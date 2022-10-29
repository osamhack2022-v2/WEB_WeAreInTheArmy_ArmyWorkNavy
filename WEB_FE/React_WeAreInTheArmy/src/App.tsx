import { Route, Routes, useLocation } from 'react-router-dom';
import ApplyTemplate from './components/Templates/Apply/ApplyTemplate';
import HeaderTemplate from './components/Templates/Header/HeaderTemplate';
import LoginTemplate from './components/Templates/Login/LoginTemplate';
import MainTemplate from './components/Templates/Main/MainTemplate';
import SignupTemplate from './components/Templates/Signup/SignupTemplate';
import StatusTemplate from './components/Templates/Status/StatusTemplate';
import FlexContainer from './components/UI/FlexContantainer';
import TemplateWrapper from './components/UI/TemplateWrapper';
import ApplyContextProvider from './context/ApplyContext';
import TestTemplate from './components/Templates/Test/TestTemplate';
import { Url } from './data/url';
import PostTemplate from './components/Templates/Post/PostTemplate';
import ParticipateTemplate from './components/Templates/Participate/ParticipateTemplate';
import { useEffect } from 'react';
import { client } from './util/client';
import { PostProvider, usePostDispatch } from './context/PostContext';
import { Post } from './type';
import ManagementTemplate from './components/Templates/Management/ManagementTemplate';
import ManagementAcceptTemplate from './components/Templates/Management/ManagementAcceptTemplate';
import { useUserState } from './context/UserContext';

function App() {
  const state = useUserState();
  console.log(state.user);
  const location = useLocation();
  console.log(location.pathname.split('/')[1]);
  const title = Url.find((v) => {
    return v.to === '/' + location.pathname.split('/')[1];
  });
  const dispatch = usePostDispatch();
  const setPost = (posts: Post[]) => {
    dispatch({ type: 'SET_POSTS', posts: posts });
  };
  useEffect(() => {
    client.get('/api/board/getAllBoards').then((res) => setPost(res.data));
  }, []);

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
              {
                <Route
                  path="/status/:id"
                  element={<ManagementAcceptTemplate />}
                />
              }
              <Route path="/signup" element={<SignupTemplate />} />
              <Route path="/participate" element={<ParticipateTemplate />} />
              <Route
                path="/apply"
                element={
                  <ApplyContextProvider>
                    <ApplyTemplate />
                  </ApplyContextProvider>
                }
              />
              <Route path="/test" element={<TestTemplate />} />
              <Route path="/management" element={<ManagementTemplate />} />
            </Routes>
          </TemplateWrapper>
        </FlexContainer>
      </FlexContainer>
    </div>
  );
}

export default App;
