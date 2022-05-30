/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
//import Tabs from '../../components/Tabs';
import { container, memberInfoContainer, userInfoContent, editButtonWrapper} from './style';
import Avartar from '../../components/Avatar';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { List, Button, Modal, Input, Rate, Space, Tabs } from 'antd';
import {  HeartTwoTone, DownOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import { getClientInfo } from '../../apis/user';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom';

const clientDummy = {
        'user': {
        "profile_image": '',
        "username" : "tticjswo2",
        "email" : "tticjswo2@naver.com",
        "phone" : "01023872521",
        "company_name" : "Samsung",
        "description" : "Company Samsung is upcoming"
        },
        'commissions':
        [{
        'small_image':'', //
        'request_count':5,//
        'title':'제목',//
        'deadline': '2022-05-03', //
        'description': 'description', //
        'budget': 1000,//
        'finish_date':5,//
        'client_company_name':'soongsil',
        }],
        'reviews' : [{
        'id': 4,
        'score': 3,
        'small_image': '',//
        'desinger_name':'디자이너 이름',
        'brief_description':'description',//
        'title': 'review - title'//
        }]
        
};

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  
const ClientProfile = () => {
    const [ clientInfo, setClientInfo ] = useState({});
    const [modal, setModal] = useState(false);
    const { id } = useParams();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const [ activeTab, setActiveTab] = useState("request");
    const [user, setUser]  = useRecoilState(userState);
    const navigate = useNavigate();
    console.log(activeTab);
    

    useEffect(()=>{
        //console.log(clientDummy.user.username);
        //setClientInfo(clientDummy);
        
        const loadClientInfo = async () => {
            const result = await getClientInfo();
            setClientInfo(result);
            console.log(result);
        }
        loadClientInfo();
    
       
    },[]);

    const onClickTab = (key) => {
        setActiveTab(key);
    }
    const onClickEditButton = () => {
        setModal(true);
    };

    const onCancelEdit = () => {
        setModal(false);
    }

    return (
        <>
        <MainMenu />
        <div css={container}>

        
        <div css={memberInfoContainer}>
            <Avartar
            style={{width:"200px", height:'200px'}} 
            src={`http://localhost:8000${clientInfo?.user?.profile_image}`} />
            <div css={userInfoContent}>
            <h2>{clientInfo?.user?.username}님</h2>
            
            <h3>{clientInfo?.user?.email}</h3>
            <h3>{clientInfo?.user?.phone}</h3>
            <h3>{clientInfo?.user?.company_name}</h3>
            <h3>{clientInfo?.user?.description}</h3>
            </div>
            {
                user?.id === parseInt(id, 10)? <Button onClick={onClickEditButton} css={editButtonWrapper}>프로필 수정</Button>:
                null
            }
        </div>
        <Tabs defaultActiveKey="1" onChange={onClickTab}>
            <Tabs.TabPane tab="의뢰서" key="request">
            <List
      itemLayout="vertical"
      size="large"
      dataSource={clientInfo.commissions}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <div>{item.budget} 만원</div>,
            <div>작업기간  {item.finish_date}일</div>,
            <div>받은 제안 {item.request_count}개</div>,
          ]}
          extra={
            <img
                    width={272}
                    alt="logo"
                    src={`http://localhost:8000${item.small_image}`}
                />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.profile_image} />}
            title={<a href={item.href}>{item.title}</a>}
            description={<div>{item.deadline} 회사명: {item.client_company_name}</div>}
          />
          {item.description}
        </List.Item>
      )}
    />
            </Tabs.TabPane>
            <Tabs.TabPane tab="리뷰" key="review">
            <List
        itemLayout="vertical"
        size="large"
        dataSource={clientInfo.reviews}
        renderItem={item => (
            <List.Item
                key={item.title}
                extra={
                <img
                    width={272}
                    alt="logo"
                    src={`http://localhost:8000${item.small_image}`}
                />
                }
            >
                <List.Item.Meta
                title={<Link to={`/review/${item.id}`}>{item.title}</Link>}
                description={<><Rate disabled defaultValue={item.score} /><div>Desinger: {item.desinger_name}</div></>}
                />
                {item.brief_description}
            </List.Item>
            )}
      />
            </Tabs.TabPane>
        </Tabs>
        {/*<Tabs tab={query.get('tab')} onClick={onClickTab} common="request" tapItems={[{name:'의뢰서', tab:'request'},{name:'리뷰', tab:'review'}]}></Tabs>*/}        
        <div>
        
        </div>
        </div>

        <Modal visible={modal} onCancel={onCancelEdit}>
            <h2>프로필 수정</h2>
            <Avatar src={'https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDA3MTZfMjE3%2FMDAxNTk0ODcyNzY2NTE3.q33CvFJq2IiCh9BUVWfG4IWhEJX-giFX9Rp9_K3AJzkg.9N4e_fFoOp3vQ7c5dxqKyvFrabouzwtUKo41KqOAKbAg.JPEG%2FIELuoo7XtRxBS8TA97d-alMucVRc.jpg&type=sc960_832'}></Avatar>
            <div style={{margin:"20px 0"}}><Input placeholder="email"></Input></div>
            <div style={{margin:"20px 0"}}><Input placeholder="phone"></Input></div>
            <div style={{margin:"20px 0"}}><Input placeholder="skills"></Input></div>
            <div style={{margin:"20px 0"}}><Input placeholder="description"></Input></div>
        </Modal>
        </>
    );
};

export default ClientProfile;




/**
 * 
 * 
 * 
 * 
 * {activeTab === 'review'? 
        <List
        itemLayout="vertical"
        size="large"
        dataSource={clientInfo.reviews}
        renderItem={item => (
            <List.Item
                key={item.title}
                actions={[
                <div>{item.budget} 만원</div>,
                <div>작업기간  {item.finish_date}일</div>,
                <div>받은 제안 {item.request_count}개</div>,
                ]}
                extra={
                <img
                    width={272}
                    alt="logo"
                    src={`http://localhost:8000${item.small_image}`}
                />
                }
            >
                <List.Item.Meta
                title={<Link to={`/review/${item.id}`}>{item.title}</Link>}
                description={<><Rate disabled defaultValue={item.score} /><div>Desinger: {item.desinger_name}</div></>}
                />
                {item.brief_description}
            </List.Item>
            )}
      />
      :
      <List
      itemLayout="vertical"
      size="large"
      dataSource={clientInfo.commissions}
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <div>{item.budget} 만원</div>,
            <div>작업기간  {item.finish_date}일</div>,
            <div>받은 제안 {item.request_count}개</div>,
          ]}
          extra={
            <img
                    width={272}
                    alt="logo"
                    src={`http://localhost:8000${item.small_image}`}
                />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.profile_image} />}
            title={<a href={item.href}>{item.title}</a>}
            description={<div>{item.deadline} {item.client_company_name}</div>}
          />
          {item.description}
        </List.Item>
      )}
    />
        }
 */