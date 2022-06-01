/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import { Container,Title, ContentContainer, RequestContainer, Content,LeftContent, 
    DescriptionContainer, UserInfo, BudgetWrapper,PanoramaWrapper } from './style';
import Avatar from 'components/Avatar';
import MainMenu from 'components/MainMenu';
import {Button, Badge} from 'antd';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { getRequest, patchApplyDesigner } from '../../apis/request';
import { useParams } from 'react-router-dom';

const dummy = {
    'id' : 2,
    'title': '제목',//
    'current_status': 0, //2는 진행중 3은 종료 //
    'finish_date':5,//
    'deadline': '2022-06-25',//
    'budget':1000,//
    'description':'description',//
    'commission_image':'', //
    'client_username':'client user name',//
    'client_company_name':'client company name',//
    'client_profile_image':'client profile image', //
};


const RequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(false);
    const [isClient, setIsClient] = useState({});

    useEffect(()=>{
        const isClient = localStorage.getItem('isClient');
        setIsClient(isClient);
    }, []);

    useEffect(()=> {
        
        const loadRequest = async () => {
            const data = await getRequest(id); //
            setRequest(data);
        };

        loadRequest();
       //setRequest(dummy);
    }, []);

    const onClickButton = (designerId, id) => {

        const patchDesigner = async () => {
            await patchApplyDesigner({designer_id: designerId, request_id: id});
        }
        // 
        patchDesigner();
        alert('정상적으로 지원되었습니다!');
    }

    return (
        <>
        <MainMenu />
        <Container>
        
        <Title>
        {
            (request?.current_status === 0 || request?.current_status === 1 ) && 
            <Badge
            status="success"
            text={'모집중'}
            />
        }
        {
            request?.current_status === 2 && 
            <Badge
            status="processing"
            text={'진행중'}
            />
        }
        {
            request?.current_status === 3 && 
            <Badge
            status="default"
            text={'프로젝트 완료'}
            />
        }
        <h1>{request?.title}</h1>
        </Title>
        <ContentContainer>
            
            <RequestContainer>
            <Content>
            <PanoramaWrapper>
                <a-scene class="aframebox" embedded>
                <a-sky src={`http://localhost:8000${request?.commission_image}`}
                rotation="0 -130 0" >
                </a-sky>
                </a-scene>
            </PanoramaWrapper>
            </Content>
            
            <Content>
                {
                    request?.description
                }
            </Content>
            </RequestContainer>

            <LeftContent>
            <UserInfo>
                
                <div style={{margin: "10px auto", fontSize: '15px', display:'flex', flexDirection: 'column',
                justifyContent:'center', alignItems:'center'}}>
                <Avatar src={`http://localhost:8000${request?.client_profile_image}`}></Avatar>
                <div>{request?.client_username}</div>
                <div>{request?.client_company_name}</div>
                </div>

                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{fontSize: '15px'}}>예산</div>
                    <BudgetWrapper>{request?.budget}원</BudgetWrapper>
                </div>
            </UserInfo>
            <DescriptionContainer>
                <Content>
                    <h3>프로젝트 작업 마감 일자</h3>
                    <div>{request?.deadline}</div>
                </Content>
                <Content>
                    <h3>작업 기한</h3>
                    <div>{request?.finish_date} 일</div>
                </Content>
                {isClient ==='false' && 
                <Button onclick={()=>onClickButton(localStorage.getItem('userId'))}>지원하기</Button>}
            </DescriptionContainer>
            
            </LeftContent>
        </ContentContainer>
        
        </Container>
        </>
    );
}

export default RequestDetail;