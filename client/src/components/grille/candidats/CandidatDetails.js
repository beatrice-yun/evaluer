// components/candidats/CandidatDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import EditCandidat from './EditCandidat';

class CandidatDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getSingleCandidat();
  }

  getSingleCandidat = () => {
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

  // EDIT CANDIDAT
  renderEditForm = () => {
    if(!this.state.title){
      this.getSingleCandidat();
    } else {
    //                                                    {...props} => so we can have 'this.props.history' in Edit.js
    //                                                                                          ^
    //                                                                                          |
      return <EditCandidat theCandidat={this.state} getTheCandidat={this.getSingleCandidat} {...this.props} />
        
    }
  }

  // DELETE CANDIDAT
  deleteCandidat = () => {
    const { params } = this.props.match;
    axios.delete(`${process.env.REACT_APP_APIURL || ""}/api/candidats/${params.candidatId}`)
    .then( () =>{
        this.props.history.push('/ao'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteCandidat()}>Supprimer l'axe</button> {/* <== !!! */}
      </div>
    )
  }
}

export default CandidatDetails;