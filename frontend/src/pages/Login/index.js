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
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import Background from "../../components/Background";
import './index.css';
import {login} from '../../apis/user/index';

function LoginPage() {
    const [user, setUser]  = useRecoilState(userState);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    
    const onChangeId = (e) => {
        setUserId(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);  
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { id, username, is_client, auth_token } = await login({"username":userId, "password": password});
        localStorage.setItem('token', auth_token);
        localStorage.setItem('userId', id);
        localStorage.setItem('userName', username);
        localStorage.setItem('isClient', is_client);
        axios.defaults.headers.common['Authorization'] = auth_token;
        console.log(id, username, is_client, auth_token);
        setUser({
            userId : id,
            isClient : is_client,
            username : username,
            auth_token : auth_token,
            profileImage : '',
        });

        navigate("/",  { replace: true });
    };
    return (
        <>
        <MainMenu/>
        <Background/>
        <div style={{marginLeft:'35%', marginTop:'50px'}}>
            <Container className="panel" style={{width:'500px', position:'absolute', height:'550px', borderStyle:'solid', backgroundColor:'white', borderWidth:3, borderColor:'antiquewhite', borderRadius:10}}>
                <div style={{marginTop:'15px', fontSize:'25px', fontWeight: 'bold', textAlign:'center'}}>?????????</div>
                <Form style={{marginLeft:'40px'}} >
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'20px', fontWeight:'bold'}}>?????????</div>
                        <Col sm>
                            <Form.Control type="text" placeholder="UserID" style={{width:'90%'}} value={userId} onChange={onChangeId}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>????????????</div>
                        <Col sm>
                            <Form.Control type="password" placeholder="Password" style={{width:'90%'}} value={password} onChange={onChangePassword}/>
                        </Col>
                    </Form.Group>
                    
                    <Button className="login" type="button" onClick={onSubmit}>
                        ?????????
                    </Button>
                    
                    
                </Form>
                <Link to='/join' css={signupButton}>?????? ???????????? ????????? ????????????? <span>????????????</span></Link>
            </Container>
            
        </div>
        </>
    );
}

export default LoginPage;