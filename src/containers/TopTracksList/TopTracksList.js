import React, {Component} from 'react';
import {connect} from 'react-redux';

import TracksList from "../../components/TracksList/TracksList";
import {getTopTracks} from "../../store/actions/tracks";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from '../../api/axios-lastfm';
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";

class TopTracksList extends Component {
    componentDidMount() {
        this.props.getTopTracks(5);
    }

    onClickHandler = () => {
        this.props.getTopTracks(15, this.props.tracks.length);
    };

    render() {
        let tracksLists = this.props.tracks.map((tracksList, index) => (
            (this.props.error && !tracksList.length) ? <Error message='Something wrong.'/> :
                <TracksList key={index} tracks={tracksList}/>
        ));

        const loader = this.props.loading ? <Loader/> : null;
        const moreButton = this.props.isMoreTracks ? <button onClick={this.onClickHandler}>Show More</button> : null;

        return (
            <React.Fragment>
                <h2>Top Tracks</h2>
                {tracksLists}
                {loader}
                {moreButton}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        tracks: state.tracks.topTracks,
        loading: state.tracks.loading,
        isMoreTracks: state.tracks.isMoreTracks,
        error: state.tracks.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopTracks: (limit, page) => dispatch(getTopTracks(limit, page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(TopTracksList, axios));
