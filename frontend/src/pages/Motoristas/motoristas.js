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
        }

        this.next = this.next.bind(this)
        this.back = this.back.bind(this)
        this.unique = this.unique.bind(this)
        this.delete = this.delete.bind(this)
    } 

    async delete(e) {

        const token = localStorage.getItem('token')
        const remove = await api.put(`motorista/${e.target.id}`, {
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
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${this.state.paginate + 1}`}})
  
        this.setState( { moto: [].concat(user.data.data), paginate: `${this.state.paginate + 1}`})
        console.log(this.state.paginate)

     }
     async back(){
        const token = localStorage.getItem('token')
        const user = await api.get(`motorista`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${this.state.paginate - 1}`}})
  
        this.setState( { moto: [].concat(user.data.data), paginate: `${this.state.paginate - 1}`})
        console.log(this.state.paginate)

     }

     async unique(e){
        const token = localStorage.getItem('token')
        const key = e.target.id
        const user = await api.get(`motorista`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${key}`}})

        this.setState( { moto: [].concat(user.data.data), paginate: key})
        console.log(this.state.paginate)
     }

    createPagination = (page, lastPage) => {
        var paginacao = [];        
        let startPage = 1;
        let endPage = lastPage;        
        // -- Base -- //
        
        //  |»   ░   «|
        // 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6

        if (lastPage <= 5) {
            endPage = lastPage;
        }
        
        if (lastPage > 5) {
            if (page <= 5) {
                endPage = (lastPage <= page + 2) ? lastPage : 5;
            }            
        }
        if (page <= 3) {
            endPage = (lastPage <= 5) ? lastPage : 5;            
        }
        
        if (page === 4 ) {  
            if (lastPage <= 5) {
                endPage = lastPage
            } else {
                startPage = page - 2;
                endPage = page + 2;
            }
        }

        if (page === 5) {
            endPage = (lastPage <= page + 2) ? lastPage : page + 2;          
        }       
        
        if (page >= 5) {
            startPage = page - 2;
            endPage = (lastPage <= page + 2) ? lastPage : page + 2;             
        }        

        if (page >= 6) {
            startPage = page - 2;
            endPage = (lastPage <= page + 2) ? lastPage : page + 2;             
        }

        if ((page >= 5) && (page === lastPage)) {
            startPage = lastPage - 5;
            endPage = lastPage;
        }

        if ((page >= 5) && (page >= lastPage - 2)) {
            startPage = lastPage - 4;
            endPage = lastPage;
        }        

        
        if (page > 1) { paginacao.push(<span onClick={this.back}>«</span>) }
        for (let i = startPage ; i <= endPage; i++) {
            paginacao.push(<p prop={`${i}`} id={`${i}`} onClick={this.unique}>{i}</p>) 
        }           
        if (page <= lastPage - 3) { paginacao.push(<span onClick={this.next}>»</span>) }
        

        return paginacao
    }

    async componentDidMount(){
        const token = localStorage.getItem('token')
        const user = await api.get(`motorista`, 
        {headers: {'Authorization': `Bearer ${token}`}}) 
        console.log(user.data)       
        this.setState({ moto: user.data.data, lastPage: user.data.lastPage})        
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
}

export default Motoristas;