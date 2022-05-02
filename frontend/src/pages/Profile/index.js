/** @jsxImportSource @emotion/react */
import React from 'react';
import MainMenu from '../../components/MainMenu';
import { jsx, css } from '@emotion/react';
import { container, memberInfoContainer, userInfoContent, ActiveLink} from './style';
import Avartar from '../../components/Avatar';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

const me = {
    username : 'user1',
    email : 'user1@email.com',

}

const Profile = () => {
    //const query = queryString.parse(window.location.search);
    console.log(queryString.parse(window.location.search));
    return (
        <>
        <MainMenu />
        <div css={container}>

        <div css={memberInfoContainer}>
            <Avartar src='https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDA3MTZfMjE3%2FMDAxNTk0ODcyNzY2NTE3.q33CvFJq2IiCh9BUVWfG4IWhEJX-giFX9Rp9_K3AJzkg.9N4e_fFoOp3vQ7c5dxqKyvFrabouzwtUKo41KqOAKbAg.JPEG%2FIELuoo7XtRxBS8TA97d-alMucVRc.jpg&type=sc960_832' />
            <div css={userInfoContent}>
            <h2>{me.username}님</h2>
            <p>{me.email}</p>
            </div>
        </div>

        <NavLink to="?portfolio" style={({ isActive}) => isActive? ActiveLink: undefined}>포트폴리오</NavLink>
        <NavLink to="?review" style={ActiveLink}>리뷰</NavLink>
        </div>
        </>
    );
};

export default Profile;