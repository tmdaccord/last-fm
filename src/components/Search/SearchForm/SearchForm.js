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

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname && prevProps.location.pathname === '/search' && this.state.value) {
            this.setState({value: ''});
        }
    }

    render() {
        return (
            <div className={classes.SearchForm}>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} placeholder="Search..." onChange={this.handleChange}/>
                    <button>
                        <svg width="20" height="20" viewBox="0 0 20 20" stroke="white" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="9" r="8" strokeWidth="2"/>
                            <path d="M19 19L15 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </form>
            </div>
        );
    }
}

export default withRouter(SearchForm);
