module.exports = async function (ms) {
  await new Promise((succ, cat) => {
    return setTimeout(succ, ms)
  })
}
