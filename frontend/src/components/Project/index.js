import React from 'react';
import { ProjectWrapper } from './style';
import { useNavigate } from 'react-router-dom';

const Project = ({ project }) => {

    const navigate = useNavigate();

    const onClickProject = () => {
        navigate(`/project/${projects.id}`);
    }

    return (
    <ProjectWrapper onClick={onClickProject}>

    </ProjectWrapper>
    );
}

export default Project;