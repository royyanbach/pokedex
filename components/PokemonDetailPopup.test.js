import React from 'react';
import renderer from 'react-test-renderer';

import PokemonDetailPopup from './PokemonDetailPopup';

it('Render pokemon popup detail correctly', () => {
  const pokemonDetail = {
    species: {
      name: 'bulbasaur',
    },
    types: [
      {
        type: {
          name: 'grass'
        }
      },
      {
        type: {
          name: 'poison'
        }
      },
    ],
    sprites: {
      front_default: '',
      back_default: '',
    },
    stats: [{
      base_stat: 40,
      stat: {
        name: 'hp',
      },
    }],
  };

  const component = renderer.create(
    <PokemonDetailPopup pokemonDetail={ pokemonDetail }/>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
