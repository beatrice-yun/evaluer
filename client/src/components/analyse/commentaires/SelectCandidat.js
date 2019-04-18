import React, { Component } from "react";
// import axios from "axios";

class SelectCandidat extends Component {
    state = {
      candidats: [],
      selectedCandidat: ""
    }
   
    componentDidMount() {
        fetch("http://localhost:5000/api/candidats")
        .then((response) => {
          return response.json();
        })
        .then(data => {
          let candidatFromAPI = data.map(oneCandidat => { return {value: oneCandidat._id, display: oneCandidat.title} })
          this.setState({ candidats: [{value: '', display: ''}].concat(candidatFromAPI) });
        }).catch(error => {
          console.log(error);
        });
    }
   
    render() {
      return (
        <div>
          <h3>Choisir un candidat</h3>
          <select value={this.state.selectedCandidat} 
            onChange={(e) => this.setState({selectedCandidat: e.target.value})}> {/*appeler ici la fonction qui prend l'ao sélectionné */}

            {this.state.candidats.map((oneCandidat) => { 
            return <option key={oneCandidat.value} value={oneCandidat.value}>{oneCandidat.display}</option>})}

          </select>
        </div>
      )
    }
}

export default SelectCandidat;