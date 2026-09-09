//-----------------------------------------
// Calling all input fields
//-----------------------------------------
const form = document.getElementById('form')

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
const errorElement = document.getElementsByClassName('errormsg')

const mealRadios = [
    document.getElementById('vegan'),
    document.getElementById('vegetarian'),
    document.getElementById('none')
];

const contactCheckboxes = [
    document.getElementById('phone-contact'),
    document.getElementById('email-contact'),
    document.getElementById('mail-contact'),
    document.getElementById('linkedin')
];

//-----------------------------------------
// Email form sends to
//-----------------------------------------
const RECIPIENT_EMAIL = 'jazminebrown97@pm.me'

//-----------------------------------------
// Error handling bf submitting.
// Get <span class="errormsg"> and looks for
// data-for inside .form-group for each field
//-----------------------------------------
const getErrorSpan = (field) => {
    const group = field.closest('.form-group');
    if (!group) return null;
    const specific = group.querySelector(`.errormsg[data-for="${field.id}"]`);
    return specific || group.querySelector('.errormsg');
};

// Show error message inline on each field
const showError = (field, msg) => {
    const span = getErrorSpan(field);
    if (span) span.textContent = msg;
    field.classList.add('invalid');
};

const clearError = (field) => {
    const span = getErrorSpan(field);
    if (span) span.textContent = '';
    field.classList.remove('invalid');
};

//---------------------------------------
// Remove/restore palcholder text
//---------------------------------------
const textInputs = [fname, lname, address, city, zipcode, telarea, telnum, email, cemail]

textInputs.forEach((input) => {
    // Save og placholder to put back later
    const originalPlaceholder = input.ariaPlaceholder;

    input.addEventListener('focus', () => {
        input.placeholder = '';
    });

    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.placeholder = originalPlaceholder;
        }
    });

    // Clear exisiting error msg once user starts typing
    input.addEventListener('input', () => clearError(input));
});

state.addEventListener('change', () => clearError(state));
message.addEventListener('input', () => clearError(message));

// Clear radio selection error once a selection is made
mealRadios.forEach((radio) => {
    radio.addEventListener('change', () => clearError(radio));
});

// Clear contact metho checkboxes error
contactCheckboxes.forEach((box) => {
    box.addEventListener('change', () => clearError(box));
});

//--------------------------------------------
// Validation Functions
// Each function returns true if the field is valid 
// and false if not and display appropriate error message
//--------------------------------------------

// Name patterns
const NAME_PATTERN = /^[A-Za-z][A-Za-z '-]*$/;

function validateName(field, label) {
    const value = field.value.trim();
    if (value === '') { // Check that field is not empty
        showError(field, `${label} is required`);
        return false;
    }
    if (!NAME_PATTERN.test(value)) { // Check the format is correct
        showError(field, `${label} must contain letters only`);
        return false;
    }
    clearError(field);
    return true;
}

// Address and City
function validateAddress() {
    const value = address.value.trim();
    if (value === '') {
        showError(address, 'Address is required')
        return false;
    }
    if (!/^[a-zA-Z0-9\s#.,-]+$/.test(value)) {
        showError(address, 'Address must not include special characters');
        return false;
    }
    clearError(address);
    return true;
}

function validateCity() {
    const value = city.value.trim();
    if (value === '') {
        showError(city, 'City is required')
        return false;
    }
    if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
        showError(city, 'City must only contain letters');
        return false;
    }
    clearError(city);
    return true;
}

// State field and that a selection is made
function validateState() {
    if (state.value === '') {
        showError(state, 'Please select a state')
        return false;
    }
    clearError(state);
    return true;
}

// Zipcode field
function validateZip() {
    const value = zipcode.value.trim();
    if (value === '') {
        showError(zipcode, 'Zip code is required');
        return false;
    }
    if (!/^\d{5}$/.test(value)) { // Check for max 5 digits, even though HTML has character max
        showError(zipcode, 'Zip code must be 5 digits')
        return false;
    }
    clearError(zipcode);
    return true;
}

// Phone number has two inputs. Each input needs to
// be validated independnetly, then check together 
// for a total of 10 digits.
function validatePhone() {
    const areaValue = telarea.value.trim();
    const numValue = telnum.value.trim();
    let areaValid = true;
    let numValid = true;

    if (areaValue === '') {
        showError(telarea, 'Area code is required');
        areaValid = false; // using areaValid so it runs through the whole check and not end early with "return false;"
    } else if (!/^\d{3}$/.test(areaValue)) {
        showError(telarea, 'Area code must be 3 digits');
        areaValid = false;
    } else {
        clearError(telarea)
    }

    if (numValue === '') {
        showError(telnum, 'Phone number is required');
        numValid = false;
    } else if (!/^\d{3}-\d{4}$/.test(areaValue)) {
        showError(telnum, 'Phone number must be in the format 123-4567');
        numValid = false;
    } else {
        clearError(telnum)
    }

    if (!areaValid || !numValid) return false;

    // confirm total number of digits is 10
    const digitOnly = (areaValue + numValue).replace(/\D/g, '');
    if (digitOnly.length !== 10) {
        showError(telnum, 'Phone number must be 10 digits');
        return false;
    }
    return true;
}

// Email fields
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail() {
    const value = email.value.trim();
    if (value === '') {
        showError(email, 'Email is required');
        return false;
    }
    if (!EMAIL_PATTERN.test(value)) {
        showError(email, 'Please enter a valid email address');
        return false;
    }
    clearError(email);
    return true;
}

function validateEmailConfirmation() {
    const value = cemail.value.trim();
    if (value === '') {
        showError(cemail, 'Please confirm your email address');
        return false;
    }
    if (!EMAIL_PATTERN.test(value)) {
        showError(cemail, 'Please enter a valid email address');
        return false;
    }
    if (value !== email.value.trim()) { // Check both fields match
        showError(cemail, 'Email address must match');
        return false;
    }
    clearError(cemail);
    return true;
}

// Meal preference
function validateMealPreference() {
    const anySelected = mealRadios.some((radio) => radio.checked);
    if (!anySelected) {
        showError(mealRadios[0], 'Please select a meal preference');
        return false;
    }
    clearError(mealRadios[0]);
    return true;
}

function validateContactMethods() {
    const checkCount = contactCheckboxes.filter((box) => box.checked).length;
    if (checkCount < 2) {
        showError(contactCheckboxes[0], 'Please selecte at least two contact methods');
        return false;
    }
    clearError(contactCheckboxes[0]);
    return true;
}

// Optional comments, but with 250 character limit.
function validateComments() {
    if (message.value.length > 250) {
        showError(message, 'Comment cannot exceed 250 characters');
        return false;
    }
    clearError(message);
    return true;
}

//----------------------------------
// FORM SUBMISSION
//----------------------------------
function handleSubmit(e) {
    e.preventDefault();

    const validations = [
        validateName(fname, 'First name'),
        validateName(lname, 'Last name'),
        validateAddress(address, 'Address'),
        validateCity(city, 'City'),
        validateState(),
        validateZip(),
        validatePhone(),
        validateEmail(),
        validateEmailConfirmation(),
        validateMealPreference(),
        validateContactMethods(),
        validateComments()
    ];

    const isFormValid = validations.every(Boolean);

    if (isFormValid) {
        sendResultsByEmail();
        form.reset();
    }
}

// Clicking the submit button, or pressing enter fires submit event,
// which calls handleSubmit above.
form.addEventListener('submit', handleSubmit);