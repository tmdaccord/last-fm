import {GET_ARTIST_FAIL, GET_ARTIST_SUCCESS} from "../actions/actionTypes";

const initialState = {
    artistInfo: null,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTIST_SUCCESS:
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
