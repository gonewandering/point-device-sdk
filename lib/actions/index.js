const actions = [
  'config',
  'off',
  'on',
  'pause',
  'restart',
  'track',
  'update'
]

const Actions = class {
  constructor(dev) {
    actions.forEach(a => {
      this[a] = require(`./${a}`).bind(dev)
    })
  }
}

module.exports = Actions
