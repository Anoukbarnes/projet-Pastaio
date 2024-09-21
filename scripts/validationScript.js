const form = document.getElementById('form');
const firstname = document.getElementById('first-name'); 
const lastname = document.getElementById('last-name');
const email = document.getElementById('mail-client');
const tel = document.getElementById('tel-client');
const formRadios = form.querySelectorAll('input[type="radio"]');
const time = document.getElementById('time-reservation');
const nbPersonnes = document.getElementById('nb-personnes');
const date = document.getElementById('date-reservation');

console.log("nb-personnes:", nbPersonnes)


if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (validateInputs()) {
            form.submit();
        }
    });
}

const validateInputs = () => {

    console.log("début");
    let noError = true;
    const firstnameValue = firstname.value.trim();
    const lastnameValue = lastname.value.trim();
    const emailValue = email.value.trim();
    const telValue = tel.value.trim();
    const timeValue = time.value.trim();
    const nbPersonnesValue = nbPersonnes.value.trim();
    const dateValue = date.value.trim();

    if (firstnameValue === '') {
        setError(firstname, 'Veuillez entrer votre prénom');
        noError = false;
    } else {
        setSuccess(firstname);
    }

    if (lastnameValue === '') {
        setError(lastname, 'Veuillez entrer votre nom');
        noError = false;
    } else {
        setSuccess(lastname);
    }

    if (emailValue === ''){
        setError(email, 'Veuillez entrer votre courriel')
        noError = false;
    } else if (!checkEmail(emailValue)) {
        setError(email, 'Veuillez entrer une adresse courriel valide');
        noError = false;
    } else {
        setSuccess(email);
    }

    if (telValue === '') {
        setError(tel, 'Veuillez entrer un numéro de téléphone');
        noError = false;
    }  else if (!validatePhoneNumber(telValue)) {
        setError(tel, 'Veuillez entrer un numéro sous la forme 123-456-7890');
        noError = false;
    } else {
        setSuccess(tel);
    }

    if (timeValue === ''|| timeValue === 'default') { 
        setError(time, 'Veuillez sélectionner une heure de réservation');
        noError = false;
    } else {
        setSuccess(time);
    }

    formRadios.forEach((radio) => {
        if (!radio.checked) {
            setError(formRadios, 'Veuillez sélectionner une des deux options');
            noError = false;
        }
        else  {
            setSuccess(formRadios)
        }
      });

    if (dateValue === '') {
        setError(date, 'Veuillez entrer la date souhaitée');
        noError = false;
    } else {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        
        const dateDate = new Date(dateValue);
        const dateYear = dateDate.getFullYear();
        const dateMonth = dateDate.getMonth();
        const dateDay = dateDate.getDate();

        if (isNaN(dateDate.getTime())) {
            setError(date, 'Veuillez entrer une date valide');
            noError = false;
        } else if (dateYear < currentYear || 
                  (dateYear === currentYear && dateMonth < currentMonth) ||
                  (dateYear === currentYear && dateMonth === currentMonth && dateDay < currentDay)) {
            setError(date, 'Veuillez entrer une date après la date actuelle');
            noError = false;
        } else {
            setSuccess(date);
        }
    }

    if (nbPersonnesValue === '') {
        setError(nbPersonnes, 'Veuillez entrer le nombre de personnes');
        noError = false;
    } else {
        setSuccess(nbPersonnes);
    } 

    

    console.log("fin");

    return noError

}

// Vérifie que le email est valide
 function checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Vérifie que le numéro de téléphone est valide 
function validatePhoneNumber(tel) {
    const telRegex = /^\d{3}-\d{3}-\d{4}$/;
    return telRegex.test(tel);
}

const setError = (input, message) => {
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = input => {
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
    inputControl.classList.add('success');
}

