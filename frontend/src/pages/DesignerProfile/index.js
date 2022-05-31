/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import { container,UserInfoForm, SubTitle, userInfoContent, editButtonWrapper} from './style';
import Avartar from '../../components/Avatar';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { List, Rate, Button, Tabs, Table, Card } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import userImg from '../../assets/user.png';
import { MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { getProfileInfo } from '../../apis/user';

const designerInfo = {
    'user':{
        'username':'username',//
        'email':'email',//
        'phone':'01000000000',//
        'skills':'실내인테리어',
        'description':'소개...소개...소개....',//
        'average_stars': 5, //
    },
    'portfolio': {
        'certificates': [{
            key: '1',
            acquired_period:'2022.05.03~2022.05.20',
            certificate_name: '정보처리기사',
            time :5
        }],
        'educationcareers' :[{
            'working_period' :'2022.05.01~2022.05.31',
            'company_name' : 'soongsil',
            'job_position' : 'front end 개발자'
        }],
        'content' :'portfolio content'
    },
    'projects' : [{
        'title':"title",
        'description' :'description',
        'participation_date':'2022.05.10~2023.03.25',
        'client':'client',
        'score':5
    }
    ],

    'part_in_commission':[
        {
            'client_username':'client',//
            'client_company_name': '회사이름',
            'client_phone':'01000000000',
            'title':'title', //
            'budget':1000, //
            'small_image':'', //
            'updated': 10,//
        },
        {
            'client_username':'client',//
            'client_company_name': '회사이름',//
            'client_phone':'01000000000',
            'title':'title',//
            'budget':1000,//
            'small_image':'',
            'updated': 10,//
        }
    ],
    'end_commission':[
        {
            'client_username':'client',
            'client_company_name': '회사이름',
            'client_phone':'01000000000',
            'title':'title',
            'budget':1000,
            'small_image':'',
            'updated': 10,
        },
    ]
}

const columns = [
    {
      title: '취득 기간',
      dataIndex: 'acquired_period',
      key: 'acquired_period',
    },
    {
      title: '자격증',
      dataIndex: 'certificate_name',
      key: 'certificate_name',
    },
    {
        title: '기간(개월)',
        dataIndex: 'time',
        key: 'time',
      },
  ];

  const work_columns = [
    {
      title: '근무 기간',
      dataIndex: 'working_period',
      key: 'working_period',
    },
    {//job_position
      title: '회사명',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {//job_position
        title: '직무',
        dataIndex: 'job_position',
        key: 'job_position',
      },
  ];


const DesignerProfile = () => {
    const [ activeTab, setActiveTab ] = useState("portfolio");
    const [ tableLoading, setTableLoading ] = useState(true);
    const [ userInfo, setUserInfo ] = useState({}); 
    const { id } = useParams();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const navigate = useNavigate();

    useEffect(()=> {
        const loadProfileInfo = async () => {
            const result = await getProfileInfo();
            setUserInfo(result);
            console.log(result);
        }
        loadProfileInfo();
    }, []);
    const onClickEditButton = () => {
        navigate('#editprofile');
    };

    const onChangeTab = (key) => { 
        setActiveTab(key);
    }
    
    return (
        <>
        <MainMenu />
        <div css={container}>

        <UserInfoForm>
            {userInfo?.user?.profile_image?
            <Avartar
            src={`http://localhost:8000${userInfo.user.profile_image}`} />:
            <Avartar
            style={{width:'200px', height:'200px'}}
            src={userImg}
            shape="square" />
            }
            <div css={userInfoContent}>
            <h2>{userInfo?.user?.username}님</h2>
            
            <div><MailOutlined style={{marginRight:'5px'}}/>{userInfo?.user?.email}</div>
            <div><PhoneOutlined style={{marginRight:'5px'}}/>{userInfo?.user?.phone}</div>
            <div>{userInfo?.user?.skills} 전문</div>
            <div><Rate disabled defaultValue={userInfo?.user?.average_stars} /></div>
            <div style={{width:'50%'}}>{userInfo?.user?.description}</div>
            </div>
            <Button onClick={onClickEditButton} css={editButtonWrapper}>프로필 수정</Button>
        </UserInfoForm> 

        <Tabs defaultActiveKey="1" onChange={onChangeTab}>
            <Tabs.TabPane tab="포트폴리오" key="portfolio">
            
            {userInfo.portfolio?.certificates && <div style={{margin: '30px 0'}}>
            <SubTitle>자격증</SubTitle>
            <Table loading={tableLoading} columns={columns} dataSource={userInfo.portfolio.certificates} pagination={false}/>
            </div>}

            {userInfo.portfolio?.educationcareers && 
            <div style={{margin: '30px 0'}}>
            <SubTitle>경력 사항</SubTitle>
            <Table loading={tableLoading} columns={work_columns} dataSource={userInfo.portfolio.educationcareers} pagination={false}/>
            </div>}
            <SubTitle>프로젝트</SubTitle>
            {
                userInfo?.projects&& 
                userInfo.projects.map(project=>
                <Card
                    hoverable
                    style={{
                      width: 240,
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Card.Meta title="Europe Street beat" description="www.instagram.com" />
                  </Card>)
            }
            </Tabs.TabPane>
            <Tabs.TabPane tab="진행중인 의뢰" key="part_in_commission">
                <List
                itemLayout="vertical"
                size="large"
                dataSource={userInfo.part_in_commission}
                renderItem={item => (
                    <List.Item
                    key={item.title}
                    actions={[
                        <div>{item.budget} 만원</div>,
                        <div>작업기간  {item.updated}개월</div>,
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
                    title={item.title/*<Link to={`/portfolio/${item.id}`}>{item.title}</Link>*/}
                />
                <div>{item.client_username}</div> 
                <div>{item.client_company_name}</div>
                <div>{item.client_phone}</div>
                </List.Item>
                )}
            />  
            </Tabs.TabPane>
            <Tabs.TabPane tab="종료된 의뢰" key="end_commission">
            <List
                itemLayout="vertical"
                size="large"
                dataSource={userInfo.end_commission}
                renderItem={item => (
                    <List.Item
                    key={item.title}
                    actions={[
                        <div>{item.budget} 만원</div>,
                        <div>작업기간  {item.updated}개월</div>,
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
                    title={item.title/*<Link to={`/portfolio/${item.id}`}>{item.title}</Link>*/}
                />
                <div>{item.client_username}</div> 
                <div>{item.client_company_name}</div>
                <div>{item.client_phone}</div>
                </List.Item>
                )}
            />
            </Tabs.TabPane>
        </Tabs>      
        </div>
        </>
    );
};

export default DesignerProfile;