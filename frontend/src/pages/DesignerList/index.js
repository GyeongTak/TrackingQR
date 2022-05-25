import React, { useState, useEffect} from 'react';
import MainMenu from '../../components/MainMenu';
import { Card, Avatar, Dropdown, Button, Menu } from 'antd';
import {  HeartTwoTone, DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getPortfolios } from '../../apis/portfolio';
const menu = (
    <Menu>
      <Menu.Item>
          식당/카페
      </Menu.Item>
      <Menu.Item>
          식품/건강
      </Menu.Item>
      <Menu.Item>
          병원
      </Menu.Item>
    </Menu>
  );


const DesignerPage = () => {
    const [ portfolios, setPortfolios ] = useState([]);


    useEffect(() => {

        const getPortfoliosList = async () => {
            const result = await getPortfolios();
            setPortfolios([...result]);
        }
        
        getPortfoliosList();
    }, []);



    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <div className={'mainTitle'} style={{fontSize: '32px', fontWeight: 'bold', padding:'50px 0'}}>
                디자이너를 찾고 계신가요?
            </div>

            <div style={{margin: '40px 0', width:'100%', position: 'relative'}}>
                <div>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon={<DownOutlined />} style={{marginRight: '10px'}}>업종</Button>
                </Dropdown>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon={<DownOutlined />} >스타일</Button>
                </Dropdown>
                </div>
                
                <div style={{position: 'absolute', right:'0', top: '0'}}>
                <Link to="/portfolio/new"> 
                        <Button style={{color:'black', fontWeight:'bold', marginRight:'15px'}}> 포트폴리오 등록하기 </Button>
                </Link>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon={<DownOutlined />} >최신순</Button>
                </Dropdown>
                </div>
            </div>

            <div className='portfolio-container' style={{width: '100%', display: 'inline-grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20%, auto))', gap: '5%'}}>
            {portfolios.map((post, index)=>
                <Card
                hoverable
                key={index}
                cover={<img alt="example" height={'250px'} src={`http://localhost:8000${post["image"]}`} />}
              >
                <Card.Meta avatar={<Avatar />} 
                title={<div style={{position: 'relative'}}>{post.designer}
                    <HeartTwoTone style={{position: 'absolute', right:'0px'}} twoToneColor='#ff69b4'/></div>} 
                    description={post.title} />
              </Card>)}
            </div>
        </div>
        
        </>
    );
}

export default DesignerPage;
