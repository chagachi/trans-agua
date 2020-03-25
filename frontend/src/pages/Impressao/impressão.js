import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api'
import logo from '../../assets/logo.png'
import './impressao.css'


class Impressao extends Component {

  state = {
    pedido: [],
  }

  async componentDidMount(params){
    const token = localStorage.getItem('token')
    const {id} = this.props.location.state
    const pedido = await api.get(`pedido/${id}`, 
    {headers: {'Authorization': `Bearer ${token}`}})

    console.log(pedido.data)

    this.setState({ pedido: pedido.data})
}

    render() {
        return(
            <>
              <div className='botao-voltar'>
                <Link to='/vales'> Voltar </Link>
              </div>

              <div className='corpo'>
              <div>
                <img src={logo} alt='Trans Água' />
                <hr></hr>
                <span><b>11 2295-2283 • 11 97018-0641</b></span><br/>
                <span><b>ID:</b> 80*169522</span><br/>
                <span><b>CNPJ:</b> 03.636.689/0001-33</span><br/>
              </div>
              <div className='meio'>
                <div>
                  <span><b>Nº</b> {this.state.pedido.id}</span>
                </div>
                <div>
                  <span><b>DATA:</b> {this.state.pedido.created_at}</span>
                </div>
              </div>

              <br/>
              <br/>

              <div className='base'>
                <p> <b>EMP:</b> {this.state.pedido.empresa} </p>
                <p> <b>CNPJ:</b> {this.state.pedido.cnpj} </p>
                <p> <b>END:</b> {this.state.pedido.localEntrega} </p>
                <p> <b>Entrada:</b> ______h______min.</p>
                <p> <b>Saída:</b> ______h______min.</p>
                <p> <b>Entrada Hid:</b> ______h______min.</p>
                <p> <b>Saída Hid:</b> ______h______min.</p>
                <p> <b>Local:</b> </p>
                <p> <b>Quantidade:</b> {this.state.pedido.quantidadeCarga}m³</p>
                <span> <b>Mot:</b> {this.state.pedido.motorista} -</span>
                <span> <b>Placa:</b> {this.state.pedido.placa} </span>
                <br/>
                <br/>
                <br/>
                <p><b>Assinatura:</b>____________________</p>
                <small>transaguadistribuidora.com.br</small>
              </div>

              </div>

              <div className='corpo'>
              <div>
                <img src={logo} alt='Trans Água' />
                <hr></hr>
                <span><b>11 2295-2283 • 11 97018-0641</b></span><br/>
                <span><b>ID:</b> 80*169522</span><br/>
                <span><b>CNPJ:</b> 03.636.689/0001-33</span><br/>
              </div>
              <div className='meio'>
                <div>
                  <span><b>Nº</b> {this.state.pedido.id}</span>
                </div>
                <div>
                  <span><b>DATA:</b> {this.state.pedido.created_at}</span>
                </div>
              </div>

              <br/>
              <br/>

              <div className='base'>
                <p> <b>EMP:</b> {this.state.pedido.empresa} </p>
                <p> <b>CNPJ:</b> {this.state.pedido.cnpj} </p>
                <p> <b>END:</b> {this.state.pedido.localEntrega} </p>
                <p> <b>Entrada:</b> ______h______min.</p>
                <p> <b>Saída:</b> ______h______min.</p>
                <p> <b>Entrada Hid:</b> ______h______min.</p>
                <p> <b>Saída Hid:</b> ______h______min.</p>
                <p> <b>Local:</b> </p>
                <p> <b>Quantidade:</b> {this.state.pedido.quantidadeCarga}m³</p>
                <span> <b>Mot:</b> {this.state.pedido.motorista} -</span>
                <span> <b>Placa:</b> {this.state.pedido.placa} </span>
                <br/>
                <br/>
                <br/>
                <p><b>Assinatura:</b>____________________</p>
                <small>transaguadistribuidora.com.br</small>
              </div>

              </div>

            
            </>
        );
    }
}

export default Impressao;