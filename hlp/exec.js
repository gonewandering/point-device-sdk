var cp = require('child_process')

module.exports = function (cmd) {
  return new Promise((succ, cat) => {
    cp.exec(cmd, (err, stout, sterr) => {
      if (err) { return cat(err, stout, sterr) }
      return succ(stout, sterr)
    })
  })
}
