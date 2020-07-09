import React, { Component } from "react";

export default class PokemonStatItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className="pokemon-stat-item">
        <p className="pokemon-stat-name">{ this.props.statsData.stat.name.replace('-', ' ') }</p>
        <p className="pokemon-stat-value">
          <strong>{ this.props.statsData.base_stat }</strong>/100
        </p>
      </div>
    )
  }
}
