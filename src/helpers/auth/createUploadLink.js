const createUploadLink = (imageUrl) => {
  const imagePath = imageUrl.split('uploads/')[1]
  return `${process.env.BASE_URL ?? 'http://localhost:5000'}/${imagePath}` // CHANGED, COULD BE ERRORS
}

module.exports = { createUploadLink }
