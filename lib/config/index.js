const fs = require('mz/fs')
const _ = require('underscore')
const command = require('../command')

class Config {
  constructor() {
    this.fname = './device.json'
    this.comm = command
    this._config = {}
    this.handlers = []

    this.read().then(() => {
      command.on('update-config', this.update.bind(this))
    })
  }

  async read() {
    let file = ''
    let fse = await fs.exists(this.fname)

    if (fse) {
      file = await fs.readFile(this.fname)
    } else {
      file = "{}"
      await this.set({})
    }

    this._config = JSON.parse(file)
  }

  async set(data) {
    this._config = _.extend({}, this._config, data)
    await fs.writeFile(this.fname, JSON.stringify(this._config, null, true))
  }

  async update(msg) {
    await this.set(msg.config)

    this.handlers.forEach(d => {
      d(this._config)
    })
  }

  onUpdate(hndlr) {
    this.handlers.push(hndlr)
  }

  get(attr) {
    return this._config[attr]
  }
}

module.exports = new Config()
