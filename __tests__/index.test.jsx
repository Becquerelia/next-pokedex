import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import { PokedexMock } from '../__mocks__/PokedexMock';


describe('Home', () => {

  beforeEach(() => {
    render(<Home pokedex={PokedexMock} />);
  });

  it('Home component its rendering correctly', () => {    
    const heading = screen.getByText(/kanto/i);
    expect(heading).toBeInTheDocument();
  });

  it('Should exist pokemon name in the card', () => {
    expect(screen.getByText(/squirtle/i)).toBeInTheDocument();
  });

  it('Should display pokemon image in the card', () => {
   const pokeImage = screen.getByRole('img');
   expect(pokeImage.alt).toContain('squirtle');
  });

});