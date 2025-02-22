import React from 'react';
import classes from './Track.module.scss';
import trackImg from '../../../assets/images/track.png';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const Track = (props) => {
    return (
        <div className={classes.Track}>
            <div className={classes.Img}>
                <img src={props.imageUrl ? props.imageUrl : trackImg} alt={props.name}/>
            </div>
            <div>
                <h5>{props.name}</h5>
                <h6>
                    <Link to={`/artist/${props.artistName}`}>{props.artistName}</Link>
                    {props.artistUrl ? <a className={classes.Link} href={props.artistUrl}>last.fm</a> : null}
                </h6>
            </div>
        </div>
    );
};

Track.protTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    artistUrl: PropTypes.string
};

export default Track;
