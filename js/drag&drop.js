// Drag and Drop Function
let currentDraggedElement;
let arrayPosition;
let currentStatus;
let onHover;
let currentOnHover;


function dragStart(ev) {
    deleteAllSilhouettes();
    currentDraggedElement = ev.currentTarget.getAttribute('id');
    arrayPosition = currentDraggedElement.replace(/\D/g, "");
    currentStatus = tasks[arrayPosition].status;
}


function allowDrop(ev) {
    ev.preventDefault();
    onHover = ev.currentTarget.getAttribute('id');
    if(currentStatus !== onHover) {
        showSilhouette(onHover);
    }
}


async function drop(ev) {
    let targetId = ev.currentTarget.getAttribute('id');
    tasks[arrayPosition].status = targetId;
    await saveTasks();
    loadToDo();
}


function showSilhouette(id) {
    let div = document.getElementById('silhouette');
    if(!div) {
        if(onHover !== currentStatus) {
            createSilhouette(id);
            currentOnHover = onHover;
        }
    } else if (div && currentOnHover !== onHover) {
        deleteAllSilhouettes();
    }
}


function createSilhouette(id) {
    let targetElement = document.getElementById(id);
    let silhouette = document.createElement('div');
    currentOnHover = targetElement.getAttribute('id');
    silhouette.id = 'silhouette';
    silhouette.classList.add('silhouette');
    silhouette.style.display = 'block';
    silhouette.style.top = '0px';
    targetElement.appendChild(silhouette);
}


function deleteAllSilhouettes() {
    let silhouettes = document.querySelectorAll('#silhouette');
    silhouettes.forEach(silhouette => silhouette.parentNode.removeChild(silhouette));
}


let touchedElement = null;
let offsetX;
let offsetY;

/*
function touchEvents() {
    let boardcards = document.querySelectorAll('.progress_card');
    boardcards.forEach(card => {
        card.addEventListener('touchstart', onTouchStart);
        card.addEventListener('touchmove', onTouchMove);
        card.addEventListener('touchend', onTouchEnd);
    });
}

*/
/*

function onTouchStart(ev) {
    deleteAllSilhouettes();
    let currentId = ev.currentTarget.getAttribute('id');
    let element = document.getElementById(currentId);
    touchedElement = element;

    element.style.opacity = '0.7';
    element.style.transform = 'scale(0.9)';
    element.style.zIndex = '1';

    offsetX = ev.touches[0].clientX - touchedElement.getBoundingClientRect().left;
    offsetY = ev.touches[0].clientY - touchedElement.getBoundingClientRect().top;
}

function onTouchMove(ev) {
    ev.preventDefault();
    if (touchedElement) {
        const x = ev.touches[0].clientX - offsetX;
        const y = ev.touches[0].clientY - offsetY;
        touchedElement.style.left = `${x}px`;
        touchedElement.style.top = `${y}px`;
    }
}

function onTouchEnd(ev) {
    if (touchedElement) {
        const x = ev.changedTouches[0].clientX - offsetX;
        const y = ev.changedTouches[0].clientY - offsetY;
        touchedElement.style.opacity = '1';
        touchedElement.style.transform = 'none';
        touchedElement.style.zIndex = '0';
        touchedElement.style.position = 'absolute';
        touchedElement.style.left = `${x}px`;
        touchedElement.style.top = `${y}px`;
        touchedElement = null;
    }
    let end = ev.currentTarget;
    console.log('end:', end);
}
*/