import axios from "./axios-lastfm";

export const getTopTracks = (count, page) => {
    const params = {
        method: 'chart.gettoptracks'
    };
    if (count && count > 0) {
        params.limit = count;
    }
    if (page && page > 0) {
        params.page = page;
    }
    return axios.get('', {params});
};
