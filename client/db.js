var firebase = require('firebase')
var AsyncCache = require('async-cache')

var ref = firebase.initializeApp({
  apiKey: 'AIzaSyC8wPYGwRXX5gQntmjV3eouY7cg_rmncek',
  authDomain: 'jsla-contribute.firebaseapp.com',
  databaseURL: 'https://jsla-contribute.firebaseio.com',
  storageBucket: 'jsla-contribute.appspot.com',
  messagingSenderId: '867761488090'
})

var uid
var loginCache = new AsyncCache({
  load: function (key, cb) {
    signIn(function (err, _uid) {
      if (err) return cb(err)
      uid = _uid
      cb(null, uid)
    })
  }
})

module.exports = {
  getSpeaker: loginify(getSpeaker),
  getHost: loginify(getHost),
  getSponsor: loginify(getSponsor),
  updateSpeaker: loginify(updateSpeaker),
  updateHost: loginify(updateHost),
  updateSponsor: loginify(updateSponsor)
}

function getSpeaker (cb) {
  query(createPath('speaker'), cb)
}

function getHost (cb) {
  query(createPath('host'), cb)
}

function getSponsor (cb) {
  query(createPath('sponsor'), cb)
}

function updateSpeaker (key, value, cb) {
  update('speaker', key, value, cb)
}

function updateHost (key, value, cb) {
  update('host', key, value, cb)
}

function updateSponsor (key, value, cb) {
  update('sponsor', key, value, cb)
}

function update (type, key, value, cb) {
  var path = createPath(type, key)
  ref.database().ref().child(path).set(value)
    .catch(cb)
    .then(() => cb())
}

function loginify (fn) {
  return function () {
    var args = Array.prototype.slice.call(arguments)
    loginCache.get('a', function (err) {
      if (err) return console.error(err)
      fn.apply(null, args)
    })
  }
}

function signIn (cb) {
  ref.auth().onAuthStateChanged(function (user) {
    if (!user) return ref.auth().signInAnonymously()

    cb(null, user.uid)
  })
}

function createPath (type, key) {
  var arr = [type, uid]
  if (key) arr.push(key)
  return arr.join('/')
}

function query (key, cb) {
  ref.database().ref().child(key).once('value')
    .catch(cb)
    .then(function (snap) {
      cb(null, snap.exportVal() || {})
    })
}
