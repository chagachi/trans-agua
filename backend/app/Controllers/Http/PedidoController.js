'use strict'

const Pedido = use('App/Models/Pedido')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with Pedido
 */
class PedidoController {
  /**
   * Show a list of all Pedido.
   * GET Pedido
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params}) {

    const pagina = request.header('pagina')
    const empresa = await Database
        .select('id','empresa','cnpj')
        .from('pedidos')
        .orderBy('id', 'desc')
        .paginate(pagina,10)

        return empresa
  }

  // async alteracaoValor ({ request, response, params}) {
  //   const { startDate, finalDate, nomeEmpresa } = request.all()

  //   const pedidos = await Database
  //     .select('id', 'valorUnitario', 'quantidadeCarga', 'totalLiquido')
  //     .from('pedidos')
  //     .whereBetween('created_at', [startDate, finalDate])
  //     .where('empresa', nomeEmpresa)
  //     .orderBy('id', 'desc')

  //   const novoValor = await Database
  //     .select('valorfixo')
  //     .from('cadastroempresas')
  //     .where('nomefantasia', nomeEmpresa)

  //   await pedidos.map(async (item) => {
  //     const valorUnitario = novoValor;
  //     const quantidadeCarga = item.quantidadeCarga;
  //     const totalLiquido = novoValor * pedido.quantidadeCarga;

  //     const sql = `UPDATE 'pedidos'
  //     SET 
  //       totalLiquido = ${totalLiquido},
  //       valorUnitario = ${novoValor}
  //     WHERE empresa = ${item.empresa}`

  //     // `UPDATE 'pedidos'
  //     // SET 
  //     //   totalLiquido = ?,
  //     //   valorUnitario = ?
  //     // WHERE empresa = ?`

  //     await Database
  //     .raw(sql)
  //     // .raw('select * from users where username = ?', [totalLiquido,valorUnitario,item.empresa])

  //     // await pedido.save()
  //     return 'test'
  //   });

  //   return pedidos
  // }

  async range ({ request, response, params, auth}) {

    const { startDate, finalDate, motorista, nomeEmpresa } = request.all()

    if(motorista == null && nomeEmpresa == null){
      const empresa = await Database
        .select('id','empresa','cnpj', 'motorista', 'created_at', 'placa', 'quantidadeCarga', 'totalLiquido', 'observacao')
        .from('pedidos')
        .whereBetween('created_at', [startDate, finalDate])
        .orderBy('id', 'desc')

        return empresa
    }

    if (motorista != null && nomeEmpresa == null){

      const empresa = await Database
        .select('id','empresa','cnpj', 'motorista', 'created_at', 'placa', 'quantidadeCarga', 'totalLiquido', 'observacao')
        .from('pedidos')
        .whereBetween('created_at', [startDate, finalDate])
        .where('motorista', motorista)
        .orderBy('id', 'desc')

        return empresa

    }

    if (motorista == null && nomeEmpresa != null){

      const empresa = await Database
      .select('id','empresa','cnpj', 'motorista', 'created_at', 'placa', 'quantidadeCarga', 'totalLiquido', 'observacao')
      .from('pedidos')
      .whereBetween('created_at', [startDate, finalDate])
      .where('empresa', nomeEmpresa)
      .orderBy('id', 'desc')

      return empresa

    }

    const empresa = await Database
        .select('id','empresa','cnpj', 'motorista', 'created_at', 'placa', 'quantidadeCarga', 'totalLiquido', 'observacao')
        .from('pedidos')
        .whereBetween('created_at', [startDate, finalDate])
        .where('motorista', motorista)
        .where('empresa', nomeEmpresa)
        .orderBy('id', 'desc')

    return empresa

  }

  /**
   * Create/save a new cadastroempresa.
   * POST Pedido
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
        const data = request.only(
          [
            'idEmpresa', 'empresa', 'cnpj',
            'idMotorista', 'motorista', 'placa',
            'localEntrega', 'valorUnitario', 'quantidadeCarga',
            'totalLiquido', 'observacao', 'status', 'cron'
          ])

        const pedido = await Pedido.create(data)

        return pedido
    } catch(err) {
        return response.status(500).send({ error: `Erro: ${err.message}` })
    }
  }

  /**
   * Display a single funcionario.
   * GET pedido/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {

    const pedido = await Pedido.query().where('id', params.id).first()

    if (!pedido) {
      return response.status(400).send({message: 'Nenhum registro encontrado.'})
    }

    return pedido
  }

  /**
   * Update pedido details.
   * PUT or PATCH pedido/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response}) {

    const pedido = await Pedido.query().where('id', params.id).first()

    if (!pedido) {
        return response.status(400).send({message: 'Nenhum registro encontrado.'})
    }

    const {
      idEmpresa, empresa, cnpj,
      idMotorista, motorista, placa,
      localEntrega, valorUnitario, quantidadeCarga,
      totalLiquido, observacao, status, create
    } = request.all()

    pedido.idEmpresa = idEmpresa
    pedido.empresa = empresa
    pedido.cnpj = cnpj
    pedido.idMotorista = idMotorista
    pedido.motorista = motorista
    pedido.placa = placa
    pedido.localEntrega = localEntrega
    pedido.valorUnitario = valorUnitario
    pedido.quantidadeCarga = quantidadeCarga
    pedido.totalLiquido = totalLiquido
    pedido.observacao = observacao
    pedido.status = status
    pedido.created_at = create

    await pedido.save()

    return pedido
  }

  /**
   * Delete a pedido with id.
   * DELETE pedido/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth })
  {
    if (auth.user.adm == 1) {
      const pedido = await Database.table('pedidos').where('id', params.id).delete()
      if (!pedido) {
        return response.status(400).send({message: 'Nenhum registro encontrado.'})
      }
      return pedido
    }
    return response.status(300).send({message:'Você não tem privilégios administrativos.'})
  }

  async buscaPedido ({ params, request, response, auth })
  {
    const { id } = request.all()
    const pedido = await Database
    .select()
    .from('pedidos')
    .where('id', id)

    return pedido
  }
}

module.exports = PedidoController
