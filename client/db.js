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
