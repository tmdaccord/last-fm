import {GET_ARTIST_FAIL, SET_ARTIST} from "./actionTypes";
import * as api from "../../api/artists";

export const setArtist = (artist) => {
    return {
        type: SET_ARTIST,
        artist
    };
};

export const getArtistFail = (error) => {
    return {
        type: GET_ARTIST_FAIL,
        error: error
    };
};

export const getArtist = (name) => {
    return dispatch => {
        api.getArtistInfo(name)
            .then(response => {
                const responseArtist = response.data.artist;
                if (!responseArtist) {
                    dispatch(getArtistFail());
                    return;
                }
                const artist = {
                    name: responseArtist.name,
                    bio: responseArtist.bio.content,
                    image: (responseArtist.image && responseArtist.image.length) ? responseArtist.image[0]['#text'] : null,
                    tags: responseArtist.tags.tag
                };
                dispatch(setArtist(artist));
            })
            .catch(error => {
                dispatch(getArtistFail());
            });
    };
};
