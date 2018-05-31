const html = require('choo/html')

module.exports = opts => {
  return html`
    <div class='mt3'>
      <label class='db fw4 lh-copy f6'>
        ${opts.label || 'Preview Image'}
      </label>
      <div style='${`
        box-shadow: 0 0 2 rgba(0,0,0,.2);
        background-color: white;
        background-image: url(${opts.url});
        background-size: cover;
        background-position: center center;
        width: 275px;
        height: 100px;
      `}'></div>
    </div>
  `
}
