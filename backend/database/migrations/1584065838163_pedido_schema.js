'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PedidoSchema extends Schema {
  up () {
    this.create('pedidos', (table) => {
      table.increments()
      // Empresa
      table.integer('idEmpresa', 11)
      table.string('empresa', 255)
      table.string('cnpj', 255)
      //Motorista
      table.string('idMotorista', 255)
      table.string('motorista', 255)
      table.string('placa', 255)
      //Localização
      table.string('localEntrega', 255)
      //Valores
      table.string('valorUnitario', 255)
      table.string('quantidadeCarga', 255)
      table.string('totalLiquido', 255)
      //Misc
      table.string('observacao', 255)
      table.integer('status', 11)
      table.integer('cron', 1)
      //Datas
      table.timestamps()
    })
  }

  down () {
    this.drop('pedidos')
  }
}

module.exports = PedidoSchema
