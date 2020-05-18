import React, { Component } from 'react';
import api from '../../services/api'
import logo from '../../assets/logo-13.png'
import './impressao.css'


class Impressao extends Component {

  state = {
    pedido: [],
    data: '',
  }

  async componentDidMount(params){
    const token = localStorage.getItem('token')
    const {id} = this.props.location.state
    const pedido = await api.get(`pedido/${id}`,
    {headers: {'Authorization': `Bearer ${token}`}})

    const dia = pedido.data.created_at
    const diaSplit = dia.split(' ')
    const diaFinal = diaSplit[0].split('-').reverse().join('/')

    this.setState({ pedido: pedido.data, data: diaFinal})

    window.print()
    this.props.history.push('/vales')
}

    render() {
        return(
            <>

              <div className='corpo'>
              <div>
                <img src={logo} alt='Trans Água' />
                <hr></hr>
                <span><b>11 2295-2283 • 11 97018-0641</b></span><br/>
                <span className='bold'> <b>2657-4056</b></span><br/>
                <span><b>CNPJ:</b> 03.636.689/0001-33</span><br/>
              </div>
              <br/>
              <div className='meio'>
                <div>
                  <span className='pedido'><b>Nº</b> {this.state.pedido.id}</span>
                </div>
                <br/>
                <div>
                  <span className='data'><b>DATA:</b> {this.state.data}</span>
                </div>
              </div>

              <br/>
              <br/>

              <div className='base'>
                <p> <b>EMP:</b> {this.state.pedido.empresa} </p>
                <p> <b>CNPJ:</b> {this.state.pedido.cnpj} </p>
                <p> <b>END:</b> {this.state.pedido.localEntrega} </p><br/>
                <p> <b>Entrada:</b> ______h______min.</p>
                <p> <b>Saída:</b> ______h______min.</p><br/>
                <p> <b>Entrada Hid:</b> </p>
                <p>______________________</p>
                <p> <b>Saída Hid:</b> </p>
                <p>______________________</p><br/>
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

              <div className='corpo2'>
              <div>
                <img src={logo} alt='Trans Água' />
                <hr></hr>
                <span><b>11 2295-2283 • 11 97018-0641</b></span><br/>
                <span className='bold'> <b>2657-4056</b></span><br/>
                <span><b>CNPJ:</b> 03.636.689/0001-33</span><br/>
              </div>
              <br/>
              <div className='meio'>
                <div>
                  <span className='pedido'><b>Nº</b> {this.state.pedido.id}</span>
                </div>
                <br/>
                <div>
                  <span className='data'><b>DATA:</b> {this.state.data}</span>
                </div>
              </div>

              <br/>
              <br/>

              <div className='base'>
                <p> <b>EMP:</b> {this.state.pedido.empresa} </p>
                <p> <b>CNPJ:</b> {this.state.pedido.cnpj} </p>
                <p> <b>END:</b> {this.state.pedido.localEntrega} </p><br/>
                <p> <b>Entrada:</b> ______h______min.</p>
                <p> <b>Saída:</b> ______h______min.</p><br/>
                <p> <b>Entrada Hid:</b> </p>
                <p>______________________</p>
                <p> <b>Saída Hid:</b> </p>
                <p>______________________</p><br/>
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