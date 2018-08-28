const shapes = require('./shapes')
const statuses = require('./status')

try {
  const matrix = require('node-sense-hat').Leds
} catch (e) {
  const matrix = {}
}

const colors = [
  [0, 0, 0],
  [255, 0, 0],
  [0, 100, 255],
  [100, 0, 255],
  [255, 100, 0]
]

const cnf = {
  shape: 'blank'
}

function mapPixels(matrix) {
  try {
    return matrix.map(d => {
      return colors[d]
    })
  } catch(e) {
    return
  }
}

function update() {
  let rgb = mapPixels(shapes[cnf.shape])
  rgb = addStatus(rgb)
  try {
    return matrix.setPixels(rgb)
  } catch (e) {
    return
  }
}

function addStatus(rgb) {
  for (var s in statuses) {
    if (statuses[s].on === true) {
      rgb[s] = statuses[s].color
    }
  }

  return rgb
}

function setStatus(status, on) {
  statuses.forEach((s, i) => {
    if (s.status == status) {
      statuses[i].on = on
    }
  })

  update()
}

function setShape(shape) {
  cnf.shape = shape
  update()
}

function clearShape() {
  return setShape('blank')
}

module.exports = {
  set: setShape,
  clear: clearShape,
  status: setStatus
}