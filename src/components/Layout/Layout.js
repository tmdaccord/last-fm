import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = (props) => (
    <React.Fragment>
        <Header/>
        <main>
            <div className="container">
                {props.children}
            </div>
        </main>
        <Footer/>
    </React.Fragment>
);

export default Layout;
