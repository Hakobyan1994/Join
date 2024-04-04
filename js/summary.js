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


/**
 * Renders the summary main content.
 */
async function renderSummaryMain() {
  let content = document.getElementById('render-summary');
  content.innerHTML = '';
  content.innerHTML = generateHtmlSummary();
  await loadTasks();
  await getValue(content);
  displayGreeting();
  checkButtonImgChange();
}


/**
 * Retrieves task values and updates the content with the retrieved values.
 * 
 * @param {HTMLElement} content - The HTML element to update with the retrieved values.
 */
async function getValue(content) {
  await loadTasks();
  const { valueTodo, valueProgress, valueFeedback, valueDone, valueUrgent, total } = countTaskValues(tasks);
  putValues(valueTodo, valueProgress, valueFeedback, valueDone, valueUrgent);
  getUrgentDate();
  ifTotalEmpty(total, content);
}


/**
 * Counts the values of different task states.
 * 
 * @param {Array} tasks - An array of tasks.
 * @returns {Object} - Object containing the counts of task values.
 */
function countTaskValues(tasks) {
  let valueTodo = 0, valueProgress = 0, valueFeedback = 0, valueDone = 0, valueUrgent = 0, total = 0;
  for (let i = 0; i < tasks.length; i++) {
    const state = tasks[i].status;
    const priority = tasks[i].priority;
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


/**
 * Updates the HTML content with the provided values.
 * 
 * @param {number} valueTodo - The number of tasks in 'To Do' state.
 * @param {number} valueProgress - The number of tasks in 'In Progress' state.
 * @param {number} valueFeedback - The number of tasks in 'Await Feedback' state.
 * @param {number} valueDone - The number of tasks in 'Done' state.
 * @param {number} valueUrgent - The number of tasks marked as urgent.
 */
function putValues(valueTodo, valueProgress, valueFeedback, valueDone,valueUrgent) {
  if(document.getElementById('value-todoarray')) {
    document.getElementById('value-todoarray').innerHTML = valueTodo;
    document.getElementById('value-progressarray').innerHTML = valueProgress;
    document.getElementById('value-feedbackarray').innerHTML = valueFeedback;
    document.getElementById('value-donearray').innerHTML = valueDone;
    document.getElementById('value-urgent').innerHTML = valueUrgent;
  }
}


/**
 * Updates the total value in the HTML content if the total value is empty.
 * 
 * @param {number} total - The total count of tasks.
 * @param {HTMLElement} content - The HTML element to update if the total value is empty.
 */
function ifTotalEmpty(total, content) {
  if(content) {
    if (total) {
      document.getElementById('value-total').innerHTML = `${total}`;
    } else if (total === 0) {
      document.getElementById('value-total').innerHTML = '0';
    }
  }
}


/**
 * Retrieves urgent dates and performs necessary operations based on the retrieved data.
 */
function getUrgentDate() {
  arrayUrgent = [];

  for (let j = 0; j < tasks.length; j++) {
    const array = tasks[j].priority;
    const date = tasks[j].date;
    if (array === 'urgent') {
      arrayUrgent.push(date);
    }
  }
  deleteOldUrgent();
  validateUpcomingDeadline();
}


/**
 * Deletes old urgent dates from the array.
 */
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


/**
 * Retrieves the current date.
 */
function actualDate() {
  let date = new Date();
  let day = date.getDate();
  let options = { month: 'long', day: 'numeric', year: 'numeric', };
  let formattedDate = date.toLocaleDateString('de-DE', options);
}
actualDate()


/**
 * Validates upcoming deadlines and updates the HTML content accordingly.
 */
function validateUpcomingDeadline() {
  let dateDiv = document.getElementById('urgentDate');

  if (arrayUrgent.length === 0) {
    dateDiv.innerHTML = '-';
  } else if (arrayUrgent.length > -1) {
    dateDiv.innerHTML = defineUpcomingDeadline();
  }
}


/**
 * Defines the upcoming deadline based on the urgent dates.
 * 
 * @returns {string} - The formatted upcoming deadline date.
 */
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


/**
 * Displays a greeting message and updates the greeting time and name in the UI.
 */
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


/**
 * Gets the appropriate greeting based on the current time of the day
 * and the active user's name, if available.
 * 
 * @returns {Promise<{time: string, name: string}>} An object containing the greeting time and the user's capitalized name.
 */
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


/**
 * Capitalizes the first letter of each word in a given name string.
 * 
 * @param {string} name The name string to capitalize.
 * @returns {string} The name string with the first letter of each word capitalized.
 */
function greetingNameToUpperCaser(name) {
  const nameWords = name.split(' ');
  const capitalizedNames = nameWords.map(capitalizeFirstLetter);
  return capitalizedNames.join(' ');
}


/**
 * Capitalizes the first letter of a given word.
 * 
 * @param {string} word The word to capitalize.
 * @returns {string} The word with its first letter capitalized.
 */
function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


/**
 * Retrieves the active user from storage and adds their name to the nameActiveUser array.
 */
async function getActiveUser() {
  let user = await registergetItem('activeUser');
  nameActiveUser.push(user[0].name);
}


/**
 * Displays the initials of the active user in the header.
 */
async function showHeaderIni() {
  await getActiveUser();
  let div = document.getElementById('shortName');
  let name = nameActiveUser[0];
  let initials = getInitials(name);
  div.textContent = initials;
}


/**
 * Generates the initials from a given name.
 * 
 * @param {string} name - The name from which to generate the initials.
 * @returns {string} The initials generated from the name.
 */
function getInitials(name) {
  let nameWords = name.split(' ');
  let initials = nameWords.map(word => word.charAt(0).toUpperCase()).join('');
  return initials;
}

/**
 * Changes the check button image when hovering over it.
 */
function checkButtonImgChange() {
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
