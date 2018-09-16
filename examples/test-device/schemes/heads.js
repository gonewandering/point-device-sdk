let hist = {
  n: 0,
  avg: 0
}


module.exports = function(res) {
  var heads = res.value > .5 ? 1 : 0
  hist.avg = ((hist.n * hist.avg) + heads) / (hist.n + 1)
  hist.n++

  this.log.send({
    event: 'heads',
    value: hist.avg
  })
}
