import React, { Component } from "react";

import PokemonItem from './PokemonItem';
import PokemonDetailPopup from './PokemonDetailPopup';

const OFFSET_SCROLL_TRIGGER = '100px';

export default class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.handleSelectedPokemon = this.handleSelectedPokemon.bind(this);
    this.handleClosePokemonDetail = this.handleClosePokemonDetail.bind(this);

    this.state = {
      showPokemonDetail: false,
    };
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0] && entries[0].isIntersecting) {
          this.observer.unobserve(entries[0].target);
          this.props.onReachBottom();
        }
      },
      { rootMargin: `${OFFSET_SCROLL_TRIGGER} 0px 0px 0px` },
    );
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
          { this.props.pokemons.map((pokemonItem, index) => (
            <PokemonItem
              key={ pokemonItem.name }
              pokemonDetail={ pokemonItem }
              onSelectPokemon={ this.handleSelectedPokemon }
              observer={ index === this.props.pokemons.length - 1 ? this.observer : null }/>
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
