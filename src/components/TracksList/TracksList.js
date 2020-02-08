import React from 'react';
import classes from './TracksList.module.scss';
import Track from "./Track/Track";
import PropTypes from 'prop-types';

const TracksList = (props) => {
    const tracksList = props.tracks.map((track, index) => (
        <li key={track.name + index}>
            <Track
                name={track.name}
                imageUrl={track.imageUrl}
                artistName={track.artist.name}
                artistUrl={track.artist.url}
            />
        </li>
    ));

    return (
        <ul className={classes.TracksList}>
            {tracksList}
        </ul>
    );
};

TracksList.protTypes = {
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            imageUrl: PropTypes.string.isRequired,
            artist: PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string
            })
        })
    ).isRequired
};

export default TracksList;
