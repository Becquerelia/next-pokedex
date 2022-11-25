import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import { PokedexMock } from '../__mocks__/PokedexMock';


describe('Home', () => {

  beforeEach(() => {
    render(<Home pokedex={PokedexMock} />);
  });

  it('Home component should render correctly', () => {    
    const heading = screen.getByText(/kanto/i);
    expect(heading).toBeInTheDocument();
  });

  it('Should exist pokemon name in the card', () => {
    PokedexMock.forEach((eachPokemon) => {
      expect(screen.getByText(eachPokemon.name)).toBeInTheDocument();
    })    
  });  

  it('Should display pokemon image in the card', () => {
    const pokeImage = screen.getByRole('img');
    PokedexMock.forEach((eachPokemon) => {
      expect(pokeImage.getAttribute('alt')).toBe(eachPokemon.name);
    })       
  });

  it('Should display pokemon type in the card', () => {
    PokedexMock.forEach((eachPokemon) => {
      expect(eachPokemon).toHaveProperty('types');
      expect(screen.getByText(eachPokemon.types[0].type.name)).toBeInTheDocument();
    })
  });

  // it('Should redirect to pokemon details by clicking on it', () => {
  //   expect(screen.getByTestId('type-test')).toContain('water');
  // });

});