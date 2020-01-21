import React, { Component } from 'react'

export default class _Header extends Component {
    render() {
        return (
            <div class="navHeader">
                <h1>{this.props.header}</h1>
                <button>Logout</button>
            </div>
        )
    }
}
