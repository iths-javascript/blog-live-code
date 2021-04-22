const { InvalidBody, PostNotFound } = require("../errors")
const Post = require("../models/Post")

function parseQuery(query){
  const page = +query.page || 1
  let pageSize = +query.pageSize || 10
  pageSize = pageSize > 10 ? 10 : pageSize
  pageSize = pageSize < 1 ? 1 : pageSize
  return {page, pageSize}
}

module.exports = {
  async create(req, res, next){
    try{
      const {title, content} = req.body
      if(!title || !content){ throw new InvalidBody(['title','content']) }
      const UserId = req.user.id
      const post = await Post.create({title, content, UserId})
      res.json({post})
    }catch(error){ next(error) }
  },

  async getAll(req, res, next){
    const {page,pageSize} = parseQuery(req.query)
    const UserId = req.user.id
    const posts = await Post.findAll({
      limit: pageSize,
      offset: (page-1)*pageSize,
      where: { UserId }
    })
    res.json({posts})
  },

  async getAllByUser(req, res, next){
    const {page,pageSize} = parseQuery(req.query)
    const UserId = req.params.id
    const posts = await Post.findAll({
      limit: pageSize,
      offset: (page-1)*pageSize,
      where: { UserId }
    })
    res.json({posts})
  },

  async getOne(req, res, next){
    const {id} = req.params
    const post = await Post.findOne({where:{id}})
    if(!post){ throw new PostNotFound(id) }
    
    res.json({post})
  }
}