import {instance} from '../utils' 

export const postProject = async (data) => {

    const token = localStorage.getItem('token');
    try {
        const res = await instance.post('/api/portfolio/projects/image_handler', data, {headers: { "Content-Type": 'multipart/form-data',
        Authorization : "Token " + token}}); //json???
        return res.data;

    } catch (error) {
        console.error(error);
        //alert(error.response.data);
    }
}

export const postAllProject = async (data) => {

    const token = localStorage.getItem('token');
    try {
        const res = await instance.post('/api/portfolio/projects/create_project', data, {headers: { "Content-Type": 'multipart/form-data',
        Authorization : "Token " + token}}); //json???
        return res.data;

    } catch (error) {
        console.error(error);
        //alert(error.response.data);
    }
}