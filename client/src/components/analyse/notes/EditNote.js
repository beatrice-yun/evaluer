// components/notes/EditNote.js

import React, { Component } from 'react';
import axios from 'axios';

class EditNote extends Component {
  constructor(props){
    super(props);
    this.state = {
        note: this.props.theNote.note, 
    }
  }

    
  handleFormSubmit = (event) => {
    const note = this.state.note;

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/notes/${this.props.theNote._id}`, { note })
    .then( () => {
        this.props.getTheNote();
        // after submitting the form, redirect to '/analyses'
        this.props.history.push('/analyses');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeNote = (event) => {  
    this.setState({
      note: event.target.value
    })
  }

  render(){
    return (
      <div>
        <hr />
        <h3>Modifier la note attribuée :</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nouvelle note :</label>
          <input type="text" name="note" value={this.state.note} onChange={e => this.handleChangeNote(e)}/>        
          <input type="submit" value="Modifier" />
        </form>
      </div>
    )
  }
}

export default EditNote;