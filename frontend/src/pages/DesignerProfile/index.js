/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import Tabs from '../../components/Tabs';
import { container, memberInfoContainer, userInfoContent} from './style';
import Avartar from '../../components/Avatar';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { Card, Tag, Button } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { useNavigate, useLocation, useParams} from 'react-router-dom';

const dummydata = [
    {
        portfolio_image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MjZfNiAg%2FMDAxNjI5OTM3MjY0NzI2.z0A3O88VL3rcaK-U7WAMHGapec-ONpp_Uw3Rb6DnRGUg.4eqohEEzUctavjailIq2jN5zlFIdnyJDND88yqwhymAg.JPEG.lebenzmai%2F1610951639-55.jpg&type=sc960_832',
        title :'제목',
        desciption: '포트폴리오 제목',
        updated: '2022-05-05',
        created: '2022-05-05',
    },{
        user: 1,
        portfolio_image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MjZfNiAg%2FMDAxNjI5OTM3MjY0NzI2.z0A3O88VL3rcaK-U7WAMHGapec-ONpp_Uw3Rb6DnRGUg.4eqohEEzUctavjailIq2jN5zlFIdnyJDND88yqwhymAg.JPEG.lebenzmai%2F1610951639-55.jpg&type=sc960_832',
        title :'제목',
        desciption: '설명',
        updated: '2022-05-05',
        created: '2022-05-05',
    }, {
        user: 1,
        portfolio_image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MjZfNiAg%2FMDAxNjI5OTM3MjY0NzI2.z0A3O88VL3rcaK-U7WAMHGapec-ONpp_Uw3Rb6DnRGUg.4eqohEEzUctavjailIq2jN5zlFIdnyJDND88yqwhymAg.JPEG.lebenzmai%2F1610951639-55.jpg&type=sc960_832',
        title :'제목',
        desciption: '설명',
        updated: '2022-05-05',
        created: '2022-05-05',
    }, {
        user: 1,
        portfolio_image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MjZfNiAg%2FMDAxNjI5OTM3MjY0NzI2.z0A3O88VL3rcaK-U7WAMHGapec-ONpp_Uw3Rb6DnRGUg.4eqohEEzUctavjailIq2jN5zlFIdnyJDND88yqwhymAg.JPEG.lebenzmai%2F1610951639-55.jpg&type=sc960_832',
        title :'제목',
        desciption: '설명',
        updated: '2022-05-05',
        created: '2022-05-05',
    },
    {
        user: 1,
        portfolio_image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MjZfNiAg%2FMDAxNjI5OTM3MjY0NzI2.z0A3O88VL3rcaK-U7WAMHGapec-ONpp_Uw3Rb6DnRGUg.4eqohEEzUctavjailIq2jN5zlFIdnyJDND88yqwhymAg.JPEG.lebenzmai%2F1610951639-55.jpg&type=sc960_832',
        title :'제목',
        desciption: '설명',
        updated: '2022-05-05',
        created: '2022-05-05',
    }, {
        user: 1,
        portfolio_image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MjZfNiAg%2FMDAxNjI5OTM3MjY0NzI2.z0A3O88VL3rcaK-U7WAMHGapec-ONpp_Uw3Rb6DnRGUg.4eqohEEzUctavjailIq2jN5zlFIdnyJDND88yqwhymAg.JPEG.lebenzmai%2F1610951639-55.jpg&type=sc960_832',
        title :'제목',
        desciption: '설명',
        updated: '2022-05-05',
        created: '2022-05-05',
    }, {
        user: 1,
        portfolio_image: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MjZfNiAg%2FMDAxNjI5OTM3MjY0NzI2.z0A3O88VL3rcaK-U7WAMHGapec-ONpp_Uw3Rb6DnRGUg.4eqohEEzUctavjailIq2jN5zlFIdnyJDND88yqwhymAg.JPEG.lebenzmai%2F1610951639-55.jpg&type=sc960_832',
        title :'제목',
        desciption: '설명',
        updated: '2022-05-05',
        created: '2022-05-05',
    },
];


const useQuery = () => {
    const { search } = useLocation();

    return React.memo(()=> new URLSearchParams(search), [search]);
}


const me = {
    userId: 1,
    username:'user1',
    userEmail: 'user1@email.com',
    skills: ['제품', '건축인테리어', 'CI/BI'],
    phone: '01000000000',
    description : '안녕하세요 user1입니다.'
};
const DesignerProfile = () => {
    const { search } = useLocation();
    let query = new URLSearchParams(search);
    const [user, setUser]  = useRecoilState(userState);
    const navigate = useNavigate();

    return (
        <>
        <MainMenu />
        <div css={container}>

        <div css={memberInfoContainer}>
            <Avartar src='https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDA3MTZfMjE3%2FMDAxNTk0ODcyNzY2NTE3.q33CvFJq2IiCh9BUVWfG4IWhEJX-giFX9Rp9_K3AJzkg.9N4e_fFoOp3vQ7c5dxqKyvFrabouzwtUKo41KqOAKbAg.JPEG%2FIELuoo7XtRxBS8TA97d-alMucVRc.jpg&type=sc960_832' />
            <div css={userInfoContent}>
            <h2>{me.username}님</h2>
            <h3>{me.email}</h3>
            <h3>{me.description}</h3>
            <h3>{me.phone}</h3>
            <h3>분야</h3>
            {me.skills.map((s, i)=> <Tag key={i} color="geekblue">{s}</Tag>)}
            </div>
            {
                me?.userId === 
            }
            <Button onClick={()=>{navigate('/')}}>프로필 수정</Button>
        </div>
        <Tabs tab={query.get('tab')} common="portfolio"></Tabs>        
        <div style={{margin: '20px 0', width: '100%', display: 'inline-grid', gridTemplateColumns: 'repeat(auto-fill, minmax(25%, auto))', }}>
        {dummydata.map((portfolio, i)=>
                        <div key={i} style={{marginRight: '10%', marginBottom: '10%'}}>
                        <Card
                        hoverable
                        cover={<img alt="example" src={portfolio.portfolio_image}/>}
                    >
                        <Card.Meta 
                        title={<div style={{position: 'relative', top:'2px'}}>{portfolio.title}
                        <HeartTwoTone style={{position: 'absolute', right:'0'}} twoToneColor='#ff69b4'/></div>} />
                        {portfolio.desciption}
                    </Card>
                    </div>
                    )}
        </div>
        </div>
        </>
    );
};

export default DesignerProfile;