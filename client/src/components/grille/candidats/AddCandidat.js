// components/candidats/AddCandidat.js

import React, { Component } from 'react';
import axios from 'axios';

class AddCandidat extends Component {
  constructor(props){
      super(props);          //             will help us to toggle add candidat form   
                            //                      |
      this.state = { title: "", isShowing: false };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const aoID = this.props.theAo._id; // <== we need to know to which ao the created axe belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing ao 
                                                // by its id in the axe model on the server side ( ao: {type: Schema.Types.ObjectId, ref: 'Ao'})
    
    // { title, aoID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/candidats`, { title, aoID })
    .then( () => {
          // after submitting the form, retrieve ao one more time so the new axe is displayed as well 
          //              |
        this.props.getTheAo();
        this.setState({title: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }

  showAddCandidatForm = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Add Candidat</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Title:</label>
                  <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>

                  <input type="submit" value="Submit" />
                  </form>
            </div>
          )
    }
  }

  render(){
    return(
      <div>
            <hr />
            <button onClick={() => this.toggleForm()}> Add candidat </button>
            { this.showAddCandidatForm() }
      </div>
    )
  }
}

export default AddCandidat;