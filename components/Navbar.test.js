import React from 'react';
import renderer from 'react-test-renderer';

import Navbar from './Navbar';

it('Render navbar correctly', () => {
  const totalDisplayedPokemon = 100;
  const totalPokemon = 1000;

  const component = renderer.create(
    <Navbar totalDisplayedPokemon={ totalDisplayedPokemon } totalPokemon={ totalPokemon }>Hello world</Navbar>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
