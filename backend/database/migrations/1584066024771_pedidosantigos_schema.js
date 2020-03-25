'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidosantigosSchema extends Schema {
  up () {
    this.table('pedidosantigos', (table) => {
      table.increments()
      table.string('codigox', 255)
      table.string('empresa', 255)
      table.string('obs', 255)
      table.string('datanecessaria', 255)
      table.string('localdeentrega', 255)
      table.string('datavencimento', 255)
      table.string('transportadora', 255)
      table.string('motorista', 255)
      table.string('placa', 255)
      table.string('valorunitario', 255)
      table.string('quantidade', 255)
      table.string('totalliquido', 255)
      table.string('status', 1)
    })
  }

  down () {
    this.table('pedidosantigos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = PedidosantigosSchema
