import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './valesantigos.css'


class Vales extends Component {

    constructor(props){
      super(props)
      this.state = {
          pedidos: [],
          pagina: 1,
      }
  }

    async componentDidMount(){
        const token = localStorage.getItem('token')

        const pedido = await api.get(`pedidosantigos`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: this.state.pagina}})

        this.setState({ pedidos: pedido.data.data })
        console.log(pedido.data.data)
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

                            <div className='tabs-va'>
                                <span>EMPRESA</span>
                                <span>NÚMERO</span>
                            </div>

                            {this.state.pedidos.map(post => (
                                <div className='clientes-va' key={post.id}>
                                    <span> {post.empresa} </span>
                                    <span> {post.id} </span>
                                    <div>
                                    <Link to={{
                                            pathname:'/valesantigos/vale',
                                            state: {id: post.id}
                                            }}><button className='see'>Ver</button></Link>
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