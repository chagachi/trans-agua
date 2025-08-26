import React, { useState } from 'react';
import Menu from '../../../components/Header'
import api from '../../../services/api'

import './novoplaca.css'


function NovoMotorista({ history }) {
  const [placas, setPlaca] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    await api.post(`placas`,
      {
        placas,
      },
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
      .then(res => {
        setMessage('Usuário cadastrado com sucesso!');
        history.push('/placas');
      })
      .catch(e => setMessage(`${e}`));
  };

  return (
    <>
      <div className='geral'>
        <Menu />

        <div className='content'>
          <div className='top'>
            <header>
              <span>
                {'Painel de Controle > Placas > '}<strong> Cadastrar Placa </strong>
              </span>
            </header>
          </div>
          <div className='main'>
            <div className='head'>
              <h3>Cadastrar Placa</h3>
            </div>

            <div>
              {message !== '' ? window.alert(message) : ''}

              <form className='novomotorista' onSubmit={handleSubmit}>
                <label> Placa
                  <input
                    type='text'
                    name='nome'
                    id='nome'
                    onChange={e => setPlaca(e.target.value)}
                    value={placas}
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