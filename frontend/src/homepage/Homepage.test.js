import { render, screen } from '@testing-library/react';
import Homepage from './Homepage.js';

test('renders homepage', () => {
  render(<Homepage />);
  const linkElement = screen.getByText(/Track Your Expenses! /i);
  expect(linkElement).toBeInTheDocument();
});