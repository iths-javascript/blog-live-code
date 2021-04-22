const {Sequelize} = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/blog.db'
})

module.exports = db