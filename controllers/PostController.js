const { InvalidBody, PostNotFound, Unauthorized } = require("../errors")
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
  },

  async update(req, res, next){
    try{
      const {id} = req.params
      const {title, content} = req.body
      const fields = {}
      if(title) fields.title = title
      if(content) fields.content = content
      
      const post = await Post.findOne({where:{id}})
      if(!post){ throw new PostNotFound(id) }
      if(post.UserId != req.user.id){ throw new Unauthorized() }

      await Post.update(fields, {where: {id}})    
      res.json({message: 'Post updated'})
    }catch(error){ next(error) }
  },

  async delete(req, res, next){
    try{
      const {id} = req.params
      const post = await Post.findOne({where:{id}})
      if(post.UserId != req.user.id){ throw new Unauthorized() }
      
      await post.destroy()
      res.json({message: 'Post annihilated!'})
    }catch(error){ next(error) }
  }


}