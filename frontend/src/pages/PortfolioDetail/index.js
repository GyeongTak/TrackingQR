/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import MainMenu from 'components/MainMenu';
import { getPortfolio } from '../../apis/portfolio';
import { container,UserInfoForm, userInfoContent, editButtonWrapper, SubTitle} from './style';
import { StepForwardOutlined } from '@ant-design/icons';
import { Card, Table, Rate } from 'antd';
import PortfolioCard from 'components/PortfolioCard';

const dummy =
{
    'designer_id' : 5,
    'designer_name' :'Designer Lee',//
    'description' : "자기소개란...자기소개란...자기소개란...자기소개란...자기소개란...자기소개란...자기소개란...자기소개란...",
    'certificates' :
    [{
    'acquired_date' : '2022-05-03',
    'certificate_name' : '정처기',
    'time' : '5'
    }],
    'educationandcareer' :[
    {
    'working_period' : '2022-05-03',
    'company_name' : 'soongsil' ,
    'description' : 'desc',
    }],
    'projects' :[
    {
    'title' : 'title',//
    'description' : 'desc',//
    'participation_date' : '2022-05-03',//
    'client' : 'client',//
    'image': '' ,//
    'score': 5,
    },]
};


const columns = [
    {
      title: '취득 기간',
      dataIndex: 'acquired_date',
      key: 'acquired_date',
    },
    {
      title: '자격증',
      dataIndex: 'certificate_name',
      key: 'certificate_name',
    },
    {
        title: '기간(개월)',
        dataIndex: 'time',
        key: 'time',
      },
  ];

  const work_columns = [
    {
      title: '근무 기간',
      dataIndex: 'working_period',
      key: 'working_period',
    },
    {//job_position
      title: '회사명',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {//job_position
        title: '직무',
        dataIndex: 'description',
        key: 'description',
      },
  ];


const PortfolioDetail = () => {
    const [portfolio, setPortfolio] = useState({});
    
    useEffect(()=>{
        /*
        const loadPortfolio = async () => {
            const data = await getPortfolio();
            setPortfolio(data);
        }

        loadPortfolio();
        */
       setPortfolio(dummy);
    }, []);

    return (
        <>
        <MainMenu />
        <div css={container}>

        <UserInfoForm>
            <div css={userInfoContent}>
            <h2>{portfolio?.designer_name}님</h2>
            <div>{portfolio?.description}</div>
            </div>
        </UserInfoForm> 
        {portfolio?.certificates && <div style={{margin: '30px 0'}}>
        <SubTitle>자격증</SubTitle>
        <Table  columns={columns} dataSource={portfolio?.certificates} pagination={false}/>
        </div>}

        {portfolio?.educationandcareer && 
        <div style={{margin: '30px 0'}}>
        <SubTitle>경력 사항</SubTitle>
        <Table  columns={work_columns} dataSource={portfolio?.educationcareers} pagination={false}/>
        </div>}

        {
            portfolio?.projects && portfolio?.projects.map((project, index)=>{
                return(
            <Card
                key={index}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" src={`http://localhost:8000${project.image}`} />}
              >
                <Card.Meta title={project.title} 
                description={<>
                <div>{project.participation_date}</div>
                <div>{project.description}</div>
                <div>{project.client}</div></>} />
                <div><Rate disabled defaultValue={project.score} /></div>
              </Card>);
            })
        }
        </div>
        </>

    );
}

/*****
 * 
 * 프로필 이름
 * 분야
 * 제목
 * 프로젝트 설명
 * 참여기간
 * 클라이언트
 * 적용기술 및 작업 범위
 * 
 * 옆에 사진
 * 
 * 
 * 
 */

export default PortfolioDetail;