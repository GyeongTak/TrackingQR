
import {instance} from '../utils' 

const login = async (data) =>{
    try {
        const res = await instance.post('/api/auth/login', data, {headers: { "Content-Type": `application/json`}});
        return res.data;

    } catch (error) {
        console.log(error);
        window.alert(error.response.data);
    }
}

const logout = async () =>{
    try {
        const token = localStorage.getItem('token');
        await instance.post('http://localhost:8000/api/auth/logout', {
            headers: { 
                "Content-Type": `application/json`,
                Authorization : "Token" + token,
            }});
        

    } catch (error) {
        console.log(error);
        window.alert(error.response.data);
    }
}

const loadMyInfo = async () => {
    try {
        const token = localStorage.getItem('token');
        const result = await instance.get('/api/mypage/getMyInfo', {
            headers: { 
                "Content-Type": `application/json`,
                Authorization : "Token " + token,
            }});
        
        return result.data;
    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}

/*
const loadMyInfo = async () =>{
    try {
        const token = localStorage.getItem('token');
        await instance.get('api/mypage', {
            headers: { 
                "Content-Type": `application/json`,
                Authorization : "Token" + token,
            }});
            
    } catch (error) {
        console.log(error);
        window.alert(error.response.data);
    }
}
*/

export {login, logout, loadMyInfo};