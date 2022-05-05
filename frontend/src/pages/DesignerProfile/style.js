/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const container = css`
    padding: 0 10%;
`
const memberInfoContainer = css`
    margin: 78px 0;
    display: flex;
    align-items: center;
    position:relative;
`

const userInfoContent = css`
    margin-Left: 20px;
`
const editButtonWrapper = css`
    position: absolute;
    right: 0;
`
//color: '#3c434a',
export { container, memberInfoContainer, userInfoContent, editButtonWrapper};