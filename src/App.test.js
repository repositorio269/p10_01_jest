import { render, screen } from '@testing-library/react';
import App from './App';

xtest('Comprueba que link que trae por defecto', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
