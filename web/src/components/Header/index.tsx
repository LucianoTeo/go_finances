import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const date = new Date().toLocaleDateString('pt-br');
const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  return (
    <Container size={size}>
      <header>
        <Link to="/">
          <img src={Logo} alt="GoFinances" />
        </Link>
        <span>{date}</span>
        <nav>
          <>
            <Link
              to="/"
              className={`${window.location.pathname === '/' && 'active'}`}
            >
              Listagem
            </Link>
            <Link
              to="/import"
              className={`${
                window.location.pathname === '/import' && 'active'
              }`}
            >
              Importar
            </Link>
          </>
        </nav>
      </header>
    </Container>
  );
};
export default Header;
