import React, {Component} from 'react';

import TracksList from "../../components/TracksList/TracksList";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from '../../api/axios-lastfm';
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";
import * as api from "../../api/tracks";
import ShowMore from "../../components/TracksList/ShowMore/ShowMore";

class Search extends Component {
    state = {
        query: '',
        tracksList: [],
        pageNum: 1,
        loading: true,
        isMoreTracks: false,
        error: false
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const searchQuery = params.get('q');
        this.searchTracks(searchQuery);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.location.search !== this.props.location.search) {
            const params = new URLSearchParams(this.props.location.search);
            const searchQuery = params.get('q');
            this.searchTracks(searchQuery);
        }
    }

    handleClick = () => {
        this.setState({
            loading: true
        });
        this.searchTracks(this.state.query);
    };

    searchTracks = (query) => {
        const isLoadMore = this.state.query === query;
        api.searchTracks(query, 15, isLoadMore ? this.state.pageNum : 1)
            .then(response => {
                if (!response.data.results || !response.data.results.trackmatches || !response.data.results.trackmatches.track) {
                    this.searchError();
                    return;
                }
                let responseTracks = response.data.results.trackmatches.track;
                if (isLoadMore && responseTracks.length > this.state.tracksList.length) {
                    responseTracks = responseTracks.slice(this.state.tracksList.length);
                }
                const tracks = this.transformResponseTracks(responseTracks);
                const tracksList = isLoadMore ? [...this.state.tracksList, ...tracks] : tracks;
                this.setState({
                    query,
                    tracksList,
                    loading: false,
                    isMoreTracks: this.isMoreTracks(response),
                    error: false
                });
            })
            .catch(() => {
                this.searchError();
            });
    };

    transformResponseTracks = (tracks) => {
        return tracks.map(track => ({
            name: track.name,
            imageUrl: (track.image && track.image.length) ? track.image[0]['#text'] : null,
            artist: {
                name: track.artist
            },
        }));
    };

    isMoreTracks = (response) => {
        const totalResults = parseInt(response.data.results['opensearch:totalResults']);
        const loadedResults = parseInt(response.data.results['opensearch:startIndex']) + parseInt(response.data.results['opensearch:itemsPerPage']);
        return totalResults > loadedResults;
    };

    isResponseValid = (response) => {
        return response.data.tracks && response.data.tracks.track && response.data.tracks.track.length;
    };

    searchError = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    render() {
        let title = this.state.loading ? null : <h2 className="page-title">Search results for: '{this.state.query}'</h2>;
        let tracksList;
        if (this.state.tracksList.length) {
            tracksList = this.state.error ? <Error message='Something wrong.'/> : <TracksList tracks={this.state.tracksList}/>;
        } else {
            tracksList = <p className="text-center">No tracks found.</p>;
        }

        const loader = this.state.loading ? <Loader/> : null;
        const moreButton = this.state.isMoreTracks ? <ShowMore onClick={this.handleClick} /> : null;

        return (
            <React.Fragment>
                {title}
                {tracksList}
                {loader}
                {moreButton}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(Search, axios);
