/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import MainMenu from 'components/MainMenu';
import { Select, Radio, DatePicker, Button, Input } from 'antd';
import { gap, inputStyle, imageStyle, BudgetInput, TextAreaWrapper } from './style';
import { useInput } from 'utils/useInput';
import { postRequest } from 'apis/request';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const CreateRequest = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]); 
    const [ imagePrevious, setImagePrevious ] = useState([]); 
    const [ titleImage, setTitleImage ] = useState(null); 
    const [ title, onChangeTitle] = useInput('');
    const [ date, setDate] = useState('');
    const [ budget, onChangeBudget ] = useInput(0);
    //const [ ispublic, onChangePublic] = useInput(true);
    const [ description, onChangeDescription] = useInput('');
    const [ isPanorama, onChangeIsPanorama ] = useInput(true);
    //const [ category, onChangeCategory] = useInput('');
    //const [ style, onChangeStyle] = useInput('');

    const onSubmit = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        for (let i =0;i<photos.length; i++) {
            formData.append("images", photos[i]);
        }
        //formData.append('images', photos);
        formData.append('title', title);
        formData.append('deadline', date);
        //formData.append('public', ispublic);
        formData.append('description', description);
        formData.append('budget', budget);
        formData.append('small_image', titleImage);
        formData.append('is_panorama', isPanorama);
        formData.append('finish_date', moment(date).diff(moment(), 'months')) 
        //formData.append('category', category);
        //formData.append('style', style);
        console.log(moment(date).diff(moment(), 'months'));
        const result = await postRequest(formData);
        navigate('/request');
    };

    const onChangeFile = (e) => {

        Array.from(e.target.files).forEach(file => {

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePrevious(prev=> [...prev, e.target.result]);
            };
            setPhotos(prev=>[...prev, file]);
            reader.readAsDataURL(file);
        });   
    }

    const onChangeTitlePhoto = (e) => {
        setTitleImage(e.target.files[0]);
    }


    const onClickDeleteImage = (i) => {
        setImagePrevious((prev)=>(
            prev.filter((img, index) => index !== i)
        ));
    }

    const onChangeDate = (date, dateString) => {
        setDate((prev) => dateString);
    };


    return (
        <>
        <MainMenu />
        <section className={'main-container'} style={{padding: '0 10%' , display: 'flex', flexDirection:'column'}}>
            <div className={'mainTitle'} css={gap} style={{fontSize: '32px', fontWeight: 'bold', }}>
                ???????????? ??????
            </div>
            
            <form onSubmit={onSubmit}>
            
            <div css={gap}>
            <h2>????????? ????????? ??????????????????.</h2>
            
            <Input placeholder='???) ???????????? ???????????? ????????????' style={{width: '50%'}} onChange={onChangeTitle} />
            
            </div>

            <div css={gap}>
            <h2>?????? ???????????? ??????????????????</h2>
            <DatePicker onChange={onChangeDate} />
            </div>

            <div css={gap}>
            <h2>????????? ??????????????????</h2>
            <BudgetInput>
            <Input placeholder="??????" style={{width: '20%'}} type={'number'} onChange={onChangeBudget}/>
            <div>??????</div>
            </BudgetInput>
            </div>
            <div css={gap}>
            <h2>???????????? ?????? ??? ?????? ????????? ????????? ??????????????????.</h2>
            <Input.TextArea rows={4} onChange={onChangeDescription}></Input.TextArea>
            </div>

            <h2>????????? ?????? ??? ??????????????????</h2>
            <div css={gap}>
                <input type="file" accept="image/*" multiple onChange={onChangeTitlePhoto}/>
            </div>

            <h2>????????? ??????????????????</h2>
            <Radio.Group onChange={onChangeIsPanorama} value={isPanorama}>
                <Radio value={true}>???????????? ???????????? ??????</Radio>
                <Radio value={false}>?????? ???????????? ??????</Radio>
            </Radio.Group>
            <div css={gap}>
                <input type="file" accept="image/*" multiple onChange={onChangeFile}/>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {imagePrevious  && imagePrevious.map((p, index)=> 
            <div key={index} css={imageStyle}>
                <Button type="primary" shape="circle" style={{position:"absolute"}} icon={<CloseOutlined />} size={'small'} onClick={()=>onClickDeleteImage(index)}/>
                <img alt="????????????" src={p} height={'200px'} width={'200px'}></img>
            </div>)}
            </div>
            <Button type="primary" shape="round" size='large' htmlType="submit">????????? ??????</Button>
            </form>
        </section>
        </>
        );
};

export default CreateRequest;