module.exports = {
  setSpeaker: function (speaker, state) {
    state.speaker = speaker
    state.speaker.submitDate = new Date().toISOString()
    return state
  },

  setSpeakerProperty: function (change, state, submitDate) {
    submitDate =  new Date().toUTCString()
    state.speaker[change.key] = change.value
    console.log(state.speaker);

    return state
  },

  setHost: function (host, state) {
    state.host = host
    state.speaker.submitDate = new Date().toISOString()
    return state
  },

  setHostProperty: function (change, state) {
    state.host[change.key] = change.value
    return state
  },

  setSponsor: function (sponsor, state) {
    state.sponsor = sponsor
    state.speaker.submitDate = new Date().toISOString()
    return state
  },

  setSponsorProperty: function (change, state) {
    state.sponsor[change.key] = change.value
    return state
  }
}
