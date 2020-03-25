import React, { Component } from 'react';
import api from '../../services/api'
import logo from '../../assets/logo.png'
import './login.css'

class Login extends Component {

    state = {
        username: '',
        password: '',
        token: localStorage.getItem('token'),
    }

    componentDidMount() {
        if(this.state.token){
            this.props.history.push('/dashboard')
        }
    }
    
    handleSubmit = async event => {
        event.preventDefault()               
        
        const login = await api.post(`login`, {
            username: this.state.username, 
            password: this.state.password
        })
        .then(res => {
            return res.data.token
        })
        .then(token => {
            localStorage.setItem('token', token)
            this.props.history.push('/dashboard')
            return
        })
        .catch(e => console.log(e))
    }

    render() {
        return(
            <>
            <div className='back'>
                <div className='container'>
                    <div className='left'>
                        <img src={logo} alt='Trans Agua' />
                        <h2>BEM VINDO!</h2>
                        <p >Digite seu Usuário e Senha para entrar.</p>
                    </div>

                    <div className='right'>
                        <h2>ENTRE</h2>
                        <span>PARA ACESSAR O SISTEMA</span>
                        <form onSubmit={this.handleSubmit}>
                            <label> Usuário </label>
                            <input 
                            type='text' 
                            id='username' 
                            name='username' 
                            onChange={e => this.setState({username: e.target.value})}
                            value={this.state.username} 
                            />
                            
                            <label> Senha </label>
                            <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            onChange={e => this.setState({password: e.target.value})} 
                            value={this.state.password}
                            />
                                                      
                            <input type='submit' value='Entrar' />
                        </form>
                        <a>Esqueci minha senha.</a>
                        <span>© 2020 Cherry Tech</span>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Login;