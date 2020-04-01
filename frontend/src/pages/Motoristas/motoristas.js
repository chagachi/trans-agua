import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Menu from '../../components/Header'
import './motoristas.css'

class Motoristas extends Component {

    constructor(props){
        super(props)
        this.state = {
            moto: [],
            lastPage: '',
            paginate: 1,
            adm: localStorage.getItem('adm'),
        }

        this.next = this.next.bind(this)
        this.back = this.back.bind(this)
        this.unique = this.unique.bind(this)
        this.delete = this.delete.bind(this)
    } 

    async delete(e) {

        const token = localStorage.getItem('token')
        await api.put(`motorista/${e.target.id}`, {
            status: 1
        }, 
        {headers: {'Authorization': `Bearer ${token}`}})

        const moto = await api.get(`motorista`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        this.setState({ moto: moto.data.data })
    }


    async next(){
        const token = localStorage.getItem('token')
        const user = await api.get(`motorista`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${Number(this.state.paginate) + 1}`}})
    
        this.setState( { moto: [].concat(user.data.data), paginate: `${Number(this.state.paginate) + 1}`})
    
    }

     async back(){
        const token = localStorage.getItem('token')
        const user = await api.get(`motorista`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${this.state.paginate - 1}`}})
  
        this.setState( { moto: [].concat(user.data.data), paginate: `${this.state.paginate - 1}`})

     }

     async unique(e){
        const token = localStorage.getItem('token')
        const key = e.target.id
        const user = await api.get(`motorista`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${key}`}})

        this.setState( { moto: [].concat(user.data.data), paginate: key})
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

        return page
    }

    async componentDidMount(){
        const token = localStorage.getItem('token')
        const user = await api.get(`motorista`, 
        {headers: {'Authorization': `Bearer ${token}`}}) 
        console.log(user.data)       
        this.setState({ moto: user.data.data, lastPage: user.data.lastPage})        
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
                        </header>
    
                        <div className='top'></div>
                        <div className='main'>
                                <div className='head'>
                                    <h3>Motoristas Cadastrados</h3>
                                    <Link to='/motoristas/novomotorista'><span>Cadastrar Motorista</span></Link>
                                </div>
    
                                <div className='tabs'>
                                    <span>NOME</span>
                                    <span>TELEFONE</span>
                                    <span>CELULAR</span>
                                </div>
    
                                {this.state.moto.map(post => (
                                    <div className='clientes' key={post.id}>
                                        <span> {post.nome} </span>
                                        <span> {post.telefone} </span>
                                        <span> {post.celular} </span>
                                        <div>
                                            <Link to={{
                                                pathname:'/motoristas/motorista',
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
                                    {this.createPagination(this.state.paginate, this.state.lastPage)}                                
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
                    </header>

                    <div className='top'></div>
                    <div className='main'>
                            <div className='head'>
                                <h3>Motoristas Cadastrados</h3>
                                <Link to='/motoristas/novomotorista'><span>Cadastrar Motorista</span></Link>
                            </div>

                            <div className='tabs'>
                                <span>NOME</span>
                                <span>TELEFONE</span>
                                <span>CELULAR</span>
                            </div>

                            {this.state.moto.map(post => (
                                <div className='clientes' key={post.id}>
                                    <span> {post.nome} </span>
                                    <span> {post.telefone} </span>
                                    <span> {post.celular} </span>
                                    <div>
                                        <Link to={{
                                            pathname:'/motoristas/motorista',
                                            state: {id: post.id}
                                            }}><button className='see'>Ver | Editar</button></Link>
                                    </div>
                                </div>
                            ))}
 
                            
                            <div className='pagination'>
                                {this.createPagination(this.state.paginate, this.state.lastPage)}                                
                            </div>                            
                        </div>
                </div>
            </div>
            </>
        );
    }
}

export default Motoristas;