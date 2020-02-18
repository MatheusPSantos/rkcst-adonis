'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  // onError () {

  // }

  // onClose () {

  // }

  onMessage (data) {
    this.broadcastToAll('message', data)
  }
}

module.exports = ChatController
