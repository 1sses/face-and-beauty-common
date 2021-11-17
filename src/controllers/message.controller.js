const { MessageService } = require('../services/message.service')
const { answers } = require('../constants/answers')

class MessageController {
  static async appendMessage (ctx) {
    const { name, email, message } = ctx.request.body
    await MessageService.appendMessage(name, email, message)
    ctx.body = { message: answers.success.create.message }
  }

  static async getMessages (ctx) {
    ctx.body = await MessageService.getMessages()
  }

  static async deleteMessage (ctx) {
    const { id } = ctx.request.body
    await MessageService.deleteMessage(id)
    ctx.body = { message: answers.success.delete.message }
  }
}

module.exports = { MessageController: MessageController }
