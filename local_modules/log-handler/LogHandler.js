var io = require('socket.io-client')
var EventEmitter = require('events').EventEmitter


class LogHandler extends EventEmitter {
  constructor() {
    super()
    let server = `https://${window.location.hostname}:8080`
   this.signaller = io(server)

//  this.signaller = io(server)

   var self = this
    this.signaller.on('ready', (msg) => {
      console.log('received message', msg)
    //  self.appendToLog('test')
    })

    // send all existing messagesr
    this.signaller.on('log history', (msg) => {
      self.emit('log history', msg)
    //  self.appendToLog('test')
    })

    this.signaller.on('append', (msg) => {
      console.log('received APPEND', msg)
      self.emit(`append${msg.channel}`, msg)
    //  self.appendToLog('test')
    })

  //  this.appendToLog('test')
  }

  appendToLog(msg) {
    console.log(`append`, msg)
    this.signaller.emit('append', msg)
  }
}

module.exports = LogHandler
