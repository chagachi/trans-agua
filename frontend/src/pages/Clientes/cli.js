import React, { useState, useEffect} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './cli.css'


function ClientView() {
  const [id, setId] = useState("");
  const [nomefantasia, setNomefantasia] = useState("");
  const [razaosocial, setRazaosocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [ie, setIe] = useState("");
  const [endereco, setEndereco] = useState("");
  const [endereco1, setEndereco1] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [telefone1, setTelefone1] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [valorfixo, setValorfixo] = useState("");
  const [valorretirada, setValorRetirada] = useState("");
  const [message, setMessage] = useState("");
  const [adm] = useState(localStorage.getItem("adm"));

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchEmpresa = async () => {
      const token = localStorage.getItem("token");
      const { id } = location.state;

      try {
        const empresa = await api.get(`empresa/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = empresa.data;
        setId(data.id);
        setNomefantasia(data.nomefantasia);
        setRazaosocial(data.razaosocial);
        setCnpj(data.cnpj);
        setIe(data.ie);
        setEndereco(data.endereco);
        setEndereco1(data.endereco1);
        setNumero(data.numero);
        setBairro(data.bairro);
        setCidade(data.cidade);
        setEstado(data.estado);
        setTelefone1(data.telefone1);
        setTelefone2(data.telefone2);
        setEmail(data.email);
        setSite(data.site);
        setValorfixo(data.valorfixo);
        setValorRetirada(data.valorretirada)
      } catch (err) {
        setMessage("Erro ao carregar empresa.");
      }
    };

    fetchEmpresa();
  }, [location.state]);

  function correctValor(valor){
    if(valor !== null){
      const valorFormatado = valor.replace(",", ".");
      return valorFormatado
    }
    return null
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await api.put(
        `empresa/${id}`,
        {
          nomefantasia: nomefantasia || "não tem",
          razaosocial: razaosocial || "não tem",
          cnpj: cnpj || "não tem",
          ie: ie || "não tem",
          endereco: endereco || "não tem",
          endereco1: endereco1 || "não tem",
          numero: numero || "não tem",
          bairro: bairro || "não tem",
          cidade: cidade || "não tem",
          estado: estado || "não tem",
          telefone1: telefone1 || "não tem",
          telefone2: telefone2 || "não tem",
          email: email || "não tem",
          site: site || "não tem",
          valorfixo: correctValor(valorfixo),
          valorretirada: correctValor(valorretirada),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Cliente atualizado com sucesso!");
      setTimeout(() => {
        setMessage("");
        history.push("/clientes");
      }, 2000);
    } catch (e) {
      setMessage("Erro ao atualizar cliente.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="geral">
      <Menu />
      <div className="content">

        <div className="top">
          <header>
            <span>
              {'Painel de Controle >'}<strong> Vales </strong>
            </span>
          </header>
        </div>
        <div className="main">
          <div className="cabecalho">
            {message && <div className="alert-message">{message}</div>}

            <div className="head">
              <Link to="/clientes">
                <span>Voltar</span>
              </Link>
            </div>

            {adm === "1" ? (
              <form className="form" onSubmit={handleSubmit}>
                <label>
                  Nome Fantasia
                  <input
                    type="text"
                    value={nomefantasia}
                    onChange={(e) => setNomefantasia(e.target.value)}
                  />
                </label>
                <label>
                  Razão Social
                  <input
                    type="text"
                    value={razaosocial}
                    onChange={(e) => setRazaosocial(e.target.value)}
                  />
                </label>
                <label>
                  CNPJ
                  <input
                    type="text"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </label>
                <label>
                  Inscrição Estadual
                  <input
                    type="text"
                    value={ie}
                    onChange={(e) => setIe(e.target.value)}
                  />
                </label>
                <label>
                  Endereço de Cobrança
                  <input
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                  />
                </label>
                <label>
                  Número
                  <input
                    type="text"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </label>
                <label>
                  Endereço de Entrega
                  <input
                    type="text"
                    value={endereco1}
                    onChange={(e) => setEndereco1(e.target.value)}
                  />
                </label>
                <label>
                  Bairro
                  <input
                    type="text"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />
                </label>
                <label>
                  Cidade
                  <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </label>
                <label>
                  Estado
                  <input
                    type="text"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  />
                </label>
                <label>
                  Telefone
                  <input
                    type="text"
                    value={telefone1}
                    onChange={(e) => setTelefone1(e.target.value)}
                  />
                </label>
                <label>
                  Celular
                  <input
                    type="text"
                    value={telefone2}
                    onChange={(e) => setTelefone2(e.target.value)}
                  />
                </label>
                <label>
                  E-mail
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  Valor Retirada
                  <input
                    type="text"
                    value={valorretirada}
                    onChange={(e) => setValorRetirada(e.target.value)}
                  />
                </label>
                <label>
                  Valor
                  <input
                    type="text"
                    value={valorfixo}
                    onChange={(e) => setValorfixo(e.target.value)}
                  />
                </label>

                <input
                  className="botao"
                  type="submit"
                  name="cadastrar"
                  value="Cadastrar"
                />
              </form>
            ) : (
              <form className="form">
                <label>
                  Nome Fantasia <p>{nomefantasia}</p>
                </label>
                <label>
                  Razão Social <p>{razaosocial}</p>
                </label>
                <label>
                  CNPJ <p>{cnpj}</p>
                </label>
                <label>
                  Inscrição Estadual <p>{ie}</p>
                </label>
                <label>
                  Endereço 1 <p>{endereco}</p>
                </label>
                <label>
                  Número <p>{numero}</p>
                </label>
                <label>
                  Endereço 2 <p>{endereco1}</p>
                </label>
                <label>
                  Bairro <p>{bairro}</p>
                </label>
                <label>
                  Cidade <p>{cidade}</p>
                </label>
                <label>
                  Estado <p>{estado}</p>
                </label>
                <label>
                  Telefone <p>{telefone1}</p>
                </label>
                <label>
                  Celular <p>{telefone2}</p>
                </label>
                <label>
                  E-mail <p>{email}</p>
                </label>
                <label>
                  Site <p>{site}</p>
                </label>
                <label>
                  Valor <p>{valorfixo}</p>
                </label>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientView;