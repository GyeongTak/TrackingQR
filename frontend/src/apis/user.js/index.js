
import {instance} from '../utils' 

export const login = async (data) =>{
    try {
        const res = await instance.post('/api/auth/login', data, {headers: { "Content-Type": `application/json`}});
        return res.data;

    } catch (error) {
        console.log(error);
        window.alert(error.response.data);
    }
}

export const logout = async () =>{
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
