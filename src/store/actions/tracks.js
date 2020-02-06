import axios from '../../axios-lastfm';

import {FETCH_TOP_TRACKS_START, FETCH_TRACKS_FAIL, FETCH_TRACKS_SUCCESS} from "./actionTypes";

export const fetchTopTracksStart = () => {
    return {
        type: FETCH_TOP_TRACKS_START
    };
};

export const fetchTracksSuccess = ( tracks ) => {
    return {
        type: FETCH_TRACKS_SUCCESS,
        tracks
    };
};

export const fetchTracksFail = ( error ) => {
    return {
        type: FETCH_TRACKS_FAIL,
        error: error
    };
};


export const fetchTopTracks = () => {
    return dispatch => {
        dispatch(fetchTopTracksStart());
        axios.get( '&method=chart.gettoptracks' )
            .then( response => {
                const fetchedTracks = [];
                console.log(response);
                dispatch(fetchTracksSuccess(fetchedTracks));
            } )
            .catch( error => {
                console.log(error);
                dispatch(fetchTracksFail(error));
            } );
    };
};
