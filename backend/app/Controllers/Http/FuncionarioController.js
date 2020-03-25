'use strict'

const Func = use('App/Models/Funcionario')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with funcionarios
 */
class FuncionarioController {
  /**
   * Show a list of all funcionarios.
   * GET funcionarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params, auth }) {

        const pagina = request.header('pagina')
        const user = await Database
        .select('id', 'nome', 'telefone', 'celular')
        .from('funcionarios')
        .where('status', 0)
        .orderBy('nome', 'asc')
        .paginate(pagina,10)

        return user
  }

  async list ({ request, response, params }) {
        const user = await Database.select('id', 'nome').from('funcionarios').where('status', 0)

        return user
  }

  /**
   * Create/save a new funcionario.
   * POST funcionarios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
      try{

        if(auth.user.adm == 1) {

            const data = request.only(["nome", "telefone", "celular"])

            const user = await Func.create(data)

            return user

    }

    response.status(300).send({message:'Você não tem privilégios administrativos.'})


    } catch(err){
        return response.status(500).send({ error: `Erro: ${err.message}` })
    }
  }

  /**
   * Display a single funcionario.
   * GET funcionarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, }) {
    const user = await Func
    .query()
    .where('id', params.id)
    .select('id', 'nome', 'telefone', 'celular')
    .first()

      if(!user){
          return response.status(400).send({message: 'Nenhum usuário encontrado.'})
      }

      return user
  }

  /**
   * Update funcionario details.
   * PUT or PATCH funcionarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    if(auth.user.adm == 1){
      const {nome, telefone, celular, status} = request.all()
      const user = await Func.query().where('id', params.id).first()

      if(!user){
          return response.status(400).send({message: 'Nenhum registro encontrado.'})
      }

      user.nome = nome
      user.telefone = telefone
      user.celular = celular
      user.status = status

      await user.save()

      return user
    }

    response.status(300).send({message:'Você não tem privilégios administrativos.'})

  }

  /**
   * Delete a funcionario with id.
   * DELETE funcionarios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FuncionarioController
