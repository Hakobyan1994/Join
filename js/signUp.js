const signUp = document.getElementById('signUp');
const check = document.getElementById('checkbox');
const trasparenterDiv = document.querySelector('.trasparenter_div');
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

function onsubmitFor(e) {
    console.log(e);
    e.preventDefault()
    let name = e.target[0].value
    let email = e.target[1].value
    let password = e.target[2].value
    let confirmPassword = e.target[3].value
    let checkBox = e.target[4].value
    // let btn = e.target[5]
    if (name && email && password && confirmPassword && checkBox === 'yes') {
        validForm({ name, email, password, confirmPassword }, e)

    }
}




function validForm({ name, email, password, confirmPassword }, e) {
    console.log(password.includes(confirmPassword));
    if (password.includes(confirmPassword)) {
        let user = dataUser.find((el) => el.email === email)
        if (user) {
            alert('Die Email ist schon angemeldet')
        } else {
            dataUser.push({ name, email, password, id: new Date().getTime() })
            addtoLocal(dataUser, 'datareg')

            check.value = 'yes';
            trasparenterDiv.style.display = 'flex';
            window.location.href = 'login.html'
        }

    } else {
        e.target[3].style.border = '4px solid red';
        document.getElementById('erroMesagePas').innerHTML = 'Error';
    }

}

let backPicture = document.querySelector('.backLogin_picture')
backPicture.onclick = backToRegister;

function backToRegister() {
    window.location.href = 'login.html'
}







