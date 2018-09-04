var Device = require('../../../index')

class TestSensor extends Device.Sensor {
  async get() {
    console.log('Sensing')
    return await new Promise((succ, cat) => {
      setTimeout(() => {
        succ({
          test: true,
          value: Math.random()
        })
      }, 500)
    })
  }
}

module.exports = TestSensor
