const { config } = require('../../config')
const createUploadLink = (imageUrl) => {
  const imagePath = imageUrl.split('uploads\\')[1]
  return `${config.baseUrl}:${config.port}/${imagePath}` // CHANGED, COULD BE ERRORS
}

module.exports = { createUploadLink }
