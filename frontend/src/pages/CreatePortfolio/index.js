import React, { useRef, useState } from 'react';
import MainMenu from '../../components/MainMenu';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { useNavigate } from 'react-router-dom';

const CreatePortfolioPage = () => {
    const [ user, setUser ]  = useRecoilState(userState);
    const [ imagePrevious, setImagePrevious ] = useState(false); 
    const [ file, setFile ] = useState();
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const navigate = useNavigate();

    const imageInput = useRef();
    const imagePreviousRef = useRef();
    
    const onClickImageUpload = () => {
        imageInput.current.click();
    };

    const onChangeImage = (e) => {
        /*
        const imageFormData = new FormData();
        imageFormData.append('image', e.target.files[0]);
        */
       setFile(e.target.files[0]);
       const reader = new FileReader();
       reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
           setImagePrevious(true);
           imagePreviousRef.current.src = reader.result;
           
       };
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('description', content);
        formData.append('userid', 'tticjswo');
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = "Token "+token;
        axios.post('http://localhost:8000/sda/portfolio/new', formData)
        .then((res) => {
            navigate('/sda');
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeTextArea = (e) => {
        setContent(e.target.value);
    }
    return (
        <>
        <MainMenu />
        <section className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <div className={'mainTitle'} style={{fontSize: '32px', fontWeight: 'bold', padding:'50px 0'}}>
                포트폴리오를 등록해보세요
            </div>
            
            <form onSubmit={onSubmit}>
            <div className='portfolio-form-container' style={{width: '100%'}}>
            <div>
                <input placeholder='제목' style={{width: '100%'}} onChange={onChangeTitle} />
            </div>
            <div style={{margin: '20px 0'}}>
                <textarea style={{width: '100%', height: '300px'}} onChange={onChangeTextArea}/>
            </div>
            <div style={{margin: '20px 0'}}>
                <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImage}/>
            </div>
            <div style={{margin: '20px 0'}}>
            <Button icon={<UploadOutlined />} onClick={onClickImageUpload}>
                Upload
            </Button>
            </div>
            {imagePrevious && <img alt='미리보기' ref={imagePreviousRef} />}
            </div>
            <Button type="primary" shape="round" size='large' htmlType="submit">포트폴리오 등록</Button>
            </form>
        </section>
        
        </>
    );
};


export default CreatePortfolioPage;

/**
 * 
 * { userid : 회원 아이디, 
title: 게시글 제목, 
description: 게시글 내용, 
image: 이미지파일 }
 * 
 * 
 */