let h = {
  n: 0,
  last: 0,
  avg: 0
}


module.exports = function(res) {
  var now = (new Date()).getTime()

  if (h.last !== 0) {
    let int = now - h.last

    this.log.send({
      event: 'interval',
      value: int
    })
  }
  
  h.last = now
}
