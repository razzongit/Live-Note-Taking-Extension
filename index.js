

const inputEl = document.getElementById("input-el")
const btnEl = document.getElementById("btn-el")
const divEl = document.getElementById("div-el")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")

let myNote = []

let loadLocalStorage = JSON.parse(localStorage.getItem("myNote"))

if (loadLocalStorage) {
    myNote = loadLocalStorage 
    saveNote()
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myNote.push(tabs[0].url)
        localStorage.setItem("myNote", JSON.stringify(myNote))
        saveNote()
        console.log(tabs[0])
    })
})


btnEl.addEventListener("click", function () {
    myNote.push(inputEl.value)
    saveNote()
    localStorage.setItem("myNote", JSON.stringify(myNote))
    console.log(myNote);
    inputEl.value = ""
})

function saveNote () {
    ulEl.innerHTML = ""

    console.log(ulEl)

    for (let i = 0; i < myNote.length; i++) {
        const li = document.createElement('li');
        li.textContent = myNote[i];
        li.classList.add('li-el')

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Del';
        deleteBtn.classList.add('btn-el')

        deleteBtn.addEventListener('click', () => {
            // Remove item from array
            myNote.splice(i, 1);
            saveNote();
        });

        li.appendChild(deleteBtn);
        ulEl.appendChild(li);
    }
}

ulEl.addEventListener("click", function (e) {
    if (e.target && e.target.tagName === "LI") {
        const text = e.target.textContent;
        navigator.clipboard.writeText(text)
        alert(`Copied`)
    }
});