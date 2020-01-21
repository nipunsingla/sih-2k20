import React, { Component } from 'react'
import axios from 'axios'
import _Header from './header'
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
        url:'',
        token: ''
    }

    handleInputChange = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
    } 

    imgUpload = (e) =>{
        console.log(e.target.files[0])
        this.setState({
            file: e.target.files[0]
        })
    }
    
    handleLoginSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state.name)
        const formData = new FormData()
        formData.append('file', this.state.file)    
        formData.append('username', this.state.username)
        formData.append('name', this.state.name)
        formData.append('status', this.state.status)
        formData.append('mark', this.state.mark)
        formData.append('url', this.state.url)
        console.log(formData)
        axios.post('http://localhost:3001/login/add_criminal',
          formData
        )
        .then((res) => {
            console.log(res.status)
            if(res.status === 200){
                console.log(res.data.msg)
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
            <_Header header="Add Criminals" />
            <div className="formBack">
                
                <div className="form">
                    <form method="POST" className="formBody" encType="multipart/form-data">
                        <div>
                            <label>User Name: </label>
                            <input type="text" name="username" placeholder="username" onChange={(e)=>this.handleInputChange(e)} required></input> 
                        </div>
                        <div>
                            <label>Status: </label>
                            <input type="text" name="status" placeholder="Status of Criminal" onChange={(e)=>this.handleInputChange(e)} required></input>
                        </div>
                        <div>
                            <label>Name: </label>
                            <input type="text" name="name" placeholder="Name of Criminal" onChange={(e)=>this.handleInputChange(e)} required></input>
                        </div>
                        <div>
                            <label>Mark(if any): </label>
                            <input type="text" name="mark" placeholder="Identification Mark" onChange={(e)=>this.handleInputChange(e)} required></input>
                        </div>
                        <div>
                            <label>Image Url: </label>
                            <input type="text" name="url" placeholder="Enter Img Url" onChange={(e)=>this.handleInputChange(e)}></input>
                        </div>
                        <div>
                            <label>Image: </label>
                            <input type="file" name="file" placeholder="image" onChange={(e)=>this.imgUpload(e)}></input>
                        </div>
                        <div>
                            <button type="submit" onClick={(e)=>this.handleLoginSubmit(e)}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            </>
        )
    }
}
