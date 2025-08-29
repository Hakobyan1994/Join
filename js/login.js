
let userGuests = [
    {
        name: '',
        greet: 'Good Morning'
    }
];
// let dataUser = [];
// console.log(dataUser)
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
 
  
window.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('rememberEmail');
    const savedPassword = localStorage.getItem('rememberPassword');
    const secretKey = 'BossSecretKey123';
    if (!emailInput || !passwordInput || !checkBox) return;
    if (savedEmail && savedPassword) { 
        const decryptedPassword = CryptoJS.AES.decrypt(savedPassword, secretKey).toString(CryptoJS.enc.Utf8);
        emailInput.value = savedEmail;
        passwordInput.value = decryptedPassword;
        checkBox.checked = true;
        showPassword();
    }
});
 


function showUserdata() {
    const email = emailInput.value;
    const password = passwordInput.value;
    const secretKey = 'BossSecretKey123';
    if (checkBox.checked) {
        const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
        localStorage.setItem('rememberEmail', email);
        localStorage.setItem('rememberPassword', encryptedPassword);
        passwordInput.addEventListener('input', showPassword);
    } else {
        removeStorageItems();
        passwordInput.addEventListener('input', passwordBlock())
    }
} 
  

 function removeStorageItems(){
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');
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
  

async function validLogin(e) {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    if (email && password) {
        try {
            const response = await fetch('https://api.my-join-app.com/user_auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('currentUser', JSON.stringify({
                    username: data.username,
                    email: data.email
                }));
                checkout=true;
                window.location.href = "../files/start.html";
            } else {
                document.getElementById('emailLogIn').style.border = `1px solid red`;
                document.getElementById('passwordLogIn').style.border = `1px solid red`;
                document.querySelector('#errorMessage').innerText = 'The password or Email is not correct';
                document.getElementById('imageInput').classList.add('passwordImageError');
            }
        } catch (error) {
            showError('Serverfehler beim Login');
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