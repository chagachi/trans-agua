import React, { useState, useEffect } from "react";
import Datepicker, { registerLocale } from "react-datepicker";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router";
import api from "../../services/api";
import Menu from "../../components/Header";
import "./relatorios.css";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt-BR";
registerLocale("pt-BR", pt);

function Relatorios() {
  const [pedidos, setPedidos] = useState([]);
  const [pedidosFiltered, setPedidosFiltered] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [empresa, setEmpresa] = useState("");
  // const [motoristas, setMotoristas] = useState([]);
  const [render, setRender] = useState(true);
  // const [motorista, setMotorista] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [total, setTotal] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [volume, setVolume] = useState("");
  const [totalLiquido, setTotalLiquido] = useState("");
  const [inicio, setInicio] = useState(new Date().toLocaleDateString().split("/").reverse().join("/"));
  const [fim, setFim] = useState(new Date().toLocaleDateString().split("/").reverse().join("/"));
  const token = localStorage.getItem("token");

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
		console.log(location)
    if (location.state !== undefined) {
      load()
      getEmpresas()
      // getMotoristas()
    } else {
      getEmpresas()
      // getMotoristas()
    }
  }, []);

  async function handleCheck(){
    setIsChecked(!isChecked)
    if(!isChecked){
      const pedidosFiltered = pedidos.filter(pedido => pedido.retirada === 1)
      setPedidosFiltered(pedidosFiltered)
      setTotal(pedidosFiltered.length);
      calcTotalLiquido(pedidosFiltered)
      calcQuantidadeCarga(pedidosFiltered)
    } else{
      setPedidosFiltered(pedidos)
      setTotal(pedidos.length);
      calcTotalLiquido(pedidos)
      calcQuantidadeCarga(pedidos)
    }
  }

	async function load() {
		setEmpresa(location.state.nomeEmpresa)
		setStartDate(location.state.startDate)
		setFinalDate(location.state.finalDate)
		setInicio(location.state.inicio)
		setFim(location.state.fim)
		setSelectedOption(location.state.selected)
		const relatorio = await api.post(
			`relatorio`,
			{
				startDate: location.state.inicio,
				finalDate: location.state.fim,
				motorista: location.state.motorista,
				nomeEmpresa: location.state.nomeEmpresa,
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);

		setPedidos(relatorio.data);
		setPedidosFiltered(relatorio.data);
		setTotal(relatorio.data.length);

		calcTotalLiquido(relatorio.data)
		calcQuantidadeCarga(relatorio.data)
	}

	async function calcTotalLiquido(list){
		const Liquido = await list.reduce((acumulador, { totalLiquido }) => {
			return (acumulador += parseFloat(totalLiquido.replace(",", ".")));
		}, 0);
		setTotalLiquido(Liquido);
	}

	async function calcQuantidadeCarga(list){
		const quantidadeCarga = await list.reduce(
			(acumulador, { quantidadeCarga }) => {
				return (acumulador += parseFloat(
					quantidadeCarga.replace(",", ".")
				));
			},
			0
		);

		setVolume(quantidadeCarga);
	}

	async function getEmpresas() {
		const empresas = await api.get(`listarempresas`, {
			headers: { Authorization: `Bearer ${token}` },
		});
		setEmpresas(empresas.data);
	}

	// async function getMotoristas() {
	// 	const motorista = await api.get("listarmotoristas", {
	// 		headers: { Authorization: `Bearer ${token}` },
	// 	});
	// 	setMotoristas(motorista.data);
	// }

  // function moto() {
  //   let motoristas = document.getElementById("motorista");
  //   let att = motoristas.options[motoristas.selectedIndex].attributes;
  //   console.log(att);

  //   setMotorista(att.name.value);
  // }

  async function buscar(event) {
    event.preventDefault();

    const relatorio = await api.post(
      `relatorio`,
      {
        startDate: `${inicio} 00:00:00`,
        finalDate: `${fim} 23:59:59`,
        // motorista: motorista,
        nomeEmpresa: empresa,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    await setPedidos(relatorio.data);
    await setPedidosFiltered(relatorio.data);
    await setTotal(relatorio.data.length);

    await calcTotalLiquido(relatorio.data)
		await calcQuantidadeCarga(relatorio.data)
  }

  function empresaSelecionada(selectedOption) {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);

    setEmpresa(selectedOption.label);
  }

  function imprimir() {
    history.push({
      pathname: "/imprimir",
      state: {
        empresa: empresa,
        // motorista: motorista,
        inicio: inicio,
        fim: fim,
      },
    });
  }

  async function inverse(){
    setRender(false)
    const inversePedidos = await pedidosFiltered.reverse()
    setPedidosFiltered(inversePedidos)
    setRender(true)
  }

	async function handleDataInicio(date){
		setStartDate(date)
		const start = await date.toLocaleDateString();
    const startsplit = await start.split("/").reverse().join("/");
		await setInicio(startsplit);
	}
	
	async function handleDataFinal(date){
		setFinalDate(date)
		const final = await date.toLocaleDateString();
    const finalsplit = await final.split("/").reverse().join("/");
    await setFim(finalsplit);
	}

  // async function del(e) {

  //         await api.delete(`pedido/${e.target.id}`,
  //         {headers: {'Authorization': `Bearer ${token}`}})

  //         const relatorio = await api.post(`relatorio`,
  //         {
  //             startDate: `${startDate} 00:00:00`,
  //             finalDate: `${finalDate} 23:59:59`,
  //             motorista: motorista,
  //             nomeEmpresa: empresa,
  //         },{
  //             headers: {'Authorization': `Bearer ${token}`}
  //         })

  //         setPedidos(relatorio.data)
  //         setTotal(relatorio.data.length)

  //         const vales  = pedidos;

  //         const Liquido = vales.reduce((acumulador, {totalLiquido} ) => {
  //             return acumulador += parseFloat(totalLiquido.replace(',','.'));
  //         },0);

  //         const quantidadeCarga = vales.reduce((acumulador, {quantidadeCarga} ) => {
  //             return acumulador += parseFloat(quantidadeCarga.replace(',','.'));
  //         },0);

  //         setTotalLiquido(Liquido)
  //         setVolume(quantidadeCarga)
  // }

  return (
    <>
      <div className="geral">
        <Menu />
        <div className="content">
          <div className="top">
            <header>
              <span>
                {"Painel de Controle >"}
                <strong> Relatórios</strong>
              </span>
            </header>
          </div>
          <div className="main">
            <div className="head">
              <h3>Gerar Relatório</h3>
            </div>

            <form className="form-rel" onSubmit={buscar}>
              <label>
                {" "}
                Data de Inicio
                <Datepicker
                  selected={startDate}
                  dateFormat="dd/MM/yyyy"
                  locale="pt-BR"
                  onChange={(date) => handleDataInicio(date)}
                />
              </label>

              <label>
                {" "}
                Data Final
                <Datepicker
                  selected={finalDate}
                  dateFormat="dd/MM/yyyy"
                  locale="pt-BR"
                  onChange={(date) => handleDataFinal(date)}
                />
              </label>

              {/* <label>
                {" "}
                Motorista
                <select id="motorista" onChange={moto} value={motorista}>
                  <option name="" id="1" value="">
                    Selecione o Motorista
                  </option>
                  {motoristas.map((moto) => (
                    <option key={moto.id} name={moto.nome} id={moto.id}>
                      {" "}
                      {moto.nome}{" "}
                    </option>
                  ))}
                </select>
              </label> */}

              <label>
                Selecione a Empresa
                <Select
                  value={selectedOption}
                  onChange={empresaSelecionada}
                  options={empresas.map((post) => ({
                    key: `${post.id}`,
                    label: `${post.nomefantasia}`,
                    cnpj: `${post.cnpj}`,
                    valor: `${post.valorFixo}`,
                    endereco: `${post.endereco1}`,
                  }))}
                  placeholder="Selecione a empresa"
                  isSearchable={true}
                />
              </label>

              <input
                className="botaoRel"
                type="submit"
                name="Buscar"
                value="Buscar"
              />
            </form>

            {total !== 0 && (
              <div className="divButtons">
                <div className="retiradas">
                  <input type="checkbox" id="retirada" name="Retirada" value={"retirada"} checked={isChecked} onChange={handleCheck} />
                  <p>Somente Retiradas</p>
                </div>

                <button className="imprimir" onClick={imprimir}>
                  imprimir
                </button>
                
                <button className="imprimir" onClick={inverse}>
                  Inverter ordem
                </button>
              </div>
            )}

            <div className="tabs-rel">
              {total !== 0 ? (
                <>
                  <span>NOME</span>
                  <span>MOTORISTA</span>
                  <span>PEDIDO</span>
                  <span>CARGA</span>
                  <span>VALOR</span>
                  <span>TOTAL: {total}</span>
                </>
              ) : (
                ""
              )}
            </div>

            {render === true &&
              pedidosFiltered.map((post) => (
                <div className="clientes-rel" key={post.id}>
                  <span> {post.empresa} </span>
                  <span> {post.motorista} </span>
                  <span>
                    {" "}
                    {post.id}
                    <br /> {post.observacao}{" "}
                  </span>
                  <span> {post.quantidadeCarga} </span>
                  <span> {post.totalLiquido} </span>
                  <div>
                    <Link
                      to={{
                        pathname: "/vales/vale",
                        state: {
                          id: post.id,
                          startDate: startDate,
                          finalDate: finalDate,
                          // motorista: motorista,
                          pedidos: pedidos,
                          nomeEmpresa: empresa,
                          inicio: `${inicio} 00:00:00`,
                          fim: `${fim} 23:59:59`,
                          selected: selectedOption,
                        },
                        search: `?id=${post.id}`,
                      }}
                    >
                      <button className="see">Ver | Editar</button>
                    </Link>
                  </div>
                </div>
              ))
            }

            {total !== 0 ? (
              <>
                <div className="rodape-rel">
                  <div>Metro cúbicos (m³): {volume}</div>
                  <div>
                    Valor total:{" "}
                    {totalLiquido.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Relatorios;
