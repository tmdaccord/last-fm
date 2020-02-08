import React from 'react';
import classes from './Error.module.scss';
import PropTypes from 'prop-types';

const Error = (props) => (
    <div className={classes.Error}>{props.message}</div>
);

Error.propTypes = {
    message: PropTypes.string.isRequired
};

export default Error;
