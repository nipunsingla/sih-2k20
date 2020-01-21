import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class _Header extends Component {
    render() {
        return (
            <div class="navHeader">
                <h1>{this.props.header}</h1>
                <Link to="/" className="logout">Logout</Link>
            </div>
        )
    }
}
