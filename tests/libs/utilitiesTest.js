const assert = require('assert')
const utilities = require('../../libs/utilities')

describe('First Letter Uppercase', () => {
  it('should return a string with an uppercase first letter', () => {
    assert.equal('Forename', utilities.firstLetterUppercase('forename'))
  })
})

describe('Lowercase', () => {
  it('should return a string that is entirely lowercase', () => {
    assert.equal('t.test@email.com', utilities.lowercase('T.TesT@eMaIl.CoM'))
  })
})
