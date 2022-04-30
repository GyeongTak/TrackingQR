import DesignerPage from './pages/DesignerPage';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import LoginPage from './pages/Login';
import Profile from './pages/Profile';

import {BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
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
  );
}

export default App;

