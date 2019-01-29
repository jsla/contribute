var API = require('./config').APIEndpoint

function updateImage (key, value, update) {
  let formData = new window.FormData()
  let photo = value
  formData.append('photo', photo)
  window.fetch(API + '/upload', {method: 'POST', body: formData})
  .then((resp) => resp.json())
  .then((data) => {
    if (data.success) {
      value = data.url_preview
      update(key, value)
      return
    }
    window.alert("Couldn't load the image")
  }).catch(() => window.alert("Couldn't load the image"))
}

module.exports.updateImage = updateImage
