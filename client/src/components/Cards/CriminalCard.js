import React, { Component } from 'react'
import {Button} from 'react-materialize'
import axios from 'axios'

export default class CriminalCard extends Component {

    lookUpStatus = () =>{
        console.log("Criminal Code")
        const {criminalStatus} = this.props
        let url = 'https://regcheck.org.uk/api/reg.asmx?op=CheckIndia&RegistrationNumber='+criminalStatus+'&username=nipun'
        axios.get(url)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
                alert("There was an error !!!")
            })
    }

    render = () => {
        var {criminalName, criminalId, criminalStatus, criminalMark, imgUrl} = this.props
        //console.log(this.props.criminalName)
        if(!imgUrl)
            imgUrl = "https://via.placeholder.com/150"
        
        let status;
        if(criminalStatus === "X")
            status = {criminalStatus}
        else {
            status = (<a href={'https://regcheck.org.uk/api/reg.asmx?op=CheckIndia&RegistrationNumber='+criminalStatus+'&username=nipun'} 
                         target="_blank">{criminalStatus}</a>)
        }
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
