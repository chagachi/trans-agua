import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './cli.css'


class Moto extends Component {

  constructor(props){
    super(props)
    this.state = {
      id: '',
      nomefantasia: '',
      razaosocial: '',
      cnpj: '',
      ie: '',
      endereco: '',
      endereco1: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      telefone1: '',
      telefone2: '',
      email: '',
      site: '',
      valorfixo: '',
      message: '',
  }
  }

async componentDidMount(params){

    const token = localStorage.getItem('token')
    const {id} = this.props.location.state
    
    const pedido = await api.get(`empresa/${id}`,
    {headers: {'Authorization': `Bearer ${token}`}})

    const data = pedido.data

    this.setState({ 
      id: data.id,
      nomefantasia: data.nomefantasia,
      razaosocial: data.razaosocial,
      cnpj: data.cnpj,
      ie: data.ie,
      endereco: data.endereco,
      endereco1: data.endereco1,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      telefone1: data.telefone1,
      telefone2: data.telefone2,
      email: data.email,
      site: data.site,
      valorfixo: data.valorfixo,
    })
}

handleSubmit = async event => {
    event.preventDefault()

    const token = localStorage.getItem('token')
    const pedido = await api.put(`empresa/${this.state.id}`, 
    {
      nomefantasia: this.state.nomefantasia, 
      razaosocial: this.state.razaosocial,
      cnpj: this.state.cnpj,
      ie: this.state.ie,
      endereco: this.state.endereco,
      endereco1: this.state.endereco1,
      numero: this.state.numero,
      bairro: this.state.bairro,
      cidade: this.state.cidade,
      estado: this.state.estado,
      telefone1: this.state.telefone1,
      telefone2: this.state.telefone2,
      email: this.state.email,
      site: this.state.site,
      valorfixo: this.state.valorfixo,
    },{
        headers: {'Authorization': `Bearer ${token}`}
    })
    .then(res => {
        this.setState({message: 'Cliente atualizado com sucesso!'})
        this.props.history.push('/clientes')})
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
                              to='/clientes'>
                              <span>Voltar</span>
                            </Link>
                            <h3></h3>
                          </div>
                          
                          <form class='form' onSubmit={this.handleSubmit}>
                          <label> Nome Fantasia
                              <input 
                              type='text' 
                              name='nomefantasia'
                              id='nomefantasia'
                              onChange={e => this.setState({nomefantasia: e.target.value})}
                              value={this.state.nomefantasia} 
                              />
                          </label>
                          <label> Razão Social
                              <input 
                              type='text' 
                              name='razaosocial' 
                              id='razaosocial'
                              onChange={e => this.setState({razaosocial: e.target.value})}
                              value={this.state.razaosocial}
                              />
                          </label>
                          <label>CNPJ
                              <input 
                              type='text' 
                              name='cnpj' 
                              id='cnpj'
                              onChange={e => this.setState({cnpj: e.target.value})}
                              value={this.state.cnpj}
                              />
                          </label>
                          <label>Inscrição Estadual
                              <input 
                              type='text' 
                              name='ie' 
                              id='ie'
                              onChange={e => this.setState({ie: e.target.value})}
                              value={this.state.ie}
                              />
                          </label>
                          <label> Endereço 1
                              <input 
                              type='text' 
                              name='endereco' 
                              id='endereco'
                              onChange={e => this.setState({endereco: e.target.value})}
                              value={this.state.endereco}
                              />
                          </label>
                          <label> Número
                              <input 
                              type='text' 
                              name='numero' 
                              id='numero'
                              onChange={e => this.setState({numero: e.target.value})}
                              value={this.state.numero}
                              />
                          </label>
                          <label> Endereço 2
                              <input 
                              type='text' 
                              name='endereco1' 
                              id='endereco1'
                              onChange={e => this.setState({endereco1: e.target.value})}
                              value={this.state.endereco1}
                              />
                          </label>
                          <label> Bairro
                              <input 
                              type='text' 
                              name='bairro' 
                              id='bairro'
                              onChange={e => this.setState({bairro: e.target.value})}
                              value={this.state.bairro}
                              />
                          </label>
                          <label> Cidade
                              <input 
                              type='text' 
                              name='cidade' 
                              id='cidade'
                              onChange={e => this.setState({cidade: e.target.value})}
                              value={this.state.cidade}
                              />
                          </label>
                          <label> Estado
                              <input 
                              type='text' 
                              name='estado' 
                              id='estado'
                              onChange={e => this.setState({estado: e.target.value})}
                              value={this.state.estado}
                              />
                          </label>
                          <label> Telefone
                              <input 
                              type='text' 
                              name='telefone1' 
                              id='telefone1'
                              onChange={e => this.setState({telefone1: e.target.value})}
                              value={this.state.telefone1}
                              />
                          </label>
                          <label> Celular
                              <input 
                              type='text' 
                              name='telefone2' 
                              id='telefone2'
                              onChange={e => this.setState({telefone2: e.target.value})}
                              value={this.state.telefone2}
                              />
                          </label>
                          <label> E-mail
                              <input 
                              type='text' 
                              name='email' 
                              id='email'
                              onChange={e => this.setState({email: e.target.value})}
                              value={this.state.email}
                              />
                          </label>
                          <label> Site
                              <input 
                              type='text' 
                              name='site' 
                              id='site'
                              onChange={e => this.setState({site: e.target.value})}
                              value={this.state.site}
                              />
                          </label>
                          <label> Valor
                              <input 
                              type='text' 
                              name='valorfixo' 
                              id='valorfixo'
                              onChange={e => this.setState({valorfixo: e.target.value})}
                              value={this.state.valorfixo}
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