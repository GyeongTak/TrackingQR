/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

const container = css`
padding: 0 10%;
margin-top: 78px;
display: flex;
`
const profileLeftSection = css`
    width: 20%;
`
const memberInfoContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const menuWrapper = css`
    margin-bottom: 30px;
`
const menuTitle = css`
    font-weight: bold;
`
const userInfoContent = css`
    margin: 30px auto;
    text-align: center;
`
const editButtonWrapper = css`
    position: absolute;
    right: 0;
`

const contentContainer = css`
    margin: 20px 0;
    width: 70%;
`

const contentMain = css`
    width: 100%;
    margin: 10px;;
    height: 100%; 
    border: 1px solid gray;
`
export { container, profileLeftSection, memberInfoContainer, menuWrapper, menuTitle, userInfoContent, editButtonWrapper, contentContainer, contentMain};