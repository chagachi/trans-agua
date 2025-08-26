import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Menu from "../../components/Header";
import "./plascas.css";

function Placas() {
  const [placas, setPlacas] = useState([]);
  const [paginate, setPaginate] = useState(1);
  const [adm] = useState(localStorage.getItem("adm"));

  const token = localStorage.getItem("token");

  const fetchPlacas = useCallback(
    async (pagina = 1) => {
      const response = await api.get(`placas`, {
        headers: { Authorization: `Bearer ${token}`, pagina: `${pagina}` },
      });
      setPlacas(response.data.data);
      setPaginate(pagina);
      console.log(response);
    },
    [token]
  );

  const deletePlaca = async (e) => {
    await api.delete(
      `placas/${e.target.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchPlacas(paginate);
  };

  useEffect(() => {
    fetchPlacas();
  }, [fetchPlacas]);

  return (
    <div className="geral">
      <Menu />
      <div className="content">
        <div className="top">
          <header>
            <span>
              {"Painel de Controle >"}
              <strong> Placas</strong>
            </span>
          </header>
        </div>
        <div className="main">
          <div className="head">
            <h3>Motoristas Cadastrados</h3>
            <Link to="/placas/novaplaca">
              <span>Cadastrar placa</span>
            </Link>
          </div>

          <div className="tabsPlacas">
            <span>PLACA</span>
          </div>

          {placas.map((post) => (
            <div className="clientesPlacas" key={post.id}>
              <span>{post.placas}</span>
              {
                adm === '1' &&
                  <div>
                    <button
                      className="delete"
                      id={post.id}
                      onClick={deletePlaca}
                    >
                      Excluir
                    </button>
                  </div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Placas;
