

let dataUser = []
let dataLocal = JSON.parse(localStorage.getItem('datareg'))
if (dataLocal) {
    dataUser = dataLocal
}
console.log(dataUser);
let form_log = document.getElementById('form_log');
form_log.onsubmit = validLogin;
let checkBox = document.getElementById('checkBox')
checkBox.checked

    

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
            window.location.href = "/files/summary.html";
        } else if (status === 'Error Password' || status === 'Email not found') {
            checkBox.checked = false;
            document.getElementById('email').style.border = `1px solid red`;
            document.getElementById('password').style.border = `1px solid red`;
        }
    }
}



   

document.addEventListener('DOMContentLoaded',function(){
 const passwordInput=document.getElementById('password')
 const inputImage=document.getElementById('imageInput')
  passwordInput.addEventListener('input',function(){
   if(passwordInput.value!==''){
    inputImage.src='/assets/img/anmeldung Image/blockPassword.svg'
    inputImage.onclick=function(){
       if(passwordInput.type==='password'){
         passwordInput.type='text'
         inputImage.src='/assets/img/anmeldung Image/passwordLock.svg'
       }else{
          passwordInput.type='password'
          inputImage.src='/assets/img/anmeldung Image/blockPassword.svg'
       }
    }
   }else{
     inputImage.src='/assets/img/anmeldung Image/lock.png'
   }
  })    
})   
  
    


// window.addEventListener('load', () => {
//     if (document.querySelector('#animationDiv') !== null) {
//       window.sessionStorage.setItem('animationDiv', 'displayed');
//     }
//   })
    
//   if (window.sessionStorage.getItem('animationDiv')) {
//     document.querySelector('#heading').classList.remove('anim_div')
//   }
   

window.addEventListener('load', () => {
  if (document.querySelector('#animationDiv') !== null) {
      window.sessionStorage.setItem('animationDiv', 'displayed');
  }
});

const animationDiv = document.querySelector('#animationDiv');
const joinImage = document.querySelector('.join_image');

if (window.sessionStorage.getItem('animationDiv')) {
  animationDiv.classList.add('paused');
  joinImage.classList.add('paused'); // Füge die Klasse 'paused' hinzu, um die Animation zu pausieren
}

animationDiv.addEventListener('animationend', function () {
  animationDiv.classList.add('paused');
  joinImage.classList.add('paused'); // Füge die Klasse 'paused' hinzu, um die Animation zu pausieren
  window.sessionStorage.setItem('animationDiv', 'displayed');
});
   
 

function activUser(arr){
    localStorage.setItem('activeUser',JSON.stringify(arr));
 }  


   