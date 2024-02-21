
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
  tasks = JSON.parse(await getItem('tasks')) || [];
        if (!Array.isArray(tasks)) {
          tasks = [];
        } 

  let urgent = document.getElementById('value-urgent');
  let total = document.getElementById('value-total');



  for (let i = 0; i < tasks.length; i++) {
    const state = tasks[i].status;
    if(state === 'board-to-do') {
      valueTodo++;
      document.getElementById('value-todoarray').innerHTML = valueTodo;
    }
    if(state === 'board-in-progress') {
      valueProgress++;
      document.getElementById('value-progressarray').innerHTML = valueProgress;
    }
    if(state === 'board-await-feedback') {
      valueFeedback++;
      document.getElementById('value-feedbackarray').innerHTML = valueFeedback;

    }
    if(state === 'board-done') {
      valueDone++;
      document.getElementById('value-donearray').innerHTML = valueDone;
    }

      
  }


  // let valueTotal = tasks.length;
  // total.innerHTML = `${valueTotal}`;
  // let valueDone = doneArray.length;
  // done.innerHTML = `${valueDone}`;
}









