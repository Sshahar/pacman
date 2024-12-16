'use strict'

const PACMAN = '😜'
var gPacman

function createPacman(board) {
    // initialize gPacman...
    gPacman = {
        location: { i: 5, j: 5 },
        isSuper: false,
        cherriesCollected: 0,
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return

    // use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // return if cannot move
    if (nextCell === WALL) return

    // hitting a ghost?
    if (gPacman.isSuper && nextCell === GHOST) {
        if (removeGhost(nextLocation)) {
            gGame.foodCollected++
            console.log('gGame.foodCollected:', gGame.foodCollected)
        }        
    } else if (nextCell === GHOST) {
        gameOver()
        return
    }

    // hitting food? call updateScore
    if (nextCell === FOOD) {
        gChompAudio.play()
        gGame.foodCollected++
        updateScore(1)
    }
    else if (nextCell === SUPER_FOOD && gPacman.isSuper) return
    else if (nextCell === SUPER_FOOD) onSuperPacman()
    else if (nextCell === CHERRY) {
        gPacman.cherriesCollected++
        updateScore(10)
    }

    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)

    if (gTotalFood === gGame.foodCollected) {
        gameOver()
        return
    }
}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
    }
    // figure out nextLocation
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