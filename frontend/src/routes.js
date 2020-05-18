import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from './auth'

import Login from './pages/Login/login'
import Dash from './pages/Dashboard/dashboard'
import Clientes from './pages/Clientes/clientes'
import Relatorios from './pages/Relatorios/relatorios'
import ImprimirRelatorios from './pages/Relatorios/imprimirRelatorio'
import Cli from './pages/Clientes/cli'
import Vales from './pages/Vales/vales'
import Vale from './pages/Vales/vale'
import ValesAntigos from './pages/ValesAntigos/valesantigos'
import Antigos from './pages/ValesAntigos/antigos'
import Impressao from './pages/Impressao/impressão'
import Motoristas from './pages/Motoristas/motoristas'
import Moto from './pages/Motoristas/moto'
import NovoCliente from './pages/Cadastros/NovoCliente/novocliente'
import NovoVale from './pages/Cadastros/NovoVale/novovale'
import NovoMotorista from './pages/Cadastros/NovoMotorista/novomotorista'
import Logout from './pages/logout'

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/logout" exact component={Logout}/>
                <PrivateRoute path="/dashboard" exact component={Dash}/>
                <PrivateRoute path="/relatorios" exact component={Relatorios}/>
                <PrivateRoute path="/imprimir" exact component={ImprimirRelatorios}/>
                <PrivateRoute path="/clientes" exact component={Clientes}/>
                <PrivateRoute path="/clientes/cliente" exact component={Cli}/>
                <PrivateRoute path="/clientes/novocliente" component={NovoCliente}/>
                <PrivateRoute path="/valesantigos" exact component={ValesAntigos}/>
                <PrivateRoute path="/valesantigos/vale" exact component={Antigos}/>
                <PrivateRoute path="/vales" exact component={Vales}/>
                <PrivateRoute path="/vales/vale" exact component={Vale}/>
                <PrivateRoute path="/vales/novovale" component={NovoVale}/>
                <PrivateRoute path="/impressao" component={Impressao}/>
                <PrivateRoute path="/motoristas" exact component={Motoristas}/>
                <PrivateRoute path="/motoristas/motorista" exact component={Moto}/>
                <PrivateRoute path="/motoristas/novomotorista" component={NovoMotorista}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes