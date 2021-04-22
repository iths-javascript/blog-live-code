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

module.exports = {
  BlogError,
  InvalidBody,
  InvalidCredentials
}