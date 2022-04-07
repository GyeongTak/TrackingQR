import React from 'react';
import MainMenu from '../components/MainMenu';
import { Card, Avatar } from 'antd';
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


const DesignerPage = () => {

    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%'}}>
            <div className={'mainTitle'} style={{fontSize: '32px', fontWeight: 'bold', margin:'30px 0'}}>
                디자이너를 찾고 계신가요?
            </div>
            <div className='portfolio-container' style={{display: 'inline-grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px'}}>
            {dummyData.map((post)=>
                <Card
                hoverable
                cover={<img alt="example" src={post.imageSrc} />}
              >
                <Card.Meta avatar={<Avatar src={post.userProfilePhoto} />} title={post.userNickname} description={post.userEmail} />
              </Card>)}
            </div>
        </div>
        
        </>
    );
}

export default DesignerPage;
