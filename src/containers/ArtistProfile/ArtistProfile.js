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

        if (this.props.artist && !this.props.loading) {
            const tags = (
                this.props.artist.tags.map(tag => (
                    <li key={tag.name}><a href={tag.url}>{tag.name}</a></li>
                ))
            );

            profile = (
                <div className={classes.ArtistProfile + ' row'}>
                    <div className="col-12 col-sm-3">
                        <img src={this.props.artist.image ? this.props.artist.image : artistImg} alt=""/>
                    </div>
                    <div className="col-12 col-sm-9">
                        <h3>{this.props.artist.name}</h3>
                        <div className={classes.Bio} dangerouslySetInnerHTML={{__html: this.props.artist.bio}}/>
                        <ul className={classes.TagsList}>{tags}</ul>
                    </div>
                </div>
            );
        }

        return profile;
    }
}

const mapStateToProps = state => {
    return {
        artist: state.artist.artistInfo,
        loading: state.artist.loading,
        error: state.artist.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getArtistInfo: (name) => dispatch(getArtist(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ArtistProfile, axios));
