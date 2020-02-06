import axios from 'axios';

const API_KEY = '0743ba38777a4ce9e583ef4927e258d5';

const instance = axios.create({
    baseURL: `http://ws.audioscrobbler.com/2.0/?api_key=${API_KEY}format=json`
});

export default instance;
