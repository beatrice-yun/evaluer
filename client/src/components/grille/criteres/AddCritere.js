// components/criteres/AddCritere.js

import React, { Component } from 'react';
import axios from 'axios';

class AddCritere extends Component {
  constructor(props){
      super(props);          //             will help us to toggle add critere form   
                            //                      |
      this.state = { title: "", description: "", isShowing: false }; // peut-être il faut ajouter les autres objets ID pour axe et candidat
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const axeID = this.props.theAxe._id; // <== we need to know to which axe the created axe belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing ao 
                                                // by its id in the axe model on the server side ( ao: {type: Schema.Types.ObjectId, ref: 'Ao'})
    
    // { title, axeID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/criteres`, { title, description, axeID })
    .then( () => {
          // after submitting the form, retrieve axe one more time so the new critere is displayed as well 
          //              |
        this.props.getTheAxe();
        this.setState({title: "", description: ""});
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

  showAddCritereForm = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Ajouter un critère :</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Nom :</label>
                  <input class="text-input" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                  <br/>
                  <br/>
                  <label>Description :</label>
                  <textarea class="text-input" name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                  <br/>
                  <br/>
                  <input class="button-light" type="submit" value="Ajouter" />
                  </form>
            </div>
          )
    }
  }

  render(){
    return(
      <div>
            <button class="button" onClick={() => this.toggleForm()}> Ajouter un critère </button>
            { this.showAddCritereForm() }
      </div>
    )
  }
}

export default AddCritere;