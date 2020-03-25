'use strict'

const Pedido = use('App/Models/Pedidosantigos')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pedido
 */
class PedidoController {
  /**
   * Show a list of all pedido.
   * GET pedido
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params}) {

    const pagina = request.header('pagina')
    const empresa = await Database
        .select('empresa', 'id')
        .from('pedidosantigos')
        .orderBy('id', 'desc')
        .paginate(pagina,10)

        return empresa
  }

  /**
   * Create/save a new cadastroempresa.
   * POST pedido
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try{
        // SELECT * FROM cadastroempresas LEFT JOIN pedido ON pedido.codigox = cadastroempresas.id where pedido.id = 187284;
        // .raw("SELECT CAD.id, empresa, cnpj, codigox, valorfixo FROM cadastroempresas CAD LEFT JOIN pedido ON pedido.codigox = CAD.id order by pedido.id desc LIMIT 10")
        if(auth.user.adm == 1) {

          const data = request.only(['id', 'codigox', 'empresa', 'obs', 'datanecessaria', 'localdeentrega', 'datavencimento', 'transportadora', 'motorista', 'placa', 'valorunitario', 'quantidade', 'totalliquido', 'status'])
          const pedido = await Pedido.create(data)
          return pedido
      }
    response.status(300).send({message:'Você não tem privilégios administrativos.'})
    } catch(err){
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
  async show ({ params, request, response, auth }) {
    if (auth.user.adm == 1) {
      const empresa = await Pedido.query().where('id', params.id).first()
      if (!empresa) {
          return response.status(400).send({message: 'Nenhum usuário encontrado.'})
      }
      return empresa
    }

    const empresa = await Cad.query().where('id', auth.user.id).first()
    return empresa
  }

  /**
   * Update pedido details.
   * PUT or PATCH pedido/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    if (auth.user.adm == 1) {

      const {nomefantasia, razaosocial, cnpj, ie, endereco, endereco1, numero, bairro, cidade, estado, telefone1, telefone2, email, site, valorfixo} = request.all()
      const empresa = await Cad.query().where('id', params.id).first()

      if(!empresa){
          return response.status(400).send({message: 'Nenhum registro encontrado.'})
      }

      empresa.nomefantasia = nomefantasia
      empresa.razaosocial = razaosocial
      empresa.cnpj = cnpj
      empresa.ie = ie
      empresa.endereco = endereco
      empresa.endereco1 = endereco1
      empresa.numero = numero
      empresa.bairro = bairro
      empresa.cidade = cidade
      empresa.estado = estado
      empresa.telefone1 = telefone1
      empresa.telefone2 = telefone2
      empresa.email = email
      empresa.site = site
      empresa.valorfixo = valorfixo

      await empresa.save()

      return empresa
    }

    response.status(300).send({message:'Você não tem privilégios administrativos.'})

  }

  /**
   * Delete a pedido with id.
   * DELETE pedido/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {

  }
}

module.exports = PedidoController
