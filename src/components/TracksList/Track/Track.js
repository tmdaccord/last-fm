import React from 'react';
import classes from './Track.module.scss';
import trackImg from '../../../assets/images/track.png';
import {Link} from "react-router-dom";

const Track = (props) => {
    const artistLink = props.artistUrl ? <a className={classes.Link} href={props.artistUrl}>last.fm</a> : null;
    return (
        <div className={classes.Track}>
            <div className={classes.Img}>
                <img src={props.imageUrl ? props.imageUrl : trackImg} alt={props.name}/>
            </div>
            <div>
                <h5>{props.name}</h5>
                <h6><Link to={`/artist/${props.artistName}`}>{props.artistName}</Link> {artistLink}</h6>
            </div>
        </div>
    );
};

export default Track;
