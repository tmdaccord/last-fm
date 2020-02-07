import {FETCH_TOP_TRACKS_START, FETCH_TRACKS_FAIL, FETCH_TRACKS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    topTracks: [],
    loading: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOP_TRACKS_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_TRACKS_SUCCESS:
            const tracksCount = state.topTracks.reduce((sum, tracks) => sum + tracks.length, 0);
            return {
                topTracks: [...state.topTracks, action.tracks.slice(tracksCount)],
                loading: false,
                error: false
            };
        case FETCH_TRACKS_FAIL:
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
