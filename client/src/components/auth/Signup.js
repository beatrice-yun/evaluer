// auth/Signup.js

import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom'; // <== !!!

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
  
    this.service.signup(username, password)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
        });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){
    return(
      // more code will be added here
      <div>
      <form onSubmit={this.handleFormSubmit}>
        <label class="text">Choisir votre organisation :</label>
        <input class="text-input" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
        <br/>
        <br/>
        <label class="text">Choisir votre mot de passe :</label>
        <input class="text-input" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
        <br/>
        <br/>
        <input class="button" type="submit" value="S'inscrire" />
      </form>

      <p class="text">Déjà un compte ? 
          <Link to={"/"} class="link"> Se connecter</Link>
      </p>
    </div>
    )
  }
}

export default Signup;