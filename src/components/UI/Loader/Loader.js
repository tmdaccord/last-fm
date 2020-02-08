import React from 'react';

import classes from './Loader.module.scss';

const Loader = () => (
    <div className={classes.Loader}>
        <div className="circle-1"></div>
        <div className="circle-2"></div>
        <div className="circle-3"></div>
    </div>
);

export default Loader;
