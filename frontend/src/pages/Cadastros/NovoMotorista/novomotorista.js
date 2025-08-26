import React, { useState } from 'react';
import Menu from '../../../components/Header'
import api from '../../../services/api'

import './novomotorista.css'


function NovoMotorista({ history }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [celular, setCelular] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    await api.post(`motorista`,
      {
        nome,
        telefone,
        celular,
      },
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
      .then(res => {
        setMessage('Usuário cadastrado com sucesso!');
        history.push('/motoristas');
      })
      .catch(e => setMessage(`${e}`));
  };

  return (
    <>
      <div className='geral'>
        <div className='menu'>
          <Menu />
        </div>

        <div className='content'>
          <header>
            <span>
              {'Painel de Controle > Motoristas > '}<strong> Cadastrar Motorista </strong>
            </span>
          </header>

          <div className='top'></div>
          <div className='main'>
            <div className='head'>
              <h3>Cadastrar Motorista</h3>
            </div>

            <div>
              {message !== '' ? window.alert(message) : ''}

              <form className='novomotorista' onSubmit={handleSubmit}>
                <label> Nome
                  <input
                    type='text'
                    name='nome'
                    id='nome'
                    onChange={e => setNome(e.target.value)}
                    value={nome}
                  />
                </label>

                <label> Telefone
                  <input
                    type='text'
                    name='telefone'
                    id='telefone'
                    onChange={e => setTelefone(e.target.value)}
                    value={telefone}
                  />
                </label>

                <label> Celular
                  <input
                    type='text'
                    name='celular'
                    id='celular'
                    onChange={e => setCelular(e.target.value)}
                    value={celular}
                  />
                </label>

                <input className='botao' type='submit' name='cadastrar' value='Cadastrar' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NovoMotorista;