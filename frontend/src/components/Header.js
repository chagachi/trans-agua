import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/logo.png'

function menu() {
  const adm = localStorage.getItem('adm')

  if(adm == 1){
    return (
      <>
      <div className='sidebar'>
        <img src={logo} alt='Trans Água' />
  
        <ul>
          <Link to='/dashboard'>
            <li>Home</li>
          </Link>
  
          <Link to='/clientes'>
            <li>clientes</li>
          </Link>
  
          <Link to='/vales'>
            <li>Vales</li>
          </Link>
          
          <Link to='/relatorios'>
            <li>Relatórios</li>
          </Link>
  
          <Link to='/motoristas'>
            <li>Motoristas</li>
          </Link>
  
          <Link to='/logout'>
            <li>Sair</li>
          </Link>
        </ul>
      </div>
      </>
    );
  }

  return (
    <>
    <div className='sidebar'>
      <img src={logo} alt='Trans Água' />

      <ul>
        <Link to='/dashboard'>
          <li>Home</li>
        </Link>

        <Link to='/clientes'>
          <li>clientes</li>
        </Link>

        <Link to='/vales'>
          <li>Vales</li>
        </Link>

        <Link to='/motoristas'>
          <li>Motoristas</li>
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
