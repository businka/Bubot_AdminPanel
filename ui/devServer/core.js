let data = {
  Catalog: {
    OcfDriver: require('./Catalog.OcfDriver'),
    OcfSchema: require('./Catalog.OcfSchema')
  }
}

function sleep (ms) {
  const now = new Date().getTime();
  while (new Date().getTime() < now + ms) { /* do nothing */
  }
}

module.exports = function (app) {
  app.get('/api/Catalog/User/navigation', function (req, res) {
    res.json(require('./catalog.user.navigation'))
  })
  app.get('/form/:objType/:objName/:objForm', function (req, res) {
    sleep(1000)
    if (!Object.prototype.hasOwnProperty.call(data, req.params.objType)) {
      res.status(400).send(`not supported objType - ${req.params.objType}`)
      return
    }
    if (!Object.prototype.hasOwnProperty.call(data[req.params.objType], req.params.objName)) {
      res.status(400).send(`not supported objName - ${req.params.objType}.${req.params.objName}`)
      return
    }
    if (!Object.prototype.hasOwnProperty.call(data[req.params.objType][req.params.objName].Form, req.params.objForm)) {
      res.status(400).send(`not supported objForm - ${req.params.objType}.${req.params.objName}.${req.params.objForm}`)
      return
    }
    let _res = Object.assign(data[req.params.objType][req.params.objName].Form[req.params.objForm], req.params)
    res.json(_res)
  })
  app.get('/api/:objType/:objName/query', function (req, res) {
    sleep(1000)
    res.json({ result: { rows: data[req.params.objType][req.params.objName].Data } })
  })
  app.get('/api/:objType/:objName/read', function (req, res) {
    let result = {}
    let id = req.query.id
    if (!id) {
      res.json(result)
      return
    }
    let _data = data[req.params.objType][req.params.objName].Data
    for (let i = 0; i < _data.length; i++) {
      if (_data[i].id === id) {
        res.json({ result: _data[i] })
        return
      }
    }
    res.json(result)
  })
}
