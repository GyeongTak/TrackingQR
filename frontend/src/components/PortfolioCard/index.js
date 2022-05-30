import React from 'react';
import { PortfolioCardContainer, NameWrapper, DescriptionWrapper, ProjectWrapper } from './style.js';
import Avatar from 'components/Avatar/index.js';
import { Rate } from 'antd';


const PortfolioCard = ({portfolio}) => {

    return (
        
        <PortfolioCardContainer>
            <div>
            <Avatar src={`http://localhost:8000${portfolio.profile_image}`} shape="square" ></Avatar>
            <NameWrapper>{portfolio.username}</NameWrapper>
            <NameWrapper>{portfolio.skills}</NameWrapper>
            </div>

            <div style={{marginLeft: '15px'}}>
                <DescriptionWrapper>{portfolio.description}</DescriptionWrapper>
                <div style={{marginTop: '20px'}}>
                <NameWrapper>진행한 프로젝트</NameWrapper>
                {portfolio.projects?.map((project) => {
                    return (
                        <ProjectWrapper>
                            {project.title}
                            <Rate defaultValue={project.average_stars} disabled/>
                        </ProjectWrapper>
                    );
                })}
                </div>
            </div>
        </PortfolioCardContainer>
        
    );

}

export default PortfolioCard;