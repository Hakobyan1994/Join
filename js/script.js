const STORAGE_TOKEN = 'MKWYMW3ZCIEWUYO2I64SK34MDCA45OO3E4G0MNQJ';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json())
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}

async function init() {
    includeHTML();
    renderSummaryMain();
    await loadContacts();
    displayGreeting();
}

async function initLogin() {
    includeHTML();
}


function goBack() {
    window.history.back();
}


async function loadTasks() {
    try {
        tasks = JSON.parse(await getItem('tasks')) || [];
        if (!Array.isArray(tasks)) {
            tasks = [];
        }
    } catch (e) {
        console.error('Error in loadTasks:', e);
    }
}


function renderPage(selectedBar, page) {
    renderHPLMain();
    let selectedNavbar = document.getElementById(selectedBar);
    let selectedPage = document.getElementById(page);
    let allNavbar = document.querySelectorAll('.navbar');
    let allPages = document.querySelectorAll('.render-page');

    selectedNavbar.classList.add('selected-color');
    selectedPage.style.display = 'block';
    if (page === 'render-add-task') {
        renderAddTaskMain();
    }
    if(page === 'render-contacts') {
        renderContactsMain();
    }
    if(page === 'render-board') {
        renderBoardMain();
    }

    allNavbar.forEach((navbar) => {
        if (navbar.id !== selectedBar) {
            navbar.classList.remove('selected-color');
        }
    })
    allPages.forEach((pages) => {
        if (pages.id !== page) {
            pages.style.display = 'none';
        }
    })
    resetHlp();
}


function resetHlp() {
    let allPages = document.querySelectorAll('.hlp');
    document.getElementById('legalhover').style.color = 'rgb(205, 205, 205)';
    document.getElementById('privacyhover').style.color = 'rgb(205, 205, 205)';
    allPages.forEach((page) => {
        page.style.display = 'none';

    })
}


function renderHPLMain(page) {
        let content = document.getElementById(page);
        let allNavbar = document.querySelectorAll('.navbar');
        let allPages = document.querySelectorAll('.render-page');
        let allHlp = document.querySelectorAll('.hlp');
        if(content) {
            content.style.display = 'block';
        }
        allHlp.forEach((pages) => {
            if(pages.id !== page) {
                pages.style.display = 'none';
            }
        })

        allNavbar.forEach((navbar) => {
            navbar.classList.remove('selected-color');
        })
        allPages.forEach((pages) => {
            pages.style.display = 'none';
        })
        if(page === 'render-help') {
            content.innerHTML = generateHtmlMainHelp();
        }
        if(page === 'render-privacy-policy') {
            content.innerHTML = generateHtmlMainPrivacy();
            document.getElementById('privacyhover').style.color = 'var(--lightblue)';
            document.getElementById('legalhover').style.color = 'rgb(205, 205, 205)';
        }
        if(page === 'render-legal-notice') {
            content.innerHTML = generateHtmlMainLegal();
            document.getElementById('legalhover').style.color = 'var(--lightblue)';
            document.getElementById('privacyhover').style.color = 'rgb(205, 205, 205)';
        }
        return page;
}


function renderPrivacyLegal(page) {
    hideUserContent();
    let content = document.getElementById(page);
    content.classList.remove('d-none');
    content.innerHTML = '';
    if(page === 'login-privacy') {
        content.innerHTML = generateHtmlMainPrivacy(); 
        document.getElementById('back-privacy').setAttribute('onClick', `resetUserContent('${page}')`);
        document.getElementById('privacyhover').style.color = 'var(--lightblue)';
        document.getElementById('legalhover').style.color = '';        
    } else if (page === 'login-legal') {
        content.innerHTML = generateHtmlMainLegal();
        document.getElementById('back-legal').setAttribute('onClick', `resetUserContent('${page}')`);
        document.getElementById('privacyhover').style.color = '';
        document.getElementById('legalhover').style.color = 'var(--lightblue)';        
    }
    document.getElementById('privacyhover').setAttribute('onClick', `renderPL('login-privacy', 'login-legal')`);
    document.getElementById('legalhover').setAttribute('onClick', `renderPL('login-legal', 'login-privacy')`);

}
  

function renderPL(page, expage) {
    let content = document.getElementById(page);
    let exPage = document.getElementById(expage);
    content.innerHTML = '';
    content.classList.remove('d-none');
    if(page === 'login-privacy') {
        exPage.classList.add('d-none');
        content.innerHTML = generateHtmlMainPrivacy();
        document.getElementById('privacyhover').style.color = 'var(--lightblue)';
        document.getElementById('legalhover').style.color = '';  
        document.getElementById('back-privacy').setAttribute('onClick', `resetUserContent('${page}')`); 
    } else if (page === 'login-legal') {
        exPage.classList.add('d-none');
        content.innerHTML = generateHtmlMainLegal();
        document.getElementById('privacyhover').style.color = '';
        document.getElementById('legalhover').style.color = 'var(--lightblue)';   
        document.getElementById('back-legal').setAttribute('onClick', `resetUserContent('${page}')`);
    }
}


function hideUserContent() {
    document.getElementById('menubar').classList.add('d-none');
    document.getElementById('header-right').classList.add('d-none');
    document.getElementById('login-div').classList.add('d-none');
    document.getElementById('navbar').classList.remove('d-none');
}


function resetUserContent(page) {
    document.getElementById('login-div').classList.remove('d-none');
    document.getElementById('navbar').classList.add('d-none');
    document.getElementById(page).innerHTML = '';
}


function minDate() {
    let dateObj = new Date();
        let day = dateObj.getDate();
        day = day < 10 ? "0" + day : day;
        let month = dateObj.getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        let year = dateObj.getFullYear();

        let resultDate = `${year}-${month}-${day}`;

        return resultDate;
}
