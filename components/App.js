import React, { Component } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';

import Navbar from './Navbar';
import PokemonList from './PokemonList';

const LIMIT = 66;
const POKE_API = new Pokedex({
  cache: false,
});

window.P = POKE_API;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      limit: LIMIT,
      offset: 0,
      displayedPokemon: [],
      pokemonList: [],
      pokemonTypes: [],
      selectedPokemon: {},
      isLoading: false,
    };

    this.fetchPokemonList = this.fetchPokemonList.bind(this);
    this.fetchTypeList = this.fetchTypeList.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleSelectedPokemon = this.handleSelectedPokemon.bind(this);
  }

  fetchPokemonList() {
    this.toggleLoading(true);

    POKE_API.getPokemonsList({
      limit: this.state.limit,
      offset: this.state.offset,
    })
      .then((response) => {
        this.setState({
          displayedPokemon: response.results,
          pokemonList: response.results,
        })
        console.log(response);
      })
      .finally(() => this.toggleLoading(false));
  }

  fetchTypeList() {
    POKE_API
      .getTypesList()
      .then((response) => {
        this.setState({
          pokemonTypes: response.results,
        })
      })
      .finally(() => this.toggleLoading(false));
  }

  toggleLoading(isLoading = false) {
    this.setState({
      isLoading,
    });
  }

  handleSelectedPokemon(selecedPokemonId) {
    console.log(this.state.selectedPokemon.id, selecedPokemonId);
    if (parseInt(this.state.selectedPokemon.id, 10) === parseInt(selecedPokemonId, 10)) {
      return;
    }

    return POKE_API.getPokemonByName(selecedPokemonId)
      .then((response) => {
        this.setState({
          selectedPokemon: response,
        });
      });
  }

  componentDidMount() {
    this.fetchPokemonList();
    this.fetchTypeList();
  }

  render() {
    return (
      <>
        <Navbar>
          <select className="pokemon-filter">
            <option value="">Filter by type</option>
            {
              this.state.pokemonTypes.map(type => <option key={ type.name } value={ type.name }>{ type.name }</option>)
            }
          </select>
        </Navbar>
        <div className="container">
          <PokemonList
            pokemons={ this.state.displayedPokemon }
            selectedPokemon={ this.state.selectedPokemon }
            onSelectPokemon={ this.handleSelectedPokemon }
          />
        </div>
      </>
    );
  }
}
