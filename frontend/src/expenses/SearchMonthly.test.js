import { render, screen } from '@testing-library/react';
import SearchMonthly from './SearchMonthly.js';

test('renders expense card', () => {
  render(<SearchMonthly />);
  const linkElement = screen.getByText(/Search By Month /i);
  expect(linkElement).toBeInTheDocument();
});