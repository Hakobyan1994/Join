// Drag and Drop Function

function notData() {
    let todo = document.getElementById('board-to-do');
    if (tasks.length === 0) {
        let noTodotask = document.getElementById('NoToDo');
        noTodotask.classList.remove('d-none');
        noTodotask.style.display = 'flex';
        todo.appendChild(noTodotask);
    }
    return;
}


function dragStart(ev) {
    deleteAllSilhouettes();
    let txt = ev.srcElement.id;
    let id = txt[txt.length - 1];
    let status = tasks[id].status;
    notData();
    dataTask.splice(id, 1)
    ev.dataTransfer.setData("text", ev.target.id);
    ev.target.style.transform = "rotate(0deg)";
    return status;
}


function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let draggedElement = document.getElementById(data);
    draggedElement.style.transform = "rotate(0deg)";
    let dropTargetId = ev.target.id;

    let not = document.querySelectorAll('.Card_NotasksTodo');
    not.forEach(function(div) {
        div.classList.remove('d-none');
    })
    ifDropPossible(ev, dropTargetId, draggedElement);
    deleteAllSilhouettes();
}


function ifDropPossible(ev, dropTargetId, draggedElement) {
    if (dropTargetId === 'silhouette') {
        let parentTargetId = ev.target.parentElement.id;
        switch (parentTargetId) {
            case 'board-to-do':
            case 'board-in-progress':
            case 'board-await-feedback':
            case 'board-done':
                if (!ev.target.contains(draggedElement)) {
                    let category = ev.target.parentElement.appendChild(draggedElement);
                    saveDroppedElement(draggedElement);
                }
                break;
                    default:
                break;
        }
    }
}
  

async function saveDroppedElement(element) {
    let arraypos = element.getAttribute('arraypos');
    let dropTargetId = element.parentElement.id;

    tasks[arraypos].status = `${dropTargetId}`;
    await setItem('tasks', JSON.stringify(tasks));
    await loadToDo();
}


function allowDrop(ev) {
    ev.preventDefault();
    let targetId = ev.target.id;
    let not = document.querySelector('.Card_NotasksTodo');
    
    if (ev.target.classList.contains('Card_NotasksTodo')) {
        ev.target.remove();
    }
    dropCard(ev, targetId, not);
}


function dropCard(ev, targetId, not) {
    let dropPossible = isDropPossible(targetId);
    if (!dropPossible && !document.querySelector('#silhouette')) {
        ev.dataTransfer.dropEffect = 'none';
        if (not) {
            not.classList.add('d-none');
        }
    } else if (dropPossible) {
        ev.dataTransfer.dropEffect = 'move'; 
        ev.target.style.backgroundColor = '';
        if (not) {
            not.classList.add('d-none');
        }
        showSilhouette(targetId);
    }
}


function isDropPossible(targetId) {
    let allowedTargets = ['board-to-do', 'board-in-progress', 'board-await-feedback', 'board-done'];
    return allowedTargets.includes(targetId);
}


function showSilhouette(targetId) {
    let silhouette = document.getElementById('silhouette');
    if (!silhouette) {
        let targetElement = document.getElementById(targetId);
        let newSilhouette = document.createElement('div');
        newSilhouette.id = 'silhouette';
        newSilhouette.classList.add('silhouette');
        newSilhouette.style.display = 'block';
        newSilhouette.style.top = '0px';
        targetElement.appendChild(newSilhouette);
    } else {
        deleteAllSilhouettes();
    }
}


function deleteAllSilhouettes() {
    let silhouettes = document.querySelectorAll('#silhouette');
    silhouettes.forEach(silhouette => silhouette.parentNode.removeChild(silhouette));
}


let touchedElement = null; 

function onTouchStart(ev) {  // dragstart
    deleteAllSilhouettes();
    let touch = ev.touches[0];
    let currentTarget = ev.currentTarget;
    let currentId = ev.currentTarget.getAttribute('id');
    let element = document.getElementById(currentId);
    touchedElement = currentTarget;

    element.style.opacity = '0.7';
    element.style.transform = 'scale(0.9)';
    element.style.zIndex = '1';

    let arrayPosition = currentId.replace(/\D/g, '');

    console.log('Touch Start',touchedElement);
}


function onTouchMove(ev) {  // allowdrop
    let draggableElement = ev.currentTarget;
    if(touchedElement) {
        let touch = ev.touches[0];
        let x = touch.clientX; // 115
        let y = touch.clientY; // 235
        touchedElement.style.left = x + 'px';
        touchedElement.style.top = y + 'px';
        }
    
}


function onTouchEnd(ev) { // drop
    console.log('Touch End');
}


function highlightContainer(ev) {
    let targetId = ev.target;
    console.log(targetId)
}

function removeHighlightContainer(ev) {
    console.log('removehighlight')
}

