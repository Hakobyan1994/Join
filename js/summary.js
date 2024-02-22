
let locRes = JSON.parse(localStorage.getItem('activeUser'));
let user={};
if (locRes) {
  user = locRes;
  console.log(user);
}

let valueTodo = 0;
let valueProgress = 0;
let valueFeedback = 0;
let valueDone = 0;
let valueTotal = 0;
let valueUrgent = 0;
let arrayUrgent = [];

// Profilname aktualisieren
let profilName = document.querySelector('.greetingName');
profilName.innerText = user.name;

const currentDate = new Date();


function dateUpdate() {
  let montUndDay = document.getElementById('date');

  // Monatsnamen extrahieren
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  montUndDay.innerText += `${currentDate.getDate()}, ${monthName} ${currentDate.getFullYear()}`;
}

  function timer() {
    setTimeout(() => {
      loadSelectedPage();
  }, "100");
}



async function getValue() {
  tasks = JSON.parse(await getItem('tasks')) || [];
        if (!Array.isArray(tasks)) {
          tasks = [];
        } 

  for (let i = 0; i < tasks.length; i++) {
    const state = tasks[i].status;
    const priotity = tasks[i].priority;
    document.getElementById('value-total').innerHTML = tasks.length;
    if(state === 'board-to-do') {
      valueTodo++;
      document.getElementById('value-todoarray').innerHTML = valueTodo;
    } else {
      document.getElementById('value-todoarray').innerHTML = valueTodo;
    }
    if(state === 'board-in-progress') {
      valueProgress++;
      document.getElementById('value-progressarray').innerHTML = valueProgress;
    } else {
      document.getElementById('value-progressarray').innerHTML = valueProgress;
    }
    if(state === 'board-await-feedback') {
      valueFeedback++;
      document.getElementById('value-feedbackarray').innerHTML = valueFeedback;
    } else {
      document.getElementById('value-feedbackarray').innerHTML = valueFeedback;
    }
    if(state === 'board-done') {
      valueDone++;
      document.getElementById('value-donearray').innerHTML = valueDone;
    } else {
      document.getElementById('value-donearray').innerHTML = valueDone;
    }
    if(priotity === 'urgent') {
      valueUrgent++;
      document.getElementById('value-urgent').innerHTML = valueUrgent;
    } else {
      document.getElementById('value-urgent').innerHTML = valueUrgent;
    }
    
  }
  getUrgentDate();
}

function getUrgentDate() {
  let dateDiv = document.getElementById('date');

  for (let j = 0; j < tasks.length; j++) {
    const array = tasks[j].priority;
    const date = tasks[j].date;
    console.log(array);
    console.log(date);
    if(array === 'urgent') {
      arrayUrgent.push(tasks[j]);
      console.log(arrayUrgent);
    } else {
      console.log('not found a urgent pos');
    }
  }
  validateUpcomingDeadline();
}

function validateUpcomingDeadline() {
  let dateDiv = document.getElementById('date');

  if(arrayUrgent.length === 0) {
    console.log('not found');
  } else if(arrayUrgent.length > -1) {
    dateDiv.innerHTML = arrayUrgent[0].date;
  } else {
    dateDiv.innerHTML = '-';
  }
}








