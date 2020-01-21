import React, { Component } from 'react'
import {Button} from 'react-materialize'

export default class CriminalCard extends Component {
    render = () => {
        const {criminalName, criminalId, criminalStatus, criminalMark} = this.props
        //console.log(this.props.criminalName)
        return (
            <div className='CriminalCardSelf'>
                <div>
                    <img src="https://via.placeholder.com/150"></img>
                    <h4>Name : {criminalName} </h4>
                    <h4>Status: {criminalStatus}</h4>
                    <h4>Mark: {criminalMark}</h4>
                    <Button
                        node="button"
                        waves="light"
                        onClick={this.props.handleDelete.bind(this, criminalId)}>
                        DELETE
                    </Button>
                </div>
            </div>
        )
    }
}
