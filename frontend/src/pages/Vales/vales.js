import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Menu from '../../components/Header'
import api from '../../services/api'
import './vales.css'


class Vales extends Component {

    constructor(props){
        super(props)
        this.state = {
            pedido: [],
            lastPage: '',
            paginate: 1,
            adm: localStorage.getItem('adm'),
            busca: '',
            message: '',
        }

        this.delete = this.delete.bind(this)
        this.next = this.next.bind(this)
        this.back = this.back.bind(this)
        this.unique = this.unique.bind(this)
    }

    handleSubmit = async event => {
        event.preventDefault()

        const token = localStorage.getItem('token')
        const busca = await api.post('buscarpedido', {
            id: this.state.busca
        },
        {headers: {'Authorization': `Bearer ${token}`}})
        .then(res => {
            let teste = res.data
            if (teste){
                this.setState({pedido: [].concat(res.data)})
            } else {
                this.setState({message: 'Não existe uma empresa com este nome.'})         
                this.setState({message: ""})         
            }
        })

    }

    async next(){
        const token = localStorage.getItem('token')
        const user = await api.get(`pedido`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${Number(this.state.paginate) + 1}`}})
    
        this.setState( { 
            pedido: [].concat(user.data.data), 
            paginate: `${Number(this.state.paginate) + 1}`})
    
     }
     async back(){
        const token = localStorage.getItem('token')
        const user = await api.get(`pedido`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${this.state.paginate - 1}`}})
  
        this.setState( { 
            pedido: [].concat(user.data.data), 
            paginate: `${this.state.paginate - 1}`
        })

     }

     async unique(e){
        const token = localStorage.getItem('token')
        const key = e.target.id
        const user = await api.get(`pedido`, 
        {headers: {'Authorization': `Bearer ${token}`, pagina: `${key}`}})

        this.setState( { pedido: [].concat(user.data.data), paginate: key})
     }

     createPagination = () => {
        const limite = 2;
        const page = []
        let i
    
        let startPage = (this.state.paginate - limite) > 1 ? 
        this.state.paginate - limite : 
        1;
    
        let endPage = (this.state.paginate + limite) < this.state.lastPage ? 
        Number(Number(this.state.paginate) + Number(limite)) :
        this.state.lastPage;
    
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

        const pedido = await api.get(`pedido`, 
        {headers: {'Authorization': `Bearer ${token}`}})

        this.setState({ pedido: pedido.data.data, lastPage: pedido.data.lastPage })
    }

    async delete(e) {

        const token = localStorage.getItem('token')
            await api.delete(`pedido/${e.target.id}`, 
            {headers: {'Authorization': `Bearer ${token}`}})

            const pedido = await api.get(`pedido`, 
            {headers: {'Authorization': `Bearer ${token}`}})

            this.setState({ pedido: pedido.data.data })
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
                            <span>Painel de Controle ><strong> Vales </strong></span>
                        </header>
    
                        <div className='top'></div>
                        <div className='main'>
                                <div className='head'>
                                    <h3>Últimos Vales Emitidos</h3>
                                    <Link to='/vales/novovale'><span>Novo Vale</span></Link>
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
    
                                <div className='tabs-vales'>
                                    <span>EMPRESA</span>
                                    <span>CNPJ</span>
                                    <span>NÚMERO</span>
                                </div>
    
                                {this.state.pedido.map(post => (
                                    <div className='clientes-vales' key={post.id}>
                                        <span> {post.empresa} </span>
                                        <span> {post.cnpj} </span>
                                        <span> {post.id} </span>
                                        <div>
                                            <Link to={{
                                                pathname:'/vales/vale',
                                                state: {id: post.id},
                                                search: `id=${post.id}`
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
                        <span>Painel de Controle ><strong> Vales </strong></span>
                    </header>

                    <div className='top'></div>
                    <div className='main'>
                            <div className='head'>
                                <h3>Últimos Vales Emitidos</h3>
                                <Link to='/vales/novovale'><span>Novo Vale</span></Link>
                            </div>

                            <div className='tabs-vales'>
                                <span>EMPRESA</span>
                                <span>CNPJ</span>
                                <span>NÚMERO</span>
                            </div>

                            {this.state.pedido.map(post => (
                                <div className='clientes-vales' key={post.id}>
                                    <span> {post.empresa} </span>
                                    <span> {post.cnpj} </span>
                                    <span> {post.id} </span>
                                    <div>
                                        <Link to={{
                                            pathname:'/vales/vale',
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

export default Vales;