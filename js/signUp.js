const signUp = document.getElementById('signUp');
const check = document.getElementById('checkbox');
const trasparenterDiv = document.querySelector('.trasparenter_div');
const responsiveInfo = document.getElementById('responsiveInfo')
check.onchange = () => check.value === 'no' ? check.value = 'yes' : check.value = 'no';
signUp.onsubmit = onsubmitFor


let dataUsers = []
async function getUsers(params) {
    let res = await getItem('dataUsers')
    if (res[0] !== null) {
        dataUsers = res
        console.log(dataUsers, 555);
    }
}
getUsers();
function addtoLocal(arr, key) {
    console.log(dataUsers, 'ggggg');
    setItem('dataUsers', dataUsers)
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
        // checkSignUpInputs();
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