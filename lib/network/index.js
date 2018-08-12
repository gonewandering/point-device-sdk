const dns = require('dns')

function onNetwork() {
  return new Promise((succ, cat) => {
    dns.lookup('google.com', function(err) {
        if (err && err.code == "ENOTFOUND") {
            cat()
        } else {
            succ()
        }
    })
  })
}

async function tryConnect(ms) {
  ms = ms || 5000

  let connected = false
  let start = (new Date()).getTime()
  let current = (new Date()).getTime()

  while ((current - start) < ms) {
    try {
      await onNetwork()
      connected = true
    catch() {
      await delay(1000)
      connected = false
    }

    current = (new Date()).getTime()

    if (connected) {
      break
    }
  }

  return connected
}

module.exports = {
  connected: tryConnect
}
