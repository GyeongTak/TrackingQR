/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import Footer from 'components/Footer';
import { getProject } from '../../apis/project';
import { useParams } from 'react-router-dom';


const ProjectDetailPage = () => {
    const { id } = useParams();
    const [ projectInfo, setProjectInfo ] = useState({});
    
    useEffect(()=>{
        
        const loadProject = async () => {
            const data = await getProject(id);
            console.log(data);
            setProjectInfo(data);
        }

        loadProject();
        
    }, []);

    return (
        <>
        <MainMenu />
        <span style={{position:'absolute', marginTop:'50px' ,marginLeft:'280px' , textAlign:'center', fontSize:'35px', 
        fontWeight:'bold'}}>프로젝트 소개</span>
        <hr style={{width:'900px',marginTop:'120px', marginLeft:'280px'}}></hr>
  
        <Footer />
        </>
    );
};

export default ProjectDetailPage;