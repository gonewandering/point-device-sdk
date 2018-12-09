const mid = require('node-machine-id')
const sh = require('short-hash')

module.exports = () => {
  let mid_raw = mid.machineIdSync()
  return sh(mid_raw)
}
