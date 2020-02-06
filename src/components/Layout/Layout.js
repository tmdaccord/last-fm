import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => (
    <React.Fragment>
        <Header/>
        <main>
            {props.children}
        </main>
        <Footer/>
    </React.Fragment>
);

export default Layout;
