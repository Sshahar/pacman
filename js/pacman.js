'use strict'

const PACMAN = '😜'
var gPacman

function createPacman(board) {
    // TODO: initialize gPacman...
    gPacman = {
        location: { i: 5, j: 5 },
        isSuper: false,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // TODO: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL) return

    // TODO: hitting a ghost? call gameOver
    if (gPacman.isSuper && nextCell === GHOST) removeGhost({ nextLocation })
    else if (nextCell === GHOST) {
        gameOver()
        return
    }

    // TODO: hitting food? call updateScore
    if (nextCell === FOOD) updateScore(1)
    else if (nextCell === SUPER_FOOD && gPacman.isSuper) return
    else if (nextCell === SUPER_FOOD) onSuperPacman()
    else if (nextCell === CHERRY) {
        gPacman.cherriesCollected++
        updateScore(10)
    }

    // TODO: moving from current location:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)

    // TODO: Move the pacman to new location:
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)

    if (gTotalFood === gGame.score) {
        gameOver()
        return
    }
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }
    // TODO: figure out nextLocation
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            gPacman.direction = 'up'
            break;
        case 'ArrowDown':
            nextLocation.i++
            gPacman.direction = 'down'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            gPacman.direction = 'left'
            break;
        case 'ArrowRight':
            nextLocation.j++
            gPacman.direction = 'right'
            break;

        default:
            return null;
    }
    return nextLocation
}

function onSuperPacman() {
    gPacman.isSuper = true
    setTimeout(() => gPacman.isSuper = false, 5000)
}