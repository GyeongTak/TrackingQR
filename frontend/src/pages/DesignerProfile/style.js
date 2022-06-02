/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';

const container = css`
    padding: 0 10%;
`
const UserInfoForm = styled.div`
    width:750px;
    padding:50px 20px;
    display: flex;
    align-items: center;
    border-radius: 1%;
    background-color: #f0f0f1;
    position:relative;
    margin: 78px 0;    
`
const userInfoContent = css`
    margin-Left: 50px;
`
const editButtonWrapper = css`
    width:200px;
    position: absolute;
    right: 280px;
    bottom : 30px;
`

const SubTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
`
const MessageWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;

    &:hover {
        background-color: orange;
    }
`
export { container,UserInfoForm, userInfoContent, editButtonWrapper, SubTitle, MessageWrapper };