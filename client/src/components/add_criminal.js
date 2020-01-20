import React, { Component } from 'react'
import axios from './axios'
/*
    {
     username: 
     id:
     status:
     name:
     mark:
    }
*/
export default class add_criminal extends Component {
    state = {
        username: '',
        status:'',
        name:'',
        mark:'',
        file:'',
        token: ''
    }

    handleInputChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
    } 
    
    handleLoginSubmit = (e) =>{
        e.preventDefault();

        axios.post('login/add_criminal',{
          username: this.state.username,
          status: this.state.status,
          name: this.state.name,
          file: this.state.file,
          mark: this.state.mark
        })
        .then((res) => {
          console.log(res.status)
          if(res.status === 200){
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username',this.state.username)
            window.location.pathname = "/login/get_criminal"
          }
          else {
            throw new Error()
          }
          
        })
        .catch((err) => {
          console.log(err)
          alert('Something Went Wrong, Try Login Again!!!')
        })
    }
    render() {
        return (
            <>
                <iframe id="serviceFrameSend" src="add_criminal.html" width="500" height="500"  frameBorder="0">
                </iframe>
            </> 
        )
    }
}
