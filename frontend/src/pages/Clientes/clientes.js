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
            lastPage: '',
            paginate: 1,
            busca: "",
            adm: localStorage.getItem('adm'),
            message: ""
        }

        this.delete = this.delete.bind(this)
    }

    handleSubmit = async event => {
        event.preventDefault()
        if(this.state.busca === ""){
            this.getClients()
        }

        if(isNaN(parseFloat(this.state.busca))){
            
            const token = localStorage.getItem('token')
            await api.post('buscarnome', {
                nome: this.state.busca
            },
            {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                let teste = res.data
                if (teste){
                    this.setState({clientes: [].concat(res.data)})
                } else {
                    this.setState({message: 'Não existe uma empresa com este nome.'})         
                    this.setState({message: ""})         
                }
            })

        } else{

            const formatCNPJ = () => {
                var cnpj = this.state.busca
                let v = cnpj.replace(/\D/g,"")
                
                //Coloca ponto entre o segundo e o terceiro dígitos
                v=v.replace(/^(\d{2})(\d)/,"$1.$2")
                
                //Coloca ponto entre o quinto e o sexto dígitos
                v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
                
                //Coloca uma barra entre o oitavo e o nono dígitos
                v=v.replace(/\.(\d{3})(\d)/,".$1/$2")
                
                //Coloca um hífen depois do bloco de quatro dígitos
                v=v.replace(/(\d{4})(\d)/,"$1-$2")
                console.log(v)
                return v
            }
            
            const token = localStorage.getItem('token')
            await api.post('buscarcnpj', {
                cnpj: formatCNPJ()
            },
            {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                let teste = res.data[0]
                if (teste){
                    this.setState({cnpj: formatCNPJ()})
                    this.setState({clientes: [].concat(res.data[0])})
                } else {
                    this.setState({message: 'CNPJ não encontrado'})         
                    this.setState({message: ""})         
                }
            })
        }

    }

    async delete(e) {

        const token = localStorage.getItem('token')
        await api.delete(`empresa/${e.target.id}`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        const empresa = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: this.state.pagina}})

        this.setState({ clientes: empresa.data.data })
    }

    async getClients(){
        const token = localStorage.getItem('token')
        const user = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`, paginate: this.state.pagina}})

        console.log(user.data)

        this.setState({ clientes: user.data.data})
    }

    async componentDidMount(){
        this.getClients()
    }     

    render() {
        return(
            <>
            <div className='geral'>    
                <div className='content'>
                    <Menu />
                        
                    <div className='top'>
                        <header>
                            <span>{"Painel de Controle >"}<strong> Clientes</strong></span>
                        </header>
                    </div>
                    <div className='main'>
                            <div className='head'>
                                <h3>Clientes Cadastrados</h3>
                                <Link to='/clientes/novocliente'><span>Cadastrar Cliente</span></Link>
                            </div>

                            <form className='pesquisa' onSubmit={this.handleSubmit}>
                            
                                <input 
                                    type='text' 
                                    name='busca' 
                                    id='busca'
                                    onChange={e => this.setState({busca: e.target.value})}
                                    value={this.state.busca}
                                />
                            
                            <input type="submit" value="Pesquisar" />
                            </form>

                            {
                                this.state.message !== ''? (
                                    window.alert(this.state.message)
                                ) : ''
                            }  

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

                                        {
                                            this.state.adm === '1' ? 
                                            <button 
                                            className='delete' 
                                            id={post.id} 
                                            onClick={this.delete}>
                                                Excluir
                                            </button>
                                            : ''
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                </div>
            </div>
            </>
        );
    }
}

export default Clientes;