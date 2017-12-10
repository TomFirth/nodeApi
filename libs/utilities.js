const utilities = module.exports = {}

utilities.firstLetterUppercase = (input) => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

utilities.lowercase = (input) => {
  return input.toLowerCase()
}
