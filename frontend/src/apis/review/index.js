
import {instance} from '../utils' 

const postReview = async (data) => {

    const token = localStorage.getItem('token');
    try {
        const result = await instance.post('/api/review/create_review', data, {headers: { "Content-Type": 'multipart/form-data',
        Authorization : "Token " + token}});//
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}


export { postReview };