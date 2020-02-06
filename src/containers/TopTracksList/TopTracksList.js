import React, {Component} from 'react';
import {connect} from 'react-redux';

import TracksList from "../../components/TracksList/TracksList";
import {fetchTopTracks} from "../../store/actions/tracks";

class TopTracksList extends Component {
    componentDidMount() {
        this.props.fetchTopTracks(5);
    }

    render() {
        return (
            <React.Fragment>
                <h2>Top Tracks</h2>
                <TracksList tracks={this.props.tracks}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        tracks: state.tracks.topTracks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopTracks: (count) => dispatch(fetchTopTracks(count))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopTracksList);
