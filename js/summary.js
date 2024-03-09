let loggedInUser = [];


let arrayUrgent = [
  {
    priority: [],
    date: []
  }
];

/*
let locRes = JSON.parse(localStorage.getItem('activeUser'));
if (locRes) {
  localStorage.removeItem('guestsUser');
  console.log(locRes);
  let profilName = document.querySelector('.greetingName');
  profilName.innerText = locRes.name
}
activeUser.push(locRes);
*/


async function getItem(key) {
  const url = `https://remote-storage.developerakademie.org/item?key=${key}&token=MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ`;
  return fetch(url).then(res => res.json()).then(res => {
      if (res.data) {
          return JSON.parse(res.data.value);
      } throw `Could not find data with key "${key}".`;
  });
}

async function user(params) {
  const user = await getItem('activeUser')
  if (user) {
    let profilName = document.querySelector('.greetingName')
    profilName.innerText = user[0].name
    let greetingForUser = document.querySelector('.greeting')
    greetingForUser.innerText = guestsUsing[0].greeting
    document.getElementById('profil_name').classList.remove('profil_name')
    document.getElementById('profil_name').classList.add('guestsGreeting')
  }
}

user()

// let guestsUsing = JSON.parse(localStorage.getItem('guestsUser'))



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

  if (tasks.length > 0) {
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


async function loadLoggedInUser() {
  loggedInUser = JSON.parse(await getItem('userData'));
}


async function displayGreeting() {
  let greetingTimeCon = document.getElementById('timeOfDay');
  let greetingNameCon = document.getElementById('greetingName');
  let greetingData = await getGreeting();
  greetingTimeCon.textContent = greetingData.time;
  greetingNameCon.textContent = greetingData.name;
}


async function getGreeting() {
  await loadLoggedInUser();
  const now = new Date();
  const hour = now.getHours();
  let greetingTime = '';

  if (hour >= 5 && hour < 12) {
      greetingTime = `Good morning,`;
  } else if (hour >= 12 && hour < 18) {
      greetingTime = `Good afternoon,`;
  } else {
      greetingTime = `Good evening,`;
  }

  const capitalizedFullName = greetingNameToUpperCaser(loggedInUser.name);

  return { time: greetingTime, name: capitalizedFullName };
}


function greetingNameToUpperCaser(name) {
  const nameWords = name.split(' ');
  const capitalizedNames = nameWords.map(capitalizeFirstLetter);
  return capitalizedNames.join(' ');
}


function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}