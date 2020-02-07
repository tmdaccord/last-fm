import {GET_ARTIST_FAIL, SET_ARTIST} from "../actions/actionTypes";

const initialState = {
    artistInfo: null,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ARTIST:
            return {
                artistInfo: action.artist,
                error: false
            };
        case GET_ARTIST_FAIL:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
