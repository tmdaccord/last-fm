import {FETCH_TOP_TRACKS_START, FETCH_TRACKS_FAIL, FETCH_TRACKS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    topTracks: [],
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOP_TRACKS_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_TRACKS_SUCCESS:
            return {
                topTracks: action.tracks,
                loading: false
            };
        case FETCH_TRACKS_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;
