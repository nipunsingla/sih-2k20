import React, { Component } from 'react'
import {Button} from 'react-materialize'

export default class CriminalCard extends Component {
    render = () => {
        var {criminalName, criminalId, criminalStatus, criminalMark, imgUrl} = this.props
        //console.log(this.props.criminalName)
        if(!imgUrl)
            imgUrl = "https://via.placeholder.com/150"
        return (
            <div className='CriminalCardSelf'>
                <div>
                    <img src={imgUrl} height="150px" width="150px"></img>
                </div>
                <div className="criminalCardDetails">
                    <h4>Name : {criminalName} </h4>
                    <h4>Status: <span className="criminalStatus">{criminalStatus}</span></h4>
                    <h4>Mark: {criminalMark}</h4>
                    <Button
                        node="button"
                        waves="light"
                        onClick={this.props.handleDelete.bind(this, criminalId)}
                        className="criminalButton">
                        DELETE
                    </Button>
                </div>
            </div>
        )
    }
}
