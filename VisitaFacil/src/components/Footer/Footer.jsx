// Footer.jsx
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #1f1f1f;
  color: #ccc;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.95rem;
  margin-top: 4rem;
`;

const Footer = () => {
    return (
        <FooterWrapper>
            © 2025 VisitaFácil. Todos los derechos reservados.
        </FooterWrapper>
    );
};

export default Footer;
