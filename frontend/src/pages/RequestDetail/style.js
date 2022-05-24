import styled from '@emotion/styled';

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 10%;
    display: flex;
    margin-top: 100px;
    justify-content: space-between;
`
const RequestContainer = styled.div`
    width: 50%;   
`
const Content = styled.div`
    margin-bottom: 100px;
`
const UserInfo = styled.div`
    padding: 200px;
    margin-right:10px;
    border: 1px solid #dcdcde;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const BudgetWrapper = styled.div`
    display: inline-block;
    margin-left: 20px;
    font-weight: bold;
    font-size: 30px;
`
const PanoramaWrapper = styled.div`

`


export { Container, ContentContainer, RequestContainer,Content, UserInfo, BudgetWrapper, PanoramaWrapper };