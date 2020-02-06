import React from 'react';
import classes from './Track.module.css';
import trackImg from '../../../assets/images/track.png';

const Track = (props) => (
    <div className={classes.Track}>
        <h4>{props.name}</h4>
        <h5>{props.artistName}</h5>
        <a href={props.artistUrl}>Artist Link</a>
        <img src={props.imageUrl ? props.imageUrl : trackImg} alt=""/>
    </div>
);

export default Track;
