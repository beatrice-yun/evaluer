// components/tasks/AxeDetails.js

import React, { Component } from 'react';
import axios from 'axios';


class AxeDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheAxe();
  }

  getTheAxe = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/ao/${params.id}/axes/${params.axeId}`)
    .then( responseFromApi =>{
      const theAxe = responseFromApi.data;
      this.setState(theAxe);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
      </div>
    )
  }
}

export default AxeDetails;