import React, { Component } from 'react';
import Menu from '../../../components/Header'
import api from '../../../services/api'

import './novomotorista.css'


class NovoMotorista extends Component {

    state = {
        nome: '',
        telefone: '',
        celular: '',
        message: '',
    }

    handleSubmit = async event => {
        event.preventDefault()

        const token = localStorage.getItem('token')
        const moto = await api.post(`motorista`, 
        {
            nome: this.state.nome, 
            telefone: this.state.telefone,
            celular: this.state.celular,
        },{
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => {
            this.setState({message: 'Usuário cadastrado com sucesso!'})
            this.props.history.push('/motoristas')
        })
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
                        <span>Painel de Controle > Motoristas > <strong> Cadastrar Motorista </strong></span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>
                        <div className='head'>
                            <h3>Cadastrar Motorista</h3>
                        </div>

                        <div>
                            {
                                this.state.message !== ''? (
                                    window.alert(this.state.message)
                                ) : ''
                            }
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

export default NovoMotorista;