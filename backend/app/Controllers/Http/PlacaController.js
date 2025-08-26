'use strict'

const Placa = use('App/Models/Placa')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with placas
 */
class PlacaController {
  /**
   * Show a list of all placas.
   * GET placas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const pagina = request.header('pagina')
        const user = await Database
        .select()
        .from('placas')
        .paginate(pagina,100)

        return user
  }

  /**
   * Render a form to be used for creating a new placa.
   * GET placas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new placa.
   * POST placas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try{
        const data = request.only(["placas"])

        const user = await Placa.create(data)

        return data

      } catch(err){
        return response.status(500).send({ error: `Erro: ${err.message}` })
      }
  }

  /**
   * Display a single placa.
   * GET placas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing placa.
   * GET placas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update placa details.
   * PUT or PATCH placas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a placa with id.
   * DELETE placas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const pedido = await Database.table('placas').where('id', params.id).delete()
    if (!pedido) {
      return response.status(400).send({message: 'Nenhum registro encontrado.'})
    }
    return pedido
  }
}

module.exports = PlacaController
