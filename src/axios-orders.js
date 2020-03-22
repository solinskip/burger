import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-e56f2.firebaseio.com/'
});

export default instance;