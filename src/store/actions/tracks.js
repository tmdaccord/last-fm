import {FETCH_TOP_TRACKS_START, FETCH_TRACKS_FAIL, FETCH_TRACKS_SUCCESS} from "./actionTypes";
import * as api from "../../api/tracks";

export const fetchTopTracksStart = () => {
    return {
        type: FETCH_TOP_TRACKS_START
    };
};

export const fetchTracksSuccess = (tracks) => {
    return {
        type: FETCH_TRACKS_SUCCESS,
        tracks
    };
};

export const fetchTracksFail = (error) => {
    return {
        type: FETCH_TRACKS_FAIL,
        error: error
    };
};

export const fetchTopTracks = (count, page) => {
    return dispatch => {
        dispatch(fetchTopTracksStart());
        api.getTopTracks(count, page)
            .then(response => {
                let fetchedTracks = [];
                if (!response.data.tracks || !response.data.tracks.track || response.data.tracks.track.length === 0) {
                    dispatch(fetchTracksFail());
                    return;
                }
                fetchedTracks = response.data.tracks.track.map(track => ({
                    name: track.name,
                    imageUrl: (track.image && track.image.length) ? track.image[0]['#text'] : null,
                    artist: {
                        name: track.artist.name,
                        url: track.artist.url,
                    },
                }));
                dispatch(fetchTracksSuccess(fetchedTracks));
            })
            .catch(error => {
                dispatch(fetchTracksFail());
            });
    };
};
