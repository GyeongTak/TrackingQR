/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { jsx, css } from '@emotion/react';
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import MainMenu from "../../components/MainMenu";
import { signupButton } from './style';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Background from "../../components/Background";

function LoginPage() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const onChangeId = (e) => {
        setUserId(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);  
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/users/api/login', JSON.stringify({"username":userId, "password": password}),{
            headers: { "Content-Type": `application/json`}
            })
        .then((res) => {
            const { token, user_id, is_client } = res.data;
            axios.defaults.headers.common['Authorization'] = token;
        })
        .catch((error) => {
            console.error(error.response);
        });

    };
    return (
        <>
        <MainMenu/>
        <Background/>
        <div style={{marginLeft:'35%', marginTop:'50px'}}>
            <Container className="panel" style={{width:'500px', position:'absolute', height:'550px', borderStyle:'solid', backgroundColor:'white', borderWidth:3, borderColor:'antiquewhite', borderRadius:10}}>
                <div style={{marginTop:'15px', fontSize:'25px', fontWeight: 'bold', textAlign:'center'}}>로그인</div>
                <Form style={{marginLeft:'40px'}} >
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'20px', fontWeight:'bold'}}>아이디</div>
                        <Col sm>
                            <Form.Control type="text" placeholder="UserID" style={{width:'90%'}} value={userId} onChange={onChangeId}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>비밀번호</div>
                        <Col sm>
                            <Form.Control type="password" placeholder="Password" style={{width:'90%'}} value={password} onChange={onChangePassword}/>
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-1" style={{marginTop:'30px'}}>
                        <Button variant="secondary" type="submit" onClick={onSubmit} style={{width:'80%', height:'40px', marginLeft:'20px', borderStyle:'solid', borderWidth:2, 
                        borderColor:'white', borderRadius:10, backgroundColor:'antiquewhite', color:'brown'}}>
                            로그인
                        </Button>
                    </div>
                    
                </Form>
                <Link to='/join' css={signupButton}>아직 커넥트빌 회원이 아니세요? <span>회원가입</span></Link>
            </Container>
            
        </div>
        </>
    );
}

export default LoginPage;