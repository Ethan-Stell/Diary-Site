const textarea = document.querySelector('textarea')
const enterBtn = document.getElementById('enterBtn')
const entriesContainer = document.querySelector('.entriesContainer')
const deleteBtn = document.getElementById('deleteBtn')

let diary = []
let times = []

function initLoad() {
    if (!localStorage.getItem('entries')) {return}
    diary = JSON.parse(localStorage.getItem('entries')).diary
    times = JSON.parse(localStorage.getItem('times')).times
    updateUI()
}

initLoad()

function addEntry() {
    const entry = textarea.value
    if (!entry) {return}

    const timestamp = new Date()
    const formattedTimestamp = timestamp.toLocaleString()
    console.log('Added Entry:', entry)
    diary.unshift(entry)
    times.unshift(formattedTimestamp)
    textarea.value = '' // resets area to empty
    updateUI()
}

function deleteEntry(index) {
    diary = diary.filter((element, elementIndex) => {
        if (index === elementIndex) {return false}
        return true
    })
    updateUI()
}

function editEntry(index) {
    textarea.value = diary[index]
    diary = diary.filter((element, elementIndex) => {
        if (index === elementIndex) {return false}
        return true
    })
    updateUI()
}

function updateUI() {
    let NewInnerHTML = ''
    diary.forEach((entryElement, diaryIndex) => {
        NewInnerHTML += `
        <div class="entry">
                <p class="writing">${entryElement}</p>
                <div class="icons">  
                    <button class="IconBtn" onclick="editEntry(${diaryIndex})"><i class="fa-solid fa-pen"></i></button>
                    <button class="IconBtn" onclick="deleteEntry(${diaryIndex})"><i class="fa-solid fa-trash"></i></button>
                </div>  
                <div class="timestamp">
                    <p>${times[diaryIndex]}</p>
                </div>
            </div>
        `
    })

    entriesContainer.innerHTML = NewInnerHTML

    localStorage.setItem('entries', JSON.stringify({diary}))
    localStorage.setItem('times', JSON.stringify({times}))
}

enterBtn.addEventListener('click', addEntry)


