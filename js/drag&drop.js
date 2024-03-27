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


function onTouchStart(id) {  // dragstart
    currentDraggedElement = id;
    console.log('Touch Start', currentDraggedElement);
}


function onTouchMove(ev) {  // allowdrop
    ev.preventDefault();
    let targetId = ev.srcElement.id;

    console.log('Touch Move', targetId);

}


function onTouchEnd(ev) { // drop
    console.log('Touch End');
}


function highlight(ev) {
    console.log(ev.target)
}

function removeHighlight(id) {
    console.log('removehighlight')
}
