// let actualUser = [];


// function signUpHtml() {
//     let signUpHtml = document.getElementById('login-div');
//     signUpHtml.innerHTML = '';
//     signUpHtml.innerHTML = generateSignUpHtml();

//     let passwordConfirmInput = document.getElementById('passwordConfirmInput');
//     if (passwordConfirmInput) {
//         document.getElementById('passwordConfirmInput').addEventListener('input', function () {
//             const password1 = document.getElementById('passwordInput').value;
//             const password2 = this.value;
//             const passwordConfirmInputCon = document.getElementById('passwordConfirmInput');
//             const password2SignUpError = document.getElementById('inputErrorSignUpPassword2');

//             if (password1 !== password2) {
//                 passwordConfirmInputCon.classList.add('margin-privacy', 'margin-top', 'margin-bottom');
//                 password2SignUpError.classList.remove('d-none');
//                 password2SignUpError.innerHTML = `Passwords do not match`;
//             } else if (password1 == password2) {
//                 passwordConfirmInputCon.classList.remove('margin-privacy', 'margin-top', 'margin-bottom');
//                 password2SignUpError.classList.add('d-none');
//             }
//         });
//     }
// }


// function newUserCreatedInfoDesktop() {
//     let signUpSuccesDivDesktop = document.getElementById('succesDivDesktop');
//     signUpSuccesDivDesktop.innerHTML = generateSignUpSuccesDivDesktop();
// }


// function newUserCreatedInfoMobile() {
//     let signUpSuccesDivMobile = document.getElementById('succesDivMobile');
//     signUpSuccesDivMobile.innerHTML = generateSignUpSuccesDivMobile();
// }


// function getSignUpInputs() {
//     let name = document.getElementById('nameInput').value;
//     let email = document.getElementById('emailInput').value;
//     let password1 = document.getElementById('passwordInput').value;
//     let password2 = document.getElementById('passwordConfirmInput').value;

//     let nameInputCon = document.getElementById('personInput');
//     let emailInputCon = document.getElementById('emailInputCon');
//     let passwordInputCon = document.getElementById('passwordInputCon');
//     let passwordConfimInputCon = document.getElementById('passwordConfirmInput');

//     let nameSignUpError = document.getElementById('inputErrorSignUpName');
//     let emailSignUpError = document.getElementById('inputErrorSignUpEmail');
//     let password1SignUpError = document.getElementById('inputErrorSignUpPassword1');
//     let password2SignUpError = document.getElementById('inputErrorSignUpPassword2');

//     getSignUpInputsHelp(name, email, password1, password2, nameSignUpError, emailSignUpError, password1SignUpError, password2SignUpError, nameInputCon, emailInputCon, passwordInputCon, passwordConfimInputCon);
// }


// function getSignUpInputsHelp(name, email, password1, password2, nameSignUpError, emailSignUpError, password1SignUpError, password2SignUpError, nameInputCon, emailInputCon, passwordInputCon, passwordConfimInputCon) {
//     if (!name || !email || !password1 || !password2) {
//         checkName(name, nameInputCon, nameSignUpError);
//         checkEmail(email, emailInputCon, emailSignUpError);
//         checkPassword(password1, passwordInputCon, password1SignUpError);
//         checkPasswordConfirm(password2, passwordConfimInputCon, password2SignUpError);
//         return;
//     }
// }


// function checkName(name, nameInputCon, nameSignUpError) {
//     if (!name) {
//         nameInputCon.classList.remove('margin');
//         nameSignUpError.classList.remove('d-none');
//         nameSignUpError.innerHTML = `Please enter a name`;
//     } else {
//         nameInputCon.classList.add('margin');
//         nameSignUpError.classList.add('d-none');
//     }
// }


// function checkEmail(email, emailInputCon, emailSignUpError) {
//     if (!email) {
//         emailInputCon.classList.remove('margin');
//         emailSignUpError.classList.remove('d-none');
//         emailSignUpError.innerHTML = `Please enter an email`;
//     } else if (!isValidEmail(email)) {
//         emailInputCon.classList.remove('margin');
//         emailSignUpError.classList.remove('d-none');
//         emailSignUpError.innerHTML = `Please enter a valid email address`;
//     } else {
//         emailSignUpError.classList.add('d-none');
//         emailInputCon.classList.add('margin');
//     }
// }


// function checkPassword(password1, passwordInputCon, password1SignUpError) {
//     if (!password1) {
//         passwordInputCon.classList.remove('margin');
//         passwordInputCon.classList.add('margin-empty');
//         password1SignUpError.classList.remove('d-none');
//         password1SignUpError.innerHTML = `Please enter a password`;
//     } else {
//         passwordInputCon.classList.add('margin');
//         passwordInputCon.classList.remove('margin-empty');
//         password1SignUpError.classList.add('d-none');
//     }
// }


// function checkPasswordConfirm(password2, passwordConfimInputCon, password2SignUpError) {
//     if (!password2) {
//         passwordConfimInputCon.classList.remove('margin-privacy');
//         passwordConfimInputCon.classList.remove('margin-top');
//         passwordConfimInputCon.classList.add('margin-empty');
//         passwordConfimInputCon.classList.add('margin-bottom');
//         password2SignUpError.classList.remove('d-none');
//         password2SignUpError.innerHTML = `Please confirm your password`;
//     } else {
//         passwordConfimInputCon.classList.add('margin-privacy');
//         passwordConfimInputCon.classList.add('margin-top');
//         passwordConfimInputCon.classList.remove('margin-empty');
//         passwordConfimInputCon.classList.remove('margin-bottom');
//         password2SignUpError.classList.add('d-none');
//     }
// }


// function isValidEmail(email) {
//     const emailRegex = /\S+@\S+\.(com|de)/;
//     return emailRegex.test(email);
// }


// function addNewUserToArray() {
//     let name = document.getElementById('nameInput').value;
//     let email = document.getElementById('emailInput').value;
//     let password = document.getElementById('passwordInput').value;

//     let newUser = {
//         'name': name,
//         'email': email,
//         'password': password,
//     };

//     actualUser.push(newUser);
// }