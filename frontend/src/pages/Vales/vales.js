import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './vales.css'


class Vales extends Component {

    constructor(props){
        super(props)
        this.state = {
            pedido: [],
        }

        this.delete = this.delete.bind(this)
    }

    async componentDidMount(){
        const token = localStorage.getItem('token')

        const pedido = await api.get(`pedido`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        this.setState({ pedido: pedido.data.data })
    }

    async delete(e) {

        const token = localStorage.getItem('token')
            const remove = await api.delete(`pedido/${e.target.id}`, 
            {headers: {'Authorization': `Bearer ${token}`}})

            const pedido = await api.get(`pedido`, 
            {headers: {'Authorization': `Bearer ${token}`}})

            this.setState({ pedido: pedido.data.data })
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
                            <div className='head'>
                                <h3>Últimos Vales Emitidos</h3>
                                <Link to='/vales/novovale'><span>Novo Vale</span></Link>
                            </div>

                            <div className='tabs-vales'>
                                <span>EMPRESA</span>
                                <span>CNPJ</span>
                                <span>NÚMERO</span>
                            </div>

                            {this.state.pedido.map(post => (
                                <div className='clientes-vales' key={post.id}>
                                    <span> {post.empresa} </span>
                                    <span> {post.cnpj} </span>
                                    <span> {post.id} </span>
                                    <div>
                                        <Link to={{
                                            pathname:'/vales/vale',
                                            state: {id: post.id}
                                            }}><button className='see'>Ver | Editar</button></Link>
                                        <button 
                                        className='delete' 
                                        id={post.id} 
                                        onClick={this.delete}>
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                            
                            <div className='pagination'>
                                <span> 1 </span>
                                <span> 2 </span>
                                <span> 3 </span>
                                <span> 4 </span>
                                <span> 5 </span>
                            </div>
                        </div>
                </div>
            </div>
            </>
        );
    }
}

export default Vales;