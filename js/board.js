 let todoArray = [];
 let progressArray = [];
 let feedbackArray = [];
 let doneArray = [];
 let dataTask = [];
 let existingTasks = [];


async function openPopupAddTask() {
    let popup = document.getElementById('popup-add-task');
    let content = document.getElementById('popup-add-task-content');

    popup.classList.remove('d-none');
    content.classList.remove('slide-out');
    content.classList.add('slide-in');
    content.innerHTML = /*html*/`
        <img class="close-popup" src="/assets/img/icons/Close.svg" alt="" onclick="closePopupAddTask(); return false">
        <div class="popup-box">
            <h2 class="h2-addtask-board">Add Task</h2>
            <div>
                <div class="main-box">
                    <div class="form popup-addtask-main">
                        ${generateHtmlAddTaskForm()}      
                    </div>
                    <div class="popup-addtask-form">
                        ${generateHtmlFormSection()}
                    </div>
                </div>  
            </div>  
        </div> 
    `;

    let assignedButton = document.getElementById('assigned-button');
    assignedButton.classList.add('assigned-button-b-pos');
    addEventFunctions();
    cancelButton();
}


function closePopupAddTask() {
    let popup = document.getElementById('popup-add-task');
    let content = document.getElementById('popup-add-task-content');
    popup.classList.add('d-none');
    content.classList.remove('slide-in');
    content.classList.add('slide-out');
}


function renderAddTaskForPopup() {
    e.preventDefault();
}


async function loadToDo() {
    let todo = document.getElementById('board-to-do');
    let progress = document.getElementById('board-in-progress');
    let feedback = document.getElementById('board-await-feedback');
    let done = document.getElementById('board-done');
    todo.innerHTML = '';
    progress.innerHTML = '';
    feedback.innerHTML = '';
    done.innerHTML = '';
   
      
    for (let i = 0; i < tasks.length; i++) {
        let task= tasks[i];
        if(tasks[i].status === 'board-to-do') {
            todo.innerHTML += generateBoardCardTodo(task, i);
        }
        if(tasks[i].status === 'board-in-progress') {
            progress.innerHTML += generateBoardCardProgress(task, i);
        }
        if(tasks[i].status === 'board-await-feedback') {
            feedback.innerHTML += generateBoardCardFeedback(task, i);
        }
        if(tasks[i].status === 'board-done') {
            done.innerHTML += generateBoardCardDone(task, i);
        } else {
            console.log('Done ist missing');
        }

        
        changeCategoryButton(i);
        await createUserButtons(task, i);
        await updateProgressBar(i);
        notData();
        await loadSelectedPage();
    }
}  


function generateBoardCardTodo(task, i) {
    return /*html*/`
    <div   draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}" arraypos="${i}">
        <div  class="progress_infocard">
            <button class="" id="category-bg-change-${i}">${task.category}</button>
            <div class="cooking_title_div">
                <h1>${task.title}</h1>
                <span class="recipe_span">${task.description}</span>
            </div>
        </div>
        <div class="progress_image_Div">
            <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" id="progress-bar-${i}" style="width: 70%"></div>
            </div>
            
            <div class="amount-subtasks" id="amount-subtasks-${i}">${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks</div>     
        </div>
        <div class="Members_Div">
            <div id="user-board-${i}"></div>
            <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
        </div>
    </div>         
    `;
}


function generateBoardCardProgress(task, i) {
    return /*html*/`
        <div draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}" arraypos="${i}">
            <div  class="progress_infocard">
                <button class="" id="category-bg-change-${i}">${task.category}</button>
                <div class="cooking_title_div">
                    <h1>${task.title}</h1>
                    <span class="recipe_span">${task.description}</span>
                </div>
            </div>
            <div class="progress_image_Div">
                <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" id="progress-bar-${i}" style="width: 70%"></div>
                </div>
                
                <div class="amount-subtasks" id="amount-subtasks-${i}">${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks</div>     
            </div>
            <div class="Members_Div">
                <div id="user-board-${i}"></div>
                <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
            </div>
        </div>   
    `;
}


