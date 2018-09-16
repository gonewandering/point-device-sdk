module.exports = function(res) {
  this.log.send({
    event: 'random',
    value: res.value
  })
}
