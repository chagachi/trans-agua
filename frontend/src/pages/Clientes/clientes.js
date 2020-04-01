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
            adm: localStorage.getItem('adm'),
        }

        this.delete = this.delete.bind(this)
        this.next = this.next.bind(this)
        this.back = this.back.bind(this)
        this.unique = this.unique.bind(this)
    }

    async delete(e) {

        const token = localStorage.getItem('token')
        await api.delete(`empresa/${e.target.id}`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        const empresa = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: this.state.pagina}})

        this.setState({ clientes: empresa.data.data })
    }

    async next(){
        const token = localStorage.getItem('token')
        const user = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${Number(this.state.paginate) + 1}`}})
    
        this.setState( { clientes: [].concat(user.data.data), paginate: `${Number(this.state.paginate) + 1}`})
    
     }
     async back(){
        const token = localStorage.getItem('token')
        const user = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${this.state.paginate - 1}`}})
    
        this.setState( { clientes: [].concat(user.data.data), paginate: `${this.state.paginate - 1}`})
    
     }
    
     async unique(e){
        const token = localStorage.getItem('token')
        const key = e.target.id
        const user = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${key}`}})
    
        this.setState( { clientes: [].concat(user.data.data), paginate: key})
     }

     createPagination = () => {
        const limite = 2;
        const page = []
        let i
    
        let startPage = (this.state.paginate - limite) > 1 ? 
        this.state.paginate - limite : 
        1;
    
        let endPage = Number(Number(this.state.paginate) + Number(limite)) < this.state.lastPage ? 
        Number(Number(this.state.paginate) + Number(limite)) :
        Number(this.state.lastPage);
    
        if (this.state.paginate > 1) { page.push(<span onClick={this.back}>«</span>) }
        
        if(this.state.lastPage > 1 && this.state.paginate <= this.state.lastPage){
            if(this.state.lastPage > 3){
                if(this.state.paginate <=3){
                    for(i = 1; i <= 5; i++){
                        if(i == this.state.paginate){
                            page.push(<p prop={`${i}`} 
                            className='active' 
                            id={`${i}`} 
                            onClick={this.unique}>{i}</p>)
                        } else{
                            page.push(<p prop={`${i}`}
                            id={`${i}`} 
                            onClick={this.unique}>{i}</p>)
                        }
                    }
                } else{
                    for(i = startPage; i <= endPage; i++){
                        if(i == this.state.paginate){
                            page.push(<p prop={`${i}`} 
                            className='active' 
                            id={`${i}`} 
                            onClick={this.unique}>{i}</p>)
                            } else{
                                page.push(<p prop={`${i}`}
                                id={`${i}`} 
                                onClick={this.unique}>{i}</p>)
                            }
                    }
                }
            } else{
                for(i = startPage; i <= endPage; i++){
                    if(i == this.state.paginate){
                        page.push(<p prop={`${i}`} 
                        className='active' 
                        id={`${i}`} 
                        onClick={this.unique}>{i}</p>)
                        } else{
                            page.push(<p prop={`${i}`}
                            id={`${i}`} 
                            onClick={this.unique}>{i}</p>)
                        }
                }
            } 
        }
    
        if (endPage <= this.state.lastPage - 1) { page.push(<span onClick={this.next}>»</span>) }
        console.log(startPage, endPage)
        return page
    }

    async componentDidMount(){
        const token = localStorage.getItem('token')
        const user = await api.get(`empresa`, 
        {headers: {'Authorization': `Bearer ${token}`, paginate: this.state.pagina}})

        console.log(user.data)

        this.setState({ clientes: user.data.data, lastPage: user.data.lastPage})
    }     

    render() {

        if(this.state.adm == 1){
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
                                    {this.createPagination()}                                
                                </div>
                            </div>
                    </div>
                </div>
                </>
            );
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
                        <span>Olá Felipe Marcondes</span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>
                            <div className='head'>
                                <h3>Clientes Cadastrados</h3>
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
                                    </div>
                                </div>
                            ))}
                            
                            <div className='pagination'>
                                {this.createPagination()}                                
                            </div>
                        </div>
                </div>
            </div>
            </>
        );
    }
}

export default Clientes;