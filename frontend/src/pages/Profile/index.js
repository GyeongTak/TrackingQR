/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import { container, memberInfoContainer, userInfoContent, ActiveLink,  LinkContainer} from './style';
import Avartar from '../../components/Avatar';
import queryString from 'query-string';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';


const Profile = () => {
    const [ activeTab, setActiveTab ] = useState(window.location.search? 
        queryString.parse(window.location.search)["tab"] : 'portfolio');
    const [user, setUser]  = useRecoilState(userState);

    console.log(activeTab);
    console.log(user);

    const onClickTab = (tab) => {
        setActiveTab(tab);
    };


    return (
        <>
        <MainMenu />
        <div css={container}>

        <div css={memberInfoContainer}>
            <Avartar src='https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDA3MTZfMjE3%2FMDAxNTk0ODcyNzY2NTE3.q33CvFJq2IiCh9BUVWfG4IWhEJX-giFX9Rp9_K3AJzkg.9N4e_fFoOp3vQ7c5dxqKyvFrabouzwtUKo41KqOAKbAg.JPEG%2FIELuoo7XtRxBS8TA97d-alMucVRc.jpg&type=sc960_832' />
            <div css={userInfoContent}>
            <h2>nickname님</h2>
            <h3>email@email.com</h3>
            <h3>자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.자기소개입니다.</h3>
            </div>
        </div>

        <div css={LinkContainer}>
        <ActiveLink to="?tab=portfolio" isactive={activeTab === "portfolio"} onClick={()=>onClickTab('portfolio')}>포트폴리오</ActiveLink>
        <ActiveLink to="?tab=review" isactive={activeTab === "review" } onClick={()=>onClickTab('review')}>리뷰</ActiveLink>
        </div>
        </div>
        </>
    );
};

export default Profile;