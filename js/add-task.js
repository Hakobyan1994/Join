let tasks = [];


function renderAddTask() {
    let content = document.getElementById('add-task');
    content.innerHTML = '';

    content.innerHTML = /*html*/`
        <h2>Add Task</h2>
        <div class="main-box">
            <div class="form">
                ${generateHtmlAddTaskForm()}      
            </div>
            ${generateHtmlFormSection()}
        </div>    
    `;
    currentDate();
    getPrio();
    document.getElementById('prio').addEventListener('click', getPrio);
    clearButtonImgChange();
}


function generateHtmlAddTaskForm() {
    return /*html*/`
        <form>
            ${generateHtmlTitle()}
            ${generateHtmlDescription()}  
            ${generateHtmlAssigned()}
        </form>
        <p class="line"></p>
        <form>
            ${generateHtmlDate()}  
            ${generateHtmlPrio()}
            ${generateHtmlCategory()}
            ${generateHtmlSubtasks()}
        </form>
    `;
}


function generateHtmlTitle() {
    return /*html*/`
        <div class="">
            <label for="" class="">Title<p class="redstar">*</p></label>
            <input type="text" class="inputfield" id="title" placeholder="Enter a title" required>
        </div>
    `;
}


function generateHtmlDescription() {
    return /*html*/`
        <label class="">Description</label>
        <textarea class="inputfield inputfield-textarea" id="description" placeholder="Enter a Description"></textarea>  
    `;
}


function generateHtmlAssigned() {
    return /*html*/`
        <label>Assigned to</label>
        <select class="inputfield assigned-to" id="assigned">
            <option value="" disabled selected hidden>Select contacts to assign</option>
            <option value="1">Anton Mayer</option>
            <option value="2">Anja Schulz</option>
            <option value="3">Sofia Müller</option>
        </select>  
    `;
}


function generateHtmlDate() {
    return /*html*/`
        <label for="" class="">Due date<p class="redstar">*</p></label>
        <div>
            <input type="date" class="inputfield date-icon" id="date" placeholder="dd/mm/yyyy" required>
            <!-- <img src="/assets/img/icons/calender.svg" alt="Calender"> ///// Calender Icon is missing --> 
        </div>
        <div id="" class="d-none">
            This field is required
        </div>  
    `;
}


function generateHtmlPrio() {
    return /*html*/`
        <label for="">Prio</label>
        <div class="prio-btn" id="prio" role="group">
            <button type="button" class="prio prio-urgent prio-notselected" id="urgent" value="urgent">Urgent <img src="/assets/img/icons/prio-urgent.svg" alt="Urgent Prio"></button>
            <button type="button" class="prio prio-medium prio-notselected" id="medium" value="medium">Medium <img src="/assets/img/icons/prio-medium.svg" alt="Medium Prio"></button>
            <button type="button" class="prio prio-low prio-notselected" id="low" value="low">Low <img src="/assets/img/icons/prio-low.svg" alt="Low Prio"></button>
        </div>  
    `;
}


function generateHtmlCategory() {
    return /*html*/`
        <label>Category<p class="redstar">*</p></label>
        <select class="inputfield" id="category">
            <option selected>Select task category</option>
            <option value="technical task">Technical Task</option>
            <option value="user story">User Story</option>
        </select>  
    `;
}


function generateHtmlSubtasks() {
    return /*html*/`
        <label for="">Subtasks</label>
        <div>
            <input type="text" class="inputfield"> 
            <img src="/assets/img/icons/add.svg" alt="Add Icon" class="add-icon inputfield-icon-hover"> 
        </div>
    `;
}


function generateHtmlFormSection() {
    return /*html*/`
        <div class="form-bottom">
            <div class="form-bottom-left"><p><p class="red">*</p>This field is required</p></div>
            <div class="form-bottom-right">
                <button class="clear-btn" id="clear-button" onclick="clearFields()">Clear<img src="/assets/img/icons/close1.svg" alt="Clear" id="clear-button-img"></button>
                <button class="create-task" onclick="createTask()">Create Task<img src="/assets/img/icons/check1.svg" alt="Create Task"></button>
            </div>
        </div>  
    `;
}


function currentDate() {
    let date = new Date();                              // get the actual date

    let day = date.getDate();           
    let month = date.getMonth() + 1;                    // month starts with 0, thats why +1
    let year = date.getFullYear();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let today = year + '-' + month + '-' + day;       
    document.getElementById("date").value = today;
}


// this function is saving all inputfields from add-task
function createTask() {     
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assigned = document.getElementById('assigned');
    let date = document.getElementById('date');
    let priority = pushPrio();
    let category = document.getElementById('category');
    let newTask = {
        title: title.value,
        description: description.value,
        assigned: assigned.value,
        date: date.value,
        priority: priority,
        category: category.value
    };
    tasks.push(newTask);
    console.log(tasks);
    clearFields();
}


function pushPrio() {
    let prios = document.getElementById('prio');
    let prioButtons = prios.querySelectorAll('button');

    let selectedPriority = null;

    prioButtons.forEach(function(button) {
        if (!button.classList.contains('prio-notselected')) {
            selectedPriority = button.value;
        }
    });

    return selectedPriority;
}


function getPrio() {
    let prios = document.getElementById('prio');
    let prioButtons = prios.querySelectorAll('button');

    prioButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.stopPropagation();

            if(!button.classList.contains('prio-notselected')) {
                button.classList.add('prio-notselected')
            } else {
                prioButtons.forEach(function(btn){
                    btn.classList.remove('prio-notselected');
                    btn.classList.add('prio-notselected');
                });
    
                button.classList.add('prio-notselected');
                button.classList.remove('prio-notselected');
            }
        });
    });
}


function clearButtonImgChange() {
    let img = document.getElementById('clear-button-img');
    let clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('mouseover', function() {
        img.src = '/assets/img/icons/close-blue.svg';
    });
    clearButton.addEventListener('mouseout', function() {
        img.src = '/assets/img/icons/close.svg';
    });
}


function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('assigned').value = '';
    document.getElementById('date').value = '';
    let prio = document.querySelectorAll('.prio');
    prio.forEach(function(button) {
        if(!button.classList.contains('prio-notselected')) {
            button.classList.add('prio-notselected');
        }
    });
}

