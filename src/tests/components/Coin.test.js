import { render, screen, fireEvent } from '@testing-library/react';
import Coin from '../../components/Coin';

describe('<Coin />', () => {
  let props, onClickCallback = jest.fn();

  beforeEach(() => {
    props = {
      name: '10c',
      onClick: onClickCallback
    }
  });


  it('should display coin component', () => {
    render(<Coin {...props} />);
    const coin = screen.getByTestId(/coin/i);
    expect(coin).toBeInTheDocument();
  });
  
  it('should call onClick callback', () => {
    render(<Coin {...props} />);
    const coin = screen.getByTestId(/coin/i);
    fireEvent.click(coin);
    expect(onClickCallback).toHaveBeenCalled();
  });
});
