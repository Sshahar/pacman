'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gTotalFood

function onInit() {
    console.log('hello')
    gGame.score = 0
    gGame.isOn = true
    document.querySelector('.game-over-container').style.display = 'none'

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 7
    const board = []
    gTotalFood = -1 // pacman removes food he stands on

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                continue
            }
            board[i][j] = FOOD
            gTotalFood++
        }
    }
    console.log('gTotalFood:', gTotalFood)
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff

    const elScore= document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    document.querySelector('.game-over-container').style.display = 'block'
    
    var victoryDisplay = 'none'
    if (gGame.score === gTotalFood) victoryDisplay = 'block'
document.querySelector('.is-victory').style.display = victoryDisplay 
}
