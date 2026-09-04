const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const address = document.getElementById('address')
const city = document.getElementById('city')
const state = document.getElementById('state')
const zipcode = document.getElementById('zipcode')
const phone = document.getElementById('phone')
const email = document.getElementById('email')
const cemail = document.getElementById('cemail')
const comment = document.getElementById('comment')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')

form.addEventListener('submit', (e) => {
    let messages = []
    if (fname.value === '' || fname.value == null) {
        messages.push('Name is required')
    }

    if (password)

    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText =  messages.join(', ')
    }
})