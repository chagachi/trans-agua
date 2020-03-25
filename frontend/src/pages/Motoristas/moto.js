import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './moto.css'


class Moto extends Component {

  constructor(props){
    super(props)
    this.state = {
      id: '',
      nome: '',
      telefone: '',
      celular: '',
      message: '',
    }
  }

async componentDidMount(params){

    const token = localStorage.getItem('token')
    const {id} = this.props.location.state
    
    const pedido = await api.get(`motorista/${id}`,
    {headers: {'Authorization': `Bearer ${token}`}})

    const data = pedido.data

    this.setState({ 
      id: data.id,
      nome: data.nome,
      telefone: data.telefone,
      celular: data.celular,
    })
}

handleSubmit = async event => {
    event.preventDefault()

    const token = localStorage.getItem('token')
    const pedido = await api.put(`motorista/${this.state.id}`, 
    {
      nome: this.state.nome, 
      telefone: this.state.telefone,
      celular: this.state.celular,
    },{
        headers: {'Authorization': `Bearer ${token}`}
    })
    .then(res => {
        this.setState({message: 'Motorista atualizado com sucesso!'})
        this.props.history.push('/motoristas')})
    .catch(e => this.setState({message: `${e}`}))

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
                            {
                                this.state.message !== ''? (
                                    window.alert(this.state.message)
                                ) : ''
                            }
                          <div className='head'>
                            <Link 
                              to='/motoristas'>
                              <span>Voltar</span>
                            </Link>
                            <h3></h3>
                          </div>
                          
                          <form class='novomotorista' onSubmit={this.handleSubmit}>
                            <label> Nome
                                <input 
                                type='text' 
                                name='nome' 
                                id='nome'
                                onChange={e => this.setState({nome: e.target.value})}
                                value={this.state.nome}
                                />
                            </label>
                            <label> Telefone
                                <input 
                                type='text' 
                                name='telefone'
                                id='telefone'
                                onChange={e => this.setState({telefone: e.target.value})}
                                value={this.state.telefone}
                                />
                            </label>
                            <label> Celular
                                <input 
                                type='text' 
                                name='placa'
                                id='celular'
                                onChange={e => this.setState({celular: e.target.value})}
                                value={this.state.celular} 
                                />
                            </label>

                            <input class='botao' type='submit' name='cadastrar' value='Cadastrar' />
                            </form>
                            </div>
                      </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Moto;