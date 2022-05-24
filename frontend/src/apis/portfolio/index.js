
import {instance} from '../utils' 

const getPortfolios = async () => {

    try {
        const result = await instance.get('/api/portfolio');
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}

const getPortfolio = async (data) => {

    try {
        const result = await instance.get(`/api/portfolio/detail/${data}`);
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}


const postPortfolio = async () => {

    try {
        const result = await instance.get('/api/portfolio/new');
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}


export { getPortfolios, getPortfolio, postPortfolio };