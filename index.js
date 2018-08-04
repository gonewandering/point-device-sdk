const Status = require('./lib/status')
const Command = require('./lib/command')
const Config = require('./lib/config')
const Log = require('./lib/log')
const mid = require('./lib/mid')()

exports.mid = mid
exports.status = new Status()
exports.command = new Command()
// exports.config = new Config()
exports.log = new Log()
