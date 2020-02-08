import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import classes from './Layout.module.scss';

const Layout = (props) => (
    <React.Fragment>
        <Header/>
        <main>
            <div className={classes.MainColumn + ' container'}>
                {props.children}
            </div>
        </main>
        <Footer/>
    </React.Fragment>
);

export default Layout;
