import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import { Card, Avatar, Dropdown, Button, Menu, List, Space } from 'antd';
import {  HeartTwoTone, DownOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import { getRequests } from '../../apis/request';

const menu = (
    <Menu>
      <Menu.Item>
          식당/카페
      </Menu.Item>
      <Menu.Item>
          식품/건강
      </Menu.Item>
      <Menu.Item>
          뷰티/패션
      </Menu.Item>
      <Menu.Item>
          교육/육아
      </Menu.Item>
      <Menu.Item>
          반려동물
      </Menu.Item>
      <Menu.Item>
          병원
      </Menu.Item>
    </Menu>
  );
  const menu_style = (
    <Menu>
      <Menu.Item>
          외부 디자인
      </Menu.Item>
      <Menu.Item>
          내부 디자인
      </Menu.Item>
    </Menu>
  );
  const menu_date = (
    <Menu>
      <Menu.Item>
          최신순
      </Menu.Item>
      <Menu.Item>
          인기순
      </Menu.Item>
    </Menu>
  );

const RequestList = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        const loadRequests = async () => {
            const result = await getRequests();
            console.log(result);
            setReviews([...result]);
        }
        
        loadRequests();
    }, []);
    
    /**
     * title*
     * deadline*
     * finish_date*
     * budget*
     * small_image*
     * client_name*
     * client_company_name*
     * request_count
     * id
     */
    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <div className={'mainTitle'} style={{fontSize: '32px', fontWeight: '500', padding:'50px 0'}}>
                프로젝트 리스트
            </div>

            <div style={{margin: '10px 0', width:'100%', position: 'relative'}}>
                <div>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon={<DownOutlined />} style={{marginRight: '10px'}}>업종</Button>
                </Dropdown>
                <Dropdown overlay={menu_style} placement="bottomLeft">
                    <Button icon={<DownOutlined />} >스타일</Button>
                </Dropdown>
                </div>
                
                <div style={{position: 'absolute', right:'0', top: '0'}}>
                <Link to="/request/new"> 
                        <Button style={{color:'black', fontWeight:'400', marginRight:'15px'}}>의뢰서 등록하기</Button>
                </Link>
                <Dropdown overlay={menu_date} placement="bottomLeft">
                    <Button icon={<DownOutlined />} >최신순</Button>
                </Dropdown>
                </div>
            </div>

            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 5,
                }}
                dataSource={reviews}
              
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
                        width={250}
                        alt="logo"
                        src={`http://localhost:8000${item.small_image}`}
                    />
                    }
                >
                    <List.Item.Meta
                    avatar={<Avatar style={{width:'80px', height:'80px'}}src={`http://localhost:8000${item.profile_image}`} />}
                    title={<Link to={`/request/${item.id}`}>{item.title}</Link>}
                    description={<div>{item.client_name} 님의 의뢰 ({item.client_company_name})</div>}
                    />
                    <div  style={{height:"100px"}}>{item.deadline} 까지</div>
                    
                </List.Item>
                )}
            />
        </div>
        
        </>
    );
}

export default RequestList;