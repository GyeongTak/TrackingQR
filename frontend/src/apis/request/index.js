
import {instance} from '../utils' 

export const postRequest = async (data) => {

    const token = localStorage.getItem('token');
    try {
        const res = await instance.post('/api/client_commission/create_commission', data, {headers: { "Content-Type": 'multipart/form-data',
        Authorization : "Token" + token}}); //json???
        return res.data;

    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}


export const getRequests = async () =>{
    try {
        const res = await instance.get('/api/client_commission/commission_view', );
        return res.data;

    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}


export const getRequestsMain = async () =>{
    try {
        const res = await instance.get('');
        return res.data;

    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}
