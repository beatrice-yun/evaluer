// components/projects/AoDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditAo from './EditAo';
import AddAxe from '../axes/AddAxe';
import AddCandidat from '../candidats/AddCandidat';

class AoDetails extends Component {
  constructor(props){
      super(props);
      this.state = {};
  }

  componentDidMount(){
      this.getSingleAo();
  }

  getSingleAo = () => {
      const { params } = this.props.match;
      axios.get(`http://localhost:5000/api/ao/${params.id}`)
      .then( responseFromApi =>{
          const theAo = responseFromApi.data;
          this.setState(theAo);
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  // EDIT AO :
  renderEditForm = () => {
    if(!this.state.title){
      this.getSingleAo();
    } else {
    //                                                    {...props} => so we can have 'this.props.history' in Edit.js
    //                                                                                          ^
    //                                                                                          |
      return <EditAo theAo={this.state} getTheAo={this.getSingleAo} {...this.props} />
        
    }
  }

  // DELETE AO :
  deleteAo = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/ao/${params.id}`)
    .then( () =>{
        this.props.history.push('/ao'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  // ADD AXE TO AN AO :
  renderAddAxeForm = () => {
    if(!this.state.title){
        this.getSingleAo();
      } else {     
                // pass the ao and method getSingleAo() as a props down to AddAxe component
        return <AddAxe theAo={this.state} getTheAo={this.getSingleAo} />
      }
  }

  // ADD CANDIDAT TO AN AO :
  renderAddCandidatForm = () => {
    if(!this.state.title){
        this.getSingleAo();
      } else {     
                // pass the ao and method getSingleAo() as a props down to AddAxe component
        return <AddCandidat theAo={this.state} getTheAo={this.getSingleAo} />
      }
  }

  render(){
    return(
      <div>
        <div><h1>{this.state.title}</h1></div>
        <div>
        {/* show the axe heading only if there are axes */}
        { this.state.axes && this.state.axes.length > 0 && <h3>Axes </h3> }
        {/* map through the array of axes and... */}
        { this.state.axes && this.state.axes.map((axe, index) => {
            return(
                <div key={ index }>
                {/* ... make each axe's title a link that goes to the axes details page */}
                    <Link to={`/ao/${this.state._id}/axes/${axe._id}`}> 
                        { axe.title }
                    </Link>
                    </div>
            )
            
        }) }
        </div>

        <div>
        {/* show the candidat heading only if there are candidats */}
        { this.state.candidats && this.state.candidats.length > 0 && <h3>Candidats </h3> }
        {/* map through the array of candidats and... */}
        { this.state.candidats && this.state.candidats.map((candidat, index) => {
            return(
                <div key={ index }>
                {/* ... make each axe's title a link that goes to the candidats details page */}
                    <Link to={`/ao/${this.state._id}/candidats/${candidat._id}`}> 
                        { candidat.title }
                    </Link>
                    </div>
            )
            
        }) }
        </div>

        <div>{this.renderEditForm()} </div> {/* <== !!! */}
        <button onClick={() => this.deleteAo()}>Delete ao</button> {/* <== !!! */}
        <br/>
        <div>{this.renderAddAxeForm()} </div> {/* <== !!! */}
        <br/>
        <div>{this.renderAddCandidatForm()} </div> {/* <== !!! */}
        <br/><br/><br/><br/><br/>
        <Link to={'/ao'}>Back to ao</Link>
      </div>
    )
  }
}

export default AoDetails;