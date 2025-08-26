'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CadastroempresaSchema extends Schema {
  up () {
    this.create('cadastroempresa', (table) => {
      table.increments()
      table.string('nomefantasia', 255)
      table.string('razaosocial', 255)
      table.string('cnpj', 255)
      table.string('ie', 255)
      table.string('endereco', 255)
      table.string('endereco1', 255)
      table.string('numero', 11)
      table.string('bairro', 255)
      table.string('cidade', 255)
      table.string('estado', 2)
      table.string('telefone1', 255)
      table.string('telefone2', 255)
      table.string('email', 255)
      table.string('site', 255)
      table.string('valorfixo')
      table.string('valorretirada')
      table.timestamps()
    })
  }

  down () {
    this.drop('cadastroempresa')
  }
}

module.exports = CadastroempresaSchema
