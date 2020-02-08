import React from 'react';
import classes from './Track.module.scss';
import trackImg from '../../../assets/images/track.png';
import {Link} from "react-router-dom";

const Track = (props) => {
    const artist = props.artistUrl ? <a href={props.artistUrl}>Artist Link</a> : null;
    return (
        <div className={classes.Track}>
            <h4>{props.name}</h4>
            <h5><Link to={`/artist/${props.artistName}`}>{props.artistName}</Link></h5>
            {artist}
            <img src={props.imageUrl ? props.imageUrl : trackImg} alt=""/>
        </div>
    );
};

export default Track;
