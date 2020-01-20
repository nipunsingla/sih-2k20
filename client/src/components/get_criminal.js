import React, { Component } from 'react'
import axios from './axios'
import CriminalCard from './Cards/CriminalCard';
import {Row,Container,Col} from 'react-materialize';

/*
 {
     username: 
     id:
     status:
     name:
     mark:
 }
*/

export default class get_criminal extends Component {
    state = {
        criminals: []
    }
    componentDidMount(){
        axios.get('http://localhost:3001/login/get_criminal?username=abc').then(res => {
            this.setState({
                criminals : res.data.data
            })
        })
    }

    render() {
        if(this.state.criminals.length === 0){
            return (
                <React.Fragment></React.Fragment>
            )
		}
		
		// const data = [], temp = this.state.criminals.data.map(role => role.members),
		// temp2 = temp.forEach(members => {
		// 	members.forEach(member => {
		// 		data.push(member);
		// 	});
        // });
        
        //console.log(this.state.criminals)
		const columns = this.state.criminals.map( (criminal, i) =>{
            console.log(criminal)
			return (
				<Col l={4} m={4} s={12}>
                	<CriminalCard 
                        criminalName={criminal.name} 
                        criminalId={criminal.id} 
                        criminalStatus={criminal.status} 
                        criminalMark = {criminal.mark}
                        i= {i}
                    />
            	</Col>
			)
		})
		
		return (
			<div className="confluTeamBody">
				<center>	
					<h1>Criminal List</h1>
				</center>
				<Container>
					<Row>
						{columns}
					</Row>
				</Container>
			</div>
		);
    }
}
