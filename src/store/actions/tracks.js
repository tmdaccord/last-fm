import {GET_TOP_TRACKS_START, GET_TRACKS_FAIL, ADD_TOP_TRACKS} from "./actionTypes";
import * as api from "../../api/tracks";

export const getTopTracksStart = () => {
    return {
        type: GET_TOP_TRACKS_START
    };
};

export const addTopTracks = (tracks, isMoreTracks) => {
    return {
        type: ADD_TOP_TRACKS,
        tracks,
        isMoreTracks
    };
};

export const getTracksFail = (error) => {
    return {
        type: GET_TRACKS_FAIL,
        error: error
    };
};

export const getTopTracks = (limit, page) => {
    return (dispatch, getState) => {
        dispatch(getTopTracksStart());
        api.getTopTracks(limit, page)
            .then(response => {
                if (!response.data.tracks || !response.data.tracks.track || response.data.tracks.track.length === 0) {
                    dispatch(getTracksFail());
                    return;
                }
                let tracks = response.data.tracks.track;
                const tracksCount = getState().tracks.topTracks.reduce((sum, tracks) => sum + tracks.length, 0);
                if (tracks.length > tracksCount) {
                    tracks = tracks.slice(tracksCount);
                }
                if (tracks.length > limit && tracks.length < tracksCount) {
                    tracks = tracks.slice(limit);
                }
                tracks = tracks.map(track => ({
                    name: track.name,
                    imageUrl: (track.image && track.image.length) ? track.image[0]['#text'] : null,
                    artist: {
                        name: track.artist.name,
                        url: track.artist.url,
                    },
                }));
                let currentPage = parseInt(response.data.tracks['@attr'].page);
                let totalPages = parseInt(response.data.tracks['@attr'].totalPages);
                dispatch(addTopTracks(tracks, totalPages > currentPage));
            })
            .catch(error => {
                dispatch(getTracksFail());
            });
    };
};
