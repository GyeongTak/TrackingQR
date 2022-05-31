import DesignerPage from './pages/DesignerList';
import CreatePortfolioPage from './pages/CreatePortfolio';
import HomePage from './pages/Home';
import JoinPage from './pages/Join';
import LoginPage from './pages/Login';
import DesignerProfile from './pages/DesignerProfile';
import ClientProfile from './pages/ClientProfile';
import { RecoilRoot } from 'recoil';
import NotFoundPage from './pages/NotFound';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import JoinClientPage from 'pages/Join_Client';
import JoinDesignerPage from 'pages/Join_Designer';
import ClientReviewPage from 'pages/ClientReview';
import RequestList from 'pages/RequestList';
import CreateRequest from 'pages/CreateRequest';
import PortfolioDetail from 'pages/PortfolioDetail';
import RequestDetail from 'pages/RequestDetail';
import GlobalStyle from '../src/styles/global';
import CreateProjectPage from 'pages/CreateProject'
import CreateProjectPage2 from 'pages/CreateProject2'
import WriteReviewPage from 'pages/WriteReview'

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
      <GlobalStyle />
        <Routes>
          <Route path = "/" element={<HomePage/>} />
          <Route path = "/sda" element={<DesignerPage/>} />
          <Route path = "/portfolio/new" element={<CreatePortfolioPage/>} />
          <Route path = "/request/new" element={<CreateRequest/>} />
          <Route path = "/portfolio/:id" element={<PortfolioDetail/>} />
          <Route path = "/request/:id" element={<RequestDetail/>} />
          <Route path="/designer/:id" element={<DesignerProfile />} />
          <Route path="/client/:id" element={<ClientProfile />} />
          <Route path = "/login" element={<LoginPage/>} />
          <Route path = "/Join" element={<JoinPage/>} />
          <Route path = "/Join/Client" element={<JoinClientPage/>} />
          <Route path = "/Join/Designer" element={<JoinDesignerPage/>} />
          <Route path = "/review" element={<ClientReviewPage/>} />
          <Route path = "/request" element={<RequestList />} />
          <Route path = "/WriteReview" element={<WriteReviewPage />} />
          <Route path = "/CreateProject" element={<CreateProjectPage />} />
          <Route path = "/CreateProject2" element={<CreateProjectPage2 />} />
          <Route path = "*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

