import React, {Component} from 'react';
import {connect} from 'react-redux';

import TracksList from "../../components/TracksList/TracksList";
import {fetchTopTracks} from "../../store/actions/tracks";

class TopTracksList extends Component {
    componentDidMount () {
        this.props.fetchTopTracks();
    }

    render() {
        return (
            <React.Fragment>
                <h2>Top Tracks</h2>
                <TracksList/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        tracks: state.tracks.tracks
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopTracks: () => dispatch(fetchTopTracks())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopTracksList);
