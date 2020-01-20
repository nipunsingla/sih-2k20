import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        location: '',
        token: ''
    }
    handleLoginSubmit = (e) =>{
        e.preventDefault();
        axios.post('login',{
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          location: this.state.location
        })
        .then((res) => {
          console.log(res)
          if(res.status === 200){
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('code',this.state.code)
            window.location.pathname = "/"
          }
          else {
            throw new Error()
          }
          
        })
        .catch((err) => {
          console.log(err.response)
          alert('Something Went Wrong, Try Login Again')
        })
    }
    render() {
        return (
            <div className="form">
                <form action='/login' method="POST" className="formBody">
                    <div>
                        <label>User Name: </label>
                        <input type="text" name="username" placeholder="username" required></input>
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" name="email" placeholder="email" required></input>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" placeholder="password" required></input>
                    </div>
                    <div>
                        <label>Location: </label>
                        <input type="text" name="location" placeholder="location" required></input>
                    </div>
                    <div>
                        <button onClick={(e) => this.handleLoginSubmit(e)}>Submit</button>
                    </div>
                </form>
            </div>

        )
    }
}
