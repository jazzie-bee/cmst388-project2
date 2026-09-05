const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const address = document.getElementById('address')
const city = document.getElementById('city')
const state = document.getElementById('state')
const zipcode = document.getElementById('zipcode')
const telarea = document.getElementById('telarea')
const telnum = document.getElementById('telnum')
const email = document.getElementById('email')
const cemail = document.getElementById('cemail')
const comment = document.getElementById('comment')
const form = document.getElementById('form')
const errorElement = document.getElementsByClassName('error-message')

// Create inline errors for each input to better help users correct the form as they go.

// function validateField(field) {
//     if (!field.validity.valid)
// }

form.addEventListener('submit', (e) => {
    let messages = []
    if (fname.value === '' || fname.value == null) {
        messages.push('This field is required')
    }

    if (lname.value === '' || lname.value == null) {
        messages.push('This field is required')
    }

    if (address.value === '' || address.value == null) {
        messages.push('This field is required')
    }
    
    if (city.value === '' || city.value == null) {
        messages.push('This field is required')
    }
    
    if (state.value === '' || state.value == null) {
        messages.push('Please select a state')
    }
    
    // if (zipcode.length >= 5) 'Zip code must be 5 digits'; numerci only

    if (telarea.value === '' || phone.value == null) {
        messages.push('This field if required')
    }

    if (telnum.value === '' || phone.value == null) {
        messages.push('This field if required')
    }

    // if (phone.length )

    if (email.value === '' || email.value == null) {
        messages.push('This field is required')
    }
    // Checks for correct format 'Please enter valid email address (name@domain.com)'
    
    if (cemail.value === '' || cemail.value == null) {
        messages.push('Emails must match')
    }

    if (messages.length > 0) {
        e.preventDefault()
        errorElement.innerText =  messages.join(', ')
    }
})