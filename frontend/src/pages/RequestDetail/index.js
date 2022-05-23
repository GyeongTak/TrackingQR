/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container } from './style';
import Avatar from 'components/Avatar';
import MainMenu from 'components/MainMenu';
import {Button} from 'antd';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';

const RequestDetail = () => {

    return (
        <>
        <MainMenu />
        <Container>
        <h1>카페 디자인 의뢰</h1>
        </Container>
        </>
    );
}

/*****
 * 
 * 프로필 이름
 * 분야
 * 제목
 * 프로젝트 설명
 * 참여기간
 * 클라이언트
 * 적용기술 및 작업 범위
 * 
 * 옆에 사진
 * 
 * 
 * 
 */

export default RequestDetail;