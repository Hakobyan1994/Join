const signUp = document.getElementById('signUp');
const check = document.getElementById('checkbox');
const trasparenterDiv = document.querySelector('.trasparenter_div');
const responsiveInfo = document.getElementById('responsiveInfo')
check.onchange = () => check.value === 'no' ? check.value = 'yes' : check.value = 'no';
signUp.onsubmit = onsubmitFor

// const STORAGE_TOKEN1 = 'MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ';
// const STORAGE_URL1 = 'https://remote-storage.developerakademie.org/item';

async function signUpItem(key, value) {
    const payload = { key, value, token:'MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ' };
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
async function signUpgetUsers(params) {
    let res = await signUpgetItem('dataUsers')
  
    if (res[0] !== null) {
        dataUsers = res
        console.log(dataUsers, 555);
    }
}
// setItem('dataUsers', JSON.stringify(dataUsers) )
signUpgetUsers()





function addtoLocal(arr, key) {
    console.log(dataUsers, 'ggggg');
    signUpItem('dataUsers', dataUsers)
}


function onsubmitFor(e) {
    console.log(e);
    e.preventDefault()
    let name = e.target[0].value
    let email = e.target[1].value
    let password = e.target[2].value
    let confirmPassword = e.target[3].value
    let checkBox = e.target[4].value
    // let btn = e.target[5]44
    if (name && email && password && confirmPassword && checkBox === 'yes') {
        let userData = { name, email, password, confirmPassword };
      
        validForm({ name, email, password, confirmPassword }, e)
    } else {
        check.value === 'no'
        document.getElementById('errorPassword').innerText = 'Please accept the privacy policy!'
    }
}


function validForm({ name, email, password, confirmPassword }, e) {
    console.log(password.includes(confirmPassword));
    if (password.includes(confirmPassword)) {
        let user = dataUsers.find((el) => el.email === email)
        if (user) {
            document.getElementById('errorPassword').innerText = 'The email is already registered'//
        } else {
            dataUsers.push({ name, email, password, id: new Date().getTime() })
            addtoLocal(dataUsers, 'dataUsers')
            if (window.innerWidth <= 400) {
                responsiveInfo.classList.add('active')
                setTimeout(function () {
                    responsiveInfo.classList.remove('active')
                    window.location.href = '../index.html';
                }, 2000)
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


