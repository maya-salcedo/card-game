import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 0.8rem;
  height: 10vh;
  background-color: #009440;
  > a {
    color: #fff;
    padding-right: 0.3rem;
    padding-left: 0.3rem;

    :hover {
      color: #ff0000;
    }
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      This App is built using
      <a href="https://deckofcardsapi.com/">Deck of Cards</a> API
    </StyledFooter>
  );
}
