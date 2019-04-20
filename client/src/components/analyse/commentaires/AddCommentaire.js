// components/ao/AddAo.js => à modifier pour commentaire

import React, { Component } from 'react';
import axios from 'axios';

class AddCommentaire extends Component {
  constructor(props){
      super(props);
      this.state = { 
        title: "",
        description: "",
        page: "",
        boolean: "",
        critere: "",
        candidat: "",
      };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const page = this.state.page;
    const boolean = this.state.boolean;
    const critere = this.state.critere;
    const candidat = this.state.candidat;
    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/commentaires`, { title, description, page, boolean, critere, candidat })
    .then( () => {
        // this.props.getData();
        this.setState({title: "", description: "", page: "", boolean: "", critere: "", candidat: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>

          <label>Description:</label>
          <input type="text" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>

          <label>Page:</label>
          <input type="text" name="page" value={this.state.page} onChange={ e => this.handleChange(e)}/>

          <label>Boolean:</label>
          <select value={this.state.bolean} name="boolean"
            onChange={e => this.handleChange(e)}>
            <option>Choisir une option</option>
            <option value="positif">Positif</option>
            <option value="negatif">Negatif</option>
          </select>

          <input type="text" name="boolean" value={this.state.boolean} onChange={ e => this.handleChange(e)}/>
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddCommentaire;