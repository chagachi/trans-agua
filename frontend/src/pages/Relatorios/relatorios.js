import React, { useState, useEffect } from 'react';
import Datepicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import { Link } from 'react-router-dom'
import { useLocation, useHistory } from 'react-router'
import api from '../../services/api'
import Menu from '../../components/Header'
import './relatorios.css'
import Select from 'react-select'

import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', pt)

function Relatorios(){

    const [pedidos, setPedidos] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [empresa, setEmpresa] = useState('')
    const [motoristas, setMotoristas] = useState([])
    const [motorista, setMotorista] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [finalDate, setFinalDate] = useState(new Date())
    const [total, setTotal] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)
    const [volume, setVolume] = useState('')
    const [totalLiquido, setTotalLiquido] = useState('')
    const [inicio, setInicio] = useState('')
    const [fim, setFim] = useState('')

    const location = useLocation()
    const history = useHistory()

    console.log(location)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(location.state !== undefined){
            async function load(){

                const relatorio = await api.post(`relatorio`, 
                {
                    startDate: location.state.startDate, 
                    finalDate: location.state.finalDate,
                    motorista: location.state.motorista,
                    nomeEmpresa: location.state.nomeEmpresa,
                },{
                    headers: {'Authorization': `Bearer ${token}`}
                })

                setPedidos(relatorio.data)
                setTotal(relatorio.data.length)
                
                const vales = pedidos;
                
                const Liquido = vales.reduce((acumulador, {totalLiquido} ) => {           
                    return acumulador += parseFloat(totalLiquido.replace(',','.'));
                },0);
                
                const quantidadeCarga = vales.reduce((acumulador, {quantidadeCarga} ) => {
                    return acumulador += parseFloat(quantidadeCarga.replace(',','.'));
                },0);
    
    
                setTotalLiquido(Liquido)
                setVolume(quantidadeCarga)
                
                console.log(relatorio.data)
                // console.log(this.state.totalLiquido)
                // console.log(this.state.volume)
            }

            async function user(){
                const empresas = await api.get(`listarempresas`, 
                {headers: {'Authorization': `Bearer ${token}`}})
                setEmpresas(empresas.data)
                return empresas
            }
    
            async function moto(){
                const motorista = await api.get('listarmotoristas',
                {headers: {'Authorization': `Bearer ${token}`}})
                setMotoristas(motorista.data)
                return motorista
            } 
            load()
            user()
            moto()
        } else{
            async function user(){
                const empresas = await api.get(`listarempresas`, 
                {headers: {'Authorization': `Bearer ${token}`}})
                setEmpresas(empresas.data)
                return empresas
            }
    
            async function moto(){
                const motorista = await api.get('listarmotoristas',
                {headers: {'Authorization': `Bearer ${token}`}})
                setMotoristas(motorista.data)
                return motorista
            } 
            
            user()
            moto()
        }

    },[])

    function moto() {
        let motoristas = document.getElementById('motorista');
        let att = motoristas.options[motoristas.selectedIndex].attributes
        console.log(att)

        setMotorista(att.name.value)
    }
    
    async function salvar(event) {
        event.preventDefault()

        const start = startDate.toLocaleDateString()
        const startsplit = start.split('/').reverse().join('/')

        const final = finalDate.toLocaleDateString()
        const finalsplit = final.split('/').reverse().join('/')

        await setInicio(startsplit)
        await setFim(finalsplit)

        const token = localStorage.getItem('token')
        const relatorio = await api.post(`relatorio`, 
        {
            startDate: `${inicio} 00:00:00`, 
            finalDate: `${fim} 23:59:59`,
            motorista: motorista,
            nomeEmpresa: empresa,
        },{
            headers: {'Authorization': `Bearer ${token}`}
        })

        await setPedidos(relatorio.data)
        await setTotal(relatorio.data.length)
        
        const vales = pedidos;
        
        const Liquido = await vales.reduce((acumulador, {totalLiquido} ) => {           
            return acumulador += parseFloat(totalLiquido.replace(',','.'));
        },0);
        
        const quantidadeCarga = await vales.reduce((acumulador, {quantidadeCarga} ) => {
            return acumulador += parseFloat(quantidadeCarga.replace(',','.'));
        },0);


        await setTotalLiquido(Liquido)
        await setVolume(quantidadeCarga)
          
        console.log(relatorio.data)
        // console.log(this.state.totalLiquido)
        // console.log(this.state.volume)
    }

    function empresaSelecionada(selectedOption) {
        setSelectedOption(selectedOption)
        console.log(`Option selected:`, selectedOption)

        setEmpresa(selectedOption.label)
    }

    function imprimir() {
        history.push({
            pathname: '/imprimir', 
            state:{
                empresa: empresa,
                motorista: motorista,
                inicio: inicio,
                fim: fim
            }})
    }

    async function del(e) {

        const token = localStorage.getItem('token')
            await api.delete(`pedido/${e.target.id}`, 
            {headers: {'Authorization': `Bearer ${token}`}})

            const relatorio = await api.post(`relatorio`, 
            {
                startDate: `${startDate} 00:00:00`, 
                finalDate: `${finalDate} 23:59:59`,
                motorista: motorista,
                nomeEmpresa: empresa,
            },{
                headers: {'Authorization': `Bearer ${token}`}
            })
    
            setPedidos(relatorio.data)
            setTotal(relatorio.data.length)
            
            const vales  = pedidos;
            
            const Liquido = vales.reduce((acumulador, {totalLiquido} ) => {           
                return acumulador += parseFloat(totalLiquido.replace(',','.'));
            },0);
            
            const quantidadeCarga = vales.reduce((acumulador, {quantidadeCarga} ) => {
                return acumulador += parseFloat(quantidadeCarga.replace(',','.'));
            },0);
    
            setTotalLiquido(Liquido)
            setVolume(quantidadeCarga)
    }

    return(
        <>
            <div className='geral'>
                <div className='menu'>
                    <Menu />
                </div>

                <div className='content'>
                    <header>
                        <span>Painel de Controle ><strong> Clientes</strong></span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>
                            <div className='head'>
                                <h3>Gerar Relatório</h3>
                            </div>

                            <form className='form-rel' onSubmit={salvar}>
                                <label> Data de Inicio
                                    <Datepicker 
                                    selected={startDate}
                                    dateFormat="dd/MM/yyyy"
                                    locale="pt-BR"
                                    onChange={date => setStartDate(date)} 
                                    />
                                </label>
                                
                                <label> Data Final
                                    <Datepicker 
                                    selected={finalDate}
                                    dateFormat="dd/MM/yyyy"
                                    locale="pt-BR"
                                    onChange={date => setFinalDate(date)} 
                                    />
                                </label>
                                
                                <label> Motorista
                                    <select 
                                    id='motorista'    
                                    onChange={moto}
                                    value={motorista}>

                                        <option 
                                        name=''
                                        id='1' 
                                        value='' 
                                        >Selecione o Motorista</option>
                                        {motoristas.map(moto => (
                                        
                                        <option 
                                        key={moto.id} 
                                        name={moto.nome}
                                        id={moto.id}> {moto.nome} </option>
                                        ))}
                                    </select>
                                </label>

                                <label>Selecione a Empresa
                                    <Select 
                                        value={selectedOption}
                                        onChange={empresaSelecionada}
                                        options={empresas.map(post => (
                                            { 
                                                key: `${post.id}`, 
                                                label: `${post.nomefantasia}`,
                                                cnpj: `${post.cnpj}`,
                                                valor: `${post.valorFixo}`,
                                                endereco: `${post.endereco1}`,
                                            }
                                            ))}
                                        placeholder='Selecione a empresa'
                                        isSearchable={true}
                                    />
                                </label>
                                
                                <input className='botao' type='submit' name='Buscar' value='Buscar' />
                            </form>

                            {
                                total !== 0 ? (
                                    <button 
                                    className="imprimir" 
                                    onClick={imprimir} >
                                        imprimir
                                    </button>
                                ) : ''
                            }
                            <div className='tabs-rel'>

                                {
                                    total !== 0 ? (
                                        <>
                                        <span>NOME</span>
                                        <span>MOTORISTA</span>
                                        <span>PEDIDO</span>
                                        <span>CARGA</span>
                                        <span>VALOR</span>
                                        <span>TOTAL: {total}</span>
                                        </>
                                    ) : ''
                                }
                            </div>

                            {pedidos.map(post => (
                                <div className='clientes-rel' key={post.id}>
                                    <span> {post.empresa} </span>
                                    <span> {post.motorista} </span>
                                    <span> {post.id}<br/> {post.observacao} </span>
                                    <span> {post.quantidadeCarga} </span>
                                    <span> {post.totalLiquido} </span>
                                    <div>
                                        <Link to={{
                                            pathname:'/vales/vale',
                                            state: {
                                                id: post.id,
                                                startDate: `${inicio} 00:00:00`, 
                                                finalDate: `${fim} 23:59:59`,
                                                motorista: motorista,
                                                pedidos: pedidos,
                                                nomeEmpresa: empresa,
                                            }, search: `?id=${post.id}`
                                            }}>
                                            <button className='see'>Ver | Editar</button>
                                        </Link>
                                    </div>
                                </div>
                            ))} 

                            {
                                total !== 0 ? (
                                    <>
                                    <div className="rodape-rel">
                                        <div>
                                            Metro cúbicos (m³): {volume}
                                        </div>
                                        <div>
                                            Valor total: {totalLiquido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }
                                        </div>
                                    </div>
                                    </>
                                ) : ''
                            }
                                                  
                        </div>
                </div>
            </div>
            </>
    )

}

export default Relatorios

