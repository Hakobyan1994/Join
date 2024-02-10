
let locRes = JSON.parse(localStorage.getItem('activUser'))

if (locRes) {
    user = locRes 
    console.log(user.name);
} 
 
 let profilName=document.querySelector('.greetingName')
 profilName.innerText=user.name