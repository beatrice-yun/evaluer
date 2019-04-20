// components/criteres/CritereDetails.js

import React, { Component } from 'react';
import axios from 'axios';

class CritereDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheCritere();
  }

  getTheCritere = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/ao/${params.id}/axes/${params.axeId}/criteres/${params.critereId}`)
    .then( responseFromApi =>{
      const theCritere = responseFromApi.data;
      this.setState(theCritere);
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

export default CritereDetails;