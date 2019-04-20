// components/candidats/CandidatDetails.js

import React, { Component } from 'react';
import axios from 'axios';


class CandidatDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheCandidat();
  }

  getTheCandidat = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/ao/${params.id}/candidats/${params.candidatId}`)
    .then( responseFromApi =>{
      const theCandidat = responseFromApi.data;
      this.setState(theCandidat);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
      </div>
    )
  }
}

export default CandidatDetails;