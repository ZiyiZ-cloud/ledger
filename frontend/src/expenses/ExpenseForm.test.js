import { render, screen } from '@testing-library/react';
import ExpenseForm from './ExpenseForm.js';

test('renders expense card', () => {
  render(<ExpenseForm />);
  const linkElement = screen.getByText(/Add New Expense  /i);
  expect(linkElement).toBeInTheDocument();
});