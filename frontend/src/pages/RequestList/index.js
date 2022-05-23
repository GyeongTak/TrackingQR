import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import { Card, Avatar, Dropdown, Button, Menu, List, Space } from 'antd';
import {  HeartTwoTone, DownOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const listData = [];
for (let i = 1; i < 25; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `외식프랜차이즈 컨셉시안 작업 원합니다.`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      '22.05.04',
    content:
    '외식업 프랜차이즈 인테리어 디자인 설계 요청',
  });
}

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

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

    useEffect(()=>{
        axios.get('http://localhost:8000/sda/', )
        .then((res) => {
            console.log(res.data);
            setReviews([...res.data]);
        })
        .catch((error) => {
            console.error(error.response);
        });
    }, []);
    
    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <div className={'mainTitle'} style={{fontSize: '32px', fontWeight: 'bold', padding:'50px 0'}}>
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
                        <Button style={{color:'black', fontWeight:'bold', marginRight:'15px'}}>의뢰서 등록하기</Button>
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
                dataSource={listData}
              
                renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                    <div>예산  300,000</div>,
                    <div>작업기간  6일</div>,
                    <div>받은 제안 5개</div>,
                    ]}
                    extra={
                    <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                    }
                >
                    <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                    />
                    {item.content}
                </List.Item>
                )}
            />
        </div>
        
        </>
    );
}

export default RequestList;