'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const SUPER_FOOD = '&#9900;'
const CHERRY = '🍒'
const EMPTY = ' '
const CHERRY_POINTS = 10

const gGame = {
    score: 0,
    isOn: false,
    foodCollected: 0,
}
var gBoard
var gTotalFood
var gCherryInterval

// Audio
var gChompAudio = new Audio('aud/pacman_chomp.wav')


function onInit() {
    console.log('hello')
    gGame.score = 0
    gGame.isOn = true
    gGame.foodCollected = 0
    document.querySelector('.game-over-container').style.display = 'none'

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    gCherryInterval = setInterval(createCherry, 3000)

    // gAudio.play()
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
}

function buildBoard() {
    const size = 10
    const board = []
    gTotalFood = -1 //  pacman removes food he stands on

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                continue
            }

            if ((i === 1 && j === 1) ||
                (i === 1 && j === size - 2) ||
                (i === size - 2 && j === 1) ||
                (i === size - 2 && j === size - 2)) {
                board[i][j] = SUPER_FOOD
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

    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    document.querySelector('.game-over-container').style.display = 'block'

    var victoryDisplay = 'none'
    if (gGame.foodCollected === gTotalFood) victoryDisplay = 'block'
    document.querySelector('.is-victory').style.display = victoryDisplay
    clearInterval(gCherryInterval)
}

function createCherry() {
    var emptyCells = getEmptyCells()
    if (!emptyCells.length) return

    var randIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    var cellLoc = emptyCells[randIdx]
    gBoard[cellLoc.i][cellLoc.j] = CHERRY
    renderCell(cellLoc, CHERRY)
}

function getEmptyCells() {
    var emptyCells = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j] === EMPTY) emptyCells.push({ i, j })
        }
    }

    return emptyCells
}