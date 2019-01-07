module.exports = {

  database: process.env.DATABASE || 'mongodb://username:password@ds217092.mlab.com:17092/fiverr',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'abc123',

}
