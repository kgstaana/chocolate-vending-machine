import { render, screen } from '@testing-library/react';
import App from '../App';

describe('<App />', () => {
  it('should render App', () => {
    render(<App />);
    const banner = screen.getByText(/Vegan Chocolate Bars/i);
    expect(banner).toBeInTheDocument();
  });
});
