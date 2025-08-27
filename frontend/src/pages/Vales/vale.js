import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import Datepicker from "react-datepicker";
import Menu from "../../components/Header";
import api from "../../services/api";
import "./vale.css";
import "react-datepicker/dist/react-datepicker.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Vales() {
  const [pedido, setPedido] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [motorista, setMotorista] = useState([]);
  const [placas, setPlacas] = useState([]);
  const adm = localStorage.getItem("adm");
  const [data, setData] = useState("");
  const [mensagem, setMensagem] = useState("");
  const location = useLocation();
  console.log(location);

  const history = useHistory();

  function gobackhandle() {
    history.push({ pathname: "/relatorios", state: location.state });
  }

  let query = useQuery();
  let result = query.get("id");

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function user() {
      const empresas = await api.get(`listarempresas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmpresas(empresas.data);
      return empresas;
    }

    async function moto() {
      const motorista = await api.get("listarmotoristas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMotorista(motorista.data);
      return motorista;
    }

    async function placas(){
      const placa = await api.get(`placas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      setPlacas(placa.data.data)
    }

    async function pedido(id) {
      const vale = await api.get(`pedido/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await setPedido(vale.data);
      const formatValue = vale.data.valorUnitario;
      formatValue.replace(",", ".");
      // setPedido({valorUnitario: valorFormatado})
      return vale.data;
    }
    user();
    moto();
    placas();
    pedido(result);
  }, [result]);

  function change() {
    let empresas = document.getElementById("empresa");
    let attr = empresas.options[empresas.selectedIndex].attributes;
    // console.log(this.state.empresas)
    // console.log(empresas.options[empresas.selectedIndex].attributes)

    setPedido({
      ...pedido,
      empresa: attr.name.value,
      cnpj: attr.cnpj.value,
      idEmpresa: attr.id.value,
      localEntrega: attr.endereco.value,
      valorUnitario: attr.valor.value,
    });
  }

  function moto() {
    let motoristas = document.getElementById("motorista");
    let att = motoristas.options[motoristas.selectedIndex].attributes;
    console.log(att);

    setPedido({
      ...pedido,
      motorista: att.name.value,
      idMotorista: att.id.value,
    });
  }
  
  function placaChange() {
    let placas = document.getElementById("placa");
    let att = placas.options[placas.selectedIndex].attributes;
    console.log(att);

    setPedido({
      ...pedido,
      placa: att.name.value,
    });
  }

  function carga(event) {
    const formatValue = event.target.value;
    const valorFormatado = formatValue.replace(",", ".");

    let total = valorFormatado * pedido.valorUnitario;

    setPedido({ ...pedido, totalLiquido: total.toFixed(2) });
  }

  async function salvar(event) {
    event.preventDefault();

    const formatValue = pedido.quantidadeCarga;
    formatValue.replace(",", ".");

    if (data !== "") {
      const start = data.toLocaleDateString();
      const startsplit = start.split("/").reverse().join("/");

      const token = localStorage.getItem("token");
      await api
        .put(
          `pedido/${result}`,
          {
            idEmpresa: pedido.idEmpresa,
            empresa: pedido.empresa,
            cnpj: pedido.cnpj,
            idMotorista: pedido.idMotorista,
            motorista: pedido.motorista,
            placa: pedido.placa,
            localEntrega: pedido.localEntrega,
            valorUnitario: pedido.valorUnitario,
            quantidadeCarga: pedido.quantidadeCarga,
            totalLiquido: pedido.totalLiquido,
            observacao: pedido.observacao,
            create: `${startsplit} 12:00:00`,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setMensagem("Vale alterado com sucesso! Deseja Imprimir ?");
          // history.push({
          //     pathname: '/impressao',
          //     state:{id: res.data.id}})
        })
        .catch((e) => setMensagem(`${e}`));
    } else {
      const token = localStorage.getItem("token");
      await api
        .put(
          `pedido/${result}`,
          {
            idEmpresa: pedido.idEmpresa,
            empresa: pedido.empresa,
            cnpj: pedido.cnpj,
            idMotorista: pedido.idMotorista,
            motorista: pedido.motorista,
            placa: pedido.placa,
            localEntrega: pedido.localEntrega,
            valorUnitario: pedido.valorUnitario,
            quantidadeCarga: pedido.quantidadeCarga,
            totalLiquido: pedido.totalLiquido,
            observacao: pedido.observacao,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setMensagem("Vale alterado com sucesso! Deseja Imprimir ?");
          // history.push({
          //     pathname: '/impressao',
          //     state:{id: res.data.id}})
        })
        .catch((e) => setMensagem(`${e}`));
    }
  }

  return (
    <>
      <div className="geral">
        <Menu />
        <div className="content">
          <div className="top">
            <header>
              <span>
                {"Painel de Controle >"} <strong> Vale </strong>
              </span>
            </header>
          </div>
          <div className="main">
            <div className="cabecalho">
              {mensagem !== ""
                ? (window.confirm(mensagem)
                    ? history.push({
                        pathname: "/impressao",
                        state: { id: location.state.id },
                      })
                    : null,
                  setMensagem(""))
                : ""}

              <div className="head-vale">
                <button className="vai" onClick={gobackhandle}>
                  Voltar
                </button>
              </div>
              <select id="empresa" onChange={change} value={pedido.empresa}>
                <option name="inicio" id="1" value="" disabled selected>
                  {" "}
                  Selecione a empresa
                </option>
                {empresas.map((post) => (
                  <option
                    key={post.id}
                    name={post.nomefantasia}
                    cnpj={post.cnpj}
                    valor={post.valorFixo}
                    endereco={post.endereco1}
                    id={post.id}
                  >
                    {" "}
                    {post.nomefantasia}{" "}
                  </option>
                ))}
              </select>
            </div>

            <form className="novovale">
              <label>
                {" "}
                Empresa
                <input
                  type="text"
                  name="empresa"
                  id="empresa"
                  onChange={(e) =>
                    setPedido({ ...pedido, empresa: e.target.value })
                  }
                  value={pedido.empresa}
                />
              </label>
              <label>
                CNPJ
                <input
                  type="text"
                  name="cnpj"
                  id="cnpj"
                  onChange={(e) =>
                    setPedido({ ...pedido, cnpj: e.target.value })
                  }
                  value={pedido.cnpj}
                />
              </label>
              <label>
                Motorista
                {
											pedido.retirada === 0 ?
												<select
													id="motorista"
													onChange={moto}
													value={pedido.motorista}
												>
													<option name="ini" id="1" value="" disabled>
														Selecione o Motorista
													</option>
													{motorista.map((moto) => (
														<option key={moto.id} name={moto.nome} id={moto.id}>
															{moto.nome}
														</option>
													))}
												</select>
											:
												<input
													type="text"
													name="motorista"
													id="motorista"
													onChange={(e) => setPedido({...pedido, motorista:e.target.value})}
													value={pedido.motorista}
												/>
										}
              </label>
              <label>
                {" "}
                Placa
                {
                  pedido.retirada === 0 ?
                  <select
                      id="placa"
                      onChange={placaChange}
                      value={pedido.placa}
                    >
                      <option name="ini" id="1" value="" disabled>
                        Selecione a Placa
                      </option>
                      {placas.map((placa) => (
                        <option key={placa.id} name={placa.placas} id={placa.id}>
                          {placa.placas}
                        </option>
                      ))}
                    </select>
                  :
                    <input
                      type="text"
                      name="placa"
                      id="placa"
                      onChange={(e) => setPedido({...pedido, placa: e.target.value})}
                      value={pedido.placa}
                    />
                  }
              </label>
              <label>
                {" "}
                Local de Entrega
                <input
                  type="text"
                  name="numero"
                  id="localEntrega"
                  onChange={(e) =>
                    setPedido({ ...pedido, localEntrega: e.target.value })
                  }
                  value={pedido.localEntrega}
                />
              </label>
              <label>
                {" "}
                Quantidade de Carga
                <input
                  type="text"
                  name="quantidadeCarga"
                  id="quantidadeCarga"
                  onChange={(e) =>
                    setPedido({ ...pedido, quantidadeCarga: e.target.value })
                  }
                  onKeyUp={carga}
                  value={pedido.quantidadeCarga}
                />
              </label>
              <label>
                {" "}
                Total
                <input
                  type="text"
                  name="total"
                  id="total"
                  onChange={(e) =>
                    setPedido({ ...pedido, totalLiquido: e.target.value })
                  }
                  value={pedido.totalLiquido}
                />
              </label>
              <label>
                {" "}
                Observação
                <input
                  type="text"
                  name="observacao"
                  id="observacao"
                  onChange={(e) =>
                    setPedido({ ...pedido, observacao: e.target.value })
                  }
                  value={pedido.observacao}
                />
              </label>

              {adm === "1" && (
                <label>
                  {" "}
                  Data
                  <Datepicker
                    selected={data}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    onChange={(date) => setData(date)}
                  />
                </label>
              )}

              <input
                className="botao"
                type="submit"
                onClick={salvar}
                value="Salvar"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vales;
