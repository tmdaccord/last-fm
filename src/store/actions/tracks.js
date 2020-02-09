import {GET_TOP_TRACKS_START, GET_TRACKS_FAIL, ADD_TOP_TRACKS, SET_TOP_TRACKS} from "./actionTypes";
import * as api from "../../api/tracks";

export const getTopTracksStart = () => {
    return {
        type: GET_TOP_TRACKS_START
    };
};

export const setTopTracks = (tracks, isMoreTracks) => {
    return {
        type: SET_TOP_TRACKS,
        tracks,
        isMoreTracks
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

export const getTopTracks = (count) => {
    return (dispatch) => {
        dispatch(getTopTracksStart());
        api.getTopTracks(count)
            .then(response => {
                if (!isResponseValid(response)) {
                    dispatch(getTracksFail());
                    return;
                }
                const tracks = transformResponseTracks(response.data.tracks.track);
                dispatch(setTopTracks(tracks, isMoreTracks(response)));
            })
            .catch(() => {
                dispatch(getTracksFail());
            });
    };
};

export const getMoreTopTracks = (count) => {
    return (dispatch, getState) => {
        dispatch(getTopTracksStart());
        const loadedTracksCount = getState().tracks.topTracks.length;
        let limit = count;
        let remainder = (loadedTracksCount + count) % limit;
        while (remainder !== 0 && remainder < count) {
            limit++;
            remainder = (loadedTracksCount + count) % limit;
        }
        const page = Math.ceil((loadedTracksCount + count) / limit);
        api.getTopTracks(limit, page)
            .then(response => {
                if (!isResponseValid(response)) {
                    dispatch(getTracksFail());
                    return;
                }
                let responseTracks = response.data.tracks.track;
                if (responseTracks.length > limit) {
                    responseTracks = responseTracks.slice(responseTracks.length - limit);
                }
                if (limit > count) {
                    const startEl = loadedTracksCount % limit;
                    responseTracks = responseTracks.slice(startEl, startEl + count);
                }
                const tracks = transformResponseTracks(responseTracks);
                dispatch(addTopTracks(tracks, isMoreTracks(response)));
            })
            .catch(() => {
                dispatch(getTracksFail());
            });
    };
};

const transformResponseTracks = (tracks) => {
    return tracks.map(track => ({
        name: track.name,
        imageUrl: (track.image && track.image.length) ? track.image.filter(image => (image.size === 'medium'))[0]['#text'] : null,
        artist: {
            name: track.artist.name,
            url: track.artist.url,
        },
    }));
};

const isMoreTracks = (response) => {
    const currentPage = parseInt(response.data.tracks['@attr'].page);
    const totalPages = parseInt(response.data.tracks['@attr'].totalPages);
    return totalPages > currentPage;
};

const isResponseValid = (response) => {
    return response.data.tracks && response.data.tracks.track && response.data.tracks.track.length;
};
