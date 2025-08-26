import React, { useState, useEffect } from "react";
import Menu from "../../../components/Header";
import api from "../../../services/api";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

import "./novovale.css";

function NovoVale({ history }) {
  const [idEmpresa, setIdEmpresa] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [idMotorista, setIdMotorista] = useState("");
  const [motorista, setMotorista] = useState("");
  const [placa, setPlaca] = useState("");
  const [localEntrega, setLocalEntrega] = useState("");
  const [valorUnitario, setValorUnitario] = useState("");
  const [valorUnitarioRetirada, setValorUnitarioRetirada] = useState("");
  const [quantidadeCarga, setQuantidadeCarga] = useState("");
  const [totalLiquido, setTotalLiquido] = useState("");
  const [observacao] = useState("");
  const [message, setMessage] = useState("");
  const [empresas, setEmpresas] = useState([]);
  const [motoristas, setMotoristas] = useState([]);
  const [placas, setPlacas] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [btnEnviado, setBtnEnviado] = useState(false);
  const [retirada, setRetirada] = useState(0);
  const [modalOpcao, setModalOpcao] = useState(false);

  // Carregar empresas e motoristas
  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");
      const user = await api.get(`listarempresas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const moto = await api.get(`listarmotoristas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const placa = await api.get(`placas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmpresas(user.data);
      setMotoristas(moto.data);
      setPlacas(placa.data.data)
    };
    loadData();
  }, []);

  const handleChange = (option) => {
    setSelectedOption(option);
    setEmpresa(option.label);
    setCnpj(option.cnpj);
    setIdEmpresa(option.key);
    setLocalEntrega(option.endereco);
    setValorUnitario(option.valor);
    setValorUnitarioRetirada(option.valorRetirada);
		setQuantidadeCarga('')
		setTotalLiquido('')
    if (option.valorRetirada != null && parseInt(option.valorRetirada) > 0) {
      setModalOpcao(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtnEnviado(true);

    const formatValue = quantidadeCarga;
    const valorFormatado = formatValue.replace(",", ".");

    const token = localStorage.getItem("token");
    await api
      .post(
        `pedido`,
        {
          idEmpresa,
          empresa,
          cnpj,
          idMotorista,
          motorista,
          placa,
          localEntrega,
          valorUnitario: retirada === 0 ? valorUnitario : valorUnitarioRetirada,
          quantidadeCarga: valorFormatado,
          totalLiquido,
          observacao,
          cron: 0,
					retirada,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setMessage("Vale emitido com sucesso!");
        history.push({
          pathname: "/impressao",
          state: { id: res.data.id },
        });
      })
      .catch((e) => setMessage(`${e}`));
  };

  const motoChange = (e) => {
    const select = document.getElementById("motorista");
    const att = select.options[select.selectedIndex].attributes;
    setMotorista(att.name.value);
    setIdMotorista(att.id.value);
  };

  const placaChange = (e) => {
    const select = document.getElementById("placa");
    const att = select.options[select.selectedIndex].attributes;
    setPlaca(att.name.value);
  };

  const cargaChange = (e) => {
    const formatValue = e.target.value;
    const valorFormatado = formatValue.replace(",", ".");

		if(retirada === 0){
			const total = valorFormatado * valorUnitario;
			setQuantidadeCarga(e.target.value);
			if (isNaN(parseFloat(total))) {
				setTotalLiquido("");
				return;
			}
			setTotalLiquido(total.toFixed(2));
		} else{
			const total = valorFormatado * valorUnitarioRetirada;
			setQuantidadeCarga(e.target.value);
			if (isNaN(parseFloat(total))) {
				setTotalLiquido("");
				return;
			}
			setTotalLiquido(total.toFixed(2));
		}

  };

	function handleChangeRetirada(){
		setRetirada(1)
		setIdMotorista(14)
		setModalOpcao(false)
	}

  return (
    <>
      <div className="geral">
        <div className="menu">
          <Menu />
        </div>

        <div className="content">
          <header>
            <span>
              {"Painel de Controle > Vales > "}
              <strong> Emitir Vale </strong>
            </span>
          </header>

          <div className="top"></div>
          <div className="main">
            <div className="cabecalho">
              {message !== "" ? window.alert(message) : ""}
              <h3>Selecione a Empresa</h3>
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={empresas.map((post) => ({
                  key: `${post.id}`,
                  label: `${post.nomefantasia}`,
                  cnpj: `${post.cnpj}`,
                  valor: `${post.valorFixo}`,
                  valorRetirada: `${post.valorretirada}`,
                  endereco: `${post.endereco1}`,
                }))}
                placeholder="Selecione a empresa"
                isSearchable={true}
              />
            </div>

            {empresa !== "" && (
              <div>
                <form className="novovale" onSubmit={handleSubmit}>
                  <label>
                    {" "}
                    Empresa
                    <p>{empresa}</p>
                  </label>
                  <label>
                    {" "}
                    CNPJ
                    <p>{cnpj}</p>
                  </label>
                  <label>
                    {" "}
                    Motorista
										{
											retirada === 0 ?
												<select
													id="motorista"
													onChange={motoChange}
													value={motorista}
												>
													<option name="ini" id="1" value="" disabled>
														Selecione o Motorista
													</option>
													{motoristas.map((moto) => (
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
													onChange={(e) => setMotorista(e.target.value)}
													value={motorista}
												/>
										}
                  </label>
                  <label>
                    {" "}
                    Placa
										{
											retirada === 0 ?
                      <select
													id="placa"
													onChange={placaChange}
													value={placa}
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
													onChange={(e) => setPlaca(e.target.value)}
													value={placa}
												/>
										}
                  </label>
                  <label>
                    {" "}
                    Local de Entrega
                    <p>{localEntrega}</p>
                  </label>
                  <label>
                    {" "}
                    Quantidade de Carga
                    <input
                      type="text"
                      name="quantidadeCarga"
                      id="quantidadeCarga"
                      onChange={cargaChange}
                      value={quantidadeCarga}
                    />
                  </label>
                  <label>
                    {" "}
                    Total
                    <p>{totalLiquido}</p>
                  </label>

                  {empresa &&
                    motorista &&
                    placa &&
                    quantidadeCarga &&
                    totalLiquido &&
                    !btnEnviado && (
                      <input
                        className="botao"
                        type="submit"
                        value="Emitir vale"
                        id="enviar"
                      />
                    )}
                  {btnEnviado && (
                    <>
                      <br />
                      <br />
                      <h2 className="btnEnviado">Enviando</h2>
                    </>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

			{
				modalOpcao === true &&
					<div className="fundoModal">
						<div className="modalRetirada">
							<h3>
								Escolha o método de envio
							</h3>
							<div>
								<button onClick={() => setModalOpcao(false)}>Entrega</button>
								<button onClick={() => handleChangeRetirada()}>Retirada</button>
							</div>
						</div>
					</div>
			}
    </>
  );
}

export default NovoVale;
