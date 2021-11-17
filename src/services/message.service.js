const { MessageRepository } = require('../repository/message.repository')

class MessageService {
  static async appendMessage (name, email, message) {
    await MessageRepository.appendMessage(name, email, message)
  }

  static async getMessages () {
    return await MessageRepository.getMessages()
  }

  static async deleteMessage (id) {
    await MessageRepository.deleteMessage(id)
  }
}

module.exports = { MessageService: MessageService }
