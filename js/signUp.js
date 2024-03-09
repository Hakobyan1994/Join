const signUp = document.getElementById('signUp');
const check = document.getElementById('checkbox');
const trasparenterDiv = document.querySelector('.trasparenter_div');
const responsiveInfo = document.getElementById('responsiveInfo')
check.onchange = () => check.value === 'no' ? check.value = 'yes' : check.value = 'no';
signUp.onsubmit = onsubmitFor


let dataUser = []
let dataLocal = JSON.parse(localStorage.getItem('datareg'))
if (dataLocal) {
    dataUser = dataLocal
}


function addtoLocal(arr, key) {
    console.log('addLoc');
    localStorage.setItem(key, JSON.stringify(arr))
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
        await setItem('userData', JSON.stringify(userData));
        validForm({ name, email, password, confirmPassword }, e);
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
    console.log(password.includes(confirmPassword));
    if (password.includes(confirmPassword)) {
        let user = dataUser.find((el) => el.email === email)
        if (user) {
            document.getElementById('errorPassword').innerText = 'The email is already registered'//
        } else {
            dataUser.push({ name, email, password, id: new Date().getTime() })
            addtoLocal(dataUser, 'datareg')
            if (window.innerWidth <= 400) {
                responsiveInfo.classList.add('active')
                setTimeout(function () {
                    responsiveInfo.classList.remove('active')
                    window.location.href = '../index.html';
                }, 2000)
                // Code für den Fall, dass die Fensterbreite 600 Pixel oder weniger beträgt
                console.log("Kleiner als 400px");
            } else {
                trasparenterDiv.style.display = 'flex';
                setTimeout(function () {
                    trasparenterDiv.style.display = 'none';
                    window.location.href = '../index.html'
                }, 2000)
            }
        }
    } else {
        e.target[3].style.border = '4px solid red';
        document.getElementById('errorPassword').innerText = 'The password is not corect';
    }
}


let backPicture = document.querySelector('.backLogin_picture')
backPicture.onclick = backToRegister;


function backToRegister() {
    JSON.parse(localStorage.getItem('stop'))
    window.location.href = '../index.html';
}


document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('passwordInput');
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
    let emailInputCon = document.getElementById('emailInput');
    let passwordInputCon = document.getElementById('passwordInputCon');
    let passwordConfimInputCon = document.getElementById('passwordConfirmInput');

    let nameSignUpError = document.getElementById('inputErrorSignUpName');
    let emailSignUpError = document.getElementById('inputErrorSignUpEmail');
    let password1SignUpError = document.getElementById('inputErrorSignUpPassword1');
    let password2SignUpError = document.getElementById('inputErrorSignUpPassword2');

    checkSignUpHelp(name, email, password1, password2, nameSignUpError, emailSignUpError, password1SignUpError, password2SignUpError, nameInputCon, emailInputCon, passwordInputCon, passwordConfimInputCon);
}

function checkSignUpHelp(name, email, password1, password2, nameSignUpError, emailSignUpError, password1SignUpError, password2SignUpError, nameInputCon, emailInputCon, passwordInputCon, passwordConfimInputCon) {
    if (!name) {
        nameInputCon.classList.remove('margin');
        nameSignUpError.classList.remove('d-none');
        nameSignUpError.innerHTML = `Please enter a name`;
    } else {
        nameSignUpError.classList.add('d-none');
    }

    if (!email) {
        emailInputCon.classList.remove('margin');
        emailSignUpError.classList.remove('d-none');
        emailSignUpError.innerHTML = `Please enter an email`;
    } else {
        emailSignUpError.classList.add('d-none');
    }

    if (!password1) {
        passwordInputCon.classList.remove('margin');
        passwordInputCon.classList.add('margin-empty');
        password1SignUpError.classList.remove('d-none');
        password1SignUpError.innerHTML = `Please enter a password`;
    } else {
        password1SignUpError.classList.add('d-none');
    }

    if (!password2) {
        passwordConfimInputCon.classList.remove('margin-privacy');
        passwordConfimInputCon.classList.remove('margin-top');
        passwordConfimInputCon.classList.add('margin-empty');
        passwordConfimInputCon.classList.add('margin-bottom');
        password2SignUpError.classList.remove('d-none');
        password2SignUpError.innerHTML = `Please confirm your password`;
    } else {
        password2SignUpError.classList.add('d-none');
    }

    if (!name || !email || !password1 || !password2) {
        return;
    }
}
