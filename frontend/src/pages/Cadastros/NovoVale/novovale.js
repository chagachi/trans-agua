import React, { Component } from 'react';
import Menu from '../../../components/Header'
import api from '../../../services/api'
import Select from 'react-select'

import './novovale.css'



class NovoVale extends Component {

    constructor(props){
        super(props)
        this.state = {
            idEmpresa: '',
            empresa: '',
            cnpj: '',
            idMotorista: '',
            motorista: '',
            placa: '',
            localEntrega: '',
            valorUnitario: '',
            quantidadeCarga: '',
            totalLiquido: '',
            observacao: '',
            message: '',
            empresas: [],
            motoristas: [],
            selectedOption: null,
        }

        this.change = this.change.bind(this)
        this.moto = this.moto.bind(this)
        this.carga = this.carga.bind(this)
    }

    async componentDidMount(params){

        const token = localStorage.getItem('token')
        const user = await api.get(`listarempresas`, 
        {headers: {'Authorization': `Bearer ${token}`}})
        console.log(user)

        const moto = await api.get('listarmotoristas',
        {headers: {'Authorization': `Bearer ${token}`}})

        this.setState({ empresas: user.data, motoristas: moto.data})
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption })
        console.log(`Option selected:`, selectedOption)

        this.setState({
            empresa: selectedOption.label,
            cnpj: selectedOption.cnpj, 
            idEmpresa: selectedOption.key, 
            localEntrega: selectedOption.endereco,
            valorUnitario: selectedOption.valor
        })
    }

    handleSubmit = async event => {
        event.preventDefault()

        const token = localStorage.getItem('token')
        const pedido = await api.post(`pedido`, 
        {
            idEmpresa: this.state.idEmpresa, 
            empresa: this.state.empresa,
            cnpj: this.state.cnpj,
            idMotorista: this.state.idMotorista,
            motorista: this.state.motorista,
            placa: this.state.placa,
            localEntrega: this.state.localEntrega,
            valorUnitario: this.state.valorUnitario,
            quantidadeCarga: this.state.quantidadeCarga,
            totalLiquido: this.state.totalLiquido,
            observacao: this.state.observacao,
        },{
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then(res => {
            this.setState({message: 'Vale emitido com sucesso!'})
            this.props.history.push({
                pathname: '/impressao', 
                state:{id: res.data.id}})
            
        })
        .catch(e => this.setState({message: `${e}`}))
    }

    change(event){
        let empresas = document.getElementById('empresa');
        let attr = empresas.options[empresas.selectedIndex].attributes

        this.setState({
            empresa: attr.name.value,
            cnpj: attr.cnpj.value, 
            idEmpresa: attr.id.value, 
            localEntrega: attr.endereco.value,
            valorUnitario: attr.valor.value
        })
                
    }

    moto(event){
        let motoristas = document.getElementById('motorista');
        let att = motoristas.options[motoristas.selectedIndex].attributes
        console.log(att)

        this.setState({
            motorista: att.name.value,
            idMotorista: att.id.value
        })
                
    }

    carga(event){
        let carga = event.target.value
        let total = carga * this.state.valorUnitario

        this.setState({
            totalLiquido: total
        })
                
    }

    

render() {

    const { selectedOption } = this.state

    // if (this.state.empresa == "") {
    //     document.querySelector('#enviar').style.display = "none"
    // }

      return(
          <>
          <div className='geral'>
              <div className='menu'>
                  <Menu />
              </div>

              <div className='content'>
                  <header>
                      <span>Painel de Controle > Vales > <strong> Emitir Vale </strong></span>
                  </header>

                  <div className='top'></div>
                  <div className='main'>
                      <div className='cabecalho'>
                            {
                                this.state.message !== ''? (
                                    window.alert(this.state.message)
                                ) : ''
                            }
                          <h3>Selecione a Empresa</h3>
                          {/* <select 
                          id='empresa'    
                          onChange={this.change}
                          value={this.state.empresa}>
                          <option 
                          name='inicio' 
                          id='1' 
                          value='' 
                          disabled 
                          selected > 
                          Selecione a empresa</option>
                            {this.state.empresas.map(post => (
                                
                                <option 
                                key={post.id} 
                                name={post.nomefantasia} 
                                cnpj={post.cnpj}
                                valor={post.valorFixo}
                                endereco={post.endereco}
                                id={post.id}> {post.nomefantasia} </option>
                            ))}
                          </select> */}
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
                      </div>

                      <div>
                        <form className='novovale' onSubmit={this.handleSubmit}>
                          <label> Empresa
                              <p 
                              type='text' 
                              name='empresa' 
                              id='empresa'
                              onChange={e => this.setState({empresa: e.target.value})}
                              value={this.state.empresa}
                              >{this.state.empresa}</p>
                          </label>
                          <label>CNPJ
                              <p 
                              type='text' 
                              name='cnpj' 
                              id='cnpj'
                              onChange={e => this.setState({cnpj: e.target.value})}
                              value={this.state.cnpj}
                              >{this.state.cnpj}</p>
                          </label>
                          <label>Motorista
                              <select 
                                id='motorista'    
                                onChange={this.moto}
                                value={this.state.motorista}>

                                <option 
                                name='ini' 
                                id='1' 
                                value='' 
                                disabled>Selecione o Motorista</option>
                                {this.state.motoristas.map(moto => (
                                
                                <option 
                                key={moto.id} 
                                name={moto.nome}
                                id={moto.id}> {moto.nome} </option>
                            ))}
                              </select>
                          </label>
                          <label> Placa
                              <input 
                              type='text' 
                              name='placa' 
                              id='placa'
                              onChange={e => this.setState({placa: e.target.value})}
                              value={this.state.placa}
                              />
                          </label>
                          <label> Local de Entrega
                              <p 
                              type='text' 
                              name='numero' 
                              id='localEntrega'
                              onChange={e => this.setState({localEntrega: e.target.value})}
                              value={this.state.localEntrega}
                              >{this.state.localEntrega}</p>
                          </label>
                          <label> Quantidade de Carga
                              <input 
                              type='text' 
                              name='quantidadeCarga' 
                              id='quantidadeCarga'
                              onChange={e => this.setState({quantidadeCarga: e.target.value})}
                              onKeyUp={this.carga}
                              value={this.state.quantidadeCarga}
                              />
                          </label>
                          <label> Total
                              <p 
                              type='text' 
                              name='total' 
                              id='total'
                              onChange={e => this.setState({totalLiquido: e.target.value})}
                              value={this.state.totalLiquido}
                              >{this.state.totalLiquido}</p>
                          </label>

                          {
                                this.state.empresa !== '' 
                                && this.state.motorista !== '' 
                                && this.state.placa !== '' 
                                && this.state.quantidadeCarga !== ''
                                && this.state.totalLiquido !== ''
                                ? (
                                    <input className='botao' type='submit' value='Emitir vale' id='enviar'/>
                                ) : ''
                        }

                          
                        </form>
                      </div>
                  </div>
              </div>
          </div>
          </>
      );
  }
}

export default NovoVale;