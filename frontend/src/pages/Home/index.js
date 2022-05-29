import React, { useEffect, useState } from 'react';
import MainMenu from '../../components/MainMenu';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import { Card, Avatar, Rate } from 'antd';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import { getRequestsMain} from '../../apis/request';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [requests , setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{

        
        const loadRequests = async () => {
            const result = await getRequestsMain();
            setPortfolios(result.designer);
            setRequests(result.reviews);
            
        };

        loadRequests();
        
        /*
        setPortfolios([...portfolios, {
            "profile_image": 'https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDA3MTZfMjE3%2FMDAxNTk0ODcyNzY2NTE3.q33CvFJq2IiCh9BUVWfG4IWhEJX-giFX9Rp9_K3AJzkg.9N4e_fFoOp3vQ7c5dxqKyvFrabouzwtUKo41KqOAKbAg.JPEG%2FIELuoo7XtRxBS8TA97d-alMucVRc.jpg&type=sc960_832',
            "username":"designer",
            "average_stars":3.0,
        "small_image": 'https://search.pstatic.net/common/?src=http%3A%2F%2Fpost.phinf.naver.net%2FMjAyMDA3MTZfMjE3%2FMDAxNTk0ODcyNzY2NTE3.q33CvFJq2IiCh9BUVWfG4IWhEJX-giFX9Rp9_K3AJzkg.9N4e_fFoOp3vQ7c5dxqKyvFrabouzwtUKo41KqOAKbAg.JPEG%2FIELuoo7XtRxBS8TA97d-alMucVRc.jpg&type=sc960_832',
        "id": 1}]);
        */
    }, []);

    const onClickPortfolio = (id) => {
        navigate(`/portfolio/${id}`,  { replace: true });
    };
    
    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <Banner/>
            <div className={'designer-container'} style={{width: '100%', marginTop:'70px', fontSize:'20px',fontWeight:'500', fontFamily: 'Noto Sans KR, sans-serif'}}> 
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                <div>디자이너의 포트폴리오를 둘러보세요</div>
                <button onClick={()=>navigate('/sda')}style={{cursor: 'pointer',border: 0, outline:0,width:'70px',fontSize:'12px', backgroundColor:'#F5D5CB',appearance: "none", borderRadius:'5px', }}>더보기+</button>    
                </div>
                <div className='portfolio-container' style={{width: '100%', display: 'inline-grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20%, auto))', gap: '3%'}}>
                {portfolios.map((portfolio, index)=>{
                    return (
                    <div key={index} popol-id={portfolio.id} onClick={()=>onClickPortfolio(portfolio.id)}>
                        <Card
                        hoverable
                        cover={<img alt="example" src={portfolio.small_image} />}>
                        <Card.Meta 
                        avatar={<Avatar src={portfolio.profile_image} />} 
                        title={<div style={{position: 'relative', top:'2px'}}>{portfolio.username}</div>}
                        description={<Rate defaultValue={portfolio.average_stars} disabled/>}
                        />
                        </Card>
                    </div>);
                })}
                </div>
            </div>

            <div className={'client-container'} style={{width:'100%', marginTop:'50px', fontSize:'20px', fontWeight:'500',fontFamily: 'Noto Sans KR, sans-serif'}}> 
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                    <div>후기를 둘러보세요</div>
                    <button onClick={()=>navigate('/review')}style={{cursor: 'pointer',border: 0, outline:0,width:'70px',fontSize:'12px', backgroundColor:'#F5D5CB',appearance: "none", borderRadius:'5px', }}>더보기+</button> 
                </div>
                <div className='portfolio-container' style={{width: '100%', display: 'inline-grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20%, auto))', gap: '5%'}}>
                    {requests.map((request)=>
                        <Card
                        hoverable
                        cover={<img alt="example" src={`http://localhost:8000${request.image}`} />}
                    >
                        <Card.Meta 
                        avatar={<Avatar src={request.userProfilePhoto} />} 
                        title={<div style={{position: 'relative', top:'2px'}}>{request.title}</div>}
                        description={<>{request.description}</>} /> 
                    </Card>)}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default HomePage;