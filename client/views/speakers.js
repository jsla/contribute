const html = require('choo/html')
const dates = require('../dates')
const map = require('lodash/map')

const formComponents = require('./components/form')
const textField = formComponents.textField
const textArea = formComponents.textArea
const dateSelect = formComponents.dateSelect
const submitButton = formComponents.submitButton

var fetched = false
module.exports = function (state, prev, send) {
  document.title = 'Come speak at js.la!'

  var speaker = state.speaker || {}

  if (!fetched) {
    fetched = true
    send('fetchSpeaker')
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
        <h1 class='f2'>Want to speak at js.la?</h1>

        <h2 class='f1'>Awesome!</h2>

        <div>
          <h3 class='f3'>Here are some things you should know:</h3>

          <p class='f4 lh-copy measure'>
            Our talks are 30 minutes in length. Usually, this is 20-25 minutes of content followed by 5-10 minutes of Q+A. We've found this to be long enough for good detail while being short enough to hold the audience's attention. This length is also great for online -- just about the right duration for someone to watch during lunch or a coffee break.
          </p>

          <p class='f4 lh-copy measure'>
          If you intend to promote a product, app, service, or technology, be careful. It's important that your talk does not come across as a sales pitch. Consider giving a behind the scenes look at your work or take the audience on your journey that led to where you are now. Feature tours do not make good talks.
          </p>

          <p class='f4 lh-copy measure'>
            The best talks are focused on a personal experience. A great format for this is a three part story:
            <ol>
              <li>What did you want and why?</li>
              <li>What different things did you try and why? How did that turn out for you?</li>
              <li>What did you learn? What surprised you? If you could go back in time, what would you tell yourself before starting?</li>
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
                value: speaker.name
              }, update)}

              ${textField({
                key: 'email',
                label: 'How can we get in touch with you?',
                placeholder: 'webmaster@myawesomedomain.com',
                value: speaker.email
              }, update)}

              ${textField({
                key: 'slack',
                label: html`
                  <span>
                    What\'s your js.la slack handle? Not a member? <a href="https://join-jsla-slack.herokuapp.com/" style="text-decoration: none;">Join Here!</a>
                  </span>
                `,
                placeholder: '@slackFace',
                value: speaker.slack
              }, update)}

              ${textArea({
                key: 'abstract',
                label: 'What would you like to talk about?',
                placeholder: 'This all started when I needed to...',
                value: speaker.abstract
              }, update)}

              ${textField({
                key: 'title',
                label: 'If you had to come up with a working title that you could change later, what would it be?',
                placeholder: 'The Curious Case of the Missing Shadow DOM',
                value: speaker.title
              }, update)}

              ${textField({
                key: 'avatar',
                label: 'What avatar image of you should we use to promote your talk?',
                placeholder: 'http://twitfacehub.com/path/avatar.jpg',
                value: speaker.avatar
              }, update)}

              ${textField({
                key: 'github',
                label: 'Have a Github?',
                placeholder: '@githubname',
                value: speaker.github
              }, update)}

              ${textField({
                key: 'twitter',
                label: 'Have a Twitter?',
                placeholder: '@twittername',
                value: speaker.twitter
              }, update)}

              ${dateSelect({
                key: 'dates',
                label: 'When are you available?',
                dates: dates,
                selected: speaker.dates
              }, update)}

            </fieldset>

            ${submitButton({
              key: 'submitState',
              disabled: !isValid(speaker),
              undefined: "Let's do this.",
              done: 'All set!',
              error: 'Uh oh...',
              value: speaker.submitState
            }, update)}

          </form>
        </article>
      </div>
    `
  }

  function update (key, value) {
    send('updateSpeaker', {key: key, value: value})
    send('updateSpeaker', {key: 'updatedAt', value: new Date().toUTCString()})
  }
}

function isValid (speaker) {
  if (!speaker.name) return false
  if (!speaker.email) return false
  if (!speaker.abstract) return false
  if (!speaker.title) return false
  if (!speaker.avatar) return false

  var dates = map(speaker.dates || [], (d) => d)
  if (!dates.length) return false

  return true
}
