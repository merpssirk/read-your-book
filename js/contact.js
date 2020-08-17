//CODING STARTED FOR CONTACT FORM

const userDataForm = document.querySelector('#user-data');

userDataForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    const formData = new FormData(userDataForm);

    const fullName = formData.get('name');
    //console.log(fullName);
    const emailAddress = formData.get('email');
    const phoneNumber = formData.get('number');
    const websiteName = formData.get('subject');
});

/* let hasBeenClicked = false;

const updateHTML = () => {
    hasBeenClicked = true;
    submitSent();

    let intervalCounter = 0;

    const interval = setInterval(()=>{
        intervalCounter++;

        if (intervalCounter > 100) {
            clearTimeout(interval);

            hasBeenClicked = false;
            submitSent();
        }
    }, 50);
}

function submitSent () {
    if (hasBeenClicked) {
        const button = document.querySelector('#button');
        button.innerText = "Sent";
    }
    else {
        const button = document.querySelector('#button');
        button.innerText = 'Submit';
    }
}
 */
// id [name, email, phone, website]

//const name = document.querySelector('#name');
//const email = document.querySelector('#email');
//const phone = document.querySelector('#phone');
//const website = document.querySelector('#website');

//name.addEventListener('blur', valiDateName);
//email.addEventListener('blur', validateEmail);
//phone.addEventListener('blur', validatePhone);
//website.addEventListener('blur', validateWebsite);

/* function valiDateName() {
    //console.log(name.value);

    const reg = /^[a-zA-Z]{10,25}$/;

    if (!reg.test(name.value)) {
       
       name.classList.add('is-invalid');   
       
       name.classList.remove('is-valid'); 

    }

    else {
        
        name.classList.remove('is-invalid'); 

        name.classList.add('is-valid'); 
    }
}

function validateEmail () {

    const reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if(!reg.test(email.value)) {

        email.classList.add('is-invalid');

        email.classList.remove('is-valid');
    }
    else {

        email.classList.remove('is-invalid');

        email.classList.add('is-valid');
    }
}

function validatePhone () {
    //const reg = /^(\+49-|\+49|0)?\d{15}$/;
    //const reg = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    const reg = /^([0-9_\-\.]+)@([0-9_\-\.]+)\.({2,15})$/
    if (!reg.test(phone.value)) {

        phone.classList.add('is-invalid');

        phone.classList.remove('is-valid');
    }
    else {
        phone.classList.remove('is-invalid');

        phone.classList.add('is-valid');
    }
}

function validateWebsite () {
    const reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,50})$/;

    if (!reg.test(website.value)) {

        website.classList.add('is-invalid');

        website.classList.remove('is-valid');
    }
    else {
        website.classList.remove('is.invalid');

        website.classList.add('is-valid');
    }
}
 */
function toggle() {
     /*  if (document.forms.registration.button.disabled)
          document.forms.registration.button.disabled = false;
      else
          document.forms.registration.button.disabled = true; */
  //or
      document.forms.registration.button.disabled =
      !document.forms.registration.button.disabled;
}

function validate() {
    if (document.forms.registration.name.value == "") {
        alert("You must provide your Name.");
        return false;
    }
      else if (document.forms.registration.email.value == "") {
          alert("You must provide an email address.");
          return false;
      }
      else if (document.forms.registration.password1.value == "") {
          alert("You must provide a password.");
          return false;
      }
      else if(document.forms.registration.password1.value != document.forms.registration.password2.value) {
          alert("You must provide the same password twice.");
          return false;
      }
      else if (!document.forms.registration.agreement.checked) {
          alert("You must agree to our terms and conditions.");
          return false;
      }
      return true;
  }

// FORM SECTION JS CODE END 
