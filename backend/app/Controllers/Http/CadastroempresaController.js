'use strict'

const Cad = use('App/Models/Cadastroempresa')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cadastroempresas
 */
class CadastroempresaController {
  /**
   * Show a list of all cadastroempresas.
   * GET cadastroempresas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params}) {

    const pagina = request.header('pagina')
    const empresa = await Database
        .select('id', 'nomefantasia', 'cnpj')
        .from('cadastroempresas')
        .orderBy('nomefantasia', 'asc')
        .paginate(pagina,10)

        return empresa
  }

  /**
   * Create/save a new cadastroempresa.
   * POST cadastroempresas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try{
      if(auth.user.adm == 1) {
          const data = request.only(['nomefantasia', 'razaosocial', 'cnpj', 'ie', 'endereco', 'endereco1', 'numero', 'bairro', 'cidade', 'estado', 'telefone1', 'telefone2', 'email', 'site', 'valorfixo'])
          const user = await Cad.create(data)
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
  async show ({ params, request, response }) {
      const empresa = await Cad.query().where('id', params.id).first()
      if (!empresa) {
          return response.status(400).send({message: 'Nenhum usuário encontrado.'})
      }
      return empresa
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

      const {
        nomefantasia,
        razaosocial,
        cnpj,
        ie,
        endereco,
        endereco1,
        numero,
        bairro,
        cidade,
        estado,
        telefone1,
        telefone2,
        email,
        site,
        valorfixo
      } = request.all()
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
   * Delete a cadastroempresa with id.
   * DELETE cadastroempresas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    if (auth.user.adm == 1) {
      const empresa = await Database.table('cadastroempresas').where('id', params.id).delete()
      if (!empresa) {
        return response.status(400).send({message: 'Nenhum registro encontrado.'})
      }
      return empresa
    }
    return response.status(300).send({message:'Você não tem privilégios administrativos.'})
  }

  async list ({ params, request, response, auth }){

    const empresa = await Database
    .select('id', 'nomefantasia', 'cnpj', 'endereco', 'valorFixo')
    .from('cadastroempresas')
    .orderBy('nomefantasia', 'asc')

    return empresa

  }

  async searchCNPJ ({ params, request, response, auth }){

    const { cnpj } = request.all()
    const empresa = await Database
    .select('id', 'nomefantasia', 'cnpj', 'endereco', 'valorFixo')
    .from('cadastroempresas')
    .where('cnpj', cnpj)

    return empresa

  }

  async searchNome ({ params, request, response, auth }){

    const { nome } = request.all()
    const empresa = await Database
    .select('id', 'nomefantasia', 'cnpj', 'endereco', 'valorFixo')
    .from('cadastroempresas')
    .where('nomefantasia', 'LIKE', '%'+nome+'%')

    return empresa

  }
}


module.exports = CadastroempresaController
