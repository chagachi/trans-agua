import React, { Component } from 'react';
import empresa from '../../assets/empresa.png'
import ticket from '../../assets/ticket.png'
import Menu from '../../components/Header'
import api from '../../services/api'
import './dashboard.css'

class Dash extends Component {

    state = {
        clientes: '',
        pedido: '',
    }

    async componentDidMount(){
        const token = localStorage.getItem('token')
        const user = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        const pedido = await api.get(`pedido`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        this.setState({ clientes: user.data.total, pedido: pedido.data.total})
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
                        <h3>Painel de Controle</h3>
                        <span>Olá Felipe Marcondes</span>
                    </header>

                    <div className='top'>
                        <div className='card'>
                            <div>
                                <p>Clientes Cadastrados</p>
                                <span> {this.state.clientes} </span>
                            </div>
                            <img src={empresa} alt='empresa' />
                        </div>

                        <div className='card'>
                            <div>
                                <p>Vales Emitidos</p>
                                <span> {this.state.pedido} </span>
                            </div>
                            <img src={ticket} alt='ticket' />
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Dash;