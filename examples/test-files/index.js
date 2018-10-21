var Device = require('../../index')

Device.files.upload('./test.txt', 'test-file/test/test.txt').then(d => {
  console.log(d[0].metadata.selfLink)
})
