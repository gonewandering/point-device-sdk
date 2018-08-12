const fs = require('mz/fs')
const _ = require('underscore')
const command = require('../command')

class Config {
  constructor() {
    this.fname = './device.json'
    this.comm = command
    this._config = {}
    this.handlers = []

    this.read()
  }

  get this() {
    return this._config
  }

  async read() {
    let file = '{}'
    let fse = await fs.exists(this.fname)

    if (fse) {
      file = await fs.readFile(this.fname)
    } else {
      await this.set({})
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
