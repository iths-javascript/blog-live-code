const db = require('../database/connection')
const {DataTypes} = require('sequelize')
const User = require('./User')

const Post = db.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false    
  },

})

User.hasMany( Post )
Post.belongsTo( User )

module.exports = Post