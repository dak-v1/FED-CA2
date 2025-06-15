"use-strict";

// Name: Vijeyakumar Dakshaa
// Student ID: P2415899
// Class: DAAA/FT/1A/04
// Date: 28/07/24 
// Purpose: FED CA2

// allows you to define a function and immediately invoke it
(() => {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            let customCheck = true;

            const userName = document.getElementById("name");
            const userPhone = document.getElementById("phone");
            const userEmail = document.getElementById("email");

            // Validate the name field to make sure it is at least 2 characters long and contains no numbers
            // /\d/ checks for digits and .test() tests for a match in the string 
            if (userName.value.length < 2) {
                customCheck = false;
                userName.setCustomValidity("Error");
            } else if (/\d/.test(userName.value)) {
                customCheck = false;
                userName.setCustomValidity("Error");
            } else {
                userName.setCustomValidity("");
            }

            // Validate the phone field
            // /[^0-9]/ matches if it is not a digit
            // The ^ symbol inside the square brackets [] negates the character class, 
            // meaning it will match any character that is not listed within the brackets.
            if (/[^0-9]/.test(userPhone.value) || userPhone.value.length !== 8) {
                customCheck = false;
                userPhone.setCustomValidity("Error");
            } else {
                userPhone.setCustomValidity("");
            }

            // Validate the email field with a simpler pattern
            // [^\s@]+ means one or more characters that are not whitespace and @
            if (!(/^[^\s@]+@[^\s@]+\.com$/).test(userEmail.value)) {
                customCheck = false;
                userEmail.setCustomValidity("Error");
            } else {
                userEmail.setCustomValidity("");
            }

            // If the form is invalid or custom check failed, prevent submission
            // form.checkValidity() is built in validaton and returns true if form is valid
            // preventDefault() prevents form from being submitted
            // preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
            if (!form.checkValidity() || !customCheck) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
})();



