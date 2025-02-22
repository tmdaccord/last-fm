import React from 'react';
import classes from './Header.module.scss';
import Logo from "../Logo/Logo";
import SearchForm from "../SearchForm/SearchForm";

const Header = () => (
    <header className={classes.Header}>
        <div className={[classes.HeaderContainer, "container"].join(' ')}>
            <Logo/>
            <SearchForm/>
        </div>
    </header>
);

export default Header;
