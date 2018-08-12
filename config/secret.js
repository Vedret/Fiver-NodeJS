module.exports = {

  database: process.env.DATABASE || 'mongodb://user:password@ds217092.mlab.com:17092/dbname',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'abc123',

}
