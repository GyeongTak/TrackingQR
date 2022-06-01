/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import MainMenu from 'components/MainMenu';
import { getPortfolio } from '../../apis/portfolio';
import { container,UserInfoForm, userInfoContent, editButtonWrapper, SubTitle, ProjectWrapper} from './style';
import { StepForwardOutlined } from '@ant-design/icons';
import { List, Table, Rate } from 'antd';
import { Link } from 'react-router-dom';
import PortfolioCard from 'components/PortfolioCard';
import { useParams } from 'react-router-dom';

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
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState({});
    
    useEffect(()=>{
        
        const loadPortfolio = async () => {
            const data = await getPortfolio(id);
            setPortfolio(data);
        }

        loadPortfolio();
        
        //setPortfolio(dummy);
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

        <SubTitle>포트폴리오 소개</SubTitle>
            <div style={{margin: '30px 0'}}>
            {portfolio?.description}
            </div>

            <SubTitle>자격증</SubTitle>
            {
            <div style={{margin: '30px 0'}}>
            <Table  columns={columns} dataSource={portfolio?.certificates} pagination={false}/>
            </div>}

            <SubTitle>경력 사항</SubTitle>
            {
            <div style={{margin: '30px 0'}}>
            
            <Table  columns={work_columns} dataSource={portfolio?.educationandcareer} pagination={false}/>
            </div>}
            <SubTitle>프로젝트</SubTitle>
            {
                portfolio?.projects&& 
                portfolio?.projects?.map((project) => {
                    return (
                        <>
                        <ProjectWrapper>
                        {project?.title}
                        <Rate defaultValue={project?.score} disabled/>
                        </ProjectWrapper>
                        </>
                    );
                })
            }

            <div style={{margin: '30px 0'}}>
            <SubTitle>프로젝트 상세</SubTitle>
            <List
            itemLayout="vertical"
            size="large"
            dataSource={portfolio?.projects}
            renderItem={item => (
            <List.Item
                key={item.title}
                extra={
                <img
                    width={272}
                    alt="logo"
                    src={`http://localhost:8000${item.image}`}
                />
                }
            >
                <List.Item.Meta
                title={<Link to={`/project/${item.id}`}>{item.title}</Link>}
                description={<><div>{item.client}님의 의뢰</div><Rate defaultValue={item.score} disabled/></>}
                />
                {item.description}
            </List.Item>
            )}
  />
        </div>


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