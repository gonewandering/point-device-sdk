const Stream = require('./lib/stream')
const Status = require('./lib/status')
const Command = require('./lib/command')
const Config = require('./lib/config')
const Log = require('./lib/log')
const mid = require('./lib/mid')()

exports.mid = mid
exports.status = new Status()
exports.command = new Command()
exports.log = new Log()

exports.Stream = Stream
