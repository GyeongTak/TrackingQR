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
            console.log(result);
            setPortfolios(result.designer);
            setRequests(result.reviews);
            
        };

        loadRequests();
        console.log(portfolios);
        console.log(requests);
    }, []);

    const onClickPortfolio = (id) => {
        navigate(`/portfolio/${id}`);
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
                <ul style={{display:'flex', listStyle:"none", paddingLeft: '0px'}}>
                {portfolios.map((portfolio, index)=>{
                    return (
                        <li style={{margin: '20px'}}>
                        <div key={index} popol-id={portfolio.id} onClick={()=>onClickPortfolio(portfolio.designer)}>
                            <Card
                            hoverable
                            cover={<img alt="example" src={`http://localhost:8000${portfolio.profile_image}`} />}>
                            <Card.Meta 
                            title={<div style={{position: 'relative', top:'2px'}}>{portfolio.username}</div>}
                            description={<Rate defaultValue={portfolio.average_stars} disabled/>}
                            />
                            </Card>
                        </div>
                        </li>
                    );
                })}
                </ul>
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