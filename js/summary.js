
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

async function getValue() {
  tasks = JSON.parse(await getItem('testaufgaben')) || [];

        if (!Array.isArray(tasks)) {
          tasks = [];
        }

  let todo = document.getElementById('value-todoarray');
  let done = document.getElementById('value-donearray');
  let urgent = document.getElementById('value-urgent');
  let total = document.getElementById('value-total');
  let progress = document.getElementById('value-progressarray');
  let feedback = document.getElementById('value-feedbackarray');



  for (let i = 0; i < tasks.length; i++) {
    const state = tasks[i].status;
    if(tasks[i].status === 'board-to-do') {
      valueTodo++;
      todo.innerHTML = valueTodo;
    }
    if(tasks[i].status === 'board-in-progress') {
      valueProgress++;
      progress.innerHTML = valueProgress;
    }
    if(tasks[i].status === 'board-await-feedback') {
      valueFeedback++;
      feedback.innerHTML = valueFeedback;

    }
    if(tasks[i].status === 'board-done') {
      valueDone++;
      done.innerHTML = valueDone;
    }

      
  }


  // let valueTotal = tasks.length;
  // total.innerHTML = `${valueTotal}`;
  // let valueDone = doneArray.length;
  // done.innerHTML = `${valueDone}`;
}









