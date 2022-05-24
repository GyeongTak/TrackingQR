import React, { useEffect, useState } from 'react';
import MainMenu from '../../components/MainMenu';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import { Card, Avatar } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import { getPortfolios } from '../../apis/portfolio';
import { getRequests } from '../../apis/request';

const HomePage = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [requests , setRequests] = useState([]);

    useEffect(() => {
        getPortfolios()
        .then(result => {
            setPortfolios(result);
        })
        .catch(error=>{
            console.error(error);
        })
    }, []);

    useEffect(() => {
        getRequests()
        .then(result => {
            setRequests(result);
        })
        .catch(error=>{
            console.error(error);
        })
    }, []);

    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <Banner/>
            <div className={'designer-container'} style={{width:'100%', marginTop:'70px', fontSize:'20px', fontWeight: 'bold'}}> 
                디자이너
                <Link to="/sda">
                    <button id='more_d' style={{width:'70px', position:'absolute', marginLeft:'1070px', fontSize:'12px', backgroundColor:'antiquewhite', 
                    color:'brown', borderColor:'rgb(222, 197, 164)', borderStyle:'solid', borderRadius:'10', borderWidth:'1'}}>더보기+</button>
                </Link>
                <hr></hr>
                <div className='portfolio-container' style={{width: '100%', display: 'inline-grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20%, auto))', gap: '5%'}}>
                    {portfolios.map((portfolio)=>
                        <Card
                        hoverable
                        cover={<img alt="example" src={portfolio.imageSrc} />}
                    >
                        <Card.Meta 
                        avatar={<Avatar src={portfolio.userProfilePhoto} />} 
                        title={<div style={{position: 'relative', top:'2px'}}>{portfolio.userName}
                        <HeartTwoTone style={{position: 'absolute', right:'0'}} twoToneColor='#ff69b4'/></div>} />
                    </Card>)}
                </div>
            </div>

            <div className={'client-container'} style={{width:'100%', marginTop:'50px', fontSize:'20px', fontWeight: 'bold'}}> 
                고객후기
                <Link to="/review">
                    <button id='more_c' style={{position:'absolute', width:'70px', marginLeft:'1070px', fontSize:'12px', backgroundColor:'antiquewhite', 
                        color:'brown', borderColor:'rgb(222, 197, 164)', borderStyle:'solid', borderRadius:'10', borderWidth:'1'}}>더보기+</button>
                </Link>
                <hr></hr>
                <div className='portfolio-container' style={{width: '100%', display: 'inline-grid', gridTemplateColumns: 'repeat(auto-fill, minmax(20%, auto))', gap: '5%'}}>
                    {requests.map((request)=>
                        <Card
                        hoverable
                        cover={<img alt="example" src={request.imageSrc} />}
                    >
                        <Card.Meta 
                        avatar={<Avatar src={request.userProfilePhoto} />} 
                        title={<div style={{position: 'relative', top:'2px'}}>{request.userName}
                        <HeartTwoTone style={{position: 'absolute', right:'0'}} twoToneColor='#ff69b4'/></div>} />
                    </Card>)}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default HomePage;