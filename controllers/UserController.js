const {InvalidBody} = require('../errors')
const User = require('../models/User')

module.exports = {

  async all(req,res,next){
    try{
      const users = await User.findAll({attributes:{exclude:['password']}})
      res.json({users})
    }catch(error){ next(error) }
  },


  async register(req,res,next){
    try{
      const {email, name, password} = req.body
      
      if(!email || !name || !password){
        throw new InvalidBody(['email', 'name', 'password'])
      }
  
      const user = await User.create({email,name,password})
      res.json({message: 'User registered!'})
    }catch(error){ next(error) }
  },

  async login(req, res, next){
    try{
      const {email, password} = req.body
      const token = await User.authenticate(email, password)
      res.json({token, email})
    }catch(error){ next(error) }
  },

  me(req, res, next){
    const {name, email} = req.user
    res.json({name, email})
  }
}