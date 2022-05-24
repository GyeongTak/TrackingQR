/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container,Title, ContentContainer, RequestContainer, Content,LeftContent, 
    DescriptionContainer, UserInfo, BudgetWrapper,PanoramaWrapper } from './style';
import Avatar from 'components/Avatar';
import MainMenu from 'components/MainMenu';
import {Button, Badge} from 'antd';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';

const dummy = {
    title: '제목',
    description: '설명입니다.',
    budget: '100,000,000',
    finish_date:'2022-06-01',
    request_count: 5,
    status: '진행중',
};
const RequestDetail = () => {

    return (
        <>
        <MainMenu />
        <Container>
        
        <Title>
        <Badge
        status="processing"
        text={'진행중'}
        />
        <h1>카페 디자인 의뢰</h1>
        </Title>
        <ContentContainer>
            
            <RequestContainer>
            <Content>
            <PanoramaWrapper>
                <a-scene class="aframebox" embedded>
                <a-sky src="https://raw.githubusercontent.com/aframevr/aframe/v1.0.4/examples/boilerplate/panorama/puydesancy.jpg" 
                rotation="0 -130 0" >
                </a-sky>
                </a-scene>
            </PanoramaWrapper>
            </Content>
            
            <Content>
            <h1>구체적인 내용 설명</h1>
            <div>
            1.프로젝트개요
            <br />
            교육관련 업체 신규사업 반응형 홈페이지 디자인(PC/모바일)
            <br />
            2. 상세업무내용
            <br />
            홈페이지 전체 디자인
            <br />
            프론트엔드 개발자 와 협업
            <br />
            로그인 관리
            <br />
            관리자 페이지
            <br />
            구글 애널리틱스 연동
            <br />

            교육계획안(연간, 월간, 주간, 일일 계획안)
            <br />
            수업도우미(프로그램 관련 지침서 및 영상, 음원)
            <br />
            원 운영 자료(관찰일지, 가정통신문, 부모교육, 교사교육, 현장 자료,환경 자료)
            <br />
            교사방(고민상담)

            3.참고사이트

            키드키즈/꼬망세/찬진교육

            4.유의사항
            웹디자인 경력 3년 이상
            프론트 엔드 개발자 겹업자 환영
            </div>
            </Content>
            </RequestContainer>

            <LeftContent>
            <UserInfo>
                
                <div style={{margin: "10px auto", fontSize: '15px', display:'flex', flexDirection: 'column',
                justifyContent:'center', alignItems:'center'}}>
                <Avatar src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYZJLT6Q6V673cftVOQor7Sq4pwIaErX8Gmg&usqp=CAU'}></Avatar>
                <div>user nickname</div>
                </div>

                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{fontSize: '15px'}}>예산</div>
                    <BudgetWrapper>{dummy.budget}원</BudgetWrapper>
                </div>
            </UserInfo>
            <DescriptionContainer>
                <Content>
                    <h3>프로젝트 작업 마감 일자</h3>
                    <div>{dummy.finish_date} ~ {dummy.finish_date}</div>
                </Content>
                <Content>
                    <h3>작업 기한</h3>
                    <div>30일</div>
                </Content>
            </DescriptionContainer>
            
            </LeftContent>
        </ContentContainer>
        
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