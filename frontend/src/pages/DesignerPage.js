import React from 'react';
import MainMenu from '../components/MainMenu';
import { Card, Avatar, Dropdown, Button, Menu } from 'antd';
import { HeartOutlined, HeartTwoTone, DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const dummyData = [
    {
        imageSrc : 'https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505__340.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userNickname: 'nickname1',
        userEmail: 'email',
    },{
        imageSrc : 'https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505__340.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userNickname: 'nickname2',
        userEmail: 'email',
    },
    {
        imageSrc : 'https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505__340.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userNickname: 'nickname3',
        userEmail: 'email',
    },
    {
        imageSrc : 'https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505__340.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userNickname: 'nickname4',
        userEmail: 'email',
    },
    {
        imageSrc : 'https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505__340.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userNickname: 'nickname4',
        userEmail: 'email',
    },
    {
        imageSrc : 'https://cdn.pixabay.com/photo/2022/01/18/07/38/cat-6946505__340.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userNickname: 'nickname4',
        userEmail: 'email',
    },
];

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
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon={<DownOutlined />} >최신순</Button>
                </Dropdown>
                </div>
            </div>

            <div className='portfolio-container' style={{width: '100%', display: 'inline-grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20%, auto))', gap: '5%'}}>
            {dummyData.map((post)=>
                <Card
                hoverable
                cover={<img alt="example" src={post.imageSrc} />}
              >
                <Card.Meta avatar={<Avatar src={post.userProfilePhoto} />} title={<div style={{position: 'relative'}}>{post.userNickname}<HeartTwoTone style={{position: 'absolute', right:'0px'}} twoToneColor='#ff69b4'/></div>} description={post.userEmail} />
              </Card>)}
            </div>
        </div>
        
        </>
    );
}

export default DesignerPage;
