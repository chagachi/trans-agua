import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/logo.png'

function menu() {
  const adm = localStorage.getItem('adm')
    return (
      <>
      <div className='sidebar'>
        <Link to='/dashboard'>
          <img src={logo} alt='Trans Água' />
        </Link>
  
        <ul>
          <Link to='/dashboard'>
            <li>Home</li>
          </Link>
  
          <Link to='/clientes'>
            <li>Clientes</li>
          </Link>
  
          <Link to='/vales'>
            <li>Vales</li>
          </Link>
          
          {
            adm === '1' ? 
              <Link to='/relatorios'>
                <li>Relatórios</li>
              </Link>
            : ''
          }
  
          <Link to='/motoristas'>
            <li>Motoristas</li>
          </Link>
          
          <Link to='/placas'>
            <li>Placas</li>
          </Link>
  
          <Link to='/logout'>
            <li>Sair</li>
          </Link>
        </ul>
      </div>
      </>
    );
}

  

export default menu
