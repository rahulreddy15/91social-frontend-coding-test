import React from "react";
import styled from "styled-components";

const FooterStyle = styled.footer`
  margin-top: auto;
  padding: 1rem;
  background: #181c1f;
  color: #fff;
  text-align: center;

  small {
    display: block;
    margin: 0 auto;
    max-width: 75%;
    font-size: 90%;
    line-height: 1.375;
    color: #fc0303;
  }
`;

const Footer = () => (
  <FooterStyle>
    <small>
      This is for the 91social frontend coding task. Call me @ 7032926228.
    </small>
  </FooterStyle>
);

export default Footer;
