import React, {Component} from 'react';
import {connect} from 'react-redux';

import TracksList from "../../components/TracksList/TracksList";
import {fetchTopTracks} from "../../store/actions/tracks";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from '../../api/axios-lastfm';
import Error from "../../components/Error/Error";

class TopTracksList extends Component {
    componentDidMount() {
        this.props.fetchTopTracks(5);
    }

    onClickHandler = () => {
        this.props.fetchTopTracks(15, this.props.tracks.length);
    };

    render() {
        let tracksLists = this.props.tracks.map((tracksList, index) => (
            (this.props.error && !tracksList.length) ? <Error message='Something wrong.'/> :
                <TracksList key={index} tracks={tracksList}/>
        ));

        return (
            <React.Fragment>
                <h2>Top Tracks</h2>
                {tracksLists}
                <button onClick={this.onClickHandler}>Show More</button>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        tracks: state.tracks.topTracks,
        error: state.tracks.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopTracks: (count, page) => dispatch(fetchTopTracks(count, page))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(TopTracksList, axios));
