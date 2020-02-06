import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import TracksList from "./components/TracksList/TracksList";
import ArtistInfo from "./components/ArtistInfo/ArtistInfo";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={TracksList}/>
                <Route path="/artist/:name" component={ArtistInfo}/>
                <Route component={PageNotFound}/>
            </Switch>
        </Layout>
    );
}

export default App;
