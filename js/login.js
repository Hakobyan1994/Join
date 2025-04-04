let userGuests = [
    {
        name: '',
        greet: 'Good Morning'
    }
];
let dataUser = [];
getUsers();
  



function logoAnimation() {
    let div = document.getElementById('animationDiv');
    let img = document.getElementById('logo-login');
    let stop = JSON.parse(localStorage.getItem('stop'));

    if (stop) {
        div.classList.remove('addAnimDiv');
        img.classList.remove('animation');

       
        img.classList.add('startParImg');
        div.classList.add('anim_div');
       
        img.classList.add('animation');
        div.classList.add('startParDiv');
        img.classList.remove('join_image');
        
        
        localStorage.removeItem('stop');
    }
     else {
        div.classList.add('startParDiv');
        img.classList.add('startParImg');
    }
    localStorage.setItem('stop', JSON.stringify(true));
    setTimeout(() => {
        div.classList.remove('startParDiv');
        div.classList.add('anim_div');
        img.classList.remove('startParImg');
        img.classList.add('join_image'); 
    }, 2000);
}

async function registerItem(key, value) {
    const payload = { key, value, token: 'MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ' };
    return fetch('https://remote-storage.developerakademie.org/item', { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json())
}


async function registergetItem(key) {
    const url = `https://remote-storage.developerakademie.org/item?key=${key}&token=MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return JSON.parse(res.data.value);
        } throw `Could not find data with key "${key}".`;
    });
}


async function getUsers(params) {
    let res = await registergetItem('dataUsers')
    if (res[0] !== null) {
        dataUser = res
    }
}


function activUser(arr) {
    registerItem('activeUser', [arr]);
}
  

let form_log = document.getElementById('form_log');
let checkBox = document.getElementById('checkBox');
let emailInput = document.getElementById('emailLogIn');
let passwordInput = document.getElementById('passwordLogIn');


function showUserdata() {
    if (checkBox.checked) {
        if (dataUser.length > 0) {
            const user = dataUser[dataUser.length - 1];
            emailInput.value = user.email;
            passwordInput.value = user.password;
            passwordInput.addEventListener('input', showPassword());
        }
    } else {
        emailInput.value = '';
        passwordInput.value = '';
        passwordInput.addEventListener('input', passwordBlock())
    }
}


function showPassword() {
    const inputImage = document.getElementById('imageInput')
    if (passwordInput.value !== '') {
        inputImage.src = '../assets/img/anmeldung Image/blockPassword.svg';
        inputImage.onclick = function () {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                inputImage.src = '../assets/img/anmeldung Image/passwordLock.svg';
            } else {
                passwordInput.type = 'password';
                inputImage.src = '../assets/img/anmeldung Image/blockPassword.svg';
            }
        };
    } else {
        inputImage.src = '../assets/img/anmeldung Image/lock.png';
    }
}


function passwordBlock() {
    const inputImage = document.getElementById('imageInput')
    if (passwordInput.value === '') {
        inputImage.src = '../assets/img/anmeldung Image/lock.png';
    }
}
     

function validateCheckbox() {
    checkBox.addEventListener('change', showUserdata);
    form_log.onsubmit = validLogin;
}
  

function validLogin(e) {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    let status = 'no';
    if (email && password) {
        let foundUser = dataUser.find((user) => user.email.includes(email));
        if (foundUser) {
            if (foundUser.password === password) {
                status = 'ok';
            } else {
                status = 'Error Password';
            }
        } else {
            status = 'Email not found';
        }
        if (status === 'ok') { 
           localStorage.clear()
            activUser(foundUser);
            
            window.location.href = "../files/start.html";
        } else if (status === 'Error Password' || status === 'Email not found') {
            checkBox.checked = false;
            document.getElementById('emailLogIn').style.border = `1px solid red`;
            document.getElementById('passwordLogIn').style.border = `1px solid red`;
            document.querySelector('#errorMessage').innerText = 'The password or Email is not correct';
            document.getElementById('imageInput').classList.add('passwordImageError');
        }
    }
}


function validatePassword() {
    document.addEventListener('DOMContentLoaded', function () {
        const passwordInput = document.getElementById('password')
        const inputImage = document.getElementById('imageInput')
        passwordInput.addEventListener('input', function () {
            if (passwordInput.value !== '') {
                inputImage.src = '../assets/img/anmeldung Image/blockPassword.svg'
                inputImage.onclick = function () {
                    if (passwordInput.type === 'password') {
                        passwordInput.type = 'text'
                        inputImage.src = '../assets/img/anmeldung Image/passwordLock.svg'
                    } else {
                        passwordInput.type = 'password'
                        inputImage.src = '../assets/img/anmeldung Image/blockPassword.svg'
                    }
                }
            } else {
                inputImage.src = '../assets/img/anmeldung Image/lock.png'
            }
            checkLogInInputs();
        })
    })
}
   
function emptyInputerrorMessage() {
    let input = document.getElementById('emailLogIn');
    let passwordInput = document.getElementById('passwordLogIn');
    let inputdiv = document.getElementById('div');
    let passworddiv = document.getElementById('passworEmptyInput');
     
    if (input.value === '' && passwordInput.value === '') {
        inputdiv.innerText = 'Please enter email';
        passworddiv.innerText = 'Please enter password';
    } else if (input.value === '') {
        inputdiv.innerText = 'Please enter email';
        passworddiv.innerText = '';
    } else if (passwordInput.value === '') {
        inputdiv.innerText = '';
        passworddiv.innerText = 'Please enter password';
    } else {
        inputdiv.innerText = '';
        passworddiv.innerText = '';
    }
}
     
  

function loginSetTimeout() {
    setTimeout(() => {
        localStorage.setItem('stop', JSON.stringify('stop'))
    }, 3000)
}



function guesButton() {
    forGuestUser('guestLogin', userGuests)
    window.location.href = '../files/start.html';
}


function forGuestUser(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr))
}


function checkLogInInputs() {
    let email = document.getElementById('emaillogIn').value;
    let password = document.getElementById('passwordlogIn').value;

    let emailInputCon = document.getElementById('logInEmailInputCon');
    let passwordInputCon = document.getElementById('logInPasswordInputCon');

    let emailErrorCon = document.getElementById('inputErrorLogInEmail');
    let passwordErrorCon = document.getElementById('inputErrorLogInPassword');

    checkLogInInputsHelp(email, password, emailInputCon, passwordInputCon, emailErrorCon, passwordErrorCon);
}


function checkLogInInputsHelp(email, password, emailInputCon, passwordInputCon, emailErrorCon, passwordErrorCon) {
    if (!email) {
        emailInputCon.classList.remove('margin');
        emailErrorCon.classList.remove('d-none');
        emailErrorCon.innerHTML = `Please enter an email`;
    } else if (!email.includes('.com') && !email.includes('.de') && !email.endsWith('.')) {
        emailInputCon.classList.remove('margin');
        emailErrorCon.classList.remove('d-none');
        emailErrorCon.innerHTML = `Please enter a valid email address`;
    } else {
        emailErrorCon.classList.add('d-none');
        emailInputCon.classList.add('margin');
    }

    if (!password) {
        passwordInputCon.classList.remove('margin');
        passwordInputCon.classList.add('margin-empty');
        passwordErrorCon.classList.remove('d-none');
        passwordErrorCon.innerHTML = `Please enter a password`;
    } else {
        passwordInputCon.classList.add('margin');
        passwordInputCon.classList.remove('margin-empty');
        passwordErrorCon.classList.add('d-none');
    }

    if (!email || !password) {
        return;
    }
}