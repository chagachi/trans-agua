'use strict'

const mysqldump = require('mysqldump');
const moment = require('moment')

require('dotenv').config()

const  makeBackupFromDatabaseSQL = async () => {    
    try {
        const time = moment().format('YYYY-MM-DD[T]HH-mm-ss')
        console.log('Iniciando backup do banco de dados')

        const connection = {
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'transagua',
            port: process.env.DB_PORT,
        }

        const fileName = `./app/backups-SQL/backupSQL-${time}.sql`
        const result = await mysqldump({
            connection,
            dumpToFile: fileName,
        });

        if (!result) throw Error(`Falha ao realizar backup sql - ${time}`)

        console.log(`Backup Realizado com sucesso: ${fileName} - ${time}`)

    } catch (error) {
        console.error(error)
    }    
}

module.exports = makeBackupFromDatabaseSQL