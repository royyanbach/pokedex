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
      selectedFilter: '',
      selectedPokemon: {},
    };

    this.appendUnique = this.appendUnique.bind(this);
    this.fetchAllPokemon = this.fetchAllPokemon.bind(this);
    this.fetchTypeList = this.fetchTypeList.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSelectedPokemon = this.handleSelectedPokemon.bind(this);
  }

  appendUnique(newPokemonData) {
    const originalPokemonList = this.state.pokemonList;
    let existingPokemon = originalPokemonList.map(pokemon => pokemon.name);
    newPokemonData.forEach(pokemon => {
      if (existingPokemon.indexOf(pokemon.name) < 0) {
        originalPokemonList.push(pokemon);
      }
    });

    this.setState({
      pokemonList: originalPokemonList,
    })
  }

  fetchAllPokemon() {
    POKE_API.getPokemonsList({
      limit: this.state.limit,
      offset: this.state.offset,
    })
      .then((response) => {
        this.appendUnique(response.results);

        this.setState({
          displayedPokemon: response.results,
        });
        console.log(response);
      })
  }

  fetchTypeList() {
    POKE_API.getTypesList()
      .then((response) => {
        this.setState({
          pokemonTypes: response.results,
        })
      })
  }

  handleTypeChange(e) {
    const selectedFilter = e.target.value;
    if (!selectedFilter) {
      return this.setState({
        displayedPokemon: this.state.pokemonList,
      })
    }

    this.setState({
      selectedFilter,
    })

    return POKE_API.getTypeByName(selectedFilter)
      .then((response) => {
        const newPokemonData = response.pokemon.map(item => item.pokemon);
        this.appendUnique(newPokemonData);

        this.setState({
          displayedPokemon: newPokemonData,
        })
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
    this.fetchAllPokemon();
    this.fetchTypeList();
  }

  render() {
    return (
      <>
        <Navbar>
          <select className="pokemon-filter" value={ this.state.selectedFilter } onChange={ this.handleTypeChange }>
            <option value="">All type</option>
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
