module.exports = {
  setSpeaker: function (speaker, state) {
    state.speaker = speaker
    return state
  },

  setSpeakerProperty: function (change, state) {
    state.speaker[change.key] = change.value
    return state
  },

  setHost: function (host, state) {
    state.host = host
    return state
  },

  setHostProperty: function (change, state) {
    state.host[change.key] = change.value
    return state
  },

  setSponsor: function (sponsor, state) {
    state.sponsor = sponsor
    return state
  },

  setSponsorProperty: function (change, state) {
    state.sponsor[change.key] = change.value
    return state
  }
}
