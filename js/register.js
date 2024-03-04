
  
let userGuests = [
    {
        name: '',
        greeting: 'Good Morning'
    }
];
// console.log(userGuests[0].greeting);
   





let div = document.getElementById('animationDiv')
let img = document.getElementById('logo-login')
let stop = JSON.parse(localStorage.getItem('stop'))

// if (window.innerWidth <= 400) {
//     // img.src = "assets/img/anmeldung Image/logoPhone.png"
// }


if (stop) {
    div.classList.remove('addAnimDiv')
    img.classList.remove('animation')

    div.classList.add('anim_div')
    div.classList.remove('startParDiv')
    img.classList.remove('startParImg')
    img.classList.add('join_image')
}

setTimeout(() => {
    div.classList.remove('startParDiv')
    div.classList.add('anim_div')
    img.classList.remove('startParImg')
    img.classList.add('join_image')
   
},2000) 
setTimeout(() => {
    
    // img.src = "assets/img/anmeldung Image/join.png"
},3000) 




let dataUser = []
let dataLocal = JSON.parse(localStorage.getItem('datareg'))
if (dataLocal) {
    dataUser = dataLocal
}
console.log(dataUser);

let form_log = document.getElementById('form_log');
let checkBox = document.getElementById('checkBox');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
 

    function showUserdata(){
        if(checkBox.checked){
            if(dataUser.length>0){
                const user=dataUser[0];
                emailInput.value=user.email;
                passwordInput.value=user.password;
                passwordInput.addEventListener('input', showPassword());
            }
        }else{
            emailInput.value = '';
            passwordInput.value = '';
            passwordInput.addEventListener('input',passwordBlock())
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

       function passwordBlock(){  
        const inputImage = document.getElementById('imageInput')
         if(passwordInput.value===''){
            inputImage.src = '../assets/img/anmeldung Image/lock.png';
         }
       }
    
    checkBox.addEventListener('change', showUserdata);
    form_log.onsubmit = validLogin;


function validLogin(e) {
    e.preventDefault();
    let email = e.target[0].value;
    let password = e.target[1].value;
    let status = 'no';
    if (email && password) {
        const foundUser = dataUser.find((user) => user.email.includes(email));
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
            activUser(foundUser)
            window.location.href = "../files/summary.html";
        } else if (status === 'Error Password' || status === 'Email not found') {
            checkBox.checked = false;
            document.getElementById('email').style.border = `1px solid red`;
            document.getElementById('password').style.border = `1px solid red`;
            document.querySelector('#errorMessage').innerText = 'The password or Email is not correct';
            document.getElementById('imageInput').classList.add('passwordImageError');
        }
    }
}


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
    })
})


setTimeout(() => {
    localStorage.setItem('stop', JSON.stringify('stop'))
},3000)


function activUser(arr) {
    localStorage.setItem('activeUser', JSON.stringify(arr));
}

function guesButton() {
    localStorage.removeItem('activeUser');
    forGuestUser('guestsUser', userGuests);
    window.location.href = '../files/summary.html'
}


function forGuestUser(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr))
}