import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './antigos.css'


class Antigos extends Component {

  constructor(props){
    super(props)
    this.state = {
        id: '',
        codigox: '',
        empresa: '',
        motorista: '',
        placa: '',
        localdeentrega: '',
        valorunitario: '',
        quantidade: '',
        totalliquido: '',
        obs: '',
    }
}

async componentDidMount(params){

    const token = localStorage.getItem('token')
    const {id} = this.props.location.state
    
    const pedido = await api.get(`pedidosantigos/${id}`,
    {headers: {'Authorization': `Bearer ${token}`}})

    const data = pedido.data

    this.setState({ 
      id: data.id,
      codigox: data.codigox,
      empresa: data.empresa,
      motorista: data.motorista,
      placa: data.placa,
      localdeentrega: data.localdeentrega,
      valorunitario: data.valorunitario,
      quantidade: data.quantidade,
      totalliquido: data.totalliquido,
      obs: data.obs,
    })

    console.log(this.state)
}

    render() {
        return(
            <>
            <div className='geral'>
                <div className='menu'>
                    <Menu />
                </div>

                <div className='content'>
                    <header>
                        <span>Painel de Controle ><strong> Vales </strong></span>
                        <span>Olá Felipe Marcondes</span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>

                    <div className='cabecalho'>

                        <div className='head'>
                            <Link 
                                to='/valesantigos'>
                                <span>Voltar</span>
                            </Link>
                            <h3></h3>
                        </div>
                      </div>

                      <div className='dados'>
                            <label> Empresa:
                                <span 
                                value={this.state.empresa}
                                > {this.state.empresa} </span>
                            </label>
                            <label>Motorista:
                              <span 
                                value={this.state.motorista}
                              > {this.state.motorista} </span>
                            </label>
                            <label> Placa:
                            <span 
                                value={this.state.placa}
                                > {this.state.placa} </span>
                            </label>
                            <label> Local de Entrega:
                            <span 
                                value={this.state.localdeentrega}
                                > {this.state.localdeentrega} </span>
                            </label>
                            <label> Quantidade de Carga:
                            <span 
                                value={this.state.quantidade}
                                > {this.state.quantidade} </span>
                            </label>
                            <label> Total:
                            <span
                                value={this.state.totalliquido}
                            > {this.state.totalliquido} </span>
                            </label>
                            <label> Observação:
                            <span 
                                value={this.state.obs}
                                > {this.state.obs} </span>
                            </label>
                            </div>
                        </div>
                </div>
            </div>
            </>
        );
    }
}

export default Antigos;