'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlacasSchema extends Schema {
  up () {
    this.create('placas', (table) => {
      table.increments()
      table.string('placa', 255)
    })
  }

  down () {
    this.drop('placas')
  }
}

module.exports = PlacasSchema
