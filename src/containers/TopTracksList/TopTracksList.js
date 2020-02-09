import React, {Component} from 'react';
import {connect} from 'react-redux';

import TracksList from "../../components/TracksList/TracksList";
import {getMoreTopTracks, getTopTracks} from "../../store/actions/tracks";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from '../../api/axios-lastfm';
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";
import ShowMore from "../../components/TracksList/ShowMore/ShowMore";
import PropTypes from "prop-types";

class TopTracksList extends Component {
    componentDidMount() {
        this.props.getTracks(5);
    }

    handleClick = () => {
        this.props.getMoreTracks(15);
    };

    render() {
        const tracksList = (this.props.error && !this.props.tracksList.length) ? <Error message='Something wrong.'/> :
            <TracksList tracks={this.props.tracksList}/>;

        const loader = this.props.loading ? <Loader/> : null;
        const moreButton = this.props.isMoreTracks ? <ShowMore onClick={this.handleClick}/> : null;

        return (
            <React.Fragment>
                <h2 className="page-title">Top Tracks</h2>
                {tracksList}
                {loader}
                {moreButton}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        tracksList: state.tracks.topTracks,
        loading: state.tracks.loading,
        isMoreTracks: state.tracks.isMoreTracks,
        error: state.tracks.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTracks: (count) => dispatch(getTopTracks(count)),
        getMoreTracks: (count) => dispatch(getMoreTopTracks(count))
    };
};

TopTracksList.propTypes = {
    tracksList: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        artist: PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string
        })
    })).isRequired,
    loading: PropTypes.bool.isRequired,
    isMoreTracks: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(TopTracksList, axios));
