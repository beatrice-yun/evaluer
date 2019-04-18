import React, { Component } from "react";
// import axios from "axios";

class SelectCritere extends Component {
    state = {
      criteres: [],
      selectedCritere: ""
    }
   
    componentDidMount() {
        fetch("http://localhost:5000/api/criteres")
        .then((response) => {
          return response.json();
        })
        .then(data => {
          let critereFromAPI = data.map(oneCritere => { return {value: oneCritere._id, display: oneCritere.title} })
          this.setState({ criteres: [{value: '', display: ''}].concat(critereFromAPI) });
        }).catch(error => {
          console.log(error);
        });
    }
   
    render() {
      return (
        <div>
          <h3>Choisir un critère</h3>
          <select value={this.state.selectedCritere} 
            onChange={(e) => this.setState({selectedCritere: e.target.value})}> {/*appeler ici la fonction qui prend l'ao sélectionné */}

            {this.state.criteres.map((oneCritere) => { 
            return <option key={oneCritere.value} value={oneCritere.value}>{oneCritere.display}</option>})}

          </select>
        </div>
      )
    }
}

export default SelectCritere;