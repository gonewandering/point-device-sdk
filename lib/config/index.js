const fs = require('mz/fs')
const _ = require('underscore')
const command = require('../command')

class Config {
  constructor() {
    this.fname = __dirname + '/device.json'
    console.log(this.fname)

    this.comm = command
    this._config = {}
    this.handlers = []
  }

  get this() {
    return this._config
  }

  async init() {
    return this.read.bind(this)()
  }

  async read() {
    let file = '{}'
    let fse = await fs.exists(this.fname)

    if (fse) {
      file = await fs.readFile(this.fname)
    }

    this._config = JSON.parse(file)
  }

  async set(attr, value) {
    let data = {}

    if (_.isObject(attr) && !value) {
      data = attr
    } else {
      data[value] = attr
    }

    this._config = _.extend({}, this._config, data)

    await fs.writeFile(this.fname, JSON.stringify(this._config, null, true))
  }

  get(attr) {
    return this._config[attr] || undefined
  }
}

module.exports = Config
