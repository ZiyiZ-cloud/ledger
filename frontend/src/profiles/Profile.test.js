import { render, screen } from '@testing-library/react';
import Profile from './Profile';

test('renders expense card', () => {
  render(<Profile />);
  const linkElement = screen.getByText(/Username /i);
  expect(linkElement).toBeInTheDocument();
});