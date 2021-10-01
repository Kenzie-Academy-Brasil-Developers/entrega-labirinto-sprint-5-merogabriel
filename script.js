const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "P     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
]

const body = document.getElementsByTagName('body')
let counter = 1

for (let i = 0; i < map.length; i++) {
    const divLine = document.createElement('div')
    divLine.classList.add('line')
    document.body.appendChild(divLine)
    for (let j = 0; j < map[i].length; j++) {
        const div = document.createElement('div')
        if (map[i][j] === 'W') {
            div.classList.add('wall')
        } else if (map[i][j] === 'P') {
            div.classList.add('empty')
            const playerDiv = document.createElement('div')
            playerDiv.classList.add("player")
            div.appendChild(playerDiv)
        } else if (map[i][j] === "F") {
            div.classList.add("finishLine")
            div.classList.add("empty")
        } else if (map[i][j] === " ") {
            div.classList.add("empty")
        }
        div.classList.add(`column-${j+1}`)
        divLine.appendChild(div)
    }
}
    
document.addEventListener('keydown', (event) => {
    const keyName = event.key
    let playerPos = document.querySelector('.player')
    let rightParent = playerPos.parentElement.nextSibling
    let leftParent = playerPos.parentElement.previousSibling
    let upParent = playerPos.parentElement.parentElement.previousSibling.querySelector(`div:nth-child(${counter})`)
    let downParent = playerPos.parentElement.parentElement.nextSibling.querySelector(`div:nth-child(${counter})`)
    
    if (keyName === 'ArrowRight' && rightParent.classList.contains('empty')) {
        counter += 1
        rightParent.appendChild(playerPos)
    } else if (keyName === 'ArrowLeft' && leftParent.classList.contains('empty')) {
        leftParent.appendChild(playerPos)
        counter -= 1
    } else if (keyName === 'ArrowUp' && upParent.classList.contains('empty')) {
        upParent.appendChild(playerPos)
    } else if (keyName === 'ArrowDown' && downParent.classList.contains('empty')) {
        downParent.appendChild(playerPos)
    }
    
    if (playerPos.parentElement.classList.contains('finishLine') === true) {
        const note = document.createElement('h1')
        note.innerText = 'Parabéns! Você venceu!'
        document.body.appendChild(note)
    }
})