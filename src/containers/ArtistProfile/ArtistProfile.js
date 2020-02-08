import React, {Component} from 'react';
import {connect} from 'react-redux';

import withErrorHandler from "../../hoc/withErrorHandler";
import axios from '../../api/axios-lastfm';
import classes from './ArtistProfile.module.scss';
import Error from "../../components/UI/Error/Error";
import Loader from "../../components/UI/Loader/Loader";
import {getArtist} from "../../store/actions/artist";
import artistImg from "../../assets/images/artist.png";

class ArtistProfile extends Component {
    componentDidMount() {
        this.props.getArtistInfo(this.props.match.params.name);
    }

    render() {
        let profile = this.props.error ? <Error message='The artist could not be found.'/> : <Loader/>;

        if (this.props.artist) {
            const tags = (
                this.props.artist.tags.map(tag => (
                    <li key={tag.name}><a href={tag.url}>{tag.name}</a></li>
                ))
            );

            profile = (
                <div className={classes.ArtistProfile}>
                    <h2>{this.props.artist.name}</h2>
                    <p>{this.props.artist.bio}</p>
                    <img src={this.props.artist.image ? this.props.artist.image : artistImg} alt=""/>
                    <ul className={classes.TagsList}>{tags}</ul>
                </div>
            );
        }

        return profile;
    }
}

const mapStateToProps = state => {
    return {
        artist: state.artist.artistInfo,
        error: state.artist.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getArtistInfo: (name) => dispatch(getArtist(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ArtistProfile, axios));
