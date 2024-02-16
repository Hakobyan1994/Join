
let locRes = JSON.parse(localStorage.getItem('activeUser'));
let user={};
if (locRes) {
  user = locRes;
  console.log(user);
}

// Profilname aktualisieren
let profilName = document.querySelector('.greetingName');
profilName.innerText = user.name;

const currentDate = new Date();


function dateUpdate() {
  let montUndDay = document.getElementById('datum');

  // Monatsnamen extrahieren
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  montUndDay.innerText += `${currentDate.getDate()}, ${monthName} ${currentDate.getFullYear()}`;
}
dateUpdate();











