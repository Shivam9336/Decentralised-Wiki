import { render, screen } from '@testing-library/react';
import App from './App';

test('renders decentralised wiki heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/decentralised wiki/i);
  expect(headingElement).toBeInTheDocument();
});
