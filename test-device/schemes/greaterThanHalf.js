module.exports = function(res) {
  if (res.value > .5) {
    console.log('Greater than Half')
    
    this.log.send({
      event: 'test',
      value: res.value
    })
  }
}
