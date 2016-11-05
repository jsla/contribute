module.exports = getDates()

function getDates (n) {
  n = n || 5
  var dates = []

  var invalidMonths = [-1, 10, 11]

  var thisMonth
  var lastThurs
  var lastMonth = -1
  var d = new Date()

  while (dates.length < n) {
    d = incrementDate(d)

    thisMonth = d.getMonth()
    var isValidMonth = invalidMonths.indexOf(lastMonth) === -1
    var isNewMonth = thisMonth !== lastMonth

    if (lastThurs && isValidMonth && isNewMonth) { dates.push(lastThurs) }

    if (d.getDay() === 4) lastThurs = d
    lastMonth = thisMonth
  }

  return dates
}

function incrementDate (d) {
  return new Date(d.valueOf() + 24 * 3600 * 1000)
}
