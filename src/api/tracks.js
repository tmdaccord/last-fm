import axios from "./axios-lastfm";

export const getTopTracks = (limit, page) => {
    const params = {
        method: 'chart.gettoptracks'
    };
    if (limit && limit > 0) {
        params.limit = limit;
    }
    if (page && page > 0) {
        params.page = page;
    }
    return axios.get('', {params});
};

export const searchTracks = (name, limit, page) => {
    const params = {
        method: 'track.search',
        track: name
    };
    if (limit && limit > 0) {
        params.limit = limit;
    }
    if (page && page > 0) {
        params.page = page;
    }
    return axios.get('', {params});
};
