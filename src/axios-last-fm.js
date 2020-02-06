import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://www.last.fm/api/'
});

export default instance;
