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
        hideNoCards(onHover);
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
        showNoCards();
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



let offsetX;
let offsetY;
let touchedElement;

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

function onTouchStart(ev) {
    dragStart(ev);
    touchedElement = document.getElementById(currentDraggedElement);
    touchedElement.style.opacity = '0.7';
    touchedElement.style.transform = 'scale(0.9)';
    touchedElement.style.zIndex = '4';
    offsetX = ev.touches[0].clientX;
    offsetY = ev.touches[0].clientY;
}


function onTouchMove(ev) {
    ev.preventDefault();
    let x = ev.touches[0].clientX - offsetX;
    let y = ev.touches[0].clientY - offsetY;
    touchedElement.style.left = `${x}px`;
    touchedElement.style.top = `${y}px`;
    let hoveredElements = document.elementsFromPoint(ev.touches[0].clientX, ev.touches[0].clientY);
    hoveredElements.forEach(element => {
        if(element.classList.contains('card_Div')) {
            onHover = element.id;
        }
    })
    if(currentStatus !== onHover) {
        hideNoCards(onHover);
        showSilhouette(onHover);
    }
}


async function onTouchEnd(ev) {
    tasks[arrayPosition].status = onHover;
    await saveTasks();
    loadToDo();
    offsetX = null;
    offsetY = null;
}


function hideNoCards(id) {
    let hoveredElements = document.getElementById(id);
    let check = hoveredElements.querySelectorAll('.Card_NotasksTodo');
    check.forEach(element => {
        element.style.display = 'none';
    })
}


function showNoCards() {
    let noCard = document.querySelectorAll('.Card_NotasksTodo');
    noCard.forEach(element => {
        element.style.display = 'flex';
    })
}
