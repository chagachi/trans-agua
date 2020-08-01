import React, { Component } from 'react';
import api from '../../services/api'
import './imprimirRelatorio.css'
import logo from '../../assets/logo-13.png'
import { Link } from 'react-router-dom'



class Imprimir extends Component {

  constructor(props){
      super(props)
      this.state = {
          pedido: [],
          empresa: '',
          inicio: '',
          fim: '',
          total: '',
          volume: 0,
          valor: 0,
      }
  }

  async componentDidMount(params){
      const {empresa, motorista, inicio, fim} = this.props.location.state

      const inicioF = inicio.split('/').reverse().join('/')
      const fimF = fim.split('/').reverse().join('/')

      this.setState({empresa: empresa, inicio: inicioF, fim: fimF})

      const token = localStorage.getItem('token')
      const relatorio = await api.post(`relatorio`, 
      {
          startDate: `${inicio} 00:00:00`, 
          finalDate: `${fim} 23:59:59`,
          motorista: motorista,
          nomeEmpresa: empresa,
      },{
          headers: {'Authorization': `Bearer ${token}`}
      })

      this.setState({pedido: relatorio.data, total: relatorio.data.length})


      const pedidos  = this.state.pedido

      const totalLiquido = pedidos.reduce((acumulador, {totalLiquido} ) => {
        return acumulador += parseFloat(totalLiquido.replace(',','.'));
      },0);

      const quantidadeCarga = pedidos.reduce((acumulador, {quantidadeCarga} ) => {
        return acumulador += parseFloat(quantidadeCarga.replace(',','.'));
      },0);
      
      this.setState({valor: totalLiquido, volume: quantidadeCarga})           
  }

  DatePtBr(created_at) {     
      return created_at.split('T')[0].split('-').reverse().join('/')
  }
  
  render() {
      return(
          <>
          
          <Link to={{pathname:'/relatorios'}}>
            <button className="voltar">Voltar</button>
          </Link>

          <div className="topo" >
            <div><img src={logo} alt="logo" className="logo" /></div>

            <div className="contact-info">
              <p>11 2295-2283</p>
              <p>www.transaguadistribuidora.com.br</p>
              <p>contato@transaguadistribuidora.com.br</p>
              <p>Rua Dr. Alarico Silveira, nº 520 - Jd. Aricanduva</p>
            </div>
          </div>

          <div className="desc" >
            <h3>Relatório de Fornecimento</h3>
            <h4>Empresa: {this.state.empresa} </h4>
            <p>De: {this.state.inicio} até {this.state.fim} </p>
          </div>

          <div className="principal-menu" >
            <h5>Pedido</h5>
            <h5>Empresa</h5>
            <h5>Data</h5>
            <h5>motorista</h5>
            <h5>Placa</h5>
            <h5>Carga</h5>
          </div>

          <div className="conteudo">
          {this.state.pedido.map(post => (
            <div className='principal' key={post.id}>
                <span> {post.id} <br/> {post.observacao} </span>
                <span> {post.empresa} </span>
                <span> {this.DatePtBr(post.created_at)} </span>


                <span> {post.motorista} </span>
                <span> {post.placa} </span>
                <span> {post.quantidadeCarga} </span>
            </div>
            ))}
            </div>

          <div className="rodape">
            <div>
                Quantidade de viagens: {this.state.total}
            </div>
            <div>
                Metro cúbicos (m³): {this.state.volume}
            </div>
            <div>
                Valor total: {this.state.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }
            </div>
          </div>
          </>
      );
  }
}

export default Imprimir;