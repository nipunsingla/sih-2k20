import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from './axios';

export default class Login extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        location: '',
        token: ''
    }
    handleInputChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
    } 
    
    handleLoginSubmit = (e) =>{
        e.preventDefault();

        axios.post('login',{
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          location: this.state.location
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
            <div className="form">
                <form action='/login' method="POST" className="formBody">
                    <div>
                        <label>User Name: </label>
                        <input type="text" name="username" placeholder="username" onChange={(e)=>this.handleInputChange(e)} required></input> 
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" name="email" placeholder="email" onChange={this.handleInputChange} required></input>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" placeholder="password" onChange={this.handleInputChange} required></input>
                    </div>
                    <div>
                        <label>Location: </label>
                        <input type="text" name="location" placeholder="location" onChange={this.handleInputChange} required></input>
                    </div>
                    <div>
                        <button onClick={(e) => this.handleLoginSubmit(e)}>Submit</button>
                    </div>
                </form>
            </div>

        )
    }
}
