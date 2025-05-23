let nameActiveUser = [];
let arrayUrgent = [
  // {
  //   priority: [],
  //   date: []
  // }
];
let authToken = localStorage.getItem('authToken')




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
  if (user) {
    let profilName = document.querySelector('.greetingName');
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


    if (asguest && window.innerWidth <= 500) {
      let namesOfgreet = document.getElementById('namesGreetresp')
      namesOfgreet.style.display = 'none'
      let greetResponsive = document.getElementById('greetResponsive');
      greetResponsive.innerText = getGreetingText() + '!'
    }
  }
  loggedInUser.push(user);
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
    return 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

async function renderSummaryMain() {
  let content = document.getElementById('render-summary');
  content.innerHTML = '';
  content.innerHTML = generateHtmlSummary();
  await getAllCards()
  await loadTaskss();
  await getAllContacts();
  await getValue(content);
  displayGreeting();
  checkButtonImgChange();
}


async function getValue(content) {
  await getAllCards()
  const { valueTodo, valueProgress, valueFeedback, valueDone, valueUrgent, total } = countTaskValues(tasks);
  putValues(valueTodo, valueProgress, valueFeedback, valueDone, valueUrgent);
  ifTotalEmpty(total, content);
  getUrgentDate();
}

function countTaskValues(tasks) {
  let valueTodo = 0, valueProgress = 0, valueFeedback = 0, valueDone = 0, valueUrgent = 0, total = 0;
  for (let i = 0; i < tasks.length; i++) {
    const state = tasks[i].status;
    const priority = tasks[i].prio;
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
    if (priority === 'urgent') {
      valueUrgent++;
    }
  }
  total = valueTodo + valueProgress + valueFeedback;
  return { valueTodo, valueProgress, valueFeedback, valueDone, valueUrgent, total };
}


function putValues(valueTodo, valueProgress, valueFeedback, valueDone, valueUrgent) {

  if (document.getElementById('value-todoarray') && (authToken !== null || asguest !== null)) {
    document.getElementById('value-todoarray').innerHTML = valueTodo;
    document.getElementById('value-progressarray').innerHTML = valueProgress;
    document.getElementById('value-feedbackarray').innerHTML = valueFeedback;
    document.getElementById('value-donearray').innerHTML = valueDone;
    document.getElementById('value-urgent').innerHTML = valueUrgent;
  } else {
    document.getElementById('value-todoarray').innerHTML = '0';
    document.getElementById('value-progressarray').innerHTML = '0';
    document.getElementById('value-feedbackarray').innerHTML = '0';
    document.getElementById('value-donearray').innerHTML = '0';
    document.getElementById('value-urgent').innerHTML = '';
  }
}





function ifTotalEmpty(total, content) {
  const isLoggedIn = authToken !== null || asguest !== null;
  const valueElement = document.getElementById('value-total');
  if (isLoggedIn) {
    if (content && total != null) {
      valueElement.innerHTML = `${total}`;
    }
  } else {
    valueElement.innerHTML = '0';
  }
}


function getUrgentDate() {
  arrayUrgent = [];
  for (let j = 0; j < tasks.length; j++) {
    const array = tasks[j].prio;
    const date = tasks[j].date;
    if (array === 'urgent') {
      arrayUrgent.push(date);
      console.log(arrayUrgent)
    }
  }
  validateUpcomingDeadline();
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
  } else {
    const upcomingDate = getNextUrgentDate();
    dateDiv.innerHTML = upcomingDate;
  }
}


function getNextUrgentDate() {
  arrayUrgent.sort((a, b) => new Date(a) - new Date(b));
  const nextDate = new Date(arrayUrgent[arrayUrgent.length - 1]);
  nextDate.setDate(nextDate.getDate() - 1);
  const day = String(nextDate.getDate()).padStart(2, '0');
  const month = String(nextDate.getMonth() + 1).padStart(2, '0'); // +1 weil Monate 0-11 sind
  const year = nextDate.getFullYear();
  return `${day}.${month}.${year}`;
}




function defineUpcomingDeadline() {
  let dateArray = arrayUrgent.map(urgentString => {
    let [day, month, year] = urgentString.split('-').map(Number);
    return new Date(year, month - 1, day);
  });
  console.log('Date Array:', dateArray);
  let earliestDate = new Date(Math.min(...dateArray));
  console.log(earliestDate)
  let formattedDate = earliestDate.toLocaleDateString('de-DE', { // 🇩🇪 deutsches Format
    day: '2-digit',
    month: '2-digit',
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
  if (asguest) {
    let textGreeting = greetingTimeCon.innerText;
    let replaceText = textGreeting.replace(/,/g, '');
    greetingTimeCon.style.marginTop = '37px'
    greetingTimeCon.innerText = replaceText;
    greetingNameCon.innerText = 'Guest'
    shortName.innerHTML = 'G';
  } else {
    greetingNameCon.style.display = 'block';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser){
      shortName.innerText = currentUser.username.charAt(0).toUpperCase();
    } if (currentUser && currentUser.username) {
      const formattedname = currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1).toLowerCase();
      greetingNameCon.innerText = formattedname
    }
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


async function getActiveUser() {
  let user = await registergetItem('activeUser');
  nameActiveUser.push(user[0].name);
}


// async function showHeaderIni() {
//   await getActiveUser();
//   // let div = document.getElementById('shortName');
//   // let name = nameActiveUser[0];
//   let initials = getInitials(name);
//   div.textContent = initials;
// }


function getInitials(name) {
  let nameWords = name.split(' ');
  let initials = nameWords.map(word => word.charAt(0).toUpperCase()).join('');
  return initials;
}


function checkButtonImgChange() {                                       //change check button when it is hovering
  let img = document.getElementById('check-button');
  let checkButton = document.getElementById('check-button-div');
  if (checkButton) {
    checkButton.addEventListener('mouseover', function () {
      img.src = '../assets/img/icons/check-button-blue.svg';
    });
    checkButton.addEventListener('mouseout', function () {
      img.src = '../assets/img/icons/check-button-white.svg';
    });
  }
}