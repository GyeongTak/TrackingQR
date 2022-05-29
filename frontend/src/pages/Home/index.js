import React, { useEffect, useState } from 'react';
import MainMenu from '../../components/MainMenu';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import { Card, Avatar } from 'antd';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import { getPortfolios } from '../../apis/portfolio';
import { getRequests, getRequestsMain} from '../../apis/request';

const HomePage = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [requests , setRequests] = useState([]);

    useEffect(()=>{

        const loadRequests = async () => {
            const result = await getRequestsMain();
            setPortfolios(result.designer);
            setRequests(result.reviews);
        };

        loadRequests();

    }, []);
    
    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <Banner/>
<<<<<<< HEAD
            <div className={'designer-container'} style={{width:'100%', marginTop:'70px', fontSize:'20px', fontWeight: 'bold'}}> 
                디자이너
                <Link to="/sda">
                    <button id='more_d' style={{width:'70px', position:'absolute', marginLeft:'1070px', fontSize:'12px', backgroundColor:'antiquewhite', 
                    color:'brown', borderColor:'rgb(222, 197, 164)', borderStyle:'solid', borderRadius:'10', borderWidth:'1'}}>더보기+</button>
                </Link>
                <hr></hr>
                <div className='portfolio-container' style={{width: '100%', display: 'inline-grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20%, auto))', gap: '5%'}}>
                    {portfolios.map((portfolio)=>
=======
            <div className={'designer-container'} style={{width: '100%', marginTop:'70px', fontSize:'20px',fontWeight:'500', fontFamily: 'Noto Sans KR, sans-serif'}}> 
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                <div>디자이너의 포트폴리오를 둘러보세요</div>
                <button onClick={()=>navigate('/sda')}style={{cursor: 'pointer',border: 0, outline:0,width:'70px',fontSize:'12px', backgroundColor:'#F5D5CB',appearance: "none", borderRadius:'5px', }}>더보기+</button>    
                </div>
                <div className='portfolio-container' style={{width: '100%', display: 'inline-grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20%, auto))', gap: '3%'}}>
                {portfolios.map((portfolio, index)=>{
                    return (
                    <div key={index} popol-id={portfolio.id} onClick={()=>onClickPortfolio(portfolio.id)}>
>>>>>>> f88f45312371cf5d26e6cec04452f8b78c4d2472
                        <Card
                        hoverable
                        cover={<img alt="example" src={portfolio.imageSrc} />}
                    >
                        <Card.Meta 
                        avatar={<Avatar src={portfolio.userProfilePhoto} />} 
                        title={<div style={{position: 'relative', top:'2px'}}>{portfolio.userName}</div>} 
                        />
                    </Card>)}
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
                        cover={<img alt="example" src={'127.0.0.1:8000{}'.imageSrc} />}
                    >
                        <Card.Meta 
                        avatar={<Avatar src={request.userProfilePhoto} />} 
                        title={<div style={{position: 'relative', top:'2px'}}>{request.userName}</div>} />
                    </Card>)}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default HomePage;