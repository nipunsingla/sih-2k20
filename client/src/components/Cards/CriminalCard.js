import React, { Component } from 'react'

export default class criminalCard extends Component {
    render = () => {
        const {criminalName, criminalId, criminalStatus, criminalMark, i} = this.props
        //console.log(this.props.criminalName)
        return (
            <div className='card'>
                <div className='show'></div>
                <div className='card-content'>
                    <h1>{criminalId}</h1>
                    <h1> {criminalName} </h1>
                    <h1>{criminalStatus}</h1>
                    <h1>{criminalMark}</h1>
                    <a href={"http://localhost:3001/login/delete_criminal?id="+criminalId}>Solved</a>
                </div>
            </div>
        )
    }
}
