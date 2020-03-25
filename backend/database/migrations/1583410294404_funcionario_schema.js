'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FuncionarioSchema extends Schema {
  up () {
    this.create('funcionarios', (table) => {
      table.increments()
      table.string('nome', 100).notNullable()
      table.string('telefone', 100)
      table.string('celular', 100)
      table.string('status', 2).notNullable().defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('funcionarios')
  }
}

module.exports = FuncionarioSchema