function generateBoardCardFeedback(task, i) {
    return /*html*/`
            <div   draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}" arraypos="${i}">
                <div  class="progress_infocard">
                    <button class="" id="category-bg-change-${i}">${task.category}</button>
                    <div class="cooking_title_div">
                        <h1>${task.title}</h1>
                        <span class="recipe_span">${task.description}</span>
                    </div>
                </div>
                <div class="progress_image_Div">
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" id="progress-bar-${i}" style="width: 70%"></div>
                    </div>
                    
                    <div class="amount-subtasks" id="amount-subtasks-${i}">${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks</div>     
                </div>
                <div class="Members_Div">
                    <div id="user-board-${i}"></div>
                    <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
                </div>
            </div>   
    `; 
}


function generateBoardCardDone(task, i) {
    return /*html*/`
            <div   draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}" arraypos="${i}">
                <div  class="progress_infocard">
                    <button class="" id="category-bg-change-${i}">${task.category}</button>
                    <div class="cooking_title_div">
                        <h1>${task.title}</h1>
                        <span class="recipe_span">${task.description}</span>
                    </div>
                </div>
                <div class="progress_image_Div">
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" id="progress-bar-${i}" style="width: 70%"></div>
                    </div>
                    
                    <div class="amount-subtasks" id="amount-subtasks-${i}">${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks</div>     
                </div>
                <div class="Members_Div">
                    <div id="user-board-${i}"></div>
                    <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
                </div>
            </div> 
    `;
}  


function createUserButtons(task, i) {
    let iconmember = document.getElementById(`user-board-${i}`);
    let letters = task.letter;
    if(iconmember) {
        for (let k = 0; k < letters.length; k++) {
            const letter = letters[k];
            iconmember.innerHTML += /*html*/`
            <img src="https://ui-avatars.com/api/?name=${letter}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon board-user-icon">
        `;
        }
    }

}


async function openPopupAddTaskDiv(i) {
    let div = document.getElementById('popup-add-task-div');
    let content = document.getElementById('popup-add-task-content-div');
    div.classList.remove('d-none');
    content.classList.remove('slide-out');
    content.classList.add('slide-in');
    let task = tasks[i];
    content.innerHTML = /*html*/`
        <img class="close-a-board" src="/assets/img/icons/Close.svg" alt="" onclick="closePopupAddTaskDiv(${i}); return false">
        `;
    content.innerHTML += /*html*/`
        <div class="popup-text">
            <div class="user-popup-btn" id="category-bg-change-${i}">${task.category}</div>
            <h2 class="popup-title">${task.title}</h2>
            <div class="overflow">${task.description}</div>
            <div class="popup-div-assign-date-title">
                <div>
                    <div class="popup-date">Due Date:</div>
                    <div>Priority:</div>
                </div>
                <div class="popup-div-assign-date-title-content">
                    <div class="popup-date">${task.date}</div>
                    <div class="popup-prio-section">
                        <div>${task.priority.charAt(0).toUpperCase() + task.priority.slice(1).toLowerCase()}</div>
                        <img src="/assets/img/icons/prio-${task.priority}.svg" alt="Prio" class="popup-prio-icon">
                    </div>
                </div>
            </div>
            <div>
                <div class="popup-assigned-div">Assigned To:</div>
                <div class="popup-assigned" id="popup-user-${i}">
                </div>

            </div>
            <div>
                <div class="">Subtasks</div>
                <div class="popup-subtask" id="popup-subtasks-${i}">
                </div>
            </div>
            <div class="popup-task-footer">
                <div class="popup-task-footer-section" onclick="deleteTask(${i})">
                    <img src="/assets/img/icons/trash.svg" alt="Trash Icon">
                    <div>Delete</div>
                </div>
                <p class="separator"></p>
                <div class="popup-task-footer-section" onclick="editTask(${i})">
                    <img src="/assets/img/icons/edit.svg" alt="Edit Icon">
                    <div>Edit</div>
                </div> 
            </div>

        </div>
    `;
    createUserToAssigned(i);
    createSubtasksToAddTaskPopup(i);
    checkSelectedSubtasks(i);
}


function createUserToAssigned(i) {
    let div = document.getElementById(`popup-user-${i}`);
    let task = tasks[i];
    for (let k = 0; k < task.letter.length; k++) {
        let letters = task.letter[k];
        let user = task.assigned[k];
        div.innerHTML += /*html*/`
            <div class="each-user-section">
                <img src="https://ui-avatars.com/api/?name=${letters}&background=random&color=fff" alt="Initials" class="assigned-contact-list-icon">
                <div>${user}</div>  
            </div>

        `;   
    }
}


function createSubtasksToAddTaskPopup(i) {
    let div = document.getElementById(`popup-subtasks-${i}`);
    let task = tasks[i];
    for (let k = 0; k < task.subtask.length; k++) {
        let subtasks = task.subtask[k];
        div.innerHTML += /*html*/`
            <div class="each-subtask-section">
                <div>
                    <img src="/assets/img/icons/none-selected.svg" alt="Select Icon" id="select-subtask-board-${k}" onclick="checkOffSubtask('${i}','${k}')">
                    <div id="each-subtasks-${k}" value="not-selected">${subtasks}</div>   
                </div>
            </div>
        `;
        
    }
    checkSelectedSubtasks(i);
}


function checkSelectedSubtasks(i) {
    let task = tasks[i];

    for (let k = 0; k < task.subtask.length; k++) {
        let img = document.getElementById(`select-subtask-board-${k}`);
        let subtask = document.getElementById(`each-subtasks-${k}`);

        if (task.checkoffs.includes(k.toString())) {
            img.src = '/assets/img/icons/selected.svg';
            img.alt = 'Selected';
            subtask.setAttribute('value', 'selected');
        } else {
            img.src = '/assets/img/icons/none-selected.svg';
            img.alt = 'Not Selected';
            subtask.setAttribute('value', 'not-selected');
        }
    }
}


async function checkOffSubtask(i, k) {
    let img = document.getElementById(`select-subtask-board-${k}`);
    let subtask = document.getElementById(`each-subtasks-${k}`);
    


    if (img.src.includes('none-selected.svg')) {
        img.src = '/assets/img/icons/selected.svg';
        img.alt = 'Selected';
        subtask.setAttribute('value', 'selected');
        pushSelectedSubtask(i, k);
    } else {
        img.src = '/assets/img/icons/none-selected.svg';
        img.alt = 'Not Selected';
        subtask.setAttribute('value', 'not-selected');
        pushSelectedSubtask(i, k);
    }
    await loadTasks();
    pushSelectedSubtask(i, k);
    updateSelectedSubtasksCount(i);
}


async function pushSelectedSubtask(i, k) {
    await loadTasks();

    let subtask = document.getElementById(`each-subtasks-${k}`);
    let task = tasks[i];

    if (subtask && task) {
        let value = subtask.getAttribute('value');

        if (!Array.isArray(task.checkoffs)) {
            task.checkoffs = [];
        }

        if (value === 'selected') {
            if (!task.checkoffs.includes(k)) {
                task.checkoffs.push(k);
                await setItem('testaufgaben', JSON.stringify(tasks));
            }
        } else {
            let index = task.checkoffs.indexOf(k);
            if (index !== -1) {
                task.checkoffs.splice(index, 1);
                await setItem('testaufgaben', JSON.stringify(tasks));
            }
        }
    }
}


function closePopupAddTaskDiv(i) {
    let content = document.getElementById('popup-add-task-content-div');
    let div = document.getElementById('popup-add-task-div');
    let amount = document.getElementById(`amount-subtasks-${i}`);
    div.classList.add('d-none');
    content.classList.remove('slide-in');
    content.classList.add('slide-out');
    amount.innerHTML = /*html*/`
        ${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks
    `;
    calculatePercentageForProgressBar(i);
    updateProgressBar(i);
}


function calculatePercentageForProgressBar(i) {
    let total = totalSubtask(i);
    let subtotal = updateSelectedSubtasksCount(i);

    if(total === 0) {
        let percentage = 0;
        return percentage;
    } else {
        let percentage = (subtotal * 100) / total;
        return percentage;
    }
}


async function updateProgressBar(i) {
    let div = document.getElementById(`progress-bar-${i}`);
    if(div){
        div.style.width = calculatePercentageForProgressBar(i) + '%';
    }
}



async function changeCategoryButton(i) {
    let categoryBtn = document.getElementById(`category-bg-change-${i}`);
    
    if(categoryBtn) {
        if (categoryBtn.textContent === 'Technical Task') {
            categoryBtn.classList.add('tecnical_TaskButton');
        } else {
            categoryBtn.classList.add('user_Story_button');
        }
    }
}


function totalSubtask(i) {
    let task = tasks[i];
    if (task && task.subtask && Array.isArray(task.subtask)) {
        return task.subtask.length;
    } else {
        return 0;
    }
}


function updateSelectedSubtasksCount(i) {
    let task = tasks[i];
    if (task && task.checkoffs) {
        return task.checkoffs.length;
    } else {
        return 0;
    }
}


function searchTasks() {
    searchTaskToDo();
}


function searchTaskToDo() {
    let input = document.getElementById('input-search-task');
    let filter = input.value.toUpperCase();

    for (let i = 0; i < tasks.length; i++) {
        let todo = document.getElementById(`board-to-do-section-${i}`);
        let array = tasks[i];
        let description = array.description;
        let title = array.title;
        let name = title.toUpperCase();
        let subname = description.toUpperCase();
        if (name.indexOf(filter) > -1 || subname.indexOf(filter) > -1) {
            todo.style.display = 'block';
        } else {
            todo.style.display = 'none';
        }
    }
}


function cancelButton() {
    let button = document.getElementById('clear-button');
    button.innerHTML = '';
    button.innerHTML = /*html*/`
        Cancel<img src="/assets/img/icons/close1.svg" alt="Clear" id="clear-button-img">
    `;
}


async function deleteTask(i) {
    await loadTasks();
    tasks.splice(i, 1);

    await setItem('testaufgaben', JSON.stringify(tasks));
    closePopupAddTaskDiv(i);
    await loadToDo();
}


function editTask(i) {
    let popup = document.getElementById('popup-add-task-div');
    let div = document.getElementById(`popup-add-task-edit`);
    let content = document.getElementById(`popup-add-task-content-edit`);
    popup.classList.add('d-none');
    div.classList.remove('d-none');
    content.innerHTML = /*html*/`
        <img class="close-a-board edit-close-icon" src="/assets/img/icons/Close.svg" alt="" onclick="closePopupEdit(); return false">
        `;
    content.innerHTML += generateEditableAddtask(i);
    addEventFunctions();
    pushValueToEdit(i);

    let subtaskList = document.getElementById('subtasks');
    let assignedButton = document.getElementById('assigned-button');
    let subtaskLabel = document.getElementById('subtasks-label');

    subtaskList.classList.add('no-scrollbar');
    assignedButton.classList.add('position-assigned-btn');
    subtaskLabel.classList.add('subtasks-label');
}


function generateEditableAddtask(i) {
    return /*html*/`
            <div class="edit-div">
                <div class="edit-addtask">
                    ${generateHtmlTitle()}  
                    ${generateHtmlDescription()}  
                    ${generateHtmlDate()}  
                    ${generateHtmlPrio()}
                    ${generateHtmlAssigned()}
                    ${generateHtmlSubtasks()}
                </div>
                <button class="ok-btn-edit create-task" onclick="saveEditedTask(${i})">OK <img src="/assets/img/icons/check1.svg" alt="Check Icon"></button>
            </div>       

    `; 
}


async function pushValueToEdit(i) {
    existingTasks = JSON.parse(await getItem('testaufgaben'));
    let array = existingTasks[i];
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    // category, assigned Array 
    title.value = array.title;
    description.value = array.description;
    date.value = array.date;
    let priority = array.priority;
    getPriority(priority);
    let subtasksArray = array.subtask;
    // console.log('push', subtasksArray);
    subtasks.push(subtasksArray);

    subtasks = [];
    for (let j = 0; j < subtasksArray.length; j++) {
        subtasks.push(subtasksArray[j]);
    }

    getSubtasks();
    existingTasks.splice(i, 1);
}


function getSubtasks() {
    let list = document.getElementById('subtasks');
    list.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const text = subtasks[i];
        list.innerHTML += /*html*/`
        <li class="each-subtask" id="each-subtask${i}">
            <div class="each-subtask-p" id="subtask${i}"><p class="subtask-p"></p>${text}</div>
            <div class="subtask-right">
                <img src="/assets/img/icons/edit.svg" alt="Edit" onclick="editSubtask(${i})">
                <p class="separator"></p>
                <img src="/assets/img/icons/trash.svg" alt="Edit" onclick="deleteSubtask(${i})">
            </div>
        </li>
    `;        
    }
}


async function saveEditedTask(i) {
    let category = tasks[i].category
    let title = document.getElementById('title');
    let requiredTitle = document.getElementById('required-title');
    let requiredDate = document.getElementById('required-date');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let priority = pushPrio();

    if (title.value && date.value) {

        let newTask = {
            title: title.value,
            description: description.value,
            assigned: users,
            letter: iniimg,
            date: date.value,
            priority: priority,
            category: category,
            subtask: subtasks,
            checkoffs: []
        };

        existingTasks.push(newTask);

        await setItem('testaufgaben', JSON.stringify(existingTasks));
       
        let popup = document.getElementById('popup-add-task');
        let popupAdd = document.getElementById('popup-boardAddTask');
        await openToBoard();
        if (popup) {
            await openInBoard();
            await updateProgressBar(i);
        } else {
            console.log('Popup wurde nicht gefunden');
        }
    } else {
        alert('Notwendige Felder wurden nicht ausgefüllt');
        requiredTitle.classList.remove('d-none');
        requiredDate.classList.remove('d-none');
        requiredCategory.classList.remove('d-none');
        date.classList.add('inputfield-focus-red');
        title.classList.add('inputfield-focus-red');
        category.classList.add('inputfield-focus-red');
    }

    return tasks;
}


function getPriority(priority) {
    let prios = document.getElementById('prio');
    let prioButtons = prios.querySelectorAll('button');

    prioButtons.forEach(function(button) {
        button.classList.add('prio-notselected');
        if(button.value === priority) {
            button.classList.remove('prio-notselected');
        }
    });
}


function closePopupEdit(i) {
    let div = document.getElementById(`popup-add-task-edit`);
    div.classList.add('d-none');

    changeCategoryButton(i);
    loadToDo();
}


function notData() {
    let todo = document.getElementById('board-to-do');
    // console.log(tasks);
    if(tasks.length === 0) {
        // console.log(tasks.length);
       let noTodotask=document.getElementById('NoToDo');
       noTodotask.classList.remove('d-none');
       noTodotask.style.display='flex';
       todo.appendChild(noTodotask);
    } 
    return;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function dragStart(ev) {
    let txt = ev.srcElement.id;
    let id = txt[txt.length-1];
    // tasks.splice(id, 1);
    // console.log(id, 66);
    notData();
    dataTask.splice(id, 1)
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.transform = "rotate(13deg)";
    // let progress=document.getElementById('progress')
    // progress.style.width= "50%";
}


function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // console.log(data);
    var draggedElement = document.getElementById(data);
    // ev.target.appendChild(draggedElement);
    draggedElement.style.transform = "rotate(0deg)";
    
    if (!ev.target.contains(draggedElement)) {
        let category = ev.target.appendChild(draggedElement);

    }
    console.log(draggedElement);
    saveDroppedElement(draggedElement);
}


async function saveDroppedElement(element) {
    let arraypos = element.getAttribute('arraypos');
    let dropTargetId = element.parentElement.id;

    tasks[arraypos].status = `${dropTargetId}`;

    console.log(arraypos);
    console.log(tasks[arraypos].status);


    await setItem('testaufgaben', JSON.stringify(tasks)); 



/*
    await loadArray(todoArray, progressArray, feedbackArray, doneArray);
    if (!Array.isArray(todoArray, progressArray, feedbackArray, doneArray)) {
        todoArray = [];
        progressArray = [];
        feedbackArray = [];
        doneArray = [];
    }

    let array = todoArray[pos];

    let dropTargetId = element.parentElement.id;

    if (dropTargetId === 'board-in-progress') {
        progressArray.push(array);
        todoArray.splice(pos, 1);
    }
    if (dropTargetId === 'board-await-feedback') {
        feedbackArray.push(array);
        todoArray.splice(pos, 1);
    }
    if (dropTargetId === 'board-done') {
        doneArray.push(array);
        todoArray.splice(pos, 1);
    }
    if (dropTargetId === 'board-to-do') {
        todoArray.push(array);
        todoArray.splice(pos, 1);
    }

    await saveNewArrays(todoArray, progressArray, feedbackArray, doneArray);
    */
}

/*
async function loadArray(todoArray, progressArray, feedbackArray, doneArray) {
    try {
        todoArray = JSON.parse(await getItem('todo')) || [];
        progressArray = JSON.parse(await getItem('progress')) || [];
        feedbackArray = JSON.parse(await getItem('feedback')) || [];
        doneArray = JSON.parse(await getItem('done')) || [];
    } catch (e) {
        console.error('Error in loadarrays:', e);
    }
}


async function saveNewArrays(todoArray, progressArray, feedbackArray, doneArray) {
    await setItem('todo', JSON.stringify(todoArray)); 
    await setItem('progress', JSON.stringify(progressArray));    
    await setItem('feedback', JSON.stringify(feedbackArray));    
    await setItem('done', JSON.stringify(doneArray));  
}


async function generateProgressCards() {
    let boardDiv = document.getElementById('board-in-progress');
    boardDiv.innerHTML = '<div id="NoToDo" class="Card_NotasksTodo d-none">No Tasks To do</div>';
    progressArray = JSON.parse(await getItem('progress')) || [];

    if (!Array.isArray(progressArray)) {
        progressArray = [];
    }

    for (let i = 0; i < progressArray.length; i++) {
        let task= progressArray[i];
        boardDiv.innerHTML += `
           <div draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}" arraypos="${i}">
                <div  class="progress_infocard">
                    <button class="" id="category-bg-change-${i}">${task.category}</button>
                    <div class="cooking_title_div">
                        <h1>${task.title}</h1>
                        <span class="recipe_span">${task.description}</span>
                    </div>
                </div>
                <div class="progress_image_Div">
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" id="progress-bar-${i}" style="width: 70%"></div>
                    </div>
                    
                    <div class="amount-subtasks" id="amount-subtasks-${i}">${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks</div>     
                </div>
                <div class="Members_Div">
                    <div id="user-board-${i}"></div>
                    <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
                </div>
            </div> 
        `;
    await changeCategoryButton(i);
    await createUserButtons(task, i);
    await updateProgressBar(i);
    notData();
    await loadSelectedPage();
    }
}


async function generateFeedbackCards() {
    let boardDiv = document.getElementById('board-await-feedback');
    boardDiv.innerHTML = '<div id="NoToDo" class="Card_NotasksTodo d-none">No Tasks To do</div>';
    feedbackArray = JSON.parse(await getItem('feedback')) || [];

    if (!Array.isArray(feedbackArray)) {
        feedbackArray = [];
    }

    for (let i = 0; i < feedbackArray.length; i++) {
        let task= feedbackArray[i];
        boardDiv.innerHTML += `
           <div   draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}" arraypos="${i}">
                <div  class="progress_infocard">
                    <button class="" id="category-bg-change-${i}">${task.category}</button>
                    <div class="cooking_title_div">
                        <h1>${task.title}</h1>
                        <span class="recipe_span">${task.description}</span>
                    </div>
                </div>
                <div class="progress_image_Div">
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" id="progress-bar-${i}" style="width: 70%"></div>
                    </div>
                    
                    <div class="amount-subtasks" id="amount-subtasks-${i}">${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks</div>     
                </div>
                <div class="Members_Div">
                    <div id="user-board-${i}"></div>
                    <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
                </div>
            </div> 
        `;
    await changeCategoryButton(i);
    await createUserButtons(task, i);
    await updateProgressBar(i);
    notData();
    await loadSelectedPage();
    }
}


async function generateDoneCards() {
    let boardDiv = document.getElementById('board-done');
    boardDiv.innerHTML = '<div id="NoToDo" class="Card_NotasksTodo d-none">No Tasks To do</div>';
    doneArray = JSON.parse(await getItem('done')) || [];

    if (!Array.isArray(doneArray)) {
        doneArray = [];
    }

    for (let i = 0; i < doneArray.length; i++) {
        let task= doneArray[i];
        boardDiv.innerHTML += `
           <div   draggable="true" ondragstart="dragStart(event)"  ondrop="allowDrop(event)" onclick="openPopupAddTaskDiv(${i})" class="progress_card" id="board-to-do-section-${i}" arraypos="${i}">
                <div  class="progress_infocard">
                    <button class="" id="category-bg-change-${i}">${task.category}</button>
                    <div class="cooking_title_div">
                        <h1>${task.title}</h1>
                        <span class="recipe_span">${task.description}</span>
                    </div>
                </div>
                <div class="progress_image_Div">
                    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" id="progress-bar-${i}" style="width: 70%"></div>
                    </div>
                    
                    <div class="amount-subtasks" id="amount-subtasks-${i}">${updateSelectedSubtasksCount(i)} / ${totalSubtask(i)} Subtasks</div>     
                </div>
                <div class="Members_Div">
                    <div id="user-board-${i}"></div>
                    <img src="/assets/img/icons/prio-${task.priority}.svg" alt="" class="board-prio-icons">
                </div>
            </div> 
        `;
    await changeCategoryButton(i);
    await createUserButtons(task, i);
    await updateProgressBar(i);
    notData();
    await loadSelectedPage();
    }
}

*/