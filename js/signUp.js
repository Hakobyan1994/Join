const signUp = document.getElementById('signUp');
const check = document.getElementById('checkbox');
const trasparenterDiv = document.querySelector('.trasparenter_div');
const responsiveInfo = document.getElementById('responsiveInfo')
check.onchange = () => check.value === 'no' ? check.value = 'yes' : check.value = 'no';
signUp.onsubmit = onsubmitFor



async function signUpsetItem(key, value) {
    const payload = { key, value, token: 'MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ' };
    return fetch('https://remote-storage.developerakademie.org/item', { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json())
}


async function signUpgetItem(key) {
    const url = `https://remote-storage.developerakademie.org/item?key=${key}&token=MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return JSON.parse(res.data.value);
        } throw `Could not find data with key "${key}".`;
    });
}


let dataUsers = []
async function getUsers(params) {
    let res = await signUpgetItem('dataUsers')

    if (res[0] !== null) {
        dataUsers = res
        console.log(dataUsers, 555);
    }
}
getUsers()


function addtoLocal(arr, key) {
    console.log(dataUsers, 'ggggg');
    signUpsetItem('dataUsers', dataUsers)
}


async function onsubmitFor(e) {
    console.log(e);
    e.preventDefault();
    let name = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let confirmPassword = e.target[3].value;
    let checkBox = e.target[4].checked;
    if (name && email && password && confirmPassword && checkBox) {
        let userData = { name, email, password, confirmPassword };
        addtoLocal(dataUsers, 'dataUsers');
        validForm({ name, email, password, confirmPassword }, e)
    } else {
        checkSignUpInputs();
        if (!checkBox) {
            document.getElementById('errorPassword').innerText = 'Please accept the privacy policy';
        } else {
            check.value = 'yes';
            document.getElementById('errorPassword').innerText = '';
        }
    }
}


function validForm({ name, email, password, confirmPassword }, e) {
    let checkEmailregex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(?:de|com)$/;


    // Überprüfe, ob die E-Mail-Adresse mit einem Punkt endet
    if (checkEmailregex.test(email) && (email.endsWith('.com') || email.endsWith('.de'))) {
        console.log('ok');

        if (password.includes(confirmPassword)) {
            let user = dataUsers.find((el) => el.email === email);
            if (user) {
                showError('The email is already registered');
            } else {
                dataUsers.push({ name, email, password, id: new Date().getTime() });
                addtoLocal(dataUsers, 'dataUsers');
                if (window.innerWidth <= 500) {
                    responsiveInfo.classList.add('active');
                    setTimeout(function () {
                        responsiveInfo.classList.remove('active');
                        window.location.href = '../index.html';
                    }, 2000);
                } else {
                    trasparenterDiv.style.display = 'flex';
                    setTimeout(function () {
                        trasparenterDiv.style.display = 'none';
                        window.location.href = '../index.html'
                    }, 2000);
                }
            }
        } else {
            document.getElementById('errorPasswordSecond').innerText = 'The Password is not correct'
        }
    } else if (email.endsWith('.') || email.endsWith('@')) { // Neue Bedingung für die Überprüfung
        showError('Please enter a valid email without "@" or "." at the end');
    } else {
        showError('Please enter a valid email ending with .de or .com');
    }
}



function showError(message) {
    document.getElementById('errorPassword').innerText = message;

}



let backPicture = document.querySelector('.backLogin_picture')
backPicture.onclick = backToRegister;


function backToRegister() {
    JSON.parse(localStorage.getItem('stop'))
    window.location.href = '../index.html';
}


document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password1Input');
    const passwordImage = document.getElementById('passwordBlock')
    passwordInput.addEventListener('input', function () {
        if (passwordInput.value.trim() !== '') {
            passwordImage.src = '../assets/img/anmeldung Image/blockPassword.svg'
            passwordImage.onclick = function () {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text'
                    passwordImage.src = '../assets/img/anmeldung Image/passwordLock.svg'
                } else {
                    passwordInput.type = 'password'
                    passwordImage.src = '../assets/img/anmeldung Image/blockPassword.svg'
                }
            }
        } else {
            passwordInput.value.trim() === ''
            passwordImage.src = '../assets/img/anmeldung Image/lock.png'
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const confirmInput = document.getElementById('confirmInput');
    const confirmImage = document.getElementById('confirmBlock')
    confirmInput.addEventListener('input', function () {
        if (confirmInput.value.trim() !== '') {
            confirmImage.src = '../assets/img/anmeldung Image/blockPassword.svg'
            confirmImage.onclick = function () {
                if (confirmInput.type === 'password') {
                    confirmInput.type = 'text'
                    confirmImage.src = '../assets/img/anmeldung Image/passwordLock.svg'
                } else {
                    confirmInput.type = 'password'
                    confirmImage.src = '../assets/img/anmeldung Image/blockPassword.svg'
                }
            }
        }
        else {
            confirmInput.value.trim() === ''
            confirmImage.src = '../assets/img/anmeldung Image/lock.png'
        }
    })
});


function checkSignUpInputs() {
    let name = document.getElementById('nameInput').value;
    let email = document.getElementById('emailInput').value;
    let password1 = document.getElementById('password1Input').value;
    let password2 = document.getElementById('confirmInput').value;

    let nameInputCon = document.getElementById('personInput');
    let emailInputCon = document.getElementById('emailInputCon');
    let passwordInputCon = document.getElementById('passwordInputCon');
    let passwordConfimInputCon = document.getElementById('passwordConfirmInput');

    let nameSignUpError = document.getElementById('inputErrorSignUpName');
    let emailSignUpError = document.getElementById('inputErrorSignUpEmail');
    let password1SignUpError = document.getElementById('inputErrorSignUpPassword1');
    let password2SignUpError = document.getElementById('inputErrorSignUpPassword2');

    checkSignUpHelp(name, email, password1, password2, nameSignUpError, emailSignUpError, password1SignUpError, password2SignUpError, nameInputCon, emailInputCon, passwordInputCon, passwordConfimInputCon);
}


function checkSignUpHelp(name, email, password1, password2, nameSignUpError, emailSignUpError, password1SignUpError, password2SignUpError, nameInputCon, emailInputCon, passwordInputCon, passwordConfimInputCon) {
    if (!name || !email || !password1 || !password2) {
        checkName(name, nameInputCon, nameSignUpError);
        checkEmail(email, emailInputCon, emailSignUpError);
        checkPassword(password1, passwordInputCon, password1SignUpError);
        checkPasswordConfirm(password2, passwordConfimInputCon, password2SignUpError);
        return;
    }
}


function checkName(name, nameInputCon, nameSignUpError) {
    if (!name) {
        nameInputCon.classList.remove('margin');
        nameSignUpError.classList.remove('d-none');
        nameSignUpError.innerHTML = `Please enter a name`;
    } else {
        nameInputCon.classList.add('margin');
        nameSignUpError.classList.add('d-none');
    }
}


function checkEmail(email, emailInputCon, emailSignUpError) {
    if (!email) {
        emailInputCon.classList.remove('margin');
        emailSignUpError.classList.remove('d-none');
        emailSignUpError.innerHTML = `Please enter an email`;
    } else if (!email.includes('.com') && !email.includes('.de') && !email.endsWith('.')) {
        emailInputCon.classList.remove('margin');
        emailSignUpError.classList.remove('d-none');
        emailSignUpError.innerHTML = `Please enter a valid email address`;
    } else {
        emailSignUpError.classList.add('d-none');
        emailInputCon.classList.add('margin');
    }
}


function checkPassword(password1, passwordInputCon, password1SignUpError) {
    if (!password1) {
        passwordInputCon.classList.remove('margin');
        passwordInputCon.classList.add('margin-empty');
        password1SignUpError.classList.remove('d-none');
        password1SignUpError.innerHTML = `Please enter a password`;
    } else {
        passwordInputCon.classList.add('margin');
        passwordInputCon.classList.remove('margin-empty');
        password1SignUpError.classList.add('d-none');
    }
}


function checkPasswordConfirm(password2, passwordConfimInputCon, password2SignUpError) {
    if (!password2) {
        passwordConfimInputCon.classList.remove('margin-privacy');
        passwordConfimInputCon.classList.remove('margin-top');
        passwordConfimInputCon.classList.add('margin-empty');
        passwordConfimInputCon.classList.add('margin-bottom');
        password2SignUpError.classList.remove('d-none');
        password2SignUpError.innerHTML = `Please confirm your password`;
    } else {
        passwordConfimInputCon.classList.add('margin-privacy');
        passwordConfimInputCon.classList.add('margin-top');
        passwordConfimInputCon.classList.remove('margin-empty');
        passwordConfimInputCon.classList.remove('margin-bottom');
        password2SignUpError.classList.add('d-none');
    }
}