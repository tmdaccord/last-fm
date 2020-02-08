import {GET_ARTIST_FAIL, GET_ARTIST_START, SET_ARTIST} from "../actions/actionTypes";

const initialState = {
    artistInfo: null,
    loading: false,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTIST_START:
            return {
                ...state,
                loading: true
            };
        case SET_ARTIST:
            return {
                artistInfo: action.artist,
                loading: false,
                error: false
            };
        case GET_ARTIST_FAIL:
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
