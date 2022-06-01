
import {instance} from '../utils' 

const postRequest = async (data) => {

    const token = localStorage.getItem('token');
    try {
        const res = await instance.post('/api/client_commission/create_commission', data, {headers: { "Content-Type": 'multipart/form-data',
        Authorization : "Token " + token}}); //json???
        return res.data;

    } catch (error) {
        console.error(error);
        //alert(error.response.data);
    }
}

const getRequest = async (id) => {
    try {
        const res = await instance.get(`/api/client_commission/commission_view_detail/${id}` );
        return res.data;

    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}
const getRequests = async () =>{
    try {
        const res = await instance.get('/api/client_commission/commission_view', );
        return res.data;

    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}


const getRequestsMain = async () =>{
    try {
        const res = await instance.get('');
        return res.data;

    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}

const patchSelectDesigner = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const res = await instance.post('/api/mypage/designer_selected_for_commission', data,
        {headers: { Authorization : "Token " + token}});
        return res.data;
    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}

export { postRequest,getRequest, getRequests,getRequestsMain,patchSelectDesigner };