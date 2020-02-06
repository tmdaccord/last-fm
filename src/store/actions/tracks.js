import axios from '../../axios-lastfm';

import {FETCH_TOP_TRACKS_START, FETCH_TRACKS_FAIL, FETCH_TRACKS_SUCCESS} from "./actionTypes";

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


export const fetchTopTracks = (count) => {
    return dispatch => {
        dispatch(fetchTopTracksStart());
        const params = {
            method: 'chart.gettoptracks'
        };
        if (count && count > 0) {
            params.limit = count;
        }
        axios.get('', {params})
            .then(response => {
                console.log(response);
                let fetchedTracks = [];
                if (!response.data.tracks || !response.data.tracks.track) {
                    dispatch(fetchTracksFail(new Error('There’s no tracks are available.')))
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
                dispatch(fetchTracksFail(error));
            });
    };
};
