import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/home';

describe('Home', () => {

  test('renders page title', () => {
    render(<Home />);
    expect(screen.getByText('My Korea')).toBeInTheDocument();
  });

  test('renders page subtitle', () => {
    render(<Home />);
    expect(screen.getByText('All your favourite Korean Ramen Products')).toBeInTheDocument();
  });
});
