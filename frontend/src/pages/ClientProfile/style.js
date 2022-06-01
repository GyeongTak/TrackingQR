/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';

const container = css`
    padding: 0 10%;
`


const UserInfoForm = styled.div`
    width:50%;
    padding:50px 10px;
    display: flex;
    align-items: center;
    border-radius: 1%;
    background-color: #f0f0f1;
    position:relative;
    margin: 78px 0;    
`

const memberInfoContainer = css`
    
    display: flex;
    align-items: center;
    position:relative;
`

const userInfoContent = css`
    margin-Left: 20px;
`
const editButtonWrapper = css`
    position: absolute;
    right: 30px;

`
export { UserInfoForm, container, memberInfoContainer, userInfoContent, editButtonWrapper};