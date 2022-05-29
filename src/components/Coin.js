import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  border: 1px solid #333;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFD700;
  color: #333;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    border: 2px solid #895d52;
  }
`;

const Coin = ({ name, ...rest }) => (
  <Container data-testid="coin" {...rest}>
    {name}
  </Container>
);

Coin.propTypes = {
  name: PropTypes.string.isRequired
};

export default Coin;
