const { Message } = require('./models')

class MessageRepository {
  static async appendMessage (name, email, message) {
    return await Message.create({
      name, email, message
    })
  }

  static async getMessages () {
    return await Message.findAll()
  }

  static async deleteMessage (id) {
    return await Message.destroy({ where: { id } })
  }
}

module.exports = { MessageRepository: MessageRepository }
