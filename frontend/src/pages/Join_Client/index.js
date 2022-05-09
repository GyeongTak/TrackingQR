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



function JoinClientPage() {
    return (
        <>
        <MainMenu/>
        <Background/>

        <div style={{marginLeft:'35%', marginTop:'50px'}}>
            <Container className="panel" style={{width:'500px', position:'absolute', backgroundColor:'white', height:'550px', borderStyle:'solid', borderWidth:3, borderColor:'antiquewhite', borderRadius:10}}>
                <div style={{marginTop:'15px', fontSize:'25px', fontWeight: 'bold', textAlign:'center'}}>일반고객 회원가입</div>
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

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>비밀번호 확인</div>   
                        <Col sm>
                            <Form.Control type="password" placeholder="Confirm Password" style={{width:'90%'}}/>
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
                            <Form.Control type="email" placeholder="Email Address" style={{width:'90%'}}/>
                        </Col>
                    </Form.Group>

                    <Form style={{marginTop:'10px'}}>
                        <div style={{position:'absolute', fontSize:'15px', fontWeight:'bold'}}>역할</div>
                        {['checkbox'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                                style={{position:'absolute', marginLeft:'40px'}}
                                inline
                                label="일반고객"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                            />
                            </div>
                        ))}
                    </Form>
                    <br/>

                    <div style={{marginTop:'30px'}}>
                        <Button className="join" type="submit">
                            회원가입
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
        </>
    );
}

export default JoinClientPage;