import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './vales.css'

function Vales() {
  const [pedido, setPedido] = useState([]);
  const [adm] = useState(localStorage.getItem("adm"));
  const [busca, setBusca] = useState("");
  const [message, setMessage] = useState("");
  const [paginate, setPaginate] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const token = localStorage.getItem("token");

  const getVales = useCallback( async (pagina = 1) => {
    const response = await api.get("pedido", {
      headers: { Authorization: `Bearer ${token}`, pagina: `${pagina}` },
    });
    setPedido(response.data.data);
    setLastPage(response.data.lastPage);
    setPaginate(pagina);
    }, [token])

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post(
        "buscarpedido",
        { id: busca },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data) {
        setPedido([].concat(res.data));
      } else {
        setMessage("Não existe uma empresa com este nome.");
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`pedido/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const response = await api.get("pedido", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPedido(response.data.data);
  };

  const next = () => getVales(Number(paginate) + 1);
  const back = () => getVales(Number(paginate) - 1);
  const unique = (e) => getVales(Number(e.target.id));

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
    getVales();
  }, [getVales]);

  return (
    <div className="geral">
      <Menu />
      <div className="content">
        <div className="top">
          <header>
            <span>
              {"Painel de Controle >"} <strong> Vales </strong>
            </span>
          </header>
        </div>
        <div className="main">
          <div className="head">
            <h3>Últimos Vales Emitidos</h3>
            <Link to="/vales/novovale">
              <span>Novo Vale</span>
            </Link>
          </div>

          <form className="pesquisa" onSubmit={handleSubmit}>
            <input
              type="text"
              name="busca"
              id="busca"
              onChange={(e) => setBusca(e.target.value)}
              value={busca}
            />

            <input type="submit" value="Pesquisar" />
          </form>

          {message !== "" ? window.alert(message) : null}

          <div className="tabs-vales">
            <span>EMPRESA</span>
            <span>CNPJ</span>
            <span>NÚMERO</span>
          </div>

          {pedido.map((post) => (
            <div className="clientes-vales" key={post.id}>
              <span>{post.empresa}</span>
              <span>{post.cnpj}</span>
              <span>{post.id}</span>
              <div>
                <Link
                  to={{
                    pathname: "/vales/vale",
                    state: { id: post.id },
                    search: `id=${post.id}`,
                  }}
                >
                  <button className="see">Ver | Editar</button>
                </Link>

                {adm === "1" && (
                  <button
                    className="delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className='pagination'>
            {createPagination()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vales;