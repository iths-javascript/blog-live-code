const db = require('../database/connection')
const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {InvalidCredentials} = require('../errors')

const User = db.define('User', {
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email already exists!'
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

User.beforeCreate( (user, options) => {
  user.password = bcrypt.hashSync(user.password, 10)
})


User.authenticate = async (email, password) => {
  const user = await User.findOne({where: {email}})
  if(!user){ throw new InvalidCredentials() }

  const passwordMatch = bcrypt.compareSync(password, user.password)
  if(passwordMatch){
    const payload = {id: user.id, name: user.name, email: user.email}
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1w'})
  }else{
    throw new InvalidCredentials()
  }

}


module.exports = User