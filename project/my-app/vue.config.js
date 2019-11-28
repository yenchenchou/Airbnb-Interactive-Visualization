module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '~yenchenc/project/dist' //production path
    : '/' //development path
  }
