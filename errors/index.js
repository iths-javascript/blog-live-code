class BlogError extends Error{}

class InvalidBody extends BlogError{
  constructor(fields){
    super()
    this.fields = fields
    this.message = `Invalid body, required field: ${this.fields.join(", ")}`
    this.errorCode = 400
  }
}
class InvalidCredentials extends BlogError{
  constructor(){
    super()    
    this.message = `Invalid credentials`
    this.errorCode = 403
  }
}
class Unauthorized extends BlogError{
  constructor(){
    super()    
    this.message = `Unauthorized`
    this.errorCode = 401
  }
}
class TokenExpired extends BlogError{
  constructor(){
    super()    
    this.message = `Token expired, please log in again`
    this.errorCode = 401
  }
}

class PostNotFound extends BlogError{
  constructor(id){
    super()
    this.message = `Post with id ${id} not found`
    this.errorCode = 404
  }
}

module.exports = {
  BlogError,
  InvalidBody,
  InvalidCredentials,
  Unauthorized,
  TokenExpired,
  PostNotFound
}