
import {instance} from '../utils' 

export const postRequest = async (data) =>{
    try {
        const res = await instance.post('/api/client_commission/create_commission', data, {headers: { "Content-Type": 'multipart/form-data'}}); //json???
        return res.data;

    } catch (error) {
        console.log(error);
        window.alert(error.response.data);
    }
}