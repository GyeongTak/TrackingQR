
import {instance} from '../utils' 

const getPortfolios = async () => {

    try {
        const result = await instance.get('/api/portfolio/');
<<<<<<< HEAD
        console.log(result);
=======
>>>>>>> bfb3a0865a3c8fe288309c2d69a95b0d4ff0f469
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}

export { getPortfolios };