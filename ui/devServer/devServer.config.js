const config = {
  // https: true,
  // host: '0.0.0.0',
  // port: 8080,
  port: 8285,
  open: false, // opens browser window automatically
  proxy: {
    '/AdminPanel/api': {
      target: 'http://localhost:8085'
    },
    '/AdminPanel/public_api': {
      target: 'http://localhost:8085'
    },
    '/AdminPanel/i18n': {
      target: 'http://localhost:8085'
    },
    '/AdminPanel/form': {
      target: 'http://localhost:8085'
    },
    '/AuthService': {
      target: 'http://localhost:8085'
    },
    '/AdminPanel/ws': {
      target: 'ws://localhost:8085',
      changeOrigin: true,
      ws: true
    }
  },
  // before: function (app, server) {
  //   require('./core')(app, server)
  // }
}

module.exports = config
