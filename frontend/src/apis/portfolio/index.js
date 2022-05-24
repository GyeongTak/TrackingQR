
import {instance} from '../utils' 

const getPortfolios = async () => {

    try {
        const result = await instance.get('/api/portfolio/');
        console.log(result);
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}

export { getPortfolios };