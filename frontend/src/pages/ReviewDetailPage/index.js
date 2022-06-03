import React, {useEffect, useState} from 'react';
import MainMenu from '../../components/MainMenu';
import { getReview } from '../../apis/review';
import { useParams} from 'react-router-dom';

const ReviewDetailPage = () => {
    const { id } = useParams();
    const [review, setReview] = useState({});

    useEffect(()=>{

        const loadReview = async () => {
            const review = await getReview(id);
            setReview(review);
        }

        loadReview();
    }, []); 

    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
    
        </div>
        </>
    );
}

export default ReviewDetailPage;