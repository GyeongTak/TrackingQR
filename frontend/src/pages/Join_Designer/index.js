import React, { useState } from "react";
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import MainMenu from "../../components/MainMenu";
import Background from "../../components/Background";
import {Dropdown, DropdownButton} from 'react-bootstrap';
import './index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function JoinDesignerPage() {
    const [userInfo, setUserInfo] = useState({
        "username" :  "tticjswo5",
        "password" :  "12345qwert~!@",
        "password2" : "12345qwert~!@",
        "email" : "tticjswo@naver.com",
        "phone": "01023872521",
        "skills" :  "C",
        "description" : "hello world",
        "is_client": false
        });
    const navigate = useNavigate();

    const onClickSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/auth/register_designer', userInfo, {headers: { "Content-Type": `application/json`}})
        .then((res) => {
            navigate("/",  { replace: true });
        })
        .catch((error) => {
            console.error(error.response);
        });
        
        navigate('/login');
    }

    const onChangeId = (e) => {
        setUserInfo({...userInfo, username: e.target.value});
    }

    const onChangePassword = (e) => {
        setUserInfo({...userInfo, password : e.target.value});
    }

    const onChangePasswordCheck = (e) => {
        setUserInfo({...userInfo, password2 : e.target.value});
    }
    return (
        <>
        <MainMenu/>
        <Background/>

        <div style={{marginLeft:'35%', marginTop:'50px'}}>
            <Container className="panel" style={{width:'500px', position:'absolute', backgroundColor:'white', height:'550px', borderStyle:'solid', borderWidth:3, borderColor:'antiquewhite', borderRadius:10}}>
                <div style={{marginTop:'15px', fontSize:'25px', fontWeight: 'bold', textAlign:'center'}}>디자이너 회원가입</div>
                <Form style={{marginLeft:'40px'}}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'20px', fontWeight:'bold'}}>아이디</div>
                        <Col sm>
                            <input type="text" placeholder="UserID" style={{width:'90%'}} value={userInfo.username} onChange={onChangeId}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>비밀번호</div>
                        <Col sm>
                            <input type="password" placeholder="Password" style={{width:'90%'}} value={userInfo.password} onChange={onChangePassword}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>비밀번호 확인</div>   
                        <Col sm>
                            <input type="password" placeholder="Confirm Password" style={{width:'90%'}} value={userInfo.password2} onChange={onChangePasswordCheck}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>이름</div> 
                        <Col sm>
                            <Form.Control type="text" placeholder="Username" style={{width:'90%'}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>이메일</div> 
                        <Col sm>
                            <input type="email" placeholder="Email Address" style={{width:'90%'}}/>
                        </Col>
                    </Form.Group>

                    <Form style={{marginTop:'10px'}}>
                        <div style={{position:'absolute', fontSize:'15px', fontWeight:'bold'}}>역할</div>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                style={{position:'absolute', marginLeft:'40px'}}
                                inline
                                label="디자이너"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                            />
                            </div>
                        ))}
                    </Form>
                    <br/>

                    <div style={{marginTop:'30px'}}>
                        <Button className="join" onClick={onClickSubmit}>
                            회원가입
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
        </>
    );
}

export default JoinDesignerPage;