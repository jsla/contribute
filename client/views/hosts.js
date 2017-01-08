const html = require('choo/html')
const dates = require('../dates')
const map = require('lodash/map')

const formComponents = require('./components/form')
const textField = formComponents.textField
const textArea = formComponents.textArea
const dateSelect = formComponents.dateSelect
const submitButton = formComponents.submitButton

var fetched
module.exports = function (state, prev, send) {
  document.title = 'Host js.la!'

  var host = state.host || {}

  if (!fetched) {
    fetched = true
    send('fetchHost')
  }

  return html`
    <div>
      ${renderIntro()}

      ${renderForm()}
    </div>
  `

  function renderIntro () {
    return html`
      <div>
        <h1 class='f2'>Want to host js.la?</h1>

        <h2 class='f1'>Awesome!</h2>

        <div>
          <h3 class='f3'>Here are some things you should know:</h3>

          <p class='f4 lh-copy measure'>
            Leading up to the event we'll promote your organization on our front page, in tweets, on our Meetup.com page, and on our mailing list.
          </p>

          <p class='f4 lh-copy measure'>
            During the event, we'll display your custom slide, and you'll have the opportunity to introduce yourself and your organization to the attendees.
          </p>

          <p class='f4 lh-copy measure'>
            After the event, we'll feature your logo in videos of that month's talks and in our archive.
          </p>

        </div>
      </div>
    `
  }

  function renderForm () {
    return html`
      <div class='mt5'>
        <h4 class='f6'>Now, with that out of the way...</h4>
        <h3 class='f3'>Let's talk about you.</h3>

        <article class="black-80">
          <form action="sign-up_submit" method="get" accept-charset="utf-8">
            <fieldset id="sign_up" class="ba b--transparent ph0 mh0">

              ${textField({
                key: 'name',
                label: 'What\'s your name?',
                placeholder: 'Person Adulthuman',
                value: host.name
              }, update)}

              ${textField({
                key: 'organization',
                label: 'What\'s the name of your organization?',
                placeholder: 'Stockmarket Business Co.',
                value: host.organization
              }, update)}

              ${textField({
                key: 'email',
                label: 'How can we get in touch with you?',
                placeholder: 'webmaster@stockmarketbusiness.co',
                value: host.email
              }, update)}

              ${textArea({
                key: 'goal',
                label: 'We\'d like host because...',
                placeholder: 'We\'re looking to hire amazing JS engineers and build product awareness.',
                value: host.goal
              }, update)}

              ${textField({
                key: 'capacity',
                label: 'How many attendees could you host?',
                placeholder: '150',
                value: host.capacity
              }, update)}

              ${textField({
                key: 'logo',
                label: 'What hi-res logo should we use for our site and promotion?',
                placeholder: 'http://stockmarketbusiness.co/path/logo.png',
                value: host.logo
              }, update)}

              ${textField({
                key: 'link',
                label: 'Where should we link to on our website and in promotions?',
                placeholder: 'http://stockmarketbusiness.co/work-with-us',
                value: host.link
              }, update)}

              ${textField({
                key: 'refreshments',
                label: 'What food and drinks will you have available for attendees?',
                placeholder: 'Pizza and beer',
                value: host.refreshments
              }, update)}

              ${textField({
                key: 'hasProjector',
                label: 'Do you have a projector and screen?',
                placeholder: 'Yes',
                value: host.hasProjector
              }, update)}

              ${textField({
                key: 'hasMicrophone',
                label: 'Do you have a microphone and PA for the speaker?',
                placeholder: 'Yes',
                value: host.hasMicrophone
              }, update)}

              ${dateSelect({
                key: 'dates',
                label: 'When can you host?',
                dates: dates,
                selected: host.dates
              }, update)}

            </fieldset>

            ${submitButton({
              key: 'submitState',
              disabled: !isValid(host),
              undefined: "Let's do this.",
              done: 'All set!',
              error: 'Uh oh...',
              value: host.submitState
            }, update)}

          </form>
        </article>
      </div>
    `
  }

  function update (key, value) {
    send('updateHost', {key: key, value: value})
  }
}

// - the capacity for at least 100 attendees
// - food and drink (this can just be 🍕 and 🍺 it's up to y'all)
// - a PA or some type of quality sound system we can project speakers voice
// - projector and screen
// - some type of table/podium for the speaker to present from

function isValid (host) {
  if (!host.name) return false
  if (!host.organization) return false
  if (!host.email) return false
  if (!host.goal) return false
  if (!host.capacity) return false
  if (!host.logo) return false
  if (!host.link) return false
  if (!host.refreshments) return false
  if (!host.hasProjector) return false
  if (!host.hasMicrophone) return false

  var dates = map(host.dates || [], (d) => d)
  if (!dates.length) return false

  return true
}
