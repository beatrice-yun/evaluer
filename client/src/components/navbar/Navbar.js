// navbar/Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../auth/auth-service";

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);
    })
    .catch( error => console.log(error) )
  }
  
  render(){
    if(this.state.loggedInUser){
      return(
        <nav className="nav-style">
        <br/>
          <ul>
            <li class="text-nav1">Vous êtes connecté sur le profil de {this.state.loggedInUser.username}.</li>
            <br/>
            <li>
              <Link to='/ao' style={{ textDecoration: 'none' }} class="text-nav">Créer une grille d'analyse</Link>
            </li>
            <li>
              <Link to='/analyses' style={{ textDecoration: 'none' }} class="text-nav">Evaluer les offres</Link>
            </li>
            <br/>
            <li>
              <Link to='/'>
                <button class="logout-button" onClick={() => this.logoutUser()}>Se déconnecter</button>
              </Link>
            </li>
            <br/>
          </ul>
        </nav>
      )
    } else {
      return (
        <div>
        <nav className="nav-style">
        <br/>
        <h1 class="text-nav2">EVALUER</h1>
        <h3 class="text-nav1">L'outil d'évaluation des offres dédié aux marchés publics.</h3>
        {/*
          <ul>
            <li><Link to='/' style={{ textDecoration: 'none' }} class="text-nav">Se connecter</Link></li>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}class="text-nav">S'inscrire</Link></li>
            <br/>
          </ul>
        */}
        <br/>
        </nav>
        <br/>
        </div>
      )
    }
  }
}

export default Navbar;