import React from 'react';
import renderer from 'react-test-renderer';

import PokemonStatItem from './PokemonStatItem';

it('Render pokemon stat correctly', () => {
  const statsData = {
    base_stat: 40,
    stat: {
      name: 'hp',
    },
  };

  const component = renderer.create(
    <PokemonStatItem statsData={ statsData }/>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
