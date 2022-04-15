import React, { useState } from "react";
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import MainMenu from "../components/MainMenu";
import {Dropdown, DropdownButton} from 'react-bootstrap';


function LoginPage() {
    return (
        <>
        <MainMenu/>
        <div style={{marginLeft:'35%', marginTop:'50px'}}>
            <Container className="panel" style={{width:'500px', height:'550px', borderStyle:'solid', borderWidth:3, borderColor:'rgb(54, 94, 163)', borderRadius:10}}>
                <div style={{marginTop:'15px', fontSize:'25px', fontWeight: 'bold', textAlign:'center'}}>로그인</div>
                <Form style={{marginLeft:'40px'}}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'20px', fontWeight:'bold'}}>아이디</div>
                        <Col sm>
                            <Form.Control type="text" placeholder="UserID" style={{width:'90%'}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>비밀번호</div>
                        <Col sm>
                            <Form.Control type="password" placeholder="Password" style={{width:'90%'}}/>
                        </Col>
                    </Form.Group>

                    <div className="d-grid gap-1" style={{marginTop:'30px'}}>
                        <Button variant="secondary" type="submit" style={{width:'80%', height:'40px', marginLeft:'20px', borderStyle:'solid', borderWidth:2, 
                        borderColor:'white', borderRadius:10, backgroundColor:'rgb(143, 179, 240)', color:'white'}}>
                            로그인
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
        </>
    );
}

export default LoginPage;