import React, { useState } from 'react';
import api from '../../../services/api'

import Menu from '../../../components/Header'
import './novocliente.css'


function NovoCliente({ history }) {
  const [formData, setFormData] = useState({
    nomefantasia: '',
    razaosocial: '',
    cnpj: '',
    ie: '',
    endereco: '',
    endereco1: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    telefone1: '',
    telefone2: '',
    email: '',
    valorfixo: '',
    valorRetirada: '', // 👈 novo campo
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const valorfixoFormatado = formData.valorfixo.replace(",", ".");
    const valorRetiradaFormatado = formData.valorRetirada.replace(",", ".");

    const token = localStorage.getItem('token');
    await api.post(`empresa`,
      {
        nomefantasia: formData.nomefantasia || 'não tem',
        razaosocial: formData.razaosocial || 'não tem',
        cnpj: formData.cnpj || 'não tem',
        ie: formData.ie || 'não tem',
        endereco: formData.endereco || 'não tem',
        endereco1: formData.endereco1 || 'não tem',
        numero: formData.numero || 'não tem',
        bairro: formData.bairro || 'não tem',
        cidade: formData.cidade || 'não tem',
        estado: formData.estado || 'não tem',
        telefone1: formData.telefone1 || 'não tem',
        telefone2: formData.telefone2 || 'não tem',
        email: formData.email || 'não tem',
        site: formData.site || 'não tem',
        valorfixo: valorfixoFormatado,
        valorRetirada: valorRetiradaFormatado, // 👈 enviado para API
      },
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
      .then(res => {
        setMessage('Empresa cadastrada com sucesso!');
        history.push('/clientes');
      })
      .catch(e => {
        setMessage(`${e} teste`);
        setMessage('');
      });
  };

  return (
    <>
      <div className='geral'>
        <div className='menu'>
          <Menu />
        </div>

        <div className='content'>
          <header>
            <span>{'Painel de Controle > Empresas > '}<strong> Cadastrar Empresa </strong></span>
          </header>

          <div className='top'></div>
          <div className='main'>
            <div className='head'>
              <h3>Cadastrar Novo Cliente</h3>
            </div>

            <div>
              {message !== '' ? window.alert(message) : ''}

              <form className='form' onSubmit={handleSubmit}>
                {Object.entries({
                  nomefantasia: 'Nome Fantasia',
                  razaosocial: 'Razão Social',
                  cnpj: 'CNPJ',
                  ie: 'Inscrição Estadual',
                  endereco: 'Endereço de Cobrança',
                  numero: 'Número',
                  endereco1: 'Endereço de Entrega',
                  bairro: 'Bairro',
                  cidade: 'Cidade',
                  estado: 'Estado',
                  telefone1: 'Telefone',
                  telefone2: 'Celular',
                  email: 'E-mail',
                  valorfixo: 'Valor',
                  valorRetirada: 'Valor Retirada', // 👈 campo extra
                }).map(([field, label]) => (
                  <label key={field}>
                    {label}
                    <input
                      type="text"
                      name={field}
                      id={field}
                      onChange={handleChange}
                      value={formData[field]}
                    />
                  </label>
                ))}

                <input className='botao' type='submit' name='cadastrar' value='Cadastrar' />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NovoCliente;