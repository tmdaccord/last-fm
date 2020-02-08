import React from 'react';
import classes from './ShowMore.module.scss';
import PropTypes from 'prop-types';

const ShowMore = (props) => (
    <div className={classes.ShowMore}>
        <button onClick={props.onClick}>Show More</button>
    </div>
);

ShowMore.protTypes = {
    onClick: PropTypes.func.isRequired
};

export default ShowMore;
