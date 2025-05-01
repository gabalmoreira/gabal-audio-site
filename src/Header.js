import React from 'react';
import './Header.css'; // Ou adicione no seu App.css

function Header() {
  return (
    <header className="header-gabal">
      <div className="container-header">
        <img src="/images/logo-gabal.png" alt="Logo Gabal" className="logo-gabal" />
        
        <nav className="menu-gabal">
          <a href="#home" className="active">Home</a>
          <a href="#atendimento">Área de Atendimento</a>
          <a href="#avaliacoes">Avaliações</a>
          <a href="#equipamentos">Nossos equipamentos</a>
        </nav>

        <div className="social-buttons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon-instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/5562992461404" target="_blank" rel="noopener noreferrer" className="botao-whatsapp">
            Whatsapp
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;