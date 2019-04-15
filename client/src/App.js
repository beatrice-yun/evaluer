// App.js

import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Signup from './components/auth/Signup';
import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';

import AoList from './components/grille/ao/AoList';
import Navbar from './components/navbar/Navbar';
import AoDetails from './components/grille/ao/AoDetails';
import AxeDetails from './components/grille/axes/AxeDetails';
import CandidatDetails from './components/grille/candidats/CandidatDetails';
import CritereDetails from './components/grille/criteres/CritereDetails';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} exact path="/ao" component={AoList}/>

            {/* added to display ao details page: */}
            <ProtectedRoute user={this.state.loggedInUser} exact path="/ao/:id" component={AoDetails} />
            
            {/* added to display axe details page: */}
            <ProtectedRoute user={this.state.loggedInUser} exact path="/ao/:id/axes/:axeId" component={AxeDetails} /> {/* <== !!! */}
            {/* added to display critere details page: */}
            <ProtectedRoute user={this.state.loggedInUser} exact path="/ao/:id/axes/:axeId/criteres/:critereID" component={CritereDetails} /> {/* <== !!! */}
            
            {/* added to display candidat details page: */}
            <ProtectedRoute user={this.state.loggedInUser} exact path="/ao/:id/candidats/:candidatId" component={CandidatDetails} /> {/* <== !!! */}
            
          </Switch>
        </div>
    );
    } else {
      return (
        <div className="App">
        <Navbar userInSession={this.state.loggedInUser} />
        <Switch>
          <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
          <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>


          <ProtectedRoute user={this.state.loggedInUser} exact path="/ao" component={AoList}/>

          {/* added to display ao details page: */}
          <ProtectedRoute user={this.state.loggedInUser} exact path="/ao/:id" component={AoDetails} />

          {/* added to display axe details page: */}
          <ProtectedRoute user={this.state.loggedInUser} exact path="/ao/:id/axes/:axeId" component={AxeDetails} /> {/* <== !!! */}
          {/* added to display critere details page: */}
          <ProtectedRoute user={this.state.loggedInUser} exact path="/ao/:id/axes/:axeId/criteres/:critereID" component={CritereDetails} /> {/* <== !!! */}
           
          {/* added to display candidat details page: */}
          <ProtectedRoute user={this.state.loggedInUser} exact path="/ao/:id/candidats/:candidatId" component={CandidatDetails} /> {/* <== !!! */}
   
        </Switch>
      </div>
      );
    }
  }
}

export default App;
