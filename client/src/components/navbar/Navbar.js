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
          <ul>
            <li>Bienvenue {this.state.loggedInUser.username} !</li>
            <li>
              <Link to='/ao' style={{ textDecoration: 'none' }}>Créer une grille d'analyse</Link>
            </li>
            <li>
              <Link to='/analyses' style={{ textDecoration: 'none' }}>Evaluer les offres</Link>
            </li>
            <li>
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Se déconnecter</button>
              </Link>
            </li>
          </ul>
        </nav>
      )
    } else {
      return (
        <div>
        <nav className="nav-style">
          <ul>
            <li><Link to='/' style={{ textDecoration: 'none' }}>Se connecter</Link></li>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>S'inscrire</Link></li>
          </ul>
        </nav>
        </div>
      )
    }
  }
}

export default Navbar;