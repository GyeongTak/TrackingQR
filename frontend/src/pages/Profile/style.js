/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

const container = css`
    padding: 0 10%;
`
const memberInfoContainer = css`
    margin: 78px 0;
    display: flex;
`

const userInfoContent = css`
    margin-Left: 20px;
`
const ActiveLink = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'red',
    margin: '10px 0',
};
//color: '#3c434a',
export { container, memberInfoContainer, userInfoContent, ActiveLink };