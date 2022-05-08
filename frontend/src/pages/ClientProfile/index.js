/** @jsxImportSource @emotion/react */
import React from 'react';
import MainMenu from '../../components/MainMenu';
import { container, profileLeftSection, memberInfoContainer, userInfoContent, contentContainer, contentMain} from './style';
import Avartar from '../../components/Avatar';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { Tag } from 'antd';
import 'antd/dist/antd.min.css';
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import ClientMenu from '../../components/ClientMenu';

const me = {
    userId: 1,
    username:'user1',
    userEmail: 'user1@email.com',
    skills: ['제품', '건축인테리어', 'CI/BI'],
    phone: '01000000000',
    description : '안녕하세요 user1입니다.'
};

const ClientProfile = () => {
    return (
        <>
        <MainMenu />
        <div css={container}>
            <div css={profileLeftSection}>
                <div css={memberInfoContainer}>
                    <Avartar src='https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDA3MTZfMjE3%2FMDAxNTk0ODcyNzY2NTE3.q33CvFJq2IiCh9BUVWfG4IWhEJX-giFX9Rp9_K3AJzkg.9N4e_fFoOp3vQ7c5dxqKyvFrabouzwtUKo41KqOAKbAg.JPEG%2FIELuoo7XtRxBS8TA97d-alMucVRc.jpg&type=sc960_832' />
                    <div css={userInfoContent}>
                    <h3>{me.username}님</h3>
                    <h3>{me.email}</h3>
                    {me.skills.map((s, i)=> <Tag key={i} color="geekblue">{s}</Tag>)}
                    </div>
                </div>
                <ClientMenu />
            </div>
            <div css={contentContainer}>
            <h2>내 프로젝트</h2>
            <div css={contentMain}></div>
            </div>
        </div>
        </>
    );
};

export default ClientProfile;