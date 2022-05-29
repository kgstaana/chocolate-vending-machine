import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';

describe('<Header />', () => {
  it('should display header component', () => {
    render(<Header />);

    const title = screen.getByText(/Vegan Chocolate Bars/i);
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText(/Vending Machine/i);
    expect(subtitle).toBeInTheDocument();
  });
});
