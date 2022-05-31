/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
//import Tabs from '../../components/Tabs';
import { UserInfoForm, container, memberInfoContainer, userInfoContent, editButtonWrapper} from './style';
import Avartar from '../../components/Avatar';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { List, Button, Modal, Input, Rate, Space, Tabs, Tag } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import { getProfileInfo } from '../../apis/user';
import Avatar from '../../components/Avatar';
import { Link } from 'react-router-dom';
import userImg from '../../assets/user.png';

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
        'id':4,
        'small_image':'', 
        'request_count':5,
        'title':'제목',
        'deadline': '2022-05-03', 
        'brief_description': 'brief_description', 
        'budget': 1000,
        'finish_date':5,
        'client_company_name':'soongsil',
        'request_designer':[{
            'designer_username':'디자이너Lee',
            'designer_average_stars':5,
            'designer_id' : 3
        },
        {
            'designer_username':'디자이너Lee',
            'designer_average_stars':5,
            'designer_id' : 3
        }]
        }],
        'reviews' : [{
        'id': 4,
        'score': 3,
        'small_image': '',
        'desinger_name':'디자이너 Lee',
        'brief_description':'description',
        'title': 'review - title'
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
            const result = await getProfileInfo();
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

        <UserInfoForm>
            {clientInfo?.user?.profile_image?
            <Avartar
            src={`http://localhost:8000${clientInfo.user.profile_image}`} />:
            <Avartar
            style={{width:'200px', height:'200px'}}
            src={userImg}
            shape="square" />
            }
            <div css={userInfoContent}>
            <h2>{clientInfo?.user?.username}님</h2>
            
            <div><MailOutlined style={{marginRight:'5px'}}/>{clientInfo?.user?.email}</div>
            <div><PhoneOutlined style={{marginRight:'5px'}}/>{clientInfo?.user?.phone}</div>
            <div><HomeOutlined style={{marginRight:'5px'}}/>{clientInfo?.user?.company_name}</div>
            <div style={{marginTop: '20px', width:'50%'}}>{clientInfo?.user?.description}
            </div>
            </div>
            <Button onClick={onClickEditButton} css={editButtonWrapper}>프로필 수정</Button>
            
        </UserInfoForm>
       
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
                    <div>작업기간  {item.finish_date}개월</div>,
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
            title={<Link to={`/portfolio/${item.id}`}>{item.title}</Link>}
            description={<div>작업기한  {item.deadline} 회사명 {item.client_company_name}</div>}
          />
          {item.brief_description}

          <div style={{fontWeight:'500', marginTop:"5px"}}>지원한 디자이너 목록</div>
            {item.request_designer.map((designer)=>
            <div key={designer.designer_id} 
            onClick={()=>navigate(`/portfolio/${parseInt(designer.designer_id, 10)}`)} 
            style={{margin:'0', padding:'0', cursor:"pointer"}}>
            <Tag color="blue">{designer.designer_username}</Tag>
            <Rate disabled defaultValue={designer.designer_average_stars} />
            </div>
            )}
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
                description={<><div>Desinger {item.desinger_name}</div><Rate disabled defaultValue={item.score} /></>}
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
            {clientInfo?.user?.profile_image?
            <Avartar
            src={`http://localhost:8000${clientInfo.user.profile_image}`} />:
            <Avartar
            src={userImg}
            shape="square" />
            }
            <div style={{margin:"20px 0"}}><Input placeholder="email"></Input></div>
            <div style={{margin:"20px 0"}}><Input placeholder="phone"></Input></div>
            <div style={{margin:"20px 0"}}><Input placeholder="회사 이름"></Input></div>
            <div style={{margin:"20px 0"}}><Input placeholder="자기 소개"></Input></div>
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