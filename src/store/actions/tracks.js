import {GET_TOP_TRACKS_START, GET_TRACKS_FAIL, GET_TRACKS_SUCCESS} from "./actionTypes";
import * as api from "../../api/tracks";

export const getTopTracksStart = () => {
    return {
        type: GET_TOP_TRACKS_START
    };
};

export const getTracksSuccess = (tracks) => {
    return {
        type: GET_TRACKS_SUCCESS,
        tracks
    };
};

export const getTracksFail = (error) => {
    return {
        type: GET_TRACKS_FAIL,
        error: error
    };
};

export const getTopTracks = (count, page) => {
    return dispatch => {
        dispatch(getTopTracksStart());
        api.getTopTracks(count, page)
            .then(response => {
                let tracks = [];
                if (!response.data.tracks || !response.data.tracks.track || response.data.tracks.track.length === 0) {
                    dispatch(getTracksFail());
                    return;
                }
                tracks = response.data.tracks.track.map(track => ({
                    name: track.name,
                    imageUrl: (track.image && track.image.length) ? track.image[0]['#text'] : null,
                    artist: {
                        name: track.artist.name,
                        url: track.artist.url,
                    },
                }));
                dispatch(getTracksSuccess(tracks));
            })
            .catch(error => {
                dispatch(getTracksFail());
            });
    };
};
