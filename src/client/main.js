function startJobAt(hh, mm, callback) {
    let now = new Date();
    let nowHH = now.getHours();
    let nowMM = now.getMinutes();
    let nowSS = now.getSeconds();
    let interval = (hh - nowHH) * 60 * 60 * 1000 + (mm - nowMM) * 60 * 1000 - nowSS * 1000;
    return setTimeout(callback, interval);
}

function repeatCallback(callback, ms) {
    intervalId = setInterval(callback, ms);
}

function printValueIntoHtml(value) {
    let textBlock = document.getElementById('text-block');
    let newChildBlock = document.createElement('p');
    let newChildBlockText = `test${value}`;
    newChildBlock.innerText = newChildBlockText;
    let item = localStorage.getItem(newChildBlockText)
    if (!item) {
        localStorage.setItem(newChildBlockText, 'sometext');
        textBlock.insertAdjacentElement('afterbegin', newChildBlock);
        results.push(newChildBlockText);
    }
}

async function changeStateToStopped() {
    if (intervalId) {
        clearInterval(intervalId)
    }
    let indicator = document.getElementById('indicator');
    indicator.innerText = 'STOPPED'
    indicator.classList.add('important-text')
    let response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(results)
    });
    console.log(response);
}

async function sendResults() {
    await changeStateToStopped()
}

let counter = 1;
let intervalId;
let results = [];
/**
 * Очищаем локальное хранилище во избежание отсутствия
 * предыдущих данных
 */
window.localStorage.clear();

startJobAt(17, 17,
    () => {
        repeatCallback(() => {
            printValueIntoHtml(counter)
            counter++;
        }, 250)
    }
);
