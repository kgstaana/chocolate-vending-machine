import { render, screen, fireEvent } from '@testing-library/react';
import Products from '../../components/Products';

describe('<Products />', () => {
  let props, selectProductCallback = jest.fn(), purchaseProductCallback = jest.fn();

  beforeEach(() => {
    props = {
      products: [
        { id: 1, name: 'Caramel', price: 2.50, currency: 'aud', symbol: '$' },
        { id: 2, name: 'Hazelnut', price: 3.10, currency: 'aud', symbol: '$' },
        { id: 3, name: 'Organic Raw', price: 2.00, currency: 'aud', symbol: '$' },
      ],
      credit: 0.00,
      selectedProduct: null,
      selectProduct: selectProductCallback,
      purchaseProduct: purchaseProductCallback,
    };
  });

  it('should display products component', () => {
    render(<Products {...props}/>);
    const title = screen.getByText(/Chocolate Options/i);
    expect(title).toBeInTheDocument();
  });

  it('should display list of products', () => {
    render(<Products {...props}/>);
    const productsIds = ['product-button-1', 'product-button-2', 'product-button-3'];
    productsIds.forEach((id) => {
      const element = screen.getByTestId(id);
      expect(element).toBeInTheDocument()
    });
  });

  it('should display purchase button', () => {
    render(<Products {...props}/>);
    const purchaseButton = screen.getByTestId(/purchase/i);
    expect(purchaseButton).toBeInTheDocument();
  });

  it('should call selectProduct callback when product is clicked', () => {
    const newProps = {
      ...props,
      credit: 4.00 
    };
    render(<Products {...newProps} />);
    const product = screen.getByTestId(/product-button-1/i);
    fireEvent.click(product);
    expect(selectProductCallback).toHaveBeenCalled();
  });

  it('should call purchaseProduct callback when purchase button is clicked', () => {
    const newProps = {
      ...props,
      credit: 4.00,
      selectedProduct: { name: 'Caramel' }
    };
    render(<Products {...newProps} />);
    const product = screen.getByTestId(/product-button-1/i);
    fireEvent.click(product);

    const purchaseButton = screen.getByTestId(/purchase/i);
    fireEvent.click(purchaseButton);

    expect(purchaseProductCallback).toHaveBeenCalled();
  });
});
