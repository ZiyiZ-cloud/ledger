import { render, screen } from '@testing-library/react';
import Expenses from './ExpenseCard.js';

test('renders expense card', () => {
  render(<Expenses />);
  const linkElement = screen.getByText(/Amount /i);
  expect(linkElement).toBeInTheDocument();
});