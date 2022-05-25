/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import Tabs from '../../components/Tabs';
import { container, memberInfoContainer, userInfoContent, editButtonWrapper} from './style';
import Avartar from '../../components/Avatar';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { Card, Tag, Button, Modal } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import { loadMyInfo } from '../../apis/user';

const dummydata = [
];

const me = {
    userId: 1,
    username:'user1',
    userEmail: 'user1@email.com',
    skills: [ '건축인테리어'],
    phone: '01000000000',
    description : '안녕하세요 user1입니다.'
};

const ClientProfile = () => {
    const [modal, setModal] = useState(false);
    const { id } = useParams();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    //const [user, setUser]  = useRecoilState(userState);
    const navigate = useNavigate();

    useEffect(()=>{
        const load = async () => {
            const result = await loadMyInfo();
            console.log(result);
        }
        load();
    }, []);

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
                me?.userId === parseInt(id, 10)? <Button onClick={onClickEditButton} css={editButtonWrapper}>프로필 수정</Button>:
                null
            }
            
        </div>
        <Tabs tab={query.get('tab')} common="request" tapItems={[{name:'의뢰서', tab:'request'},{name:'리뷰', tab:'review'}]}></Tabs>        
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

        <Modal visible={modal} onCancel={onCancelEdit}><div>와우</div></Modal>
        </>
    );
};

export default ClientProfile;