import DesignerPage from './pages/DesignerList';
import CreatePortfolioPage from './pages/CreatePortfolio';
import HomePage from './pages/Home';
import JoinPage from './pages/Join';
import LoginPage from './pages/Login';
import DesignerProfile from './pages/DesignerProfile';
import { RecoilRoot } from 'recoil';
import NotFoundPage from './pages/NotFound';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import JoinClientPage from 'pages/Join_Client';
import JoinDesignerPage from 'pages/Join_Designer';
import ClientReviewPage from 'pages/ClientReview';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path = "/sda/" element={<DesignerPage/>} />
          <Route path = "/sda/port-new" element={<CreatePortfolioPage/>} />
          <Route path = "/" element={<HomePage/>} />
          <Route path="/designer/:id" element={<DesignerProfile />} />
          <Route path = "/login" element={<LoginPage/>} />
          <Route path = "/Join" element={<JoinPage/>} />
          <Route path = "/Join/Client" element={<JoinClientPage/>} />
          <Route path = "/Join/Designer" element={<JoinDesignerPage/>} />
          <Route path = "/review" element={<ClientReviewPage/>} />
          <Route path = "*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

