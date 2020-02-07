import React, {Component} from 'react';
import classes from './TracksList.module.css';
import Track from "./Track/Track";

// const TracksList = (props) => {
//     const tracksList = props.tracks.map(track => (
//         <li key={track.artist.name + track.name}>
//             <Track
//                 name={track.name}
//                 imageUrl={track.imageUrl}
//                 artistName={track.artist.name}
//                 artistUrl={track.artist.url}
//             />
//         </li>
//     ));
//
//     return (
//         <ul className={classes.TracksList}>
//             {tracksList}
//         </ul>
//     );
// };

class TracksList extends Component {


    render() {
        const tracksList = this.props.tracks.map(track => (
            <li key={track.artist.name + track.name}>
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
    }
};

export default TracksList;
