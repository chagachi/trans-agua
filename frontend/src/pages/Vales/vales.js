import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './vales.css'

function Vales() {
  const [pedido, setPedido] = useState([]);
  const [adm] = useState(localStorage.getItem("adm"));
  const [busca, setBusca] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const getVales = async () => {
    const response = await api.get("pedido", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPedido(response.data.data);
  };

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

  useEffect(() => {
    getVales();
  }, []);

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
        </div>
      </div>
    </div>
  );
}

export default Vales;