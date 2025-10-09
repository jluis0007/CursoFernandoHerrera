import axios from 'axios';

export const giphyApi = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs',
    params: {
        lang: 'es',
        api_key: /* 'UCVpPYgi5qzUVk7Tya3RGqK8kQMXXO6B' */import.meta.env.VITE_GIPHY_API_KEY,
    }
});