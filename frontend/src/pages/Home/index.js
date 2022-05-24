import React, { useState, useEffect} from 'react';
import MainMenu from '../../components/MainMenu';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import { Card, Avatar } from 'antd';
import { StarTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import Item from 'antd/lib/list/Item';
import axios from 'axios';
import { getPortfolios } from 'apis/portfolio';

const dummyData = [
    {
        imageSrc : 'https://cdn.pixabay.com/photo/2017/09/25/13/12/cocker-spaniel-2785074_960_720.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userName: 'userName1',
    },{
        imageSrc : 'https://cdn.pixabay.com/photo/2017/09/25/13/12/cocker-spaniel-2785074_960_720.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userName: 'userName2',
    },
    {
        imageSrc : 'https://cdn.pixabay.com/photo/2017/09/25/13/12/cocker-spaniel-2785074_960_720.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userName: 'userName3',
    },
    {
        imageSrc : 'https://cdn.pixabay.com/photo/2017/09/25/13/12/cocker-spaniel-2785074_960_720.jpg',
        userProfilePhoto: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        userName: 'userName4',
    },
];

const HomePage = () => {

    const [ portfolios, setPortfolios ] = useState([]);

    useEffect(() => {

        const getPortfoliosList = async () => {
            const result = await getPortfolios();
            console.log(result);
            setPortfolios([...result]);
        }
        
        getPortfoliosList();
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
                    {portfolios.map((post)=>
                        <Card
                        hoverable
                        cover={<img alt="portfolio" src={`http://localhost:8000${post["Image"]}`} />}
                        >
                            <Card.Meta 
                            avatar={<Avatar />} 
                            title={<div style={{position: 'relative', top:'2px'}}>{post.designer}
                            <StarTwoTone style={{position: 'absolute', right:'0'}} twoToneColor='rgb(255, 107, 27)'/></div>}
                            description={'hello world'} />
                        </Card>
                    )}
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
                    {dummyData.map((post)=>
                        <Card
                        hoverable
                        cover={<img alt="example" src={post.imageSrc} />}
                    >
                        <Card.Meta 
                        avatar={<Avatar src={post.userProfilePhoto} />} 
                        title={<div style={{position: 'relative', top:'2px'}}>{post.userName}
                        <StarTwoTone style={{position: 'absolute', right:'35px', top:'7px'}} twoToneColor='rgb(255, 107, 27)'/></div>}
                        description={'hello'}/>
                    </Card>)}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default HomePage;