export const secret = process.env.SECRET || 'Flynn is flying'
export const port = process.env.PORT || 4000
export const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/sei-project-three'

module.exports = {
  dbURI,
  port,
  secret
}