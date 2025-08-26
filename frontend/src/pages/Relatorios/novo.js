import React, { Component } from 'react';
import Datepicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import { Link } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import api from '../../services/api'
import Menu from '../../components/Header'
import './relatorios.css'
import Select from 'react-select'

import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', pt)

const history = createBrowserHistory();
const location = history.location
const unlisten = history.listen((location, action) => {
    // location is an object like window.location
    console.log(action, location.pathname, location.state);
  });

class Relatorios extends Component {


    constructor(props){
        super(props)
        this.state = {
            pedido: [],
            moto: [],
            empresas: [],
            empresa: '',
            motorista: '',
            inicio: '',
            fim: '',
            total: '0',
            startDate: new Date(),
            finalDate: new Date(),
            selectedOption: null,
            volume: '',
            totalLiquido: '',
        }

        this.imprimir = this.imprimir.bind(this)
        this.delete = this.delete.bind(this)
        this.moto = this.moto.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount(){
        console.log(location.state)
        console.log(unlisten)
        const token = localStorage.getItem('token')

        const moto = await api.get('listarmotoristas', 
        {headers: {Authorization: `Bearer ${token}`}})

        const user = await api.get(`listarempresas`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        this.setState({ empresas: user.data, moto: moto.data})
        
    }

    moto(event){
        let motoristas = document.getElementById('motorista');
        let att = motoristas.options[motoristas.selectedIndex].attributes
        // console.log(att)

        this.setState({
            motorista: att.name.value
        })
                
    }

    handleSubmit = async event => {
        event.preventDefault()

        const start = this.state.startDate.toLocaleDateString()
        const startsplit = start.split('/').reverse().join('/')

        const final = this.state.finalDate.toLocaleDateString()
        const finalsplit = final.split('/').reverse().join('/')

        this.setState({inicio: startsplit, fim: finalsplit})

        const token = localStorage.getItem('token')
        const relatorio = await api.post(`relatorio`, 
        {
            startDate: `${startsplit} 00:00:00`, 
            finalDate: `${finalsplit} 23:59:59`,
            motorista: this.state.motorista,
            nomeEmpresa: this.state.empresa,
        },{
            headers: {'Authorization': `Bearer ${token}`}
        })

        this.setState({pedido: relatorio.data, total: relatorio.data.length})
        
        const pedidos  = this.state.pedido;
        
        const totalLiquido = pedidos.reduce((acumulador, {totalLiquido} ) => {           
            return acumulador += parseFloat(totalLiquido.replace(',','.'));
        },0);
        
        const quantidadeCarga = pedidos.reduce((acumulador, {quantidadeCarga} ) => {
            return acumulador += parseFloat(quantidadeCarga.replace(',','.'));
        },0);
        
        this.setState({totalLiquido: totalLiquido, volume: quantidadeCarga})   
        console.log(relatorio.data)
        // console.log(this.state.totalLiquido)
        // console.log(this.state.volume)
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
        console.log(`Option selected:`, selectedOption)

        this.setState({
            empresa: selectedOption.label,
        })
    }

    imprimir() {
        this.props.history.push({
            pathname: '/imprimir', 
            state:{
                empresa: this.state.empresa,
                motorista: this.state.motorista,
                inicio: this.state.inicio,
                fim: this.state.fim
            }})
    }

    async delete(e) {

        const token = localStorage.getItem('token')
            await api.delete(`pedido/${e.target.id}`, 
            {headers: {'Authorization': `Bearer ${token}`}})

        const start = this.state.startDate.toLocaleDateString()
        const startsplit = start.split('/').reverse().join('/')

        const final = this.state.finalDate.toLocaleDateString()
        const finalsplit = final.split('/').reverse().join('/')

        this.setState({inicio: startsplit, fim: finalsplit})

        const relatorio = await api.post(`relatorio`, 
        {
            startDate: `${startsplit} 00:00:00`, 
            finalDate: `${finalsplit} 23:59:59`,
            motorista: this.state.motorista,
            nomeEmpresa: this.state.empresa,
        },{
            headers: {'Authorization': `Bearer ${token}`}
        })

        this.setState({pedido: relatorio.data, total: relatorio.data.length})
        
        const pedidos  = this.state.pedido;
        
        const totalLiquido = pedidos.reduce((acumulador, {totalLiquido} ) => {
            return acumulador += parseFloat(totalLiquido.replace(',','.'));
        },0);
        
        const quantidadeCarga = pedidos.reduce((acumulador, {quantidadeCarga} ) => {
            console.log(`acumulador: ${acumulador}`);
            
            return acumulador += parseFloat(quantidadeCarga.replace(',','.'));
        },0);
        
        this.setState({totalLiquido: totalLiquido, volume: quantidadeCarga})
    }
    
    render() {

        const { selectedOption } = this.state

        return(
            <>
            <div className='geral'>
                <div className='content'>
                    <Menu />
                    <header>
                        <span>Painel de Controle ><strong> Clientes</strong></span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>
                            <div className='head'>
                                <h3>Gerar Relatório</h3>
                            </div>

                            <form className='form-rel' onSubmit={this.handleSubmit}>
                                <label> Data de Inicio
                                    <Datepicker 
                                    selected={this.state.startDate}
                                    dateFormat="dd/MM/yyyy"
                                    locale="pt-BR"
                                    onChange={date => this.setState({startDate: date})} 
                                    />
                                </label>
                                
                                <label> Data Final
                                    <Datepicker 
                                    selected={this.state.finalDate}
                                    dateFormat="dd/MM/yyyy"
                                    locale="pt-BR"
                                    onChange={date => this.setState({finalDate: date})} 
                                    />
                                </label>
                                
                                <label> Motorista
                                    <select 
                                    id='motorista'    
                                    onChange={this.moto}
                                    value={this.state.motorista}>

                                        <option 
                                        name=''
                                        id='1' 
                                        value='' 
                                        >Selecione o Motorista</option>
                                        {this.state.moto.map(moto => (
                                        
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
                                        onChange={this.handleChange}
                                        options={this.state.empresas.map(post => (
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
                                this.state.total !== '0' ? (
                                    <button 
                                    className="imprimir" 
                                    onClick={this.imprimir} >
                                        imprimir
                                    </button>
                                ) : ''
                            }
                            <div className='tabs-rel'>

                                {
                                    this.state.total !== '0'? (
                                        <>
                                        <span>NOME</span>
                                        <span>MOTORISTA</span>
                                        <span>PEDIDO</span>
                                        <span>CARGA</span>
                                        <span>VALOR</span>
                                        <span>TOTAL: {this.state.pedido.length}</span>
                                        </>
                                    ) : ''
                                }
                            </div>

                            {this.state.pedido.map(post => (
                                <div className='clientes-rel' key={post.id}>
                                    <span> {post.empresa} </span>
                                    <span> {post.motorista} </span>
                                    <span> {post.id} </span>
                                    <span> {post.quantidadeCarga} </span>
                                    <span> {post.totalLiquido} </span>
                                    <div>
                                        <Link to={{
                                            pathname:'/vales/vale',
                                            state: {
                                                id: post.id,
                                                startDate: `${this.state.inicio} 00:00:00`, 
                                                finalDate: `${this.state.final} 23:59:59`,
                                                motorista: this.state.motorista,
                                                pedidos: this.state.pedido,
                                                nomeEmpresa: this.state.empresa,
                                            }
                                            }}>
                                            <button className='see'>Ver | Editar</button>
                                        </Link>
                                        <button 
                                        className='delete' 
                                        id={post.id} 
                                        onClick={this.delete}>
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))} 

                            {
                                this.state.total !== '0'? (
                                    <>
                                    <div className="rodape-rel">
                                        <div>
                                            Metro cúbicos (m³): {this.state.volume}
                                        </div>
                                        <div>
                                            Valor total: {this.state.totalLiquido.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }
                                        </div>
                                    </div>
                                    </>
                                ) : ''
                            }
                                                  
                        </div>
                </div>
            </div>
            </>
        );
    }
}

export default Relatorios;