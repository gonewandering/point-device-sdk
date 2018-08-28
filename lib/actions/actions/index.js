let actions = [
  'config',
  'off',
  'on',
  'pause',
  'restart',
  'track',
  'update'
]

module.exports = actions.map(a => {
  return require(`./${a}`)
})
