const signUp = document.getElementById('signUp');
const check = document.getElementById('checkbox');
check.onchange = () => check.value === 'no' ? check.value = 'yes' : check.value = 'no' ;
signUp.onsubmit = onsubmitFor

let dataUser = []
let dataLocal = JSON.parse(localStorage.getItem('datareg'))
if(dataLocal){
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
    if (name && email && password && confirmPassword && checkBox==='yes') {
        validForm({ name, email, password, confirmPassword }, e)
       
    }
} 
    

function validForm({ name, email, password, confirmPassword }, e) {
    if (password.includes(confirmPassword )) {
        dataUser.push({ name, email, password, id: new Date().getTime() })
        addtoLocal(dataUser, 'datareg')
        check.value='yes';
        window.location.href = 'login.html'
    } else {
        e.target[3].style.border = '4px solid red';
        document.getElementById('erroMesagePas').innerHTML = 'Error';
    }
    
} 




