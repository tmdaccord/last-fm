import axios from "./axios-lastfm";

export const getArtistInfo = (name) => {
    const params = {
        method: 'artist.getinfo',
        artist: name
    };
    return axios.get('', {params});
};
