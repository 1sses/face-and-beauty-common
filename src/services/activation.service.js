const { v4: uuid } = require('uuid')
const { ActivationTokenRepository } = require('../repository/activationToken.repository')

class ActivationService {
  static async addUser (id) {
    const activationToken = uuid() // TODO Reimplement
    await ActivationTokenRepository.add(id, activationToken)
    return activationToken
  }

  static async activateUser (activationToken) {
    await ActivationTokenRepository.delete(activationToken)
  }
}

module.exports = { ActivationService }
