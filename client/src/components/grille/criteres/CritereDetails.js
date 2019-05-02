// components/criteres/CritereDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import EditCritere from './EditCritere';

class CritereDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getSingleCritere();
  }

  getSingleCritere = () => {
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

  // EDIT CRITERE
  renderEditForm = () => {
    if(!this.state.title){
      this.getSingleCritere();
    } else {
    //                                                    {...props} => so we can have 'this.props.history' in Edit.js
    //                                                                                          ^
    //                                                                                          |
      return <EditCritere theCritere={this.state} getTheCritere={this.getSingleCritere} {...this.props} />
        
    }
  }

  // DELETE CRITERE
  deleteCritere = () => {
    const { params } = this.props.match;
    axios.delete(`${process.env.REACT_APP_APIURL || ""}/api/criteres/${params.critereId}`)
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
        <p>{this.state.description}</p>
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteCritere()}>Supprimer le critère</button> {/* <== !!! */}
      </div>
    )
  }
}

export default CritereDetails;