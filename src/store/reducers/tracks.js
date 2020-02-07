import {GET_TOP_TRACKS_START, GET_TRACKS_FAIL, ADD_TOP_TRACKS} from "../actions/actionTypes";

const initialState = {
    topTracks: [],
    loading: false,
    isMoreTracks: true,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TOP_TRACKS_START:
            return {
                ...state,
                loading: true
            };
        case ADD_TOP_TRACKS:
            return {
                topTracks: [...state.topTracks, action.tracks],
                loading: false,
                isMoreTracks: action.isMoreTracks,
                error: false
            };
        case GET_TRACKS_FAIL:
            return {
                ...state,
                loading: false,
                isMoreTracks: false,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
