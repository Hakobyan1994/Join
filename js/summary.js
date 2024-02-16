

let logGuest=JSON.parse(localStorage.getItem('guestuser'))

 

   
let locRes = JSON.parse(localStorage.getItem('activUser'))

if (locRes) {
    user = locRes 
    console.log(user);
} 
 
 let profilName=document.querySelector('.greetingName')
 profilName.innerText=user.name

 const currentDate = new Date();

function dateUpdate() {
  let montUndDay = document.getElementById('datum');
  
  // Monatsnamen extrahieren
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  montUndDay.innerText += `${currentDate.getDate()}, ${monthName} ${currentDate.getFullYear()}`;
}
dateUpdate();


  
