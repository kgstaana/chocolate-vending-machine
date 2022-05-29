import { render, screen, fireEvent } from '@testing-library/react';
import Payment from '../../components/Payment';

describe('<Payment />', () => {
  let props, addCoinCallback = jest.fn();

  beforeEach(() => {
    props = {
      coins: [
        { name: '10c', value: 0.10, currency: 'aud' },
        { name: '20c', value: 0.20, currency: 'aud' },
        { name: '50c', value: 0.50, currency: 'aud' },
        { name: '$1', value: 1.00, currency: 'aud' },
        { name: '$2', value: 2.00, currency: 'aud' }
      ],
      credit: 0.00,
      change: 0.00,
      addCoin: addCoinCallback
    };
  });

  it('should display products component', () => {
    render(<Payment {...props}/>);
    const credit = screen.getByText(/Credit/i);
    expect(credit).toBeInTheDocument();

    const change = screen.getByText(/Change/i);
    expect(change).toBeInTheDocument();
  });

  it('should display list of coins', () => {
    render(<Payment {...props}/>);
    const coinIds = ['coin-1', 'coin-2', 'coin-3', 'coin-4', 'coin-5'];
    coinIds.forEach((id) => {
      const element = screen.getByTestId(id);
      expect(element).toBeInTheDocument()
    });
  });

  it('should call addCoin callback when coin is clicked', () => {
    render(<Payment {...props} />);
    const coin = screen.getByTestId(/coin-1/i);
    fireEvent.click(coin);
    expect(addCoinCallback).toHaveBeenCalled();
  });
});
