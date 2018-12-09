const fs = require('mz/fs')

module.exports = async () => {
  let fname = `${ __dirname }/device.json`
  let fse = await fs.exists(fname)
  let file = null

  if (fse) {
    file = await fs.readFile(fname)
  }

  this._config = JSON.parse(file)
  return this._config.mid
}
