var db = require('../db')

module.exports = {
  fetchSpeaker: function (data, state, send, done) {
    db.getSpeaker(function (err, speaker) {
      if (err) return done(err)
      send('setSpeaker', speaker, done)
    })
  },

  updateSpeaker: function (data, state, send, done) {
    send('setSpeakerProperty', data, function (err) {
      if (err) return done(err)
      db.updateSpeaker(data.key, data.value, done)
    })
  },

  fetchHost: function (data, state, send, done) {
    db.getHost(function (err, host) {
      if (err) return done(err)
      send('setHost', host, done)
    })
  },

  updateHost: function (data, state, send, done) {
    send('setHostProperty', data, function (err) {
      if (err) return done(err)
      db.updateHost(data.key, data.value, done)
    })
  },

  fetchSponsor: function (data, state, send, done) {
    db.getSponsor(function (err, sponsor) {
      if (err) return done(err)
      send('setSponsor', sponsor, done)
    })
  },

  updateSponsor: function (data, state, send, done) {
    send('setSponsorProperty', data, function (err) {
      if (err) return done(err)
      db.updateSponsor(data.key, data.value, done)
    })
  }
}
