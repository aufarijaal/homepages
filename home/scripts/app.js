let clock = document.getElementById('clock');
let date = document.getElementById('date');
let btnToEnterEditMode = document.querySelector('.btn-enter-edit');
let btnEnterAddMode = document.querySelector('.btn-enter-add');
let btnToUpdateBookmark = document.querySelector('.btn-update');
let btnAddNewBookmark = document.querySelector('.btn-add');
let allBookmarksContainer = document.querySelector('.speed-dial-container');
let imgToggle = document.querySelector('div#toggle');
let moon = document.getElementById('moon');
let sun = document.getElementById('sun');
let editForm = document.querySelector('form#edit');

const myColors = {
    darkPrimary: '#121116',
    darkSecondary: '#1F1D25',
    lightSecondary: '#E4EBF9',
    accent: '#6220D0',
    greenLight: '#57F182',
    green: '#16a085',
    redlight: '#F15757',
    red: '#e74c3c',
    orange: '#F17C57',
    blue: '#3498db',
    oil: '#F1C557',
    purple:  this.accent,
    cyan: '#57E7F1',
    yellow: '#DBF157',
    pink: '#F157C5'
}
getCurrentTheme();

// Display TIME to page
setInterval(() => {
    let getDate = new Date();
    let timeFunc = getDate.toLocaleString("id", { timeZone: "Asia/Jakarta", hour: '2-digit', minute:'2-digit', hour12: false });
    let dateFunc = getDate.toLocaleString("id", { timeZone: "Asia/Jakarta", month: "long",day: "numeric", year: "numeric" });

    date.innerHTML = dateFunc;
    clock.innerHTML = timeFunc;
}, 1000);
clock.addEventListener('mouseenter', () => {
    date.classList.toggle('show');
})
clock.addEventListener('mouseleave', () => {
    date.classList.toggle('show');
})

// add New bookmark
btnAddNewBookmark.addEventListener('click', el => {
    let inputTitle = document.querySelector('input#title').value;
    let inputUrl = document.querySelector('input#url').value;
    let selectedColors = document.querySelector('#select-colors').value;
    
    if(inputTitle !== '' && inputUrl !== '') {
        let newBookmark = {
            title: inputTitle,
            url: inputUrl,
            color: selectedColors
        };
    
        if(localStorage.getItem('bookmarkList') === null || localStorage.getItem('bookmarkList') === [] || localStorage.getItem('bookmarkList') === undefined) {
            let bookmarkList = [];
            bookmarkList.push(newBookmark);
            let child = `<div class="item-content">
                            <a href="${inputUrl}" class="bookmark" style=" color:${selectedColors}">${inputTitle}</a>
                            <div class="btn-action-container">
                                <button onclick="editThis('${title}')" class="btn btn-edit"><img src="assets/i_edit.svg"></button>
                                <button onclick="removeThis('${inputTitle}')" class="btn btn-del"><img src="assets/i_trash.svg"></button>
                            </div>
                        </div>`
            allBookmarksContainer.insertAdjacentHTML('beforeend', child)
            localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
            if(allBookmarksContainer.childNodes[0].nodeValue == 'no bookmark yet.') {allBookmarksContainer.childNodes[0].remove()};
        } else {
            let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
            bookmarkList.push(newBookmark);
            let child = `<div class="item-content">
                            <a href="${inputUrl}" class="bookmark" style=" color:${selectedColors}">${inputTitle}</a>
                            <div class="btn-action-container">
                                <button onclick="editThis('${title}')" class="btn btn-edit"><img src="assets/i_edit.svg"></button>
                                <button onclick="removeThis('${inputTitle}')" class="btn btn-del"><img src="assets/i_trash.svg"></button>
                            </div>
                        </div>`
            allBookmarksContainer.insertAdjacentHTML('beforeend', child)
            localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
            if(allBookmarksContainer.childNodes[0].nodeValue == 'no bookmark yet.') {allBookmarksContainer.childNodes[0].remove()};
        }
    } else {
        alert('Must provide Title and the url, color optional.');
    }
    
    
    el.preventDefault();
    getCurrentTheme();
});

// Get Data in localStorage and populate display them in page

const getBookmarkList = () => {
    if(localStorage.getItem('bookmarkList') === null || JSON.parse(localStorage.getItem('bookmarkList')) == []) {
        allBookmarksContainer.innerHTML = 'no bookmark yet.';
        btnToEnterEditMode.style.display = 'none';
    } else {
        let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
        
        if(allBookmarksContainer.childNodes[0].nodeValue == 'no bookmark yet.') {allBookmarksContainer.childNodes[0].remove()};
        // Dsplay all avaialble bookmark from localstorage to page
        allBookmarksContainer.innerHTML = '';
        for(let i = 0; i < bookmarkList.length; i++) {
            let title = bookmarkList[i].title;
            let url = bookmarkList[i].url;
            let color = bookmarkList[i].color;

            allBookmarksContainer.innerHTML += 
            `<div class="item-content">
                <a href="${url}" class="bookmark" style=" color:${color}">${title}</a>
                <div class="btn-action-container">
                    <button onclick="editThis('${title}')" class="btn btn-edit"><img src="assets/i_edit.svg"></button>
                    <button onclick="removeThis('${title}')" class="btn btn-del"><img src="assets/i_trash.svg"></button>
                </div>
            </div>`
        }
    }
    getCurrentTheme();
}
window.addEventListener('load', getBookmarkList);

// Deleting bookmark
const removeThis = title => {
    let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
    for(let i = 0; i < bookmarkList.length; i++) {
        if(bookmarkList[i].title === title) {
            bookmarkList.splice(i,1);
        }
    }
    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
    btnToEnterEditMode.innerHTML = 'Edit';
    getBookmarkList();
}
// Enter Add bookmark
btnEnterAddMode.addEventListener('click', () => {
    let formEdit = document.querySelector('form#edit');

    formEdit.classList.toggle('show');
    btnAddNewBookmark.classList.toggle('visible');
    // (btnEnterAddMode.innerHTML == 'Add New') ? btnEnterAddMode.innerHTML = 'OK' : btnEnterAddMode.innerHTML = 'Add New';
    if(btnEnterAddMode.innerHTML == 'Add New') {
        btnEnterAddMode.innerHTML = 'OK';
        btnEnterAddMode.style.backgroundColor = myColors.blue;
    } else {
        btnEnterAddMode.innerHTML = 'Add New'
        btnEnterAddMode.style.background = 'none';
    }
    document.querySelector('input#title').value = '';
    document.querySelector('input#url').value = '';

    if(btnToEnterEditMode.disabled == false) {
        btnToEnterEditMode.disabled = true;
        btnToEnterEditMode.style.cursor = 'not-allowed';
    } else {
        btnToEnterEditMode.disabled = false;
        btnToEnterEditMode.style.cursor = 'pointer';

    }
});
// Edit selected bookmark

    // Enter the edit Mode first

btnToEnterEditMode.addEventListener('click', () => {
    let btnEditRemoveContainer = document.querySelectorAll('.btn-action-container');
    let formEdit = document.querySelector('form#edit');
    
    // (btnToEnterEditMode.innerHTML == 'Edit') ? btnToEnterEditMode.innerHTML = 'OK' : btnToEnterEditMode.innerHTML = 'Edit';
    if(btnToEnterEditMode.innerHTML == 'Edit') {
        btnToEnterEditMode.innerHTML = 'OK';
        btnToEnterEditMode.style.backgroundColor = myColors.green;
    } else {
        btnToEnterEditMode.innerHTML = 'Edit'
        btnToEnterEditMode.style.background = 'none';
    }
    for(const each of btnEditRemoveContainer) {
        each.classList.toggle('visible');
    }
    if(btnEnterAddMode.disabled == false) {
        btnEnterAddMode.disabled = true;
        btnEnterAddMode.style.cursor = 'not-allowed';
    } else {
        btnEnterAddMode.disabled = false;
        btnEnterAddMode.style.cursor = 'pointer';
    }
    if(formEdit.classList.contains('show') && btnToUpdateBookmark.classList.contains('visible')) {
        formEdit.classList.remove('show');
        btnToUpdateBookmark.classList.remove('visible');
    } 
})

    // Then edit the bookmark

const editThis = el => {
    'use strict';
    
    let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
    let formEdit = document.querySelector('form#edit');

    formEdit.classList.add('show');
    btnToUpdateBookmark.classList.add('visible');

    // return console.log(el);
    if(bookmarkList.length == 1) {
        document.querySelector('input#title').value = bookmarkList[0].title;
        document.querySelector('input#url').value = bookmarkList[0].url;
        document.querySelector('#select-colors').value = bookmarkList[0].color;
        document.querySelector('input#origin').value = bookmarkList[0].title;
    } else {
        for(let i = 0; i < bookmarkList.length; i++) {
            if(bookmarkList[i].title == el) {
                document.querySelector('input#title').value = bookmarkList[i].title;
                document.querySelector('input#url').value = bookmarkList[i].url;
                document.querySelector('#select-colors').value = bookmarkList[i].color;

                document.querySelector('input#origin').value = bookmarkList[i].title;
            }
        }
    }

}

    // Finally save the changes

btnToUpdateBookmark.addEventListener('click', () => {
    let bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
    let origin = document.querySelector('input#origin');
    let formEdit = document.querySelector('form#edit');

    for(let i = 0; i < bookmarkList.length; i++) {
        if(bookmarkList[i].title == origin.value) {
            bookmarkList[i].title = document.querySelector('input#title').value;
            bookmarkList[i].url = document.querySelector('input#url').value;
            bookmarkList[i].color = document.querySelector('#select-colors').value;
        }
    }
    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
    getBookmarkList();

    origin.value = '';
    formEdit.classList.remove('show');
    btnToEnterEditMode.innerHTML = 'Edit';
    btnToEnterEditMode.style.background = 'none';
    btnEnterAddMode.disabled = false;
    btnEnterAddMode.style.cursor = 'pointer';
})

