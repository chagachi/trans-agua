import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useLocation, useHistory } from 'react-router'
import Datepicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import Menu from '../../components/Header'
import api from '../../services/api'
import './vale.css'

import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt-BR';


function Vales(){

    const [pedido, setPedido] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [motorista, setMotorista] = useState([])
    const [adm, setAdm] = useState(localStorage.getItem('adm'))
    const [data, setData] = useState('')
    const [mensagem, setMensagem] = useState('')
    const location = useLocation()
    const history = useHistory()
    
    function gobackhandle(){
        history.goBack()
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        async function user(){
            const empresas = await api.get(`listarempresas`, 
            {headers: {'Authorization': `Bearer ${token}`}})
            setEmpresas(empresas.data)
            return empresas
        }

        async function moto(){
            const motorista = await api.get('listarmotoristas',
            {headers: {'Authorization': `Bearer ${token}`}})
            setMotorista(motorista.data)
            return motorista
        } 
        
        async function pedido(id){
            const vale = await api.get(`pedido/${id}`,
            {headers: {'Authorization': `Bearer ${token}`}})
            await setPedido(vale.data)
            const formatValue = vale.data.valorUnitario
            const valorFormatado = formatValue.replace(",", ".");
            // setPedido({valorUnitario: valorFormatado})
            return vale.data
        }
        user()
        moto()
        pedido(location.state.id)
    },[])

    function change(){
        let empresas = document.getElementById('empresa');
        let attr = empresas.options[empresas.selectedIndex].attributes
        // console.log(this.state.empresas)
        // console.log(empresas.options[empresas.selectedIndex].attributes)

        setPedido({...pedido,
            empresa: attr.name.value,
            cnpj: attr.cnpj.value, 
            idEmpresa: attr.id.value, 
            localEntrega: attr.endereco.value,
            valorUnitario: attr.valor.value
        })
    }

    function moto() {
        let motoristas = document.getElementById('motorista');
        let att = motoristas.options[motoristas.selectedIndex].attributes
        console.log(att)

        setPedido({...pedido,
            motorista: att.name.value,
            idMotorista: att.id.value
        })
    }

    function carga(event) {
        const formatValue = event.target.value;
        const valorFormatado = formatValue.replace(",", ".");        

        let carga = event.target.value;
        let total = valorFormatado * pedido.valorUnitario;
        
        setPedido({...pedido,
            totalLiquido: total.toFixed(2)
        })
    }

    async function salvar(event){
        event.preventDefault()

        const formatValue = pedido.quantidadeCarga
        const valorFormatado = formatValue.replace(",", ".");

        if (data !== ''){
            const start = data.toLocaleDateString()
            const startsplit = start.split('/').reverse().join('/')

            const token = localStorage.getItem('token')
            const putPedido = await api.put(`pedido/${location.state.id}`, 
            {
                idEmpresa: pedido.idEmpresa, 
                empresa: pedido.empresa,
                cnpj: pedido.cnpj,
                idMotorista: pedido.idMotorista,
                motorista: pedido.motorista,
                placa: pedido.placa,
                localEntrega: pedido.localEntrega,
                valorUnitario: pedido.valorUnitario,
                quantidadeCarga: pedido.quantidadeCarga,
                totalLiquido: pedido.totalLiquido,
                observacao: pedido.observacao,
                create: `${startsplit} 12:00:00`,
            },{
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => {
            setMensagem('Vale alterado com sucesso! Deseja Imprimir ?')
            // history.push({
            //     pathname: '/impressao', 
            //     state:{id: res.data.id}})
            
        })
        .catch(e => setMensagem(`${e}`))

        } else{

            const token = localStorage.getItem('token')
            const putPedido = await api.put(`pedido/${location.state.id}`, 
            {
                idEmpresa: pedido.idEmpresa, 
                empresa: pedido.empresa,
                cnpj: pedido.cnpj,
                idMotorista: pedido.idMotorista,
                motorista: pedido.motorista,
                placa: pedido.placa,
                localEntrega: pedido.localEntrega,
                valorUnitario: pedido.valorUnitario,
                quantidadeCarga: pedido.quantidadeCarga,
                totalLiquido: pedido.totalLiquido,
                observacao: pedido.observacao,
            },{
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => {
            setMensagem('Vale alterado com sucesso! Deseja Imprimir ?')
            // history.push({
            //     pathname: '/impressao', 
            //     state:{id: res.data.id}})
            
        })
        .catch(e => setMensagem(`${e}`))

        }
    }

    

    return(
        <>
            <div className='geral'>
                <div className='menu'>
                    <Menu />
                </div>

                <div className='content'>
                    <header>
                        <span>Painel de Controle ><strong> Vales </strong></span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>

                    <div className='cabecalho'>
                            {
                                mensagem !== ''? (
                                       window.confirm(mensagem) ? history.push({
                                        pathname: '/impressao', 
                                        state:{id: location.state.id}}) : null
                                    , setMensagem('')
                                ) : ''                         
                            }

                        <div className='head-vale'>
                            <a className='vai'
                                onClick={gobackhandle}>
                                Voltar
                            </a>
                            <h3></h3>
                        </div>
                          <select 
                          id='empresa'    
                          onChange={change}
                          value={pedido.empresa}
                          >
                          <option 
                          name='inicio' 
                          id='1' 
                          value='' 
                          disabled 
                          selected> Selecione a empresa</option>
                            {empresas.map(post => (
                                
                                <option 
                                key={post.id} 
                                name={post.nomefantasia} 
                                cnpj={post.cnpj}
                                valor={post.valorFixo}
                                endereco={post.endereco1}
                                id={post.id}> {post.nomefantasia} </option>
                            ))}
                          </select>
                      </div>

                      <form className='novovale'>
                            <label> Empresa
                                <input 
                                type='text' 
                                name='empresa' 
                                id='empresa'
                                onChange={e => setPedido({...pedido,empresa: e.target.value})}
                                value={pedido.empresa}
                                />
                            </label>
                            <label>CNPJ
                                <input 
                                type='text' 
                                name='cnpj' 
                                id='cnpj'
                                onChange={e => setPedido({...pedido,cnpj: e.target.value})}
                                value={pedido.cnpj}
                                />
                            </label>
                            <label>Motorista
                                <select 
                                    id='motorista'    
                                  onChange={moto}
                                  value={pedido.motorista}
                                >

                                    <option 
                                    name='ini' 
                                    id='1' 
                                    value='' 
                                    disabled>Selecione o Motorista</option>
                                    {motorista.map(moto => (
                                    
                                    <option 
                                    key={moto.id} 
                                    name={moto.nome}
                                    id={moto.id}> {moto.nome} </option>
                                        ))
                                    }
                                </select>
                            </label>
                            <label> Placa
                                <input 
                                type='text' 
                                name='placa' 
                                id='placa'
                                onChange={e => setPedido({...pedido,placa: e.target.value})}
                                value={pedido.placa}
                                />
                            </label>
                            <label> Local de Entrega
                                <input 
                                type='text' 
                                name='numero' 
                                id='localEntrega'
                                onChange={e => setPedido({...pedido,localEntrega: e.target.value})}
                                value={pedido.localEntrega}
                                />
                            </label>
                            <label> Quantidade de Carga
                                <input 
                                type='text' 
                                name='quantidadeCarga' 
                                id='quantidadeCarga'
                                onChange={e => setPedido({...pedido,quantidadeCarga: e.target.value})}
                                onKeyUp={carga}
                                value={pedido.quantidadeCarga}
                                />
                            </label>
                            <label> Total
                                <input 
                                type='text' 
                                name='total' 
                                id='total'
                                onChange={e => setPedido({...pedido,totalLiquido: e.target.value})}
                                value={pedido.totalLiquido}
                                />
                            </label>
                            <label> Observação
                                <input 
                                type='text' 
                                name='observacao' 
                                id='observacao'
                                onChange={e => setPedido({...pedido,observacao: e.target.value})}
                                value={pedido.observacao}
                                />
                            </label>

                            {
                                adm == 1? (
                                    <label> Data
                                        <Datepicker 
                                            selected={data}
                                            dateFormat="dd/MM/yyyy"
                                            locale="pt-BR"
                                            onChange={date => setData(date)}
                                        />
                                    </label>
                                ) : ''
                            }

                            

                            <input className='botao' type='submit' onClick={salvar} value='Salvar' />
                          </form>
                        </div>
                </div>
            </div>
            </>
    )
}

export default Vales