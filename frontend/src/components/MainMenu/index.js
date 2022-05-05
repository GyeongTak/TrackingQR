import React from 'react';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
 
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
                <div >
                    <Link to="../"> 
                        <Button> Logo </Button>
                    </Link>
                </div>
                <div style={{margin: '0 15px', fontSize: '16px', fontWeight: 'bold', cursor:"pointer"}}>
                    <Link to="/sda"> 
                        <Button style={{color:'black', fontWeight:'bold'}}> 디자이너 </Button>
                    </Link>
                </div>
                <div style={{margin: '0 15px', fontSize: '16px', fontWeight: 'bold', cursor:"pointer"}}>
                    <Link to="/sda/"> 
                        <Button style={{color:'black', fontWeight:'bold', marginLeft:'-15px'}}> 의뢰서 </Button>
                    </Link></div>
                </div>
            <Input.Search placeholder="디자이너 검색" onSearch={onSearch} style={{width:'30%'}}/>
            <div style={{display: 'flex', alignItems: 'center'}}>
                
                <div style={{padding: '0 10px'}}>
                    <Link to="/login"> 
                        <Button> 로그인 </Button>
                    </Link>
                </div>
                <div style={{padding: '0 10px'}}>
                    <Link to="/Join"> 
                        <Button> 회원가입 </Button>
                    </Link>
                </div>
                {dummyDataMe.role === 'client'?  
                    <Link to ="/port-new">
                        <Button type="primary" shape="round" size='large'>의뢰하기</Button> 
                    </Link>
                    :
                    <Link to ="./sda/port-new">
                        <Button type="primary" shape="round" size='large'>포트폴리오 등록하기</Button>
                    </Link>
                }
            </div>
        </div>
    );

}


export default MainMenu;