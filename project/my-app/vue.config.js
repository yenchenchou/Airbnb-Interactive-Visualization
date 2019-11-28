module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/project/my-app/'  //production path
    : '/'  //development path
}