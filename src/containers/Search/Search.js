import React, {Component} from 'react';

import TracksList from "../../components/TracksList/TracksList";
import withErrorHandler from "../../hoc/withErrorHandler";
import axios from '../../api/axios-lastfm';
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";
import * as api from "../../api/tracks";

class Search extends Component {
    state = {
        query: '',
        tracks: [],
        loading: true,
        isMoreTracks: false,
        error: false
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const searchQuery = params.get('q');
        this.setState({
            query: searchQuery
        });
        this.searchTracks(searchQuery, 15);
    }

    onClickHandler = () => {
        this.setState({
            loading: true
        });
        this.searchTracks(this.state.query, 15, this.state.tracks.length + 1);
    };

    searchTracks = (query, limit, page) => {
        api.searchTracks(query, limit, page)
            .then(response => {
                if (!response.data.results || !response.data.results.trackmatches || !response.data.results.trackmatches.track) {
                    this.setState({
                        error: true,
                        loading: false
                    });
                    return;
                }
                let responseTracks = response.data.results.trackmatches.track;
                if (!responseTracks.length) {
                    this.setState({
                        loading: false
                    });
                    return;
                }
                const tracksCount = this.state.tracks.reduce((sum, tracks) => sum + tracks.length, 0);
                if (responseTracks.length > tracksCount) {
                    responseTracks = responseTracks.slice(tracksCount);
                }
                const tracks = this.transformResponseTracks(responseTracks);
                const totalResults = parseInt(response.data.results['opensearch:totalResults']);
                const loadedResults = parseInt(response.data.results['opensearch:startIndex']) + parseInt(response.data.results['opensearch:itemsPerPage']);
                this.setState(state => ({
                    tracks: [...state.tracks, tracks],
                    loading: false,
                    isMoreTracks: totalResults > loadedResults,
                    error: false
                }));
            })
            .catch(error => {
                this.setState({
                    error: true,
                    loading: false
                });
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

    render() {
        let tracksLists = this.state.loading ? null : <p>No tracks found.</p>;

        if (this.state.tracks.length) {
            tracksLists = this.state.tracks.map((tracksList, index) => (
                (this.state.error && !tracksList.length) ? <Error message='Something wrong.'/> :
                    <TracksList key={index} tracks={tracksList}/>
            ));
        }

        const loader = this.state.loading ? <Loader/> : null;
        const moreButton = this.state.isMoreTracks ? <button onClick={this.onClickHandler}>Show More</button> : null;

        return (
            <React.Fragment>
                <h2>Search results for: '{this.state.query}'</h2>
                {tracksLists}
                {loader}
                {moreButton}
            </React.Fragment>
        );
    }
}

export default withErrorHandler(Search, axios);
