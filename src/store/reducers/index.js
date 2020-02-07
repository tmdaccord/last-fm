import {combineReducers} from "redux";

import tracksReducer from './tracks';
import artistReducer from './artist';

export default combineReducers({
    tracks: tracksReducer,
    artist: artistReducer
});
