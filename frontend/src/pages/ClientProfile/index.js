/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
//import Tabs from '../../components/Tabs';
import { UserInfoForm, container, memberInfoContainer, userInfoContent, editButtonWrapper} from './style';
import Avatar from '../../components/Avatar';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { List, Button, Modal, Input, Rate, Space, Tabs, Tag } from 'antd';
import { MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import { getProfileInfo } from '../../apis/user';
import { Link } from 'react-router-dom';
import userImg from '../../assets/user.png';
import { patchSelectDesigner } from '../../apis/request';

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

    console.log(clientInfo?.commissions?.request_designer?.length);
    const onClickTab = (key) => {
        setActiveTab(key);
    }
    const onClickEditButton = () => {
        setModal(true);
    };

    const onCancelEdit = () => {
        setModal(false);
    }

    const onClickDesigner = (designerId, itemId) => {

        const patchSelect = async() =>  {
            await patchSelectDesigner({designer_id :designerId, item_id : itemId});
        }  
        patchSelect();
    }
    
    return (
        <>
        <MainMenu />
        <div css={container}>
        
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        <UserInfoForm>
            {clientInfo?.user?.profile_image?
            <Avatar
            src={`http://localhost:8000${clientInfo.user.profile_image}`} />:
            <Avatar
            style={{width:'200px', height:'200px'}}
            src={userImg}
            shape="square" />
            }
            <div css={userInfoContent}>
            <h2>{clientInfo?.user?.username}님</h2>
            <div><MailOutlined style={{marginRight:'5px'}}/>{clientInfo?.user?.email}</div>
            <div><PhoneOutlined style={{marginRight:'5px'}}/>{clientInfo?.user?.phone}</div>
            <div><HomeOutlined style={{marginRight:'5px'}}/>{clientInfo?.user?.company_name}</div>
            <div style={{marginTop: '20px', width:'50%'}}>{clientInfo?.user?.description}</div>
            <Button onClick={onClickEditButton} css={editButtonWrapper}>프로필 수정</Button>
            </div>
        </UserInfoForm>
        <div style={{marginLeft: '10px', width:'40%', height: '250px', border:'2px solid rgb(251, 240, 213)',
        borderRadius:'10px', backgroundColor:'rgb(251, 240, 213)', textAlign:"center"}}>
            <br></br>
            <span style={{fontSize:'17px', fontWeight:'500', color:'orange'}}>도착한 알림</span>
        </div>
        </div>
        

        <Tabs defaultActiveKey="1" onChange={onClickTab}>
        <Tabs.TabPane tab="의뢰서" key="request">
        {
                clientInfo?.commissions_not_started &&
                <List
                itemLayout="vertical"
                size="large"
                dataSource={clientInfo.commissions_not_started}
                renderItem={item => (
                    <List.Item
                    key={item.title}
                    actions={[
                        <div>{item.budget} 만원</div>,
                        <div>작업기간  {item.finish_date}개월</div>,
                        <div>받은 제안 {item.request_designer?.length}개</div>,
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
                description={<div>작업기한  {item.deadline} </div>}
            />
            {item.brief_description}

          <fieldset style={{border:'1px solid #f0f0f1', marginTop: '15px', padding: '10px'}}>
          <legend style={{fontSize: '16px', margin:'0', padding:'1px'}}>지원한 전문가 목록</legend>
          {
              item?.request_designer?.map(designer => 
                <div style={{display: 'flex', alignItems: 'center'}}>
                     <div key={designer.designer_id} 
                    onClick={()=>navigate(`/portfolio/${parseInt(designer.designer_id, 10)}`)} 
                    style={{display: 'flex',  alignItems: 'center', margin:'0', padding:'0', cursor:"pointer"}}>
                    <Avatar style={{width:'50px', height:'50px', marginRight:'10px'}} src={`http://localhost:8000${designer.designer_profile_image}`}/>
                    {designer.designer_username}
                    <Rate style={{marginLeft:'10px'}} disabled defaultValue={designer.designer_average_stars} />
                    <Button style={{marginLeft:'10px'}} onClick={()=>onClickDesigner(designer.designer_id, item.id)}>선택</Button>
                    </div>
                    </div>)
          }
          </fieldset>
        </List.Item>
      )}
    />
            }
            {
                clientInfo?.commissions_started && 
                    <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={clientInfo?.commissions_started}
                    renderItem={item => (
                        <List.Item
                        key={item.title}
                        actions={[
                            <div>{item.budget} 만원</div>,
                            <div>작업기간  {item.finish_date}개월</div>,
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
                    description={<div>작업기한  {item.deadline} </div>}
                />
                {item.brief_description}

            <fieldset style={{border:'1px solid #f0f0f1', marginTop: '15px', padding: '10px'}}>
            <legend style={{fontSize: '16px', margin:'0', padding:'1px'}}>거래중인 디자이너</legend>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div key={item.designer_id} 
                onClick={()=>navigate(`/portfolio/${parseInt(item.designer_id, 10)}`)} 
                style={{display: 'flex',  alignItems: 'center', margin:'0', padding:'0', cursor:"pointer"}}>
                <Avatar style={{width:'50px', height:'50px', marginRight:'10px'}}
                onClick={()=>onClickDesigner(item.designer_id, item.id)}
                src={`http://localhost:8000${item.designer_profile_image}`}/>
                {item.designer_username}
                <Rate style={{marginLeft:'10px'}} disabled defaultValue={item.designer_average_stars} />
                </div>
            </div>
            </fieldset>
            </List.Item>
        )}
        />
            }


            
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
            <Avatar 
            src={`http://localhost:8000${clientInfo.user.profile_image}`} />:
            <Avatar
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
