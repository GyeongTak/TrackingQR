import React from 'react';
import { Button, Input } from 'antd';
import '../css/mainmenu.css';
import { Link } from 'react-router-dom'

const dummyDataMe = {
    role: 'client'
};

const menuStyle = {
    top: '0',
    padding: '0 10%',
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #dcdcdc',
};

const MainMenu = () => {

    const onSearch = () => {

    };

    return(
        <div style={menuStyle}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div>Logo</div>
                <div id='designer' style={{padding: '0 10px', fontSize: '16px', fontWeight: 'bold', marginLeft:'10px'}}>디자이너</div>
                <div id='review' style={{padding: '0 10px', fontSize: '16px', fontWeight: 'bold'}}>고객후기</div>
            </div>
            <Input.Search placeholder="디자이너 검색" onSearch={onSearch} style={{width:'30%'}}/>
            <div style={{display: 'flex', alignItems: 'center'}}>
                
                <div style={{padding: '0 10px'}}>로그인</div>
                <div style={{padding: '0 10px'}}>회원가입</div>
                {dummyDataMe.role === 'client'?  
                <Button type="primary" shape="round" size='large'>의뢰하기</Button>
                :<Button type="primary" shape="round" size='large'>포트폴리오 등록하기</Button>}
            </div>
        </div>
    );

}


export default MainMenu;