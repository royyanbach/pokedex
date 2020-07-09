import React, { Component } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';

const LIMIT = 10;
const POKE_API = new Pokedex({
  cache: false,
});

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      limit: LIMIT,
      offset: 0,
      displayedPokemon: [],
      pokemonList: [],
      isLoading: false,
    };

    this.fetchPokemonList = this.fetchPokemonList.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentDidMount() {
    this.fetchPokemonList();
  }

  fetchPokemonList() {
    this.toggleLoading(true);

    POKE_API.getPokemonsList({
      limit: this.state.limit,
      offset: this.state.offset,
    }).then((response) => {
      this.setState({
        displayedPokemon: response.results,
        pokemonList: response.results,
      })
      console.log(response);
    }).finally(() => this.toggleLoading(false));
  }

  toggleLoading(isLoading = false) {
    this.setState({
      isLoading,
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Hello World</h1>
        <ul className="pokemon-list-wrapper">
          { this.state.displayedPokemon.map(pokemonItem => {
            return <li key={ pokemonItem.name } className="pokemon-list-item">{ pokemonItem.name }</li>;
          }) }
        </ul>
      </div>
    );
  }
}
