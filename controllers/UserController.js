const {InvalidBody} = require('../errors')
const User = require('../models/User')

module.exports = {
  async register(req,res,next){
    const {email, name, password} = req.body
    
    if(!email || !name || !password){
      throw new InvalidBody(['email', 'name', 'password'])
    }

    const user = await User.create({email,name,password})
    res.json({message: 'User registered!'})
  }
}