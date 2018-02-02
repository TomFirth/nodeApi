const utilities = module.exports = {}

utilities.firstLetterUppercase = (input) => {
  return input ? input.charAt(0).toUpperCase() + input.slice(1) : undefined
}

utilities.lowercase = (input) => {
  return input ? input.toLowerCase() : undefined
}
