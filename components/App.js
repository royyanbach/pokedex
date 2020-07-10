import React, { Component } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';

import Navbar from './Navbar';
import PokemonList from './PokemonList';

const ALL_FILTER = 'all';
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
      totalPokemon: 0,
      pokemonTypes: [],
      selectedFilter: ALL_FILTER,
      selectedPokemon: {},
    };

    this.appendUnique = this.appendUnique.bind(this);
    this.fetchAllPokemon = this.fetchAllPokemon.bind(this);
    this.fetchTypeList = this.fetchTypeList.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSelectedPokemon = this.handleSelectedPokemon.bind(this);
    this.handleReachBottom = this.handleReachBottom.bind(this);
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
    if (this.state.totalPokemon && this.state.pokemonList.length === this.state.totalPokemon) {
      return
    }

    POKE_API.getPokemonsList({
      limit: this.state.limit,
      offset: this.state.offset,
    })
      .then((response) => {
        this.appendUnique(response.results);

        this.setState((state) => ({
          displayedPokemon: state.pokemonList,
          offset: state.offset + state.limit,
          totalPokemon: response.count,
        }))
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

    this.setState({
      selectedFilter,
    })

    if (selectedFilter === 'all') {
      return this.setState({
        displayedPokemon: this.state.pokemonList,
      })
    }

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

  handleReachBottom() {
    if (this.state.selectedFilter !== 'all') {
      return
    }

    this.fetchAllPokemon();
  }

  componentDidMount() {
    this.fetchAllPokemon();
    this.fetchTypeList();
  }

  render() {
    return (
      <>
        <Navbar totalPokemon={ this.state.totalPokemon } totalDisplayedPokemon = { this.state.displayedPokemon.length }>
          <select className="pokemon-filter" value={ this.state.selectedFilter } onChange={ this.handleTypeChange }>
            <option value={ ALL_FILTER }>All type</option>
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
            onReachBottom= { this.handleReachBottom }
          />
        </div>
      </>
    );
  }
}
