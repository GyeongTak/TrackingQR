import DesignerPage from './pages/DesignerList';
import CreatePortfolioPage from './pages/CreatePortfolio';
import HomePage from './pages/Home';
import JoinPage from './pages/Join';
import LoginPage from './pages/Login';
import Profile from './pages/Profile';
import { RecoilRoot } from 'recoil';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path = "/sda/" element={<DesignerPage/>} />
          <Route path = "/sda/port-new" element={<CreatePortfolioPage/>} />
          <Route path = "/" element={<HomePage/>} />
          <Route path = "/profile" element={<Profile/>} />
          <Route path = "/login" element={<LoginPage/>} />
          <Route path = "/Join" element={<JoinPage/>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;

