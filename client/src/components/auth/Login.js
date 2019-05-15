// auth/Login.js

import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label class="text">Votre organisation :</label>
          <input class="text-input" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          <br/>
          <br/>
          <label class="text">Votre mot de passe :</label>
          <input class="text-input" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          <br/>
          <br/>
          <input class="button" type="submit" value="Se connecter" />
          <br/>
        </form>
        <p class="text">Pas encore de compte ? 
            <Link to={"/signup"} class="link"> S'inscrire</Link>
        </p>
      </div>
    )
  }
}

export default Login;