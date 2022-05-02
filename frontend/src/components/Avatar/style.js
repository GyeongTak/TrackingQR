import styled from '@emotion/styled';

const AvatarWrapper = styled.div`
    border-radius: 50%;
    width: 100px;
    height: 100px;
    ${props => props.src && 'background-image: url("'+props.src+'")'};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    &:hover {
        opacity: 0.5;
    }
`

export {AvatarWrapper};