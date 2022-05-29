import styled from 'styled-components';

const Container = styled.header`
  grid-area: header;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #895d52;
  color: #fff;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: .1rem;
`;

const Subtitle = styled.div`
  font-size: 14px;
`;

const Header = () => (
  <Container>
    <Title>Vegan Chocolate Bars</Title>
    <Subtitle>Vending Machine</Subtitle>
  </Container>
);

export default Header;
