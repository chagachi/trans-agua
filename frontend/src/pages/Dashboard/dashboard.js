import React, { useEffect, useState } from 'react';
import empresa from '../../assets/empresa.png'
import ticket from '../../assets/ticket.png'
import Menu from '../../components/Header'
import api from '../../services/api'
import './dashboard.css'


function Dashboard(){
    const token = localStorage.getItem('token')
    const [clientes, setClientes] = useState('')
    const [pedido, setPedido] = useState('')

    async function getClientsQTD(){
        const user = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        setClientes(user.data.total)
    }
    
    async function getPedidosQTD(){
        const pedido = await api.get(`pedido`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        setPedido(pedido.data.total)
    }
    
    useEffect(() => {
        getClientsQTD()
        getPedidosQTD()
    })

    return(
            <>
            <div className='geral'>
                <Menu />
                <div className='content'>
                    <div className='top'>
                        <header>
                            <h3>Painel de Controle</h3>
                        </header>
                    </div>

                    <div className='innerCards'>
                        <div className='card'>
                            <div>
                                <p>Clientes Cadastrados</p>
                                <span> {clientes} </span>
                            </div>
                            <img src={empresa} alt='empresa' />
                        </div>

                        <div className='card'>
                            <div>
                                <p>Vales Emitidos</p>
                                <span> {pedido} </span>
                            </div>
                            <img src={ticket} alt='ticket' />
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
}

export default Dashboard;