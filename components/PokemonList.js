import React, { Component } from "react";

import PokemonItem from './PokemonItem';
import PokemonDetailPopup from './PokemonDetailPopup';

export default class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedPokemon = this.handleSelectedPokemon.bind(this);
    this.handleClosePokemonDetail = this.handleClosePokemonDetail.bind(this);

    this.state = {
      showPokemonDetail: false,
    };
  }

  handleSelectedPokemon(value) {
    this.setState({
      showPokemonDetail: true,
    });

    this.props.onSelectPokemon(value);
  }

  handleClosePokemonDetail() {
    this.setState({
      showPokemonDetail: false,
    });
  }

  render() {
    return (
      <>
        <ul className="pokemon-list-wrapper">
          { this.props.pokemons.map(pokemonItem => (
            <PokemonItem key={ pokemonItem.name } pokemonDetail={ pokemonItem } onSelectPokemon={ this.handleSelectedPokemon }/>
          )) }
        </ul>
        {
          this.state.showPokemonDetail && this.props.selectedPokemon.id &&
          <PokemonDetailPopup pokemonDetail={ this.props.selectedPokemon } onClosePopup={ this.handleClosePokemonDetail }/>
        }
      </>
    )
  }
}
