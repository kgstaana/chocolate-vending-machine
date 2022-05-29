import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as CheckSVG } from '../assets/check-icon.svg';

const Container = styled.div`
  grid-area: products;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.p``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 8px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  flex: 1;
  padding-top: 48px;
`;

const ActionButton = styled.button`
  box-sizing: border-box;
  border: 1px solid #4a6649;
  border-radius: 8px;
  width: 150px;
  height: 50px;
  background-color: #5e996c;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: inset 0 -1px 0px 1px rgb(0 0 0 / 25%);

  ${({ disabled }) => {
    if (!disabled) {
      return `
        &:hover {
          box-shadow: inset 0 0 0px 30px rgb(0 0 0 / 25%);
        }
      `;
    }

    return `
      background: #b1aeae;
      border: none;
      cursor: not-allowed;
    `;
  }}
`;

const ProductButton = styled.button`
  height: 60px;
  width: 250px;
  background: #c9b9ad;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-gap: 4px;
  position: relative;

  ${({ isSelected }) => {
    if (isSelected) {
      return `
        box-shadow: 0 0 2px 1px #5fb674;
        background: #e4e4e4;
      `;
    }
  }}

  ${({ disabled }) => {
    if (!disabled) {
      return `
        &:hover {
          border: 2px solid #895d52;
          font-weight: bold;
        }
      `;
    }

    return `
      background: #b1aeae;
      border: none;
      cursor: not-allowed;
    `;
  }}
`;

const CheckIcon = styled(CheckSVG)`
  position: absolute;
  top: 4px;
  right: 4px;
`;

const ProductName = styled.span`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

const ProductPrice = styled.span`
  color: #333;
  font-size: 16px;
`;

const Products = ({
  products,
  credit,
  selectedProduct,
  selectProduct,
  purchaseProduct,
}) => {
  const isSelectedProduct = (selected, id) => {
    if (!selected) {
      return false;
    }
    return selectedProduct.id === id
  };

  const handleSelectProduct = (product) => {
    selectProduct(product);
  };

  return (
    <Container>
      <Title>Chocolate Options:</Title>
      <Content>
        {products.map((product, i) => {
          const { id, name, symbol, price } = product;
          return (
            <div key={id}>
              <ProductButton
                disabled={credit < price}
                isSelected={isSelectedProduct(selectedProduct, id)}
                onClick={() => handleSelectProduct(product)}
                data-testid={`product-button-${i + 1}`}
              >
                <ProductName>{name}</ProductName>
                -
                <ProductPrice>{symbol}{price.toFixed(2)}</ProductPrice>
                {isSelectedProduct(selectedProduct, id) && (
                  <CheckIcon />
                )}
              </ProductButton>
            </div>
          );
        })}
      </Content>
      <Actions>
        <ActionButton
          disabled={!selectedProduct}
          onClick={purchaseProduct}
          data-testid="purchase"
        >
          Purchase
        </ActionButton>
      </Actions>
    </Container>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      currency: PropTypes.string,
      price: PropTypes.number,
      symbol: PropTypes.string,
    })
  ),
  credit: PropTypes.number.isRequired,
  selectedProduct: PropTypes.object,
  selectProduct: PropTypes.func,
  purchaseProduct: PropTypes.func,
};

Products.defaultProps = {
  products: [],
  selectedProduct: {},
  selectProduct: () => {},
  purchaseProduct: () => {}
};


export default Products;
