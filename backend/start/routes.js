'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.post('/login', 'UserController.login')
Route.resource('user', 'UserController').apiOnly().middleware('auth')
Route.resource('motorista', 'FuncionarioController').apiOnly().middleware('auth')
Route.resource('empresa', 'CadastroempresaController').apiOnly().middleware('auth')
Route.resource('pedido', 'PedidoController').apiOnly().middleware('auth')
Route.resource('pedidosantigos', 'PedidosantigosController').apiOnly().middleware('auth')
Route.resource('placas', 'PlacaControler')

Route.post('relatorio', 'PedidoController.range').middleware('auth')
Route.get('/listarempresas', 'CadastroempresaController.list').middleware('auth')
Route.post('/buscarcnpj', 'CadastroempresaController.searchCNPJ').middleware('auth')
Route.post('/buscarnome', 'CadastroempresaController.searchNome').middleware('auth')
Route.get('/listarmotoristas', 'FuncionarioController.list').middleware('auth')
Route.post('/buscarpedido', 'pedidoController.buscaPedido')
Route.post('/alterarpedidos', 'pedidoController.alteracaoValor')
