// components/commentaires/AddCommentaire.js

import React, { Component } from 'react';
import axios from 'axios';

class AddCommentaire extends Component {
  constructor(props){
      super(props);          //             will help us to toggle add task form   
                            //                      |
      this.state = { description: "", page: "", boolean:"", isShowing: false };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const page = this.state.page;
    const boolean = this.state.boolean;
    const noteID = this.props.theNote._id; // <== we need to know to which ao the created axe belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing ao 
                                                // by its id in the axe model on the server side ( ao: {type: Schema.Types.ObjectId, ref: 'Ao'})
    
    // { title, description, aoID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/commentaires`, { title, description, page, boolean, noteID })
    .then( () => {
          // after submitting the form, retrieve note one more time so the new commentaire is displayed as well 
          //              |
        this.props.getTheNote();
        this.setState({title:"", description: "", page: "", boolean:""});
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

  showAddCommentaireForm = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Ajouter un commentaire :</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Description :</label>
                  <textarea type="text" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>
                  <label>Page :</label>
                  <input type="number" name="page" value={this.state.page} onChange={ e => this.handleChange(e)} />
                  <label>Positif / négatif :</label>
                  <input type="text" name="boolean" value={this.state.boolean} onChange={ e => this.handleChange(e)} />
                  
                  <input type="submit" value="Ajouter" />
                  </form>
            </div>
          )
    }
  }

  render(){
    return(
      <div>
            <button onClick={() => this.toggleForm()}> Ajouter un commentaire </button>
            { this.showAddCommentaireForm() }
      </div>
    )
  }
}

export default AddCommentaire;