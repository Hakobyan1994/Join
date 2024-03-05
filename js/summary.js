let arrayUrgent = [
  {
    priority: [],
    date: []
  }
];


let locRes = JSON.parse(localStorage.getItem('activeUser'));
if (locRes) {
  localStorage.removeItem('guestsUser');
  console.log(locRes);
  let profilName = document.querySelector('.greetingName');
  profilName.innerText = locRes.name
}


let guestsUsing = JSON.parse(localStorage.getItem('guestsUser'))
if (guestsUsing) {
  let profilName = document.querySelector('.greetingName')
  profilName.innerText = guestsUsing[0].name
  let greetingForUser = document.querySelector('.greeting')
  greetingForUser.innerText = guestsUsing[0].greeting
  document.getElementById('profil_name').classList.remove('profil_name')
  document.getElementById('profil_name').classList.add('guestsGreeting')
}




/*
const currentDate = new Date();


function dateUpdate() {
  let montUndDay = document.getElementById('date');

  // Monatsnamen extrahieren
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  montUndDay.innerText += `${currentDate.getDate()}, ${monthName} ${currentDate.getFullYear()}`;
}

  function timer() {
    setTimeout(() => {
  }, "100");
}
*/

async function renderSummaryMain() {
  let content = document.getElementById('render-summary');
  content.innerHTML = '';
  content.innerHTML = generateHtmlSummary();
  await loadTasks();
  await getValue();
  displayGreeting();
}


async function getValue() {
  await loadTasks();

  let valueTodo = 0;
  let valueProgress = 0;
  let valueFeedback = 0;
  let valueDone = 0;
  let valueUrgent = 0;

  if(tasks.length > 0) {
    document.getElementById('value-total').innerHTML = tasks.length;
  } else {
    document.getElementById('value-total').innerHTML = '0';
  }


  for (let i = 0; i < tasks.length; i++) {
    const state = tasks[i].status;
    const priotity = tasks[i].priority;

    if (state === 'board-to-do') {
      valueTodo++;
    }
    if (state === 'board-in-progress') {
      valueProgress++;
    }
    if (state === 'board-await-feedback') {
      valueFeedback++;
    }
    if (state === 'board-done') {
      valueDone++;
    }
    if (priotity === 'urgent') {
      valueUrgent++;
    }
  }

  document.getElementById('value-todoarray').innerHTML = valueTodo;
  document.getElementById('value-progressarray').innerHTML = valueProgress;
  document.getElementById('value-feedbackarray').innerHTML = valueFeedback;
  document.getElementById('value-donearray').innerHTML = valueDone;
  document.getElementById('value-urgent').innerHTML = valueUrgent;

  getUrgentDate();
}

function getUrgentDate() {
  arrayUrgent = [];

  for (let j = 0; j < tasks.length; j++) {
    const array = tasks[j].priority;
    const date = tasks[j].date;
    if (array === 'urgent') {
      arrayUrgent.push(date);
    } else {
      console.log('not found a urgent pos');
    }
  }
  deleteOldUrgent();
  validateUpcomingDeadline();
}


function deleteOldUrgent() {
  let dateArray = arrayUrgent.map(urgentString => {
    let [day, month, year] = urgentString.split('/').map(Number);
    return new Date(year, month - 1, day);
  });
  let earliestDate = new Date(Math.min(...dateArray));
  console.log(earliestDate);
  if (earliestDate < new Date()) {
    arrayUrgent.splice(earliestDate);
  } else {
    console.log('all tasks have no expired upcoming deadline ');
  }

}


function actualDate() {
  let date = new Date();
  let day = date.getDate();
  console.log(day);
}


function validateUpcomingDeadline() {
  let dateDiv = document.getElementById('urgentDate');

  if (arrayUrgent.length === 0) {
    dateDiv.innerHTML = '-';
  } else if (arrayUrgent.length > -1) {
    dateDiv.innerHTML = defineUpcomingDeadline();
  }
}


function defineUpcomingDeadline() {
  let dateArray = arrayUrgent.map(urgentString => {
    let [day, month, year] = urgentString.split('/').map(Number);
    return new Date(year, month - 1, day);
  });
  let earliestDate = new Date(Math.min(...dateArray));
  let formattedDate = earliestDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  return formattedDate;
}


function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning,";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Good afternoon,";
  } else {
    greeting = "Good evening,";
  }

  return greeting;
}


function displayGreeting() {
  const greetingContainer = document.getElementById('timeOfDay');
  const greeting = getGreeting();
  greetingContainer.textContent = greeting;
}


