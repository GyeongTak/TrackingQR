<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import MainMenu from '../../components/MainMenu';
import Footer from '../../components/Footer';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import { getRequests, getRequestsMain} from '../../apis/request';
import Profile from 'components/Profile';
import axios from "axios";

const ViewPortfolioPage = () => {
    
    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', marginTop:'30px', marginLeft:'180px', width: '100%', height: '100%'}}>
            <Profile></Profile>
        </div>
        <Footer />
        </>
    );
}

=======
import React, { useEffect, useState } from 'react';
import MainMenu from '../../components/MainMenu';
import Footer from '../../components/Footer';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import { getRequests, getRequestsMain} from '../../apis/request';
import Profile from 'components/Profile';
import axios from "axios";

const ViewPortfolioPage = () => {
    
    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', marginTop:'30px', marginLeft:'180px', width: '100%', height: '100%'}}>
            <Profile></Profile>
        </div>
        <Footer />
        </>
    );
}

>>>>>>> db8e4d72449ec6feff57239a5f323fab8c9b2e7e
export default ViewPortfolioPage;