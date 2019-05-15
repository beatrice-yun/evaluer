// components/notes/EditNote.js

import React, { Component } from 'react';
import axios from 'axios';

class EditNote extends Component {
  constructor(props){
    super(props);
    this.state = {
        note: this.props.theNote.note, 
        auteur: this.props.theNote.auteur
    }
  }

    
  handleFormSubmit = (event) => {
    const note = this.state.note;
    const auteur = this.state.auteur;

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/notes/${this.props.theNote._id}`, { note, auteur })
    .then( () => {
        this.props.getTheNote();
        // after submitting the form, redirect to '/analyses'
        this.props.history.push('/analyses');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeNote = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return (
      <div>
        <hr />
        <h3>Modifier la note attribuée :</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nouvelle note :</label>
          <input class="text-input" type="text" name="note" value={this.state.note} onChange={e => this.handleChangeNote(e)}/>
          <br/>
          <br/>
          <label>Nouvel auteur :</label>
          <input class="text-input" type="text" name="auteur" value={this.state.auteur} onChange={e => this.handleChangeNote(e)}/>
          <br/>
          <br/>
          <input class="button-light" type="submit" value="Modifier" />
        </form>
      </div>
    )
  }
}

export default EditNote;