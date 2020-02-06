import React from 'react';
import {Link} from "react-router-dom";

import classes from './Logo.module.css';
import logoImg from '../../assets/images/logo.png';

const Logo = () => (
    <div className={classes.Logo}>
        <Link to="/">
            <img src={logoImg} alt="Last.fm" width="90" height="24"/>
        </Link>
    </div>
);

export default Logo;
