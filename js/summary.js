
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

function timer() {
  setTimeout(() => {
    loadSelectedPage();
}, "100");
}

function getValue() {
  let todo = document.getElementById('value-todoarray');
  let done = document.getElementById('value-donearray');
  let urgent = document.getElementById('value-urgent');
  let total = document.getElementById('value-total');
  let progress = document.getElementById('value-progressarray');
  let feedback = document.getElementById('value-feedbackarray');

  let valueTodo = todoArray.length;
  todo.innerHTML = `${valueTodo}`;
  let valueTotal = tasks.length;
  total.innerHTML = `${valueTotal}`;
  let valueDone = doneArray.length;
  done.innerHTML = `${valueDone}`;
}









