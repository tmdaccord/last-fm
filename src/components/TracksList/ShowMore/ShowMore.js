import React from 'react';
import classes from './ShowMore.module.scss';

const ShowMore = (props) => (
    <div className={classes.ShowMore}>
        <button onClick={props.onClick}>Show More</button>
    </div>
);

export default ShowMore;