// --> Exit Edit/Add Mode with escape key
document.addEventListener('keydown', event => {
    const keyName = event.key;
    let inputTitle = document.querySelector('input#title').value;
    let inputUrl = document.querySelector('input#url').value;
    let formEdit = document.querySelector('form#edit');
    let btnEditRemoveContainer = document.querySelectorAll('.btn-action-container');

    // Exit Add Mode
    if(keyName === 'Escape' && btnEnterAddMode.innerHTML === 'OK') {
        btnEnterAddMode.innerHTML = 'Add New';
        btnEnterAddMode.style.background = 'none';
        formEdit.classList.remove('show');
        btnToEnterEditMode.disabled = false;
        btnToEnterEditMode.style.cursor = 'pointer';
        btnAddNewBookmark.classList.remove('visible');

        if(inputTitle || inputUrl) {
            inputTitle = '';
            inputUrl = '';
        }
    }
    // Exit Edit Mode
    if(keyName === 'Escape' && btnToEnterEditMode.innerHTML === 'OK') {
        btnToEnterEditMode.innerHTML = 'Edit';
        btnToEnterEditMode.style.background = 'none';
        btnEnterAddMode.disabled = false;
        btnEnterAddMode.style.cursor = 'pointer';
        for(const each of btnEditRemoveContainer) {
            each.classList.remove('visible');
        }

        if(formEdit.classList.contains('show')) {
            formEdit.classList.remove('show');
        }
        btnToUpdateBookmark.classList.remove('visible');
    }
})



// Display GREETING to the page
const DISPLAY_GREETING = (() => {
    const currentHour = new Date().getHours();
    let greeting = document.querySelector('#greeting');

    if (currentHour >= 0 && currentHour < 11)  { greeting.innerHTML = "Good Morning"; }
    if (currentHour >= 11 && currentHour < 14) { greeting.innerHTML = "Good Noon"; }
    if (currentHour >= 14 && currentHour < 18) { greeting.innerHTML = "Good Afternoon"; }
    if (currentHour >= 18 && currentHour < 24) { greeting.innerHTML = "Good Evening"; }
})();



imgToggle.addEventListener('click', () => {
    if(localStorage.getItem('currentTheme') == 'dark') {
        setTheme('LIGHT',editForm,'block','none','white',myColors.lightSecondary,'black');
        localStorage.setItem('currentTheme', 'light');
    } else if(localStorage.getItem('currentTheme') == 'light') {
        setTheme('DARK',editForm,'none','block',myColors.darkSecondary,myColors.darkPrimary,'white');
        localStorage.setItem('currentTheme', 'dark');
    }
    getCurrentTheme();
})
// function setToLight() {
//     let list = document.querySelectorAll('a.bookmark');

//     moon.style.display = 'block';
//     sun.style.display = 'none';
//     imgToggle.style.backgroundColor = 'white';
//     document.body.style.backgroundColor = myColors.lightSecondary;
//     document.querySelector('form#edit').style.backgroundColor = 'white';
//     btnEnterAddMode.style.color = 'black';
//     btnToEnterEditMode.style.color = 'black';
//     for(each of list) {
//         each.style.backgroundColor = 'white';
//     }
// }
// function setToDark() {
//     let list = document.querySelectorAll('a.bookmark');

//     moon.style.display = 'none';
//     sun.style.display = 'block';
//     imgToggle.style.backgroundColor = myColors.darkSecondary;
//     document.body.style.backgroundColor = myColors.darkPrimary;
//     document.querySelector('form#edit').style.backgroundColor = myColors.darkSecondary;
//     btnEnterAddMode.style.color = 'white';
//     btnToEnterEditMode.style.color = 'white';
//     for(each of list) {
//         each.style.backgroundColor = myColors.darkSecondary;
//     }
// }

function setTheme (act,formEl,moonDis,sunDis,toggleFormListBg,bodyBg,btnTextColor) {
    let listBookmark = document.querySelectorAll('a.bookmark');

    switch (act) {
        case 'DARK' :
        case 'LIGHT' :
            moon.style.display = moonDis;
            sun.style.display = sunDis;
            imgToggle.style.backgroundColor = toggleFormListBg;
            document.body.style.backgroundColor = bodyBg;
            formEl.style.backgroundColor = toggleFormListBg;
            btnEnterAddMode.style.color = btnTextColor;
            btnToEnterEditMode.style.color = btnTextColor;
            for(each of listBookmark) {
                each.style.backgroundColor = toggleFormListBg;
            }
            break;
        default:
            break;
    }
}
function getCurrentTheme() {
    if(localStorage.getItem('currentTheme') === null) {
        localStorage.setItem('currentTheme', 'dark');
        setTheme('DARK',editForm,'none','block',myColors.darkSecondary,myColors.darkPrimary,'white');
    } else if(localStorage.getItem('currentTheme') === 'dark') {
        setTheme('DARK',editForm,'none','block',myColors.darkSecondary,myColors.darkPrimary,'white');
    } else if(localStorage.getItem('currentTheme') === 'light') {
        setTheme('LIGHT',editForm,'block','none','white',myColors.lightSecondary,'black');
    }
}