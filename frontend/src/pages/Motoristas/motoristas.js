import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Menu from '../../components/Header'
import './motoristas.css'

function Motoristas() {
  const [moto, setMoto] = useState([]);
  const [lastPage, setLastPage] = useState('');
  const [paginate, setPaginate] = useState(1);
  const [adm] = useState(localStorage.getItem('adm'));

  const token = localStorage.getItem('token');

  const fetchMotoristas = useCallback(async (pagina = 1) => {
    const response = await api.get(`motorista`, {
      headers: { 'Authorization': `Bearer ${token}`, pagina: `${pagina}` }
    });
    setMoto(response.data.data);
    setLastPage(response.data.lastPage);
    setPaginate(pagina);
  }, [token]);

  const deleteMotorista = async (e) => {
    await api.put(
      `motorista/${e.target.id}`,
      { status: 1 },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    fetchMotoristas(paginate);
  };

  const next = () => fetchMotoristas(Number(paginate) + 1);
  const back = () => fetchMotoristas(Number(paginate) - 1);
  const unique = (e) => fetchMotoristas(Number(e.target.id));

  const createPagination = () => {
    const limite = 2;
    const page = [];
    let startPage = (paginate - limite) > 1 ? paginate - limite : 1;
    let endPage = Number(paginate + limite) < lastPage ? Number(paginate + limite) : Number(lastPage);

    if (paginate > 1) page.push(<span key="back" onClick={back}>«</span>);

    if (lastPage > 1 && paginate <= lastPage) {
      if (lastPage > 3) {
        if (paginate <= 3) {
          for (let i = 1; i <= 5; i++) {
            page.push(
              <p
                key={i}
                className={i === paginate ? 'active' : ''}
                id={`${i}`}
                onClick={unique}
              >
                {i}
              </p>
            );
          }
        } else {
          for (let i = startPage; i <= endPage; i++) {
            page.push(
              <p
                key={i}
                className={i === paginate ? 'active' : ''}
                id={`${i}`}
                onClick={unique}
              >
                {i}
              </p>
            );
          }
        }
      } else {
        for (let i = startPage; i <= endPage; i++) {
          page.push(
            <p
              key={i}
              className={i === paginate ? 'active' : ''}
              id={`${i}`}
              onClick={unique}
            >
              {i}
            </p>
          );
        }
      }
    }

    if (endPage <= lastPage - 1) page.push(<span key="next" onClick={next}>»</span>);

    return page;
  };

  useEffect(() => {
    fetchMotoristas();
  }, [fetchMotoristas]);

  return (
    <div className='geral'>
      <Menu />
      {adm === '1' ? (
        <div className='content'>
          <div className='top'>
            <header>
              <span>{'Painel de Controle >'}<strong> Clientes</strong></span>
            </header>
          </div>
          <div className='main'>
            <div className='head'>
              <h3>Motoristas Cadastrados</h3>
              <Link to='/motoristas/novomotorista'><span>Cadastrar Motorista</span></Link>
            </div>

            <div className='tabs'>
              <span>NOME</span>
              <span>TELEFONE</span>
              <span>CELULAR</span>
            </div>

            {moto.map(post => (
              <div className='clientes' key={post.id}>
                <span>{post.nome}</span>
                <span>{post.telefone}</span>
                <span>{post.celular}</span>
                <div>
                  <Link to={{
                    pathname: '/motoristas/motorista',
                    state: { id: post.id }
                  }}>
                    <button className='see'>Ver | Editar</button>
                  </Link>
                  <button
                    className='delete'
                    id={post.id}
                    onClick={deleteMotorista}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}

            <div className='pagination'>
              {createPagination()}
            </div>
          </div>
        </div>
      ) : (
        <div className='content'>
          <div className='menu'>
            <Menu />
          </div>

          <header>
            <span>{'Painel de Controle >'}<strong> Clientes</strong></span>
          </header>

          <div className='top'></div>
          <div className='main'>
            <div className='head'>
              <h3>Motoristas Cadastrados</h3>
              <Link to='/motoristas/novomotorista'><span>Cadastrar Motorista</span></Link>
            </div>

            <div className='tabs'>
              <span>NOME</span>
              <span>TELEFONE</span>
              <span>CELULAR</span>
            </div>

            {moto.map(post => (
              <div className='clientes' key={post.id}>
                <span>{post.nome}</span>
                <span>{post.telefone}</span>
                <span>{post.celular}</span>
                <div>
                  <Link to={{
                    pathname: '/motoristas/motorista',
                    state: { id: post.id }
                  }}>
                    <button className='see'>Ver | Editar</button>
                  </Link>
                </div>
              </div>
            ))}

            <div className='pagination'>
              {createPagination()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Motoristas;