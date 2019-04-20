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
        boolnea: "",
        critere: "",
        candidat: "",
      };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    axios.post("http://localhost:5000/api/commentaire", { title })
    .then( () => {
        // this.props.getData();
        this.setState({title: ""});
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
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddCommentaire;