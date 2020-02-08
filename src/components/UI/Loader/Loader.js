import React from 'react';

import classes from './Loader.module.scss';

const Loader = () => (
    <div>
        <div className={classes.Loader}>
            <div className={classes.FloatBarsG_1} />
            <div className={classes.FloatBarsG_2} />
            <div className={classes.FloatBarsG_3} />
            <div className={classes.FloatBarsG_4} />
            <div className={classes.FloatBarsG_5} />
            <div className={classes.FloatBarsG_6} />
            <div className={classes.FloatBarsG_7} />
            <div className={classes.FloatBarsG_8} />
        </div>
    </div>
);

export default Loader;
