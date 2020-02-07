import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import TopTracksList from "./containers/TopTracksList/TopTracksList";
import ArtistProfile from "./containers/ArtistProfile/ArtistProfile";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={TopTracksList}/>
                <Route path="/artist/:name" component={ArtistProfile}/>
                <Route component={PageNotFound}/>
            </Switch>
        </Layout>
    );
}

export default App;
