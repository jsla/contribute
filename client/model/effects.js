var xtend = require('xtend')
var db = require('../db')

module.exports = {
  fetchSpeaker: function (data, state, send, done) {
    db.getSpeaker(function (err, speaker) {
      if (err) return done(err)
      send('setSpeaker', speaker, done)
    })
  },

  updateSpeaker: function (data, state, send, done) {
    db.updateSpeaker(data.key, data.value, done)
  }
}
