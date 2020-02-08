import React from 'react';
import classes from './Error.module.scss';

const Error = (props) => (
    <div className={classes.Error}>{props.message}</div>
);

export default Error;
