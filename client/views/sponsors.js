const html = require('choo/html')
const dates = require('../dates')
const map = require('lodash/map')

const formComponents = require('./components/form')
const preview = require('./components/sponsor-preview')
const textField = formComponents.textField
const textArea = formComponents.textArea
const dateSelect = formComponents.dateSelect
const submitButton = formComponents.submitButton

var fetched
module.exports = function (state, prev, send) {
  document.title = 'Support js.la!'

  var sponsor = state.sponsor || {}

  if (!fetched) {
    fetched = true
    send('fetchSponsor')
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
        <h1 class='f2'>Want to sponsor js.la?</h1>

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
      <div>
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
                  value: sponsor.name
                }, update)}

                ${textField({
                  key: 'organization',
                  label: 'What\'s the name of your organization?',
                  placeholder: 'Stockmarket Business Co.',
                  value: sponsor.organization
                }, update)}

                ${textField({
                  key: 'email',
                  label: 'How can we get in touch with you?',
                  placeholder: 'webmaster@stockmarketbusiness.co',
                  value: sponsor.email
                }, update)}

                ${textField({
                  key: 'slack',
                  label: html`
                    <span>
                      What\'s your js.la slack handle? Not a member? <a href="https://jsla-slackin.herokuapp.com/" style="text-decoration: none;">Join Here!</a>
                    </span>
                  `,
                  placeholder: '@slackFace',
                  value: sponsor.slack
                }, update)}

                ${textArea({
                  key: 'goal',
                  label: 'We\'d like sponsor because...',
                  placeholder: 'We\'re looking to hire amazing JS engineers and build product awareness.',
                  value: sponsor.goal
                }, update)}

                ${textField({
                  key: 'logo',
                  label: 'What hi-res logo (275 x 100) should we use for our site and promotion?',
                  info: 'Stuff',
                  placeholder: 'http://stockmarketbusiness.co/path/logo.png',
                  value: sponsor.logo
                }, update)}

                ${sponsor.logo ? preview({ url: sponsor.logo }) : ''}

                ${textField({
                  key: 'link',
                  label: 'Where should we link to on our website and in promotions?',
                  placeholder: 'http://stockmarketbusiness.co/work-with-us',
                  value: sponsor.link
                }, update)}

                ${textField({
                  key: 'desiredMonths',
                  label: 'How many months are you interested in sponsoring?',
                  placeholder: '2',
                  value: sponsor.desiredMonths
                }, update)}

                ${dateSelect({
                  key: 'dates',
                  label: 'Which dates are you available to sponsor?',
                  dates: dates,
                  selected: sponsor.dates
                }, update)}

              </fieldset>

              ${submitButton({
                key: 'submitState',
                disabled: !isValid(sponsor),
                undefined: "Let's do this.",
                done: 'All set!',
                error: 'Uh oh...',
                value: sponsor.submitState
              }, update)}
            </form>
          </article>
        </div>
      </div>
    `
  }

  function update (key, value) {
    send('updateSponsor', {key: key, value: value})
  }
}

function isValid (sponsor) {
  if (!sponsor.name) return false
  if (!sponsor.organization) return false
  if (!sponsor.email) return false
  if (!sponsor.goal) return false
  if (!sponsor.logo) return false
  if (!sponsor.link) return false
  if (!sponsor.desiredMonths) return false

  var dates = map(sponsor.dates || [], (d) => d)
  if (!dates.length) return false

  return true
}
