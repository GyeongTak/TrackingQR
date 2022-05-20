/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import MainMenu from 'components/MainMenu';
import { Select, Radio, DatePicker, Button } from 'antd';
import { gap, inputStyle } from './style';
import { useInput } from 'utils/useInput';
import {
    SyncOutlined,
  } from '@ant-design/icons';

const CreateRequest = () => {
const [photos, setPhotos] = useState([]); 
const [ imagePrevious, setImagePrevious ] = useState([]); 
const [ title, onChangeTitle] = useInput('');
const [ date, onChangeDate] = useInput('');
const [ ispublic, onChangePublic] = useInput('');
const [ content, onChangeContent] = useInput('');
const [ category, onChangeCategory] = useInput('');
const [ style, onChangeStyle] = useInput('');
const onSubmit = (e) =>{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('photos', photos);
    formData.append('title', title);
    formData.append('date', date);
    formData.append('public', ispublic);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('style', style);


};


const onChangeFile = (e) => {
    if (e.target.files[0]) {
    setPhotos([...photos, e.target.files[0]]);
    const reader = new FileReader();
    
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
        setImagePrevious([...imagePrevious, e.target.result]);
    };
    
        
    
    }
}

return (
    <>
    <MainMenu />
    <section className={'main-container'} style={{padding: '0 10%' , display: 'flex', flexDirection:'column'}}>
        <div className={'mainTitle'} css={gap} style={{fontSize: '32px', fontWeight: 'bold', }}>
            프로젝트 의뢰
        </div>
        
        <form onSubmit={onSubmit}>
        
        <div css={gap}>
        <h2>프리랜서 포지션의 제목을 입력해주세요.</h2>
        <input placeholder='예) 감성카페 인테리어 디자이너' style={{width: '50%'}} onChange={onChangeTitle} />
        </div>

        <div css={gap}>
        <h2>모집 마감일을 선택해주세요</h2>
        <DatePicker onChange={onChangeDate} />
        </div>

        <h2>모집 분야와 원하는 스타일을 선택해주세요</h2>
        <div css={gap}>
        <Select defaultValue="분야" onChange={onChangeCategory}>
            <Select.Option value="1">공간디자인</Select.Option >
            <Select.Option value="2">도면</Select.Option >
            <Select.Option value="3">간판</Select.Option >
        </Select>
        <Select defaultValue="스타일" onChange={onChangeStyle} style={{width: '10%', display:'inline-block', marginLeft: '5%'}}>
            <Select.Option value="1">클래식한</Select.Option >
            <Select.Option value="2">모던한</Select.Option >
            <Select.Option value="3">힙한</Select.Option >
        </Select>
        </div>
        

        <div css={gap}>
        <h2>의뢰인 공개여부를 선택해 주세요</h2>
        <Radio.Group onChange={onChangePublic} value={1}>
            <Radio value={1}>공개</Radio>
            <Radio value={2}>비공개</Radio>
        </Radio.Group>
        </div>

        <div css={gap}>
        <h2>프로젝트 내용 및 관련 자료를 상세히 입력해주세요.</h2>
        <textarea css={inputStyle} onChange={onChangeContent}></textarea>
        </div>

        <div css={gap}>
            <input type="file" multiple onClick={onChangeFile}/>
        </div>
        <div style={{display: 'flex'}}>
        {imagePrevious.map((p, index)=> <div><img key={index} alt="미리보기" src={p} height={'200px'} width={'200px'}></img></div>)}
        </div>
        <Button type="primary" shape="round" size='large' htmlType="submit">의뢰서 등록</Button>
        </form>
    </section>
    </>
    );
};

export default CreateRequest;