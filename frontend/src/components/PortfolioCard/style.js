import styled from "@emotion/styled";

const PortfolioCardContainer = styled.div`
    cursor: pointer;
    display: flex;
    border-bottom: 1px solid #e6e7eb;
    margin: 50px 0;
`

const NameWrapper = styled.div`
    margin: 5px;
    font-size: 18px;
    font-weight: 500;
    white-space: nowrap;
`
const DescriptionWrapper = styled.div`
    width: 80%;
    word-break:break-all;
    margin: 5px;
    font-size: 17px;
`

const ProjectWrapper = styled.div`
    display:flex;
    font-size: 17px;
    justify-content: space-between;
`
export { PortfolioCardContainer, NameWrapper, DescriptionWrapper,ProjectWrapper};