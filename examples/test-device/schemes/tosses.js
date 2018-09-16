let hist = {
  n: 0
}

module.exports = function(res) {
  hist.n++

  this.log.send({
    event: 'tosses',
    value: hist.n
  })
}
