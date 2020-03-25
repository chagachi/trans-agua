import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Menu from '../../components/Header'
import './clientes.css'


class Clientes extends Component {

    constructor(props){
        super(props)
        this.state = {
            clientes: [],
            pagina: 1,
        }

        this.delete = this.delete.bind(this)
    }

    async delete(e) {

        const token = localStorage.getItem('token')
        const remove = await api.delete(`empresa/${e.target.id}`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        const empresa = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: this.state.pagina}})

        this.setState({ clientes: empresa.data.data })
    }

    async componentDidMount(){
        const token = localStorage.getItem('token')
        const user = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: this.state.pagina}})

        console.log(user.data)

        this.setState({ clientes: user.data.data})
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
                        <span>Painel de Controle ><strong> Clientes</strong></span>
                        <span>Olá Felipe Marcondes</span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>
                            <div className='head'>
                                <h3>Clientes Cadastrados</h3>
                                <Link to='/clientes/novocliente'><span>Cadastrar Cliente</span></Link>
                            </div>

                            <div className='tabs-clientes'>
                                <span>EMPRESA</span>
                                <span>CNPJ</span>
                            </div>

                            {this.state.clientes.map(post => (
                                <div className='clientes-clientes' key={post.id}>
                                    <span> {post.nomefantasia} </span>
                                    <span> {post.cnpj} </span>
                                    <div>
                                        <Link to={{
                                            pathname:'/clientes/cliente',
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

export default Clientes;