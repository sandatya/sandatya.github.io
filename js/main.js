import loadNav from './nav.js'
import loadPage from './page.js'
import registersw from './registersw.js'

let path = window.location.hash.substr(1)
path ? path = path : path = 'teams'


registersw.registration()
registersw.notification()

document.addEventListener('DOMContentLoaded', () => {
    loadNav()
    loadPage(path)
})