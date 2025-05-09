/**
 * Initializes variables for drag and drop functionality.
 */
let currentDraggedElement;
let arrayPosition;
let currentStatus;
let onHover = [];
let currentOnHover = [];
let offsetX;
let offsetY;
let touchedElement;

/**
 * Handles the drag start event.
 * 
 * @param {Event} ev - The drag start event.
 */
  function dragStart(ev) {
    deleteAllSilhouettes();
    const id = ev.currentTarget.getAttribute('id');
    currentDraggedElement = id;
    arrayPosition = parseInt(id.replace(/\D/g, ""), 10);
    if (!tasks || !tasks[arrayPosition]) {
        return;
    }
    currentStatus = tasks[arrayPosition].status;
    currentOnHover = currentStatus;
    onHover = currentStatus;
}

/**
 * Allows dropping of elements.
 * 
 * @param {Event} ev - The drop event.
 */
function allowDrop(ev) {
    ev.preventDefault();
    onHover = ev.currentTarget.getAttribute('id');
    if(currentStatus !== onHover) {
        hideNoCards(onHover);
        showSilhouette(onHover);
    }
}   

   function checkNoCards() {
    const boardIds = ['board-to-do', 'board-in-progress', 'board-await-feedback', 'board-done'];
    boardIds.forEach(id => {
        const board = document.getElementById(id);
        const noCardMsg = board.querySelector('.Card_NotasksTodo');
        const cards = board.querySelectorAll('.progress_card');
        if (cards.length === 0) {
            if (noCardMsg) {
                noCardMsg.classList.remove('hidden');
            }
        } else {
            if (noCardMsg) {
                noCardMsg.classList.add('hidden');
            }
        }
    });
}  

/**
 * Handles the drop event.
 * 
 * @param {Event} ev - The drop event.
 */  



async function drop(ev) {
    ev.preventDefault();
    let targetId = ev.currentTarget.getAttribute('id');
    let sourceId = currentStatus;
    if (tasks[arrayPosition]) {
        tasks[arrayPosition].status = targetId;
        await updateTaskStatusInDB(tasks[arrayPosition]);
        const cardElement = document.getElementById(currentDraggedElement);
        const newColumn = document.getElementById(targetId);
        newColumn.insertBefore(cardElement, newColumn.firstChild);
        deleteAllSilhouettes();
        requestAnimationFrame(() => {
            checkSingleColumn(sourceId); 
            checkSingleColumn(targetId);
        });
            // await renderBoardMain();
    } else { 
        console.error("Task an dieser Position existiert nicht:", arrayPosition);
    }
}   

async function checkSingleColumn(id) {
    const board = document.getElementById(id);
    const noCardMsg = board.querySelector('.Card_NotasksTodo');
    const cards = board.querySelectorAll(`#${id} .progress_card`);
    if (cards.length === 0) { 
        if (noCardMsg) noCardMsg.style.display = 'flex';
        console.log(`✅ ${id} ist leer`);
        await loadToDo()
    } else {
        if (noCardMsg) noCardMsg.style.display = 'none';
    }
}


       
function renderAddTaskForPopup() {
    e.preventDefault();
}

async function loadTaskss() {
    const response = await fetch('http://127.0.0.1:8000/join_app/create_tasks/');
    data = await response.json();
    tasks=data
}


/**
 * Shows a silhouette element indicating the drop location.
 * 
 * @param {string} id - The ID of the drop target element.
 */
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
        checkNoCards();
        
    }
}


/**
 * Creates a silhouette element.
 * 
 * @param {string} id - The ID of the drop target element.
 */
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


/**
 * Deletes all silhouette elements.
 */
function deleteAllSilhouettes() {
    let silhouettes = document.querySelectorAll('#silhouette');
    silhouettes.forEach(silhouette => silhouette.parentNode.removeChild(silhouette));
}


/**
 * Handles the touch start event.
 * @param {TouchEvent} ev - The touch start event.
 */
function onTouchStart(ev) {
    let progressCard = document.querySelector('.progress_card');
    if(progressCard) {
        dragStart(ev);
        touchedElement = document.getElementById(currentDraggedElement);
        touchedElement.style.opacity = '0.7';
        touchedElement.style.transform = 'scale(0.9)';
        touchedElement.style.zIndex = '4';
        offsetX = ev.touches[0].clientX;
        offsetY = ev.touches[0].clientY;
    }
}


/**
 * Handles the touch move event.
 * 
 * @param {TouchEvent} ev - The touch move event.
 */
function onTouchMove(ev) {
    let progressCard = document.querySelector('.progress_card');
    if(progressCard) {
        ev.preventDefault();
        setPositionOfTouchedElement(ev);
        let hoveredElements = document.elementsFromPoint(ev.touches[0].clientX, ev.touches[0].clientY);
        hoveredElements.forEach(element => {
            if(element.classList.contains('card_Div')) {
                onHover = element.id;
            }
        })
        ifToShowSilhouette();
    }
}

/**
 * Sets the position of the touched element.
 * 
 * @param {TouchEvent} ev - The touch move event.
 */
function setPositionOfTouchedElement(ev) {
    let x = ev.touches[0].clientX - offsetX;
    let y = ev.touches[0].clientY - offsetY;
    touchedElement.style.left = `${x}px`;
    touchedElement.style.top = `${y}px`;
}


/**
 * Checks whether to show a silhouette element.
 */
function ifToShowSilhouette() {
    if(currentStatus !== onHover) {
        hideNoCards(onHover);
        showSilhouette(onHover);
    }
}


/**
 * Handles the touch end event.
 * 
 * @param {TouchEvent} ev - The touch end event.
 */
async function onTouchEnd(ev) {
    let progressCard = document.querySelector('.progress_card');
    if(progressCard) {
        tasks[arrayPosition].status = onHover;
        await loadToDo();
        setTimeout(() => {
            showNoCards() 
        }, 1);
        showNoCards();
        offsetX = null;
        offsetY = null;
    } 
}   



/**
 * Hides 'no cards' message for the specified element ID.
 * @param {string} id - The ID of the element.
 */
function hideNoCards(id) {
    let hoveredElements = document.getElementById(id);
    let check = hoveredElements.querySelectorAll('.Card_NotasksTodo');
    check.forEach(element => {
        element.style.display = 'none';
    })
}

/**
 * Shows 'no cards' message for elements with class 'Card_NotasksTodo'.
 */
function showNoCards() {
    let noCard = document.querySelectorAll('.Card_NotasksTodo');
    noCard.forEach(element => {
        element.style.display = 'flex';
    })
}
