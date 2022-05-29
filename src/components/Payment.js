import PropTypes from 'prop-types';
import styled from 'styled-components';
import Coin from '../components/Coin';

const Container = styled.div`
  grid-area: payment;
  padding: 30px;
  border-right: 2px solid #895d52;
`;

const CoinContainer = styled.div`
  display: flex;
  grid-column-gap: 8px;
`;

const Title = styled.p``;

const Note = styled.p`
  color: red;
  font-size: 14px;
  font-style: italic;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  grid-row-gap: 8px;
`;

const Info = styled.div`
  display: flex;
  grid-column-gap: 4px;
  align-items: center;

  div {
    background: #878787;
    padding: 6px 16px;
    color: #fff;
  }
`;

const InvalidCoinCointainer = styled.div`
  margin-top: 48px;
`;

const Payment = ({
  coins,
  credit,
  change,
  addCoin
}) => {
  const invalidCoins = [
    { name: '5c', value: 0.05, currency: 'aud' },
    { name: '¥100', value: 100.00, currency: 'yen' },
    { name: '€100', value: 100.00, currency: 'euro' }
  ];
  const handleAddCoin = (coin) => {
    addCoin(coin);
  };

  return (
    <Container>
      <InfoContainer>
        <Info>
          <span>Credit:</span>
          <div data-testid="credit-value">${credit.toFixed(2)}</div>
        </Info>
        <Info>
          <span>Change:</span>
          <div data-testid="change-value">${change.toFixed(2)}</div>
        </Info>
      </InfoContainer>

      <Title>Insert coin(s):</Title>
      <Note>This vending machine only accept the following coins:</Note>
      <CoinContainer>
        {coins.map((coin, id) => {
          const { name } = coin;
          return (
            <Coin
              key={name}
              name={name}
              onClick={() => handleAddCoin(coin)}
              data-testid={`coin-${id + 1}`}
            />
          )
        })}
      </CoinContainer>

      <InvalidCoinCointainer>
        <Note>Sample invalid coins(for demo only):</Note>
        <CoinContainer>
          {invalidCoins.map((coin) => {
            const { name, value } = coin;
            return (
              <Coin
                key={name}
                name={name}
                value={value}
                onClick={() => handleAddCoin(coin)}
              />
            )
          })}
        </CoinContainer>
      </InvalidCoinCointainer>
    </Container>
  );
};

Payment.propTypes = {
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
    })
  ),
  credit: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  addCoin: PropTypes.func
};

Payment.defaultProps = {
  coins: [],
  addCoin: () => {}
};

export default Payment;
