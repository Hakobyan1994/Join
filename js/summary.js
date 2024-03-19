let loggedInUser = [];
let nameActiveUser = [];
let arrayUrgent = [
  {
    priority: [],
    date: []
  }
];


let asguest = JSON.parse(localStorage.getItem('guestLogin'));


async function nameItem(key) {
  const url = `https://remote-storage.developerakademie.org/item?key=${key}&token=MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ`;
  return fetch(url).then(res => res.json()).then(res => {
    if (res.data) {
      return JSON.parse(res.data.value);
    } throw `Could not find data with key "${key}".`;
  });
}


async function user(params) {
  const responsiveExecuted = JSON.parse(localStorage.getItem('responsive'));
  const user = await nameItem('activeUser');

  // let time=document.getElementById('timeOfDay')
  if (user) {
    let profilName = document.querySelector('.greetingName');
    profilName.innerText = user[0].name;
    if (!responsiveExecuted && user && window.innerWidth <= 500) {
      let namesOfgreet = document.getElementById('namesGreetresp');
      let greetResponsive = document.getElementById('greetResponsive');
      greetResponsive.innerText = getGreetingText() + ','
      let transDiv = document.getElementById('transDivforResponsive');
      transDiv.style.display = 'flex';
      greetResponsive.style.display = 'flex';
      let name = user[0].name;
      let formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      namesOfgreet.innerText = formattedName;
      setTimeout(() => {
        setTimeforResponsive(transDiv, greetResponsive);
      }, 3000);
    }
    //  if(asguest){
    //    let profilName = document.querySelector('.greetingName');
    //    let time=document.getElementById('timeOfDay');
    //    profilName.style.display='none'
    //    time=document.getElementById('timeOfDay')
    //    time.style.marginTop='37px'
    //    let timeText = time.innerText;
    //    const timeReplace = timeText.replace(/,/g,'');
    //    time.innerText = timeReplace;

    if (asguest && window.innerWidth <= 500) {
      let namesOfgreet = document.getElementById('namesGreetresp')
      namesOfgreet.style.display = 'none'
      let greetResponsive = document.getElementById('greetResponsive');
      greetResponsive.innerText = getGreetingText() + '!'
    }
  }
}
// }
user()

function setTimeforResponsive(transDiv, greetResponsive) {
  transDiv.style.display = 'none';
  greetResponsive.style.display = 'none';
  localStorage.setItem('responsive', JSON.stringify(true));
}


function getGreetingText() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return 'Good morning,';
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon,';
  } else {
    return 'Good evening,';
  }
}


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
  let total = 0;


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
  total = valueTodo + valueProgress + valueFeedback;

  document.getElementById('value-todoarray').innerHTML = valueTodo;
  document.getElementById('value-progressarray').innerHTML = valueProgress;
  document.getElementById('value-feedbackarray').innerHTML = valueFeedback;
  document.getElementById('value-donearray').innerHTML = valueDone;
  document.getElementById('value-urgent').innerHTML = valueUrgent;

  if (total) {
    document.getElementById('value-total').innerHTML = `${total}`;
  } else if (total === 0) {
    document.getElementById('value-total').innerHTML = '0';
  }

  getUrgentDate();
}


function displayValue() {

}


function getUrgentDate() {
  arrayUrgent = [];

  for (let j = 0; j < tasks.length; j++) {
    let array = tasks[j].priority;
    let date = tasks[j].date;
    if (array === 'urgent') {
      arrayUrgent.push(date);
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
  if (earliestDate < new Date()) {
    arrayUrgent.splice(earliestDate);
  }
}


function actualDate() {
  let date = new Date();
  let day = date.getDate();
  let options = { month: 'long', day: 'numeric', year: 'numeric', };
  let formattedDate = date.toLocaleDateString('de-DE', options);
}
actualDate()


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


async function displayGreeting() {
  let greetingTimeCon = document.getElementById('timeOfDay');
  let greetingNameCon = document.getElementById('greetingName');
  let shortName = document.getElementById('shortName');
  let greetingData = await getGreeting();
  greetingTimeCon.textContent = greetingData.time;
  if(asguest){
    let textGreeting = greetingTimeCon.innerText;
    let replaceText = textGreeting.replace(/,/g, ''); // Corrected the usage of replace() function
    greetingTimeCon.style.marginTop = '37px'
    greetingTimeCon.innerText = replaceText;
    greetingNameCon.style.display = 'none';
    shortName.innerHTML = 'G';
   } else {
    showHeaderIni();
    greetingNameCon.style.display = 'block';
    greetingNameCon.textContent = greetingData.name;
   }

}


async function getGreeting() {
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
  await getActiveUser();
  const capitalizedFullName = greetingNameToUpperCaser(nameActiveUser[0]);
  return {time: greetingTime, name: capitalizedFullName};
}


function greetingNameToUpperCaser(name) {
  const nameWords = name.split(' ');
  const capitalizedNames = nameWords.map(capitalizeFirstLetter);
  return capitalizedNames.join(' ');
}


function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


async function getActiveUser() {
  let user = await registergetItem('activeUser');
  nameActiveUser.push(user[0].name);
}


async function showHeaderIni() {
  await getActiveUser();
  let div = document.getElementById('shortName');
  let name = nameActiveUser[0];
  let initials = getInitials(name);
  div.textContent = initials;
}

function getInitials(name) {
  let nameWords = name.split(' ');
  let initials = nameWords.map(word => word.charAt(0).toUpperCase()).join('');
  return initials;
}