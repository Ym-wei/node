const appLogo = require('./test/appLogo')
const logoMap = appLogo.reduce((result, next) => {
  result[next.name] = next
  return result
}, {})
const fs = require('fs')
// fs.mkdirSync('news')

const run = function(file) {
  fs.readFile(`./test/${file}.json`, 'utf8', function (err, data) {
    if (err) throw err
    const list = JSON.parse(data)
    list.caseList.forEach(item => {
      const { name } = item
      const logoItem = logoMap[name]
      if (logoItem) {
        item.logo = logoItem.logo
      }
    })
    const newContent = 'export const APP = ' + JSON.stringify(list, null, 4)
    fs.writeFile(`./news/${file}.js`, newContent, 'utf8', err => {
      if (err) throw err
    })
  })
}
const files = ['education', 'group', 'infant', 'middleSchool', 'primarySchool', 'region', 'vocational']
files.forEach(file => {
  run(file)
})

console.log('success')
