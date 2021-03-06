const fs = require('mz/fs')
const _ = require('underscore')
const command = require('../command')

class Config {
  constructor(configPath) {
    this.fname = configPath || `${ __dirname }/device.json`

    this.comm = command
    this._config = {}
    this.handlers = []
  }

  get this() {
    return this._config
  }

  async init() {
    return await this.read.bind(this)()
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
    let confStr = null

    if (_.isObject(attr) && !value) {
      data = attr
    } else {
      data[attr] = value
    }

    await this.read.bind(this)()

    this._config = _.extend({}, this._config, data)
    
    confStr = JSON.stringify(this._config, null, 4)

    await fs.writeFile(this.fname, confStr)
  }

  get(attr) {
    if (!attr) {
      return this._config
    }

    return this._config[attr] || undefined
  }
}

module.exports = Config
