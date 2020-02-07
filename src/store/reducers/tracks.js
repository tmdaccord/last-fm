import {GET_TOP_TRACKS_START, GET_TRACKS_FAIL, GET_TRACKS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    topTracks: [],
    loading: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOP_TRACKS_START:
            return {
                ...state,
                loading: true
            };
        case GET_TRACKS_SUCCESS:
            const tracksCount = state.topTracks.reduce((sum, tracks) => sum + tracks.length, 0);
            return {
                topTracks: [...state.topTracks, action.tracks.slice(tracksCount)],
                loading: false,
                error: false
            };
        case GET_TRACKS_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
