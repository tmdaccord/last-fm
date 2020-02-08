import React, {Component} from 'react';

import classes from './SearchForm.module.scss';
import {withRouter} from "react-router-dom";

class SearchForm extends Component {
    state = {
        value: ''
    };

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push({
            pathname: 'search',
            search: '?q=' + this.state.value
        });
    };

    render() {
        return (
            <div className={classes.SearchForm}>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <button>Search</button>
                </form>
            </div>
        );
    }
}

export default withRouter(SearchForm);
