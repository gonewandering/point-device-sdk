const actions = [
  'config',
  'off',
  'on',
  'pause',
  'restart',
  'track',
  'update',
  'info'
]

const Actions = class {
  constructor(dev) {
    actions.forEach(a => {
      this[a] = require(`./actions/${a}`).bind(dev)
    })
  }
}

module.exports = Actions
