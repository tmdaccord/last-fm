import React from 'react';
import Layout from "./components/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import ArtistInfo from "./components/ArtistInfo/ArtistInfo";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import TopTracksList from "./containers/TopTracksList/TopTracksList";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={TopTracksList}/>
                <Route path="/artist/:name" component={ArtistInfo}/>
                <Route component={PageNotFound}/>
            </Switch>
        </Layout>
    );
}

export default App;
