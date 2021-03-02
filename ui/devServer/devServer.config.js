const config = {
  // https: true,
  // host: '0.0.0.0',
  // port: 8080,
  port: 8080,
  open: false, // opens browser window automatically
  proxy: {
    '/ui/AuthService': {
      target: 'http://localhost'
    },
    '/api': {
      target: 'http://localhost'
    },
    '/i18n': {
      target: 'http://localhost'
    },
    '/form': {
      target: 'http://localhost'
    },
    '/ws': {
      target: 'ws://localhost',
      changeOrigin: true,
      ws: true
    }
  },
  // before: function (app, server) {
  //   require('./core')(app, server)
  // }
}

module.exports = config
