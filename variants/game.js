var board = document.querySelector('.board')
var boards = document.querySelectorAll('.board')
var columns = board.querySelectorAll('.column')
var squares = board.querySelectorAll('.square')
var pieces = document.querySelectorAll('.board .piece')
var whitePieces = []
var blackPieces = []
var royals = []
var fireDemons = []
var immobilizers = []
var noMovePieces = []
var pieceItemsOnBoard = board.querySelectorAll('.piece-item')
var placeForPieces = document.querySelector('.pieces')
var rightConItems = document.querySelectorAll('.right-con img')

var pawnLikePieces = [
    'pawn',
    'nwap',
    'peasant',
    'centerPeasant',
    'gigaPeasant',
    'bodyguard',
    'pawn5',
    'trianglePawn',
    'checker',
    'massivePawn',
    'lavaPawn',
    'megaPawn',
    'waterPawn',
    'confusedWaterPawn'
]
var pieceValue = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 3,

    nwap: 1,
    infinityKnight: 5,
    twoColoredBishop: 4,
    jumper: 6,
    megaQueen: 15,
    doubleKing: 3,
    god: 25,

    peasant: 1,
    donkey: 2,
    cheetah: 5,
    castle: 6,
    princess3: 6,
    jester: 4,
    emperor: 2
}
var hopperPieces = [
    'jumper',
    'checker',
    'checkerQueen',
    'checkerBishop'
]
var multiMovePieces = [
    'checker',
    'checkerQueen'
]
var color = 'white'
var ability

var whiteTakenPieces = []
var blackTakenPieces = []
var confusedPieces = []

var abilityBox = document.querySelector('.ability-box')
var abilityButton = document.querySelector('.ability-button')
var rightCon = document.querySelector('.right-con')
var sideBar = document.querySelector('.side-bar-game')
var historyButtons = document.querySelectorAll('.history-button')
var totalBackButton = document.querySelector('.total-back')
var backButton = document.querySelector('.back')
var forwardButton = document.querySelector('.forward')
var resetButton = document.querySelector('.reset')
var actualHistory = document.querySelector('.actual-history')

var takeWithoutMovingPopup = board.querySelector('.take-without-moving')
var takeWithoutMovingButtons = document.querySelectorAll('.options > .button')
var endGamePopup = document.querySelector('.end-screen')
var endGamePopupWinner = document.querySelector('.end-screen > .winner')
var promotionPopup = board.querySelector('.promotion')

var interval = 0
var whiteClockMinutes = document.querySelector('.white-side .clock .minutes')
var whiteClockSeconds = document.querySelector('.white-side .clock .seconds')
var blackClockMinutes = document.querySelector('.black-side .clock .minutes')
var blackClockSeconds = document.querySelector('.black-side .clock .seconds')

var shipShooting = false
var goingThroughPieces = false
var allPieceParts = []
var addPointerEventsAgain
var twoPieces
var canGo = []
var currentMove = 0
var histor = []
var setHist = false
var highlighted1
var highlighted2
var prevPieceOver
var taking = false
var takingWithEnPassant = false
var enpassant = []
var takeWithoutMovingSquares = []
var histPlaying = false
var hopperTook = false
var multiPieceMove = []
var inCheck = false
var clickedOnCheck = false
var discoveredCheck = false
var checkingPiece
var pieceAboutToCheck
if(typeof startingRow === 'undefined' || startingRow == undefined) var startingRow = 2
if(typeof promotionRow === 'undefined' || promotionRow == undefined) var promotionRow = 1
var boardFlipped = false
var ghostPieces = []
var gameEnded = false
var clickedOnImgName = ''
var shipMoving = false
var whiteRooks = []
var blackRooks = []

var itemCards = ['moreLives+5', 'moreRoyals+5']

var move = new Audio(folder + 'sounds/Move.mp3')
var capture = new Audio(folder + 'sounds/Capture.mp3')
var castleSfx = new Audio(folder + 'sounds/castling.mp3')
var check = new Audio(folder + 'sounds/check.mp3')
var fire = new Audio(folder + 'sounds/fire.mp3')
var explosion = new Audio(folder + 'sounds/explosion.mp3')
var canonSfx = new Audio(folder + 'sounds/canon.mp3')


//#region
if(data == undefined) {
    var urlParams = new URLSearchParams(window.location.search); // supported on most modern browsers
    var dataStringBase64Safe = urlParams.get('data');

    var dataStringBase64 = decodeURIComponent(dataStringBase64Safe);
    var dataString = window.atob(dataStringBase64);
    var data = JSON.parse(dataString);

    data = {
        ...data,
        features: []
    }
}
if(data.winConditions == undefined) {
    data = {
        ...data,
        winConditions: ['capture'],
    }
}
if(data.drawConditions == undefined) {
    data = {
        ...data,
        drawConditions: []
    }
}

if(data.time == 'no clock') {
    document.querySelectorAll('.player-side').forEach(i => {
        i.style.display = 'none'
    })
    document.querySelector('.mid-side').style.height = '100%'
} else if(data.time.includes('min')) {
    whiteTime = parseInt(data.time.split(' ')[0])
} else {
    whiteTime = parseInt(data.time.split(' | ')[0])
    interval = parseInt(data.time.split(' | ')[1])
}

if(data.features.includes('water')) {
    tsunamiButton.addEventListener('click', pieceSelect)
}
//#endregion

/*  Resizing  */
//#region

window.addEventListener('resize', resize)

function resize() {
    let bodyWidth = parseInt(window.getComputedStyle(document.querySelector('body')).getPropertyValue('width'))
    boards.forEach(board => {
        let width = parseInt(window.getComputedStyle(board.parentElement).getPropertyValue('width')) / 10 * 9
        let height = parseInt(window.getComputedStyle(board.parentElement).getPropertyValue('height')) / 10 * 9
        let widthToSet = 90

        if(rightCon != undefined && bodyWidth > 992) {
            document.querySelector('.mid-container').style.width = '70%'
            width = parseInt(window.getComputedStyle(board.parentElement).getPropertyValue('width')) / 10 * 7.2
            widthToSet = widthToSet - 18
        } else {
            document.querySelector('.mid-container').style.width = ''
        }
        if(width >= height && bodyWidth > 992) {
            board.style.height = '90%'
            board.style.width = parseInt(window.getComputedStyle(board).getPropertyValue('height')) + 'px'
        } else {
            board.style.width = widthToSet + '%'
            board.style.height = window.getComputedStyle(board).getPropertyValue('width')
        }
        let columns = board.querySelectorAll('.column')
        if(columns.length < columns[0].children.length) {
            board.style.width = parseInt(window.getComputedStyle(board).getPropertyValue('width')) * columns.length / columns[0].children.length + 'px'
        } else {
            board.style.height = parseInt(window.getComputedStyle(board).getPropertyValue('height')) * columns[0].children.length / columns.length + 'px'
        }
    })
    if(data.features.includes('triangle')) {
        let i = 0
        columns.forEach(column => {
            column.style.width = parseInt(window.getComputedStyle(document.querySelector('.board > img')).getPropertyValue('width')) / actualColumns + 'px'
            column.style.left = parseInt(window.getComputedStyle(document.querySelector('.board > img')).getPropertyValue('width'))
            / (columns.length + 1) * i + 'px';
            column.style.zIndex = i++
        })
        board.style.width = window.getComputedStyle(document.querySelector('.board > img')).getPropertyValue('width')
    }

    let allTurnsLeft = board.querySelectorAll('.turns-left')
    for (let i = 0; i < allTurnsLeft.length; i++) {
        allTurnsLeft[i].style.fontSize = window.getComputedStyle(allTurnsLeft[i].parentElement).getPropertyValue('height')
    }
    if(data.features.includes('lava')) {
        hell.querySelectorAll('.turns-left').forEach(i => {
            i.style.fontSize = parseInt(window.getComputedStyle(hell.querySelector('.square')).getPropertyValue('height')) / 10 * 8 + 'px'
        })
    }

    if(sideBar != null) sideBar.style.height = window.getComputedStyle(board).getPropertyValue('height')
    if(rightCon != undefined) {
        rightCon.style.height = parseInt(window.getComputedStyle(board).getPropertyValue('height')) / 10 * 9 + 'px'
        rightCon.querySelectorAll('.space').forEach(i => {
            i.style.width = window.getComputedStyle(i).getPropertyValue('height')
        })
    }
    if(bodyWidth > 992) {
        if(abilityBox != undefined) {
            abilityBox.style.top = parseInt(window.getComputedStyle(abilityBox.parentElement).getPropertyValue('height')) / 2
            - parseInt(window.getComputedStyle(abilityBox).getPropertyValue('height')) / 2 + 'px'
            abilityBox.style.right = -parseInt(window.getComputedStyle(abilityBox).getPropertyValue('width')) - 20 + 'px'
        }
        if(data.features.includes('water')) {
            if(tsunamiButton != undefined) {
                tsunamiButton.style.width = window.getComputedStyle(tsunamiButton).getPropertyValue('height')
                tsunamiButton.style.top = parseInt(window.getComputedStyle(tsunamiButton.parentElement).getPropertyValue('height')) / 2
                - parseInt(window.getComputedStyle(tsunamiButton).getPropertyValue('height')) / 2 + 'px'
                tsunamiButton.style.right = -parseInt(window.getComputedStyle(tsunamiButton).getPropertyValue('width')) - 60 + 'px'
                if(data.features.includes('lava')) {
                    tsunamiButton.style.right = 'auto'
                    tsunamiButton.style.left = parseInt(window.getComputedStyle(tsunamiButton.parentElement).getPropertyValue('width')) / 2
                    - parseInt(window.getComputedStyle(tsunamiButton).getPropertyValue('width')) / 2 + 'px'
                    tsunamiButton.style.top = -parseInt(window.getComputedStyle(tsunamiButton).getPropertyValue('height')) - 30 + 'px'
                }
            }
        }
    } else {
        if(abilityBox != undefined) {
            abilityBox.style.right = parseInt(window.getComputedStyle(abilityBox.parentElement).getPropertyValue('width')) / 2
            - parseInt(window.getComputedStyle(abilityBox).getPropertyValue('width')) / 2 + 'px'
            abilityBox.style.top = parseInt(window.getComputedStyle(abilityBox.parentElement).getPropertyValue('height')) + 20 + 'px'
        }
        if(data.features.includes('water')) {
            if(tsunamiButton != undefined) {
                tsunamiButton.style.width = window.getComputedStyle(tsunamiButton).getPropertyValue('height')
                tsunamiButton.style.right = parseInt(window.getComputedStyle(tsunamiButton.parentElement).getPropertyValue('width')) / 2
                - parseInt(window.getComputedStyle(tsunamiButton).getPropertyValue('width')) / 2 + 'px'
                tsunamiButton.style.top = parseInt(window.getComputedStyle(tsunamiButton.parentElement).getPropertyValue('height')) + 20 + 'px'
            }
        }
    }

    resizePieces()
    resizeFreeHighlights()
    resizeTaking()
    resizePromo()
    historyButtons.forEach(button => {
        button.style.width = window.getComputedStyle(button).getPropertyValue('height')
    })
    resizeItems()
}

function resizePieces() {
    if(pieces.length > 0) {
        columns = pieces[0].parentElement.parentElement.querySelectorAll('.column')
        squares = pieces[0].parentElement.parentElement.querySelectorAll('.column .square')
    }
    pieces.forEach(piece => {
        if(piece.getAttribute('col') != 0) {
            piece.style.transition = 'all 0s ease-in-out'
        
            piece.style.height = parseFloat(window.getComputedStyle(piece.parentElement.parentElement.querySelector('.square')).getPropertyValue('height').replace('px', '')) + 'px'
            if(data.features.includes('triangle')) {
                piece.style.height = parseInt(window.getComputedStyle(piece).getPropertyValue('height')) / 10 * 7 + 'px'
            }
            moveObjectToPos(piece.getAttribute('col'), piece.getAttribute('row'), piece, false)
        }
    })
}

function resizeTaking() {
    if(takeWithoutMovingPopup.getAttribute('piece') != undefined) {
        let squareWidth = parseFloat(window.getComputedStyle(squares[0]).getPropertyValue('width').replace('px', ''))

        let translateX = getPieceFromId(takeWithoutMovingPopup.getAttribute('piece')).getAttribute('col') * squareWidth + 'px'
        let translateY = (getPieceFromId(takeWithoutMovingPopup.getAttribute('piece')).getAttribute('row')-1) * squareWidth + 'px'

        takeWithoutMovingPopup.style.transform = 'translateX(' + translateX + ')' + ' translateY(' + translateY + ')'
    }
}

function resizePromo() {
    let squareWidth = parseFloat(window.getComputedStyle(squares[0]).getPropertyValue('width').replace('px', ''))
    let promoWidth = Math.ceil(promotionPieces.length / columns.length)
    promotionPopup.style.width = squareWidth * promoWidth + 10 + 'px'
    promotionPopup.style.gridTemplateColumns = 'repeat(' + promoWidth + ', ' + squareWidth + 'px)'
    promotionPopup.style.height = squareWidth * (promotionPieces.length / promoWidth) + 10 + 'px'

    if(promotionPopup.getAttribute('col') != undefined) {
        let translateX = (promotionPopup.getAttribute('col')-1) * squareWidth - 5 + 'px'

        promotionPopup.style.transform = 'translateX(' + translateX + ')'
    }
}

function resizeItems() {
    let lastBoardindex = Array.prototype.indexOf.call(boards, board)
    for(let i = 0; i < pieceItemsOnBoard.length; i++) {
        let piece = getPieceFromId(pieceItemsOnBoard[i].getAttribute('pie'))
        let col = piece.getAttribute('col')
        if(col <= 0) {
            pieceItemsOnBoard[i].style.opacity = '0'
            continue
        }
        pieceItemsOnBoard[i].style.opacity = '1'
        let row = piece.getAttribute('row')
        let itemWidth = .3

        pieceItemsOnBoard[i].style.width = window.getComputedStyle(piece).getPropertyValue('width').replace('px', '') * itemWidth + 'px'
        pieceItemsOnBoard[i].style.height = window.getComputedStyle(pieceItemsOnBoard[i]).getPropertyValue('width')

        if(piece.getAttribute('lives') != undefined) {
            let whichRepeat = 0
            for(let j = i; j >= 0; j--) {
                if(pieceItemsOnBoard[i].getAttribute('pie') == pieceItemsOnBoard[j].getAttribute('pie')) whichRepeat++
            }
            itemWidth = itemWidth * whichRepeat
            if(whichRepeat > piece.getAttribute('lives')) pieceItemsOnBoard[i].classList.add('none')
        }
            
        board = piece.parentElement.parentElement
        columns = board.querySelectorAll('.column')
        squares = board.querySelectorAll('.square')

        board.querySelector('.pieces').appendChild(pieceItemsOnBoard[i])

        let left = (col-1 + 1-itemWidth)*(window.getComputedStyle(columns[col-1]).
        getPropertyValue('width').replace('px', ''))
        let top = (row-1)*(window.getComputedStyle(squares[row-1]).
        getPropertyValue('height').replace('px', ''))

        if(boardFlipped) {
            top = (row-1 + 1-0.3)*(window.getComputedStyle(squares[row-1]).
            getPropertyValue('height').replace('px', ''))
            left = -left
            top = -top
        }

        pieceItemsOnBoard[i].style.transform = 'translateX(' + left + 'px)' + ' translateY(' + top + 'px)'

        setTimeout(() => {
            if(pieceItemsOnBoard[i] != undefined) pieceItemsOnBoard[i].style.transition = 'all 0s ease-in-out'
        }, 500)
    }
    board = boards[lastBoardindex]
}

function resizeFreeHighlights() {
    document.querySelectorAll('.board > .highlight').forEach(div => {
        div.style.height = parseInt(window.getComputedStyle(columns[0].children[0]).getPropertyValue('height').replace('px', '')) / 10 * 3 + 'px'
        div.style.width = div.style.height

        let col = div.getAttribute('col')
        let row = div.getAttribute('row')

        let left = parseInt(columns[col-1].style.left) + (columns[col-1].style.width.replace('px', '') - div.style.width.replace('px', '')) / 2
        let top = parseInt((row-1)*(window.getComputedStyle(squares[row-1]).getPropertyValue('height').replace('px', ''))) -
            (columns[col-1].style.height.replace('px', '') - div.style.height.replace('px', ''))

        if(((col % 2) + (row % 2)) % 2 == 0) {
            top = parseInt(top) - (columns[col-1].style.height.replace('px', '') - div.style.height.replace('px', '')) / 2
        } else {
            top = parseInt(top) + (columns[col-1].style.height.replace('px', '') - div.style.height.replace('px', '')) / 3.5
        }

        if(boardFlipped) {
            div.style.left = 'auto'
            div.style.top = 'auto'

            left = -left
            top = -top

            div.style.right = '0'
            div.style.bottom = '0'
        } else {
            div.style.right = 'auto'
            div.style.bottom = 'auto'

            div.style.left = '0'
            div.style.top = '0'
        }

        div.style.transform = 'translateX(' + left + 'px)' + ' translateY(' + top + 'px)'
    })
}
//#endregion

/*  Piece Position Setting  */
//#region

function moveObjectToPos(col, row, piece, withTransition = true) {
    if(withTransition) piece.style.transition = 'all 0.45s ease-in-out'

    let column
    let square
    if(piece.parentElement != undefined) {
        column = piece.parentElement.parentElement.querySelector('.column')
        square = piece.parentElement.parentElement.querySelector('.square')
    } else {
        column = columns[0]
        square = columns[0].children[0]
    }
    
    let left = (col-1)*(window.getComputedStyle(column).getPropertyValue('width').replace('px', ''))
    let top = parseInt((row-1)*(window.getComputedStyle(square).getPropertyValue('height').replace('px', ''))) +
    (window.getComputedStyle(square).getPropertyValue('height').replace('px', '') -
    piece.style.height.replace('px', '')) / 2
    if(data.features.includes('triangle')) {
        column = piece.parentElement.parentElement.querySelectorAll('.column')[col]
        left = parseInt(column.style.left) - (window.getComputedStyle(column).getPropertyValue('width').replace('px', '') - 
        window.getComputedStyle(piece).getPropertyValue('width').replace('px', '')) / 1.5
        if(((col % 2) + (row % 2)) % 2 == 1) {
            // white triangle
            top = parseInt(top) - ((window.getComputedStyle(square).getPropertyValue('height').replace('px', '') - 
            window.getComputedStyle(piece).getPropertyValue('height').replace('px', '')) / 1.5)
        } else {
            // black triangle
            top = parseInt(top) + ((window.getComputedStyle(square).getPropertyValue('height').replace('px', '') - 
            window.getComputedStyle(piece).getPropertyValue('height').replace('px', '')) / 2)
        }
    }

    if(boardFlipped) {
        left = -left
        top = -top
    }

    piece.style.transform = 'translateX(' + left + 'px)' + ' translateY(' + top + 'px)'

    if(data.features.includes('biggerPieces') && piece.getAttribute('otherParts') != undefined) {
        if(piece.getAttribute('rotated') != undefined) {
            piece.style.transform = piece.style.transform + 'rotateZ(' + piece.getAttribute('rotated') + 'deg)'
        }
        if(boardFlipped) {
            piece.style.transform = piece.style.transform + 'rotateY(180deg)'
            if(piece.getAttribute('rotated') == undefined) {
                relaCords = getRelaPositionsOfPieces(getAllPieceParts(piece), piece)
                for (let i = 0; i < relaCords.length; i++) {
                    if(relaCords[i][1] != 0) {
                        piece.style.transform = piece.style.transform + 'rotateX(180deg)'
                        break
                    }
                }
            }
        }
    }
}

function capturePiece(piece) {
    if(piece == undefined) return
    if(piece.getAttribute('lives') > 0) {
        respawn(piece)
    } else {
        if(data.features.includes('lava') && getImgFileName(piece) == 'lavaRook') {
            lavaRookAbility.push([getSquareFromPiece(piece), currentMove+3])
        }

        piece.classList.add('none')
        piece.setAttribute('col', 0)
        piece.setAttribute('row', 0)

        if(piece.getAttribute('royal') == 'true') {
            for(let i = 0; i < pieceItemsOnBoard.length; i++) {
                if(getPieceId(piece) == pieceItemsOnBoard[i].getAttribute('pie')) {
                    if(pieceItemsOnBoard[i] != undefined) pieceItemsOnBoard[i].classList.add('none')
                    break
                }
            }
        }
    }
}

function setPiecePos(col, row, piee) {
    let piece = getPieceFromId(piee)

    if(currentMove >= neutralMove && piece.getAttribute('col') > 0 && piece.getAttribute('col') <= columns.length) {
        highlighted1 = getSquareFromPiece(piece)
    } else {
        highlighted1 = undefined
        highlighted2 = undefined
    }

    moveObjectToPos(col, row, piece, currentMove >= neutralMove)

    let enpassantTaken = false

    if(currentMove >= neutralMove) {
        twoPieces = othergetPieceFromCords(col, row, piee)
        if((twoPieces !== undefined || takingWithEnPassant) && !allPieceParts.includes(twoPieces)) {
            if(twoPieces == undefined) {
                for (let i = 0; i < enpassant.length; i++) {
                    let enCords = getCordsOfPiece(enpassant[i])
                    let colDiff = col - enCords[0]
                    let rowDiff = row - enCords[1]
                    if(colDiff == 0 && rowDiff == (whiteTurn ? -1 : 1)) {
                        twoPieces = enpassant[i]
                        enpassantTaken = true
                        break
                    }
                }
            }
            taking = true
            let imgName = getImgFileName(piece)
            if(imgName == 'neutral') pieceColorSwitch(piece)

            if(data.features.includes('water')) {
                if(imgName == 'waterKnight') {
                    piece.setAttribute('waterAbilityUses', parseInt(piece.getAttribute('waterAbilityUses')) + 1)
                }
            }

            let squaresAround = []
            if(data.features.includes('atomic2')) {
                let name = getImgFileName(piece)
                let startCol = twoPieces.getAttribute('col')
                let startRow = twoPieces.getAttribute('row')
                if(pieceValue[name] == 1) {
                    let i = 1
                    if(whiteTurn) i = -1
                    squaresAround.push(universal(startCol, startRow, 0, i, 1, true))
                    squaresAround.push(universal(startCol, startRow, 1, i, 1, true))
                    squaresAround.push(universal(startCol, startRow, -1, i, 1, true))
                } else if(pieceValue[name] > 1 && pieceValue[name] < 5) {
                    squaresAround.push(universal(startCol, startRow, 1, 0, 1, true))
                    squaresAround.push(universal(startCol, startRow, -1, 0, 1, true))
                    squaresAround.push(universal(startCol, startRow, 0, 1, 1, true))
                    squaresAround.push(universal(startCol, startRow, 0, -1, 1, true))
                } else {
                    squaresAround.push(universal(startCol, startRow, 1, 1, 1, true))
                    squaresAround.push(universal(startCol, startRow, 1, -1, 1, true))
                    squaresAround.push(universal(startCol, startRow, -1, 1, 1, true))
                    squaresAround.push(universal(startCol, startRow, -1, -1, 1, true))
                    squaresAround.push(universal(startCol, startRow, 1, 0, 1, true))
                    squaresAround.push(universal(startCol, startRow, -1, 0, 1, true))
                    squaresAround.push(universal(startCol, startRow, 0, 1, 1, true))
                    squaresAround.push(universal(startCol, startRow, 0, -1, 1, true))
                }
                squaresAround.push(universal(startCol, startRow, 0, 0, 0, true))
                setTimeout(function() {
                    capturePiece(piece)
                }, 250)

                squaresAround = [].concat(...squaresAround)
                squaresAround.forEach(square => {
                    let piece = getPieceFromSquare(square)
                    if(piece != undefined) {
                        capturePiece(piece)
                        imgOnSquare(square, 'boom')
                    }
                })
                explosion.play()
            } else if(data.features.includes('atomicNormal')
            && ((currentMove - neutralMove) % 4 == 0 || (currentMove - neutralMove) % 4 == 1)) {
                let startCol = twoPieces.getAttribute('col')
                let startRow = twoPieces.getAttribute('row')
                squaresAround.push(universal(startCol, startRow, 1, 1, 1, true))
                squaresAround.push(universal(startCol, startRow, 1, -1, 1, true))
                squaresAround.push(universal(startCol, startRow, -1, 1, 1, true))
                squaresAround.push(universal(startCol, startRow, -1, -1, 1, true))
                squaresAround.push(universal(startCol, startRow, 1, 0, 1, true))
                squaresAround.push(universal(startCol, startRow, -1, 0, 1, true))
                squaresAround.push(universal(startCol, startRow, 0, 1, 1, true))
                squaresAround.push(universal(startCol, startRow, 0, -1, 1, true))
                squaresAround.push(universal(startCol, startRow, 0, 0, 0, true))

                capturePiece(piece)

                squaresAround = [].concat(...squaresAround)
                squaresAround.forEach(square => {
                    capturePiece(getPieceFromSquare(square))
                })
                explosion.play()
            }
            capturePiece(twoPieces)
            if(ability == 'moveLikeTakenPiece') window[color + 'TakenPieces'].push([getImgFileName(twoPieces), histor.length])
        }

        if(data.features.includes('quests')) {
            let questArray = quests(piece)
            if(questArray[0]) {
                piece.setAttribute('abilities', questArray[1])
            } else {
                let sourceArray = piece.src.split('/')
                sourceArray[sourceArray.length - 1] = questArray[1]
                piece.src = sourceArray.join('/')
            }
        }
    }
    if(window[color + 'TakenPieces'] != undefined && window[color + 'TakenPieces'].length > 0
    && window[color + 'TakenPieces'][0][1] == histor.length-2) {
        window[color + 'TakenPieces'].shift()
    }

    let oldCords = getCordsOfPiece(piece)
    if(piece.getAttribute('col') > 0 || currentMove < neutralMove) {
        piece.setAttribute('col', col)
        piece.setAttribute('row', row)
    }

    if(highlighted1 != undefined) highlighted2 = getSquareFromCords(col, row)
    currentMove++
    if(setHist) histor.push([col, row, piee])
    if(enpassantTaken) {
        if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].capturedPieces != undefined) {
            histor[histor.length-1][3].capturedPieces.push(twoPieces)
        } else {
            histor[histor.length-1][3] = {
                ...histor[histor.length-1][3],
                capturedPieces: [twoPieces]
            }
        }
    }

    if(!histPlaying && data.features.includes('biggerPieces') && piece.getAttribute('otherParts') != undefined && currentMove >= neutralMove) {
        if(clickedOn != piece) return
        let histArr = []
        for(let i = 0; i < allPieceParts.length; i++) {
            if(piece == allPieceParts[i]) continue
            let otherPartCords = getCordsOfPiece(allPieceParts[i])
            let relaCol = otherPartCords[0] - oldCords[0]
            let relaRow = otherPartCords[1] - oldCords[1]
            histArr.push([parseInt(col) + relaCol, parseInt(row) + relaRow, getPieceId(allPieceParts[i])])
            setHist = false
            setPiecePos(parseInt(col) + relaCol, parseInt(row) + relaRow, getPieceId(allPieceParts[i]))
        }
        if(histArr.length > 0) {
            histor[histor.length-1][3] = {
                ...histor[histor.length-1][3],
                multiPieceMove: histArr
            }
            currentMove -= histArr.length
        }
    }
}

function respawn(piece) {
    let isShip = getImgFileName(piece).includes('Ship')
    loop: for(let i = (!whiteTurn ? columns[0].children.length - 1 : 0);
        !whiteTurn ? i > 0 : i < columns[0].children.length; !whiteTurn ? i-- : i++) {
        for(let j = 0; j < columns.length; j++) {
            if(getPieceFromSquare(columns[j].children[i]) == undefined && !(columns[j].children[i].classList.contains('ocean-square') != isShip)) {
                if(piece.getAttribute('lives') != undefined) piece.setAttribute('lives', piece.getAttribute('lives')-1)
                resizeItems()
                setHist = false
                setPiecePos(columns[j].getAttribute('col'),
                columns[j].children[i].getAttribute('row'),
                getPieceId(piece));
                break loop
            }
        }
    }
}
//#endregion

/*  Clocks  */
//#region

var blackTime = whiteTime*60*10
var whiteTime = whiteTime*60*10

if(whiteClockMinutes != null) whiteClockMinutes.innerHTML = Math.floor((whiteTime/10)/60)
if(blackClockMinutes != null) blackClockMinutes.innerHTML = Math.floor((whiteTime/10)/60)

var whiteTurn = true
var whiteInterval
var blackInterval

function switchClocks() {
    whiteTurn = !whiteTurn
    if(whiteTurn) {
        blackTime += interval * 10
        clearInterval(blackInterval)
        blackTimeGo()
        whiteInterval = setInterval(whiteTimeGo, 100)
        whitePieces.forEach(piece => {
            piece.addEventListener('dragstart', pieceSelect)
            piece.addEventListener('click', pieceSelect)
            piece.style.pointerEvents = 'auto'
        })
        if(data.features.includes('lava')) {
            hell.querySelectorAll('.piece').forEach(piece => {
                if(whitePieces.includes(piece)) {
                    piece.removeEventListener('dragstart', pieceSelect)
                    piece.removeEventListener('click', pieceSelect)
                    if(piece.getAttribute('gotInHell') <= currentMove-6) piece.addEventListener('click', goBackFromHellPopup)
                } else {
                    piece.removeEventListener('click', goBackFromHellPopup)
                }
            })
        }
        blackPieces.forEach(piece => {
            piece.removeEventListener('dragstart', pieceSelect)
            piece.removeEventListener('click', pieceSelect)
            piece.style.pointerEvents = 'none'
        })
        rightConItems.forEach(item => {
            item.parentElement.children[0].innerHTML = window['white' + getImgFileName(item) + 's'] + 'x'
        })
        color = 'white'
        if(data.whiteCard != undefined) {
            ability = data.whiteCard.split('+')[0].toString()   
        } else {
            ability = undefined
        }
    } else {
        whiteTime += interval * 10
        clearInterval(whiteInterval)
        whiteTimeGo()
        blackInterval = setInterval(blackTimeGo, 100)
        blackPieces.forEach(piece => {
            piece.addEventListener('dragstart', pieceSelect)
            piece.addEventListener('click', pieceSelect)
            piece.style.pointerEvents = 'auto'
        })
        if(data.features.includes('lava')) {
            hell.querySelectorAll('.piece').forEach(piece => {
                if(blackPieces.includes(piece)) {
                    piece.removeEventListener('dragstart', pieceSelect)
                    piece.removeEventListener('click', pieceSelect)
                    if(piece.getAttribute('gotInHell') <= currentMove-6) piece.addEventListener('click', goBackFromHellPopup)
                } else {
                    piece.removeEventListener('click', goBackFromHellPopup)
                }
            })
        }
        whitePieces.forEach(piece => {
            piece.removeEventListener('dragstart', pieceSelect)
            piece.removeEventListener('click', pieceSelect)
            piece.style.pointerEvents = 'none'
        })
        rightConItems.forEach(item => {
            item.parentElement.children[0].innerHTML = window['black' + getImgFileName(item) + 's'] + 'x'
        })
        color = 'black'
        if(data.blackCard != undefined) {
            ability = data.blackCard.split('+')[0].toString()
        } else {
            ability = undefined
        }
    }
    if(data.features != undefined && data.features.includes('atomicNormal')) {
        let mode = document.querySelector('.mode')
        if((currentMove - neutralMove) % 4 == 0 || (currentMove - neutralMove) % 4 == 1) {
            mode.src = folder + 'img/atomic2.0/atomic.png'
        } else {
            mode.src = folder + 'img/1.0/whitePieces/pawn.png'
        }
    }
}

function whiteTimeGo() {
    whiteTime -= 1
    let mins = whiteTime / 10 / 60
    whiteClockMinutes.innerHTML = Math.floor(mins)
    let secs = (whiteTime / 10) % 60
    whiteClockSeconds.innerHTML = Math.floor(secs)>9 ? Math.floor(secs) : '0' + Math.floor(secs)

    if(whiteTime <= 0) endGame(!whiteTurn)
}

function blackTimeGo() {
    blackTime -= 1
    let mins = blackTime / 10 / 60
    blackClockMinutes.innerHTML = Math.floor(mins)
    let secs = (blackTime / 10) % 60
    blackClockSeconds.innerHTML = Math.floor(secs)>9 ? Math.floor(secs) : '0' + Math.floor(secs)

    if(blackTime <= 0) endGame(!whiteTurn)
}

function stopClocks() {
    clearInterval(whiteInterval)
    clearInterval(blackInterval)
}
//#endregion

/*  Cards  */
//#region

if(data.whiteCard != undefined) ability = data.whiteCard.split('+')[0].toString()
if(data.lives != undefined) {
    for(let i = 0; i < data.lives.length; i++) {
        let piece = getPieceFromId(data.lives[i][0])
        let amountOfLives = parseInt(data.lives[i][1])

        for(let j = amountOfLives; j > 0; j--) {
            let img = document.createElement("img")
            img.src = folder + 'img/4.0/life.png'
            img.classList.add('piece-item')
            img.setAttribute('pie', data.lives[i][0])
            piece.parentElement.appendChild(img)
        }
        piece.setAttribute('lives', data.lives[i][1])
    }
}
if(data.royals != undefined) {
    for(let i = 0; i < data.royals.length; i++) {
        let piece = getPieceFromId(data.royals[i])
        if(piece == undefined) continue

        if(typeof chess4Pieces !== 'undefined' && !chess4Royals.includes(getImgFileName(piece))) {
            let img = document.createElement("img")
            img.src = folder + 'img/4.0/crown.png'
            img.classList.add('piece-item')
            img.setAttribute('pie', data.royals[i])
            placeForPieces.appendChild(img)
        }

        piece.setAttribute('royal', true)
    }
}
pieceItemsOnBoard = document.querySelectorAll('.board .piece-item')

//#endregion

/*  Dragging  */
//#region

var clickedOn
var targetSquare

pieces.forEach(piece => {
    piece.setAttribute('draggable', true)

    if(isPieceWhite(piece)) {
        whitePieces.push(piece)
    } else {
        blackPieces.push(piece)
    }

    piece.addEventListener('dragover', (e) => {
        if(prevPieceOver != undefined) prevPieceOver.classList.remove('piece-over')
        if(getSquareFromPiece(e.target).classList.contains('can-go')) {
            targetSquare = getSquareFromPiece(e.target)
            targetSquare.classList.add('piece-over')
            prevPieceOver = targetSquare
        } else {
            targetSquare = undefined
        }
    })

    piece.addEventListener('dragend', squareSelect)

    imgName = getImgFileName(piece)
    if(imgName == 'neutral') {
        let sourceArray = piece.src.split('/')
        let imgColor = sourceArray[sourceArray.length - 2]
        piece.setAttribute('originalColor', imgColor)
    } else if(imgName == 'fireDemon') {
        fireDemons.push(piece)
    } else if(imgName == 'immobilizer') {
        immobilizers.push(piece)
    } else if(imgName == 'rook' || imgName == 'lavaRook' || imgName == 'waterRook') {
        if(whitePieces.includes(piece)) {
            whiteRooks.push(piece)
        } else {
            blackRooks.push(piece)
        }
    }

    if(piece.getAttribute('royal') == 'true') royals.push(piece)

    piece.addEventListener('contextmenu', highlightSquare)
})

whitePieces.forEach(piece => {
    piece.addEventListener('dragstart', pieceSelect)
    piece.addEventListener('click', pieceSelect)
})
blackPieces.forEach(piece => {
    piece.style.pointerEvents = 'none'
})

squares.forEach(square => {
    square.addEventListener('contextmenu', highlightSquare)
    square.addEventListener('click', deleteSquareThings)
})

if(data.normalWhite == false) {
    pieces.forEach(piece => {
        pieceColorSwitch(piece)
    })
}

if(rightCon != undefined) {
    if(data.features.includes('shop')) {

    } else if(data.features.includes('atomic2')) {
        rightConItems.forEach(i => {
            if(i.getAttribute('quantity') > 0) {
                i.addEventListener('dragstart', pieceSelect)
                i.addEventListener('click', pieceSelect)
            }
            window['white' + getImgFileName(i) + 's'] = i.getAttribute('quantity')
            window['black' + getImgFileName(i) + 's'] = i.getAttribute('quantity')
        })
    }
}

function highlightSquare(e) {
    e.preventDefault();
    let target
    if(e.target.classList.contains('piece')) {
        target = getSquareFromPiece(e.target)
    } else {
        target = e.target
    }
    if(target.classList.contains('right-clicked')) {
        target.classList.remove('right-clicked')
    } else {
        target.classList.add('right-clicked')
    }
}

function projectGhostOfPiece(e) {
    allPieceParts.forEach(part => {
        let clone = part.cloneNode(true)
        clone.style.opacity = '0.5'
        clone.style.pointerEvents = 'none'
        let eTargetCords = getCordsOfSquare(e.target)

        let oldCords = getCordsOfPiece(clickedOn)
        let otherPartCords = getCordsOfPiece(part)
        let relaCol = otherPartCords[0] - oldCords[0]
        let relaRow = otherPartCords[1] - oldCords[1]

        board = e.target.parentElement.parentElement
        columns = board.querySelectorAll('.column')
        squares = board.querySelectorAll('.square')
        moveObjectToPos(parseInt(eTargetCords[0]) + relaCol, parseInt(eTargetCords[1]) + relaRow, clone)

        e.target.parentElement.parentElement.appendChild(clone)
        ghostPieces.push(clone)
    })
}

function deleteAllGhostPieces() {
    ghostPieces.forEach(i => {
        i.remove()
    })
    ghostPieces = []
}

function squareDragOver(e) {
    if(data.features.includes('triangle')) {
        if(isInTriangle(e)) {
            targetSquare = e.target
        } else {
            targetSquare = universal(...getCordsOfSquare(e.target), -1, 0, 1)[0]
        }
    } else {
        targetSquare = e.target
    }
    if(prevPieceOver != undefined) prevPieceOver.classList.remove('piece-over')
    targetSquare.classList.add('piece-over')
    prevPieceOver = targetSquare
}

function squareClick(e) {
    if(data.features.includes('triangle')) {
        if(isInTriangle(e)) {
            targetSquare = e.target
        } else {
            targetSquare = universal(...getCordsOfSquare(e.target), -1, 0, 1)[0]
        }
    } else {
        targetSquare = e.target
    }
    squareSelect()
}
//#endregion

/*  Deleting things  */
//#region
function deleteSquareThings() {
    targetSquare = undefined
    enpassant = []
    takingWithEnPassant = false
    taking = false
    if(Array.isArray(addPointerEventsAgain)) {
        addPointerEventsAgain.forEach(i => {
            if(i != undefined && isPieceWhite(i) == whiteTurn) {
                i.style.pointerEvents = 'auto'
            }
        })
    } else if(addPointerEventsAgain != undefined && isPieceWhite(addPointerEventsAgain) == whiteTurn) {
        addPointerEventsAgain.style.pointerEvents = 'auto'
    }
    if(clickedOn != undefined && (clickedOn.classList.contains('missile') || clickedOn.classList.contains('tsunami-button'))) {
        (whiteTurn ? whitePieces : blackPieces).forEach(piece => {
            piece.addEventListener('dragstart', pieceSelect)
            piece.addEventListener('click', pieceSelect)
            piece.style.pointerEvents = 'auto'
        })
    }
    if(typeof abilityBox !== 'undefined' && abilityBox != null) abilityBox.classList.remove('show')
    if(typeof hellBox !== 'undefined' && hellBox != null) hellBox.classList.remove('show')
    takeWithoutMovingPopupHide()
    promotionPopupHide()
    if(prevPieceOver != undefined) prevPieceOver.classList.remove('piece-over')
    boards.forEach(board => {
        board.querySelectorAll('.square').forEach(i => {
            i.classList.remove('clicked')
            i.classList.remove('right-clicked')
            i.classList.remove('can-go')
            i.classList.remove('without-moving')
            i.removeEventListener('dragover', squareDragOver)
            i.removeEventListener('click', squareClick)
            i.addEventListener('click', deleteSquareThings)
            if(allPieceParts.length > 1) {
                i.removeEventListener('mouseover', projectGhostOfPiece)
                i.removeEventListener('mouseout', deleteAllGhostPieces)
            }
            if(data.features.includes('lava')) {
                i.removeEventListener('click', queenPlaceLava)
                i.removeEventListener('click', kingPlaceLava)
            }
            if(data.features.includes('water')) {
                i.removeEventListener('click', pawnPlaceWater)
                i.removeEventListener('click', knightPlaceWater)
                i.removeEventListener('click', bishopPlaceWater)
                i.removeEventListener('click', rookPlaceWater)
                i.removeEventListener('click', queenPlaceWater)
            }
        })
    })
    deleteAllGhostPieces()
    document.querySelectorAll('.board > .highlight').forEach(i => {
        i.remove()
    })
    rightConItems.forEach(piece => {
        piece.classList.remove('selected')
    })
    if(highlighted1 != undefined) {
        highlighted1.classList.add('clicked')
        if(highlighted2 != undefined) highlighted2.classList.add('clicked')
    }
    if(ability == 'cannibalism' || multiPieceMove.length > 0) {
        window[color + 'Pieces'].forEach(piece => {
            piece.addEventListener('dragstart', pieceSelect)
            piece.addEventListener('click', pieceSelect)
            piece.style.pointerEvents = 'auto'
        })
    }
    takeWithoutMovingSquares.forEach(square => {
        square.classList.remove('without-moving')
        takeWithoutMovingSquares.shift()
    })
    multiPieceMove = []
}

function resetSelectedPiece() {
    targetSquare = undefined
    takingWithEnPassant = false
    takeWithoutMovingPopupHide()
    promotionPopupHide()
    if(prevPieceOver != undefined) prevPieceOver.classList.remove('piece-over')
    boards.forEach(board => {
        board.querySelectorAll('.square').forEach(i => {
            i.classList.remove('right-clicked')
        })
    })
    if(highlighted1 != undefined) {
        highlighted1.classList.add('clicked')
        highlighted2.classList.add('clicked')
    }
}
//#endregion

var itemQuantityVariableName
var itemQuantity
var oldClickedOn
var movePathways
var multiMovePlaying = false

/*  Moving to square  */
//#region
function pieceSelect(e) {
    if(data.winConditions.includes('checkmate') && (oldClickedOn == undefined || isPieceWhite(clickedOn) == isPieceWhite(oldClickedOn))) {
        oldClickedOn = clickedOn
    }
    deleteSquareThings()
    if(typeof e !== 'undefined') clickedOn = e.target
    if((currentMove < histor.length && !histPlaying) || noMovePieces.includes(clickedOn)) return
    clickedOnImgName = getImgFileName(clickedOn)

    if(data.features.includes('alice')) {
        board = clickedOn.parentElement.parentElement
        columns = board.querySelectorAll('.column')
        squares = board.querySelectorAll('.square')
    }

    let startSquare
    if(clickedOn.classList.contains('missile')) {
        startSquare = e.target
        startSquare.classList.add('selected')
        itemQuantityVariableName = color + clickedOnImgName + 's'
        itemQuantity = window[itemQuantityVariableName]
        if(itemQuantity <= 0) return
        (whiteTurn ? whitePieces : blackPieces).forEach(piece => {
            piece.style.pointerEvents = 'none'
        })
    } else if(clickedOn.classList.contains('tsunami-button')) {
        if((whiteTurn && (whiteTsunamiUses == 0 || whiteTsunamiUses == undefined)) || (!whiteTurn && (blackTsunamiUses == 0 || blackTsunamiUses == undefined))) return
        startSquare = e.target
        startSquare.classList.add('selected');
        (whiteTurn ? whitePieces : blackPieces).forEach(piece => {
            piece.style.pointerEvents = 'none'
        })
    } else {
        startSquare = getSquareFromPiece(clickedOn)
    }

    if(data.features.includes('biggerPieces')) {
        if(clickedOn.getAttribute('otherParts') != undefined) {
            allPieceParts = getAllPieceParts(clickedOn)
        } else {
            allPieceParts = []
        }
    }

    if(clickedOnImgName.includes('Ship')) {
        shipMoving = true
    }

    canGo = window[clickedOnImgName](...getCordsOfPiece(clickedOn))

    if(clickedOn.getAttribute('confused') == 'true') {
        for (let i = 0; i < canGo.length; i++) {
            if(getPieceFromSquare(canGo[i]) != undefined) {
                canGo.splice(i--, 1)
            }
        }
    }

    if(multiMovePieces.includes(clickedOnImgName)) {
        movePathways = canGo
        canGo = [].concat(...canGo)
    }

    if(data.features.includes('biggerPieces') && clickedOn.getAttribute('otherParts') != undefined) {
        addPointerEventsAgain = allPieceParts
        allPieceParts.forEach(piece => {
            if(clickedOn != piece && canGo.includes(getSquareFromPiece(piece))) piece.style.pointerEvents = 'none'
        })
    }

    if(data.features.includes('alice') && data.alice.length >= 2) {
        if(data.alice.indexOf(Array.prototype.indexOf.call(boards, board)) == data.alice.length-1) {
            board = boards[data.alice[0]]
        } else {
            board = boards[data.alice[data.alice.indexOf(Array.prototype.indexOf.call(boards, board))]+1]
        }

        for(let i = 0; i < canGo.length; i++) {
            let piece = getPieceFromSquare(canGo[i])
            if(piece != undefined && piece.parentElement.parentElement == board) canGo.splice(i--, 1)
        }
        if(data.alice.indexOf(Array.prototype.indexOf.call(boards, board)) == 0) {
            board = boards[data.alice[data.alice.length-1]]
        } else {
            board = boards[data.alice[data.alice.indexOf(Array.prototype.indexOf.call(boards, board))]-1]
        }
        columns = board.querySelectorAll('.column')
        squares = board.querySelectorAll('.square')
    }

    if(!histPlaying) {
        pieceAboutToCheck = undefined
        // don't let players discover their king
        if(data.winConditions.includes('checkmate')) {
            royalsLeft = 0
            let j
            for(let i = 0; i < royals.length; i++) {
                if(isPieceWhite(royals[i]) == whiteTurn && royals[i].getAttribute('col') > 0) {
                    j = i
                    royalsLeft++
                }
            }
    
            if(royalsLeft == 1) {
                if(clickedOn.getAttribute('royal') == 'true') {
                    let allSquares = []
                    whiteTurn = !whiteTurn
                    ability = 'cannibalism'
                    let lastlyMovedPiece = getPieceFromId(histor[histor.length-1][2])
                    window[whiteTurn ? 'whitePieces' : 'blackPieces'].forEach(piece => {
                        if(piece != undefined && piece.getAttribute('col') != 0 && clickedOn.getAttribute('confused') != 'true') {
                            if(piece == lastlyMovedPiece) goingThroughPieces = true
                            allSquares.push(window[getImgFileName(piece)](...getCordsOfPiece(piece), true))
                            if(piece == lastlyMovedPiece) goingThroughPieces = false
                        }
                    })
                    whiteTurn = !whiteTurn
                    ability = undefined
                    allSquares = [].concat(...allSquares)
    
                    for(let k = 0; k < canGo.length; k++) {
                        if(allSquares.includes(canGo[k]) && isPieceWhite(getPieceFromSquare(canGo[k])) != whiteTurn) canGo.splice(k--, 1)
                    }
                } else {
                    if(inCheck) {
                        if(!(clickedOnCheck && discoveredCheck)) {
                            // check if other piece can get rid of the check (not double check)
                            let squaresToBlock = []
                            let around = piecesAroundKing(j, true)
                            checkingPiece = getPieceFromId(histor[histor.length-1][2])
                            if(clickedOnCheck) squaresToBlock.push(getSquareFromPiece(checkingPiece))
                            if(around[0]) squaresToBlock.push(universal(...getCordsOfPiece(around[1]), around[2][0]*-1, around[2][1]*-1, 0))
                            if(hopperPieces.includes(getImgFileName(checkingPiece))) {
                                squaresToBlock.push(universal(...getCordsOfPiece(royals[j]), around[2][0]*-1, around[2][1]*-1, 1))
                            }
                            squaresToBlock = [].concat(...squaresToBlock)
    
                            for(let i = 0; i < canGo.length; i++) {
                                if(!squaresToBlock.includes(canGo[i])) canGo.splice(i--, 1)
                            }
                        } else {
                            // double check
                            return
                        }
                    }
                    let movements = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]]
                    for(let i = 0; i < movements.length; i++) {
                        let last = universal(royals[j].getAttribute('col'), royals[j].getAttribute('row'), ...movements[i], 0, true).pop()
                        if(last == undefined) continue
    
                        let pieceInBetween = getPieceFromSquare(last)
                        if(pieceInBetween != clickedOn || isPieceWhite(pieceInBetween) != whiteTurn) {
                            if(hopperPieces.includes(getImgFileName(pieceInBetween))) {
                                let oppositeSquares = universal(...getCordsOfPiece(royals[j]), ...movements[(i + 4) % movements.length], 0, true)
                                if(getPieceFromSquare(oppositeSquares[oppositeSquares.length-1]) == clickedOn) {
                                    canGo = []
                                    break
                                }
                            }
                            continue
                        }
    
                        let behindLast = universal(...getCordsOfPiece(pieceInBetween), ...movements[i], 0, true).pop()
                        if(behindLast == undefined) continue
    
                        let piece = getPieceFromSquare(behindLast)
                        if(piece == undefined || isPieceWhite(piece) == whiteTurn) continue
    
                        // if opponents piece reaches the king
                        let oldCol = pieceInBetween.getAttribute('col')
                        pieceInBetween.setAttribute('col', 0)
                        whiteTurn = !whiteTurn
                        let allSquares = window[getImgFileName(piece)](...getCordsOfPiece(piece), true)
                        whiteTurn = !whiteTurn
                        pieceInBetween.setAttribute('col', oldCol)
    
                        if(!allSquares.includes(getSquareFromPiece(royals[j]))) break
    
                        pieceAboutToCheck = piece
                        // disallow movement if on a different lane
                        let laneSquares = []
                        laneSquares.push(universal(...getCordsOfPiece(clickedOn), ...movements[i], 0))
                        laneSquares.push(universal(...getCordsOfPiece(clickedOn), movements[i][0]*-1, movements[i][1]*-1, 0))
                        laneSquares = [].concat(...laneSquares)
                        for(let k = 0; k < canGo.length; k++) {
                            if(!laneSquares.includes(canGo[k])) canGo.splice(k--, 1)
                        }
                    }
                }
            }
        }
    
        lavaIf: if(data.features.includes('lava')) {
            let allFunctions = ['lavaPawn', 'lavaKnight', 'lavaQueen', 'lavaKing']
            let sub = clickedOnImgName.substring(4, clickedOnImgName.length)
            allFunctions.forEach(i => {
                abilityButton.removeEventListener('click', window['lavaAbility' + i.substring(4, i.length)])
            })
            if(allFunctions.includes(clickedOnImgName) && clickedOn.getAttribute('lavaAbilityUses') != '0') {
                if(inCheck) {
                    checkingPiece = getPieceFromId(histor[histor.length-1][2])
                    switch (sub) {
                        case 'Pawn':
                            let i = 1
                            if(whiteTurn) i = -1
                            if(getPieceFromSquare(universal(...getCordsOfPiece(clickedOn), 0, i, 1)[0]) != checkingPiece) {
                                break lavaIf
                            }
                            break;
                        case 'Knight':
                            break lavaIf
                        case 'Queen':
                            if(!lavaAbilityQueen(true).includes(getSquareFromPiece(checkingPiece))) {
                                break lavaIf
                            }
                            break;
                        case 'King':
                            if(!lavaAbilityKing(true).includes(getSquareFromPiece(checkingPiece))) {
                                break lavaIf
                            }
                            break;
                        default:
                            break;
                    }
                }
                if(pieceAboutToCheck != undefined) {
                    switch (sub) {
                        case 'Pawn':
                            let i = 1
                            if(whiteTurn) i = -1
                            if(getPieceFromSquare(universal(...getCordsOfPiece(clickedOn), 0, i, 1)[0]) != pieceAboutToCheck) {
                                break lavaIf
                            }
                            break;
                        case 'Knight':
                            break lavaIf
                        case 'Queen':
                            if(!lavaAbilityQueen(true).includes(getSquareFromPiece(pieceAboutToCheck))) {
                                break lavaIf
                            }
                            break;
                        default:
                            break;
                    }
                }
                abilityBox.classList.add('show')
                abilityButton.addEventListener('click', window['lavaAbility' + sub])
            }
        }
    
        waterIf: if(data.features.includes('water')) {
            let allFunctions = ['waterPawn', 'waterKnight', 'waterBishop', 'waterRook', 'waterQueen', 'waterKing']
            let sub = clickedOnImgName.substring(5, clickedOnImgName.length)
            allFunctions.forEach(i => {
                abilityButton.removeEventListener('click', window['waterAbility' + i.substring(5, i.length)])
            })
            if(allFunctions.includes(clickedOnImgName) && clickedOn.getAttribute('waterAbilityUses') != '0') {
                if(inCheck) {
                    checkingPiece = getPieceFromId(histor[histor.length-1][2])
                    switch (sub) {
                        case 'Pawn':
                            let i = 1
                            if(whiteTurn) i = -1
                            if(getPieceFromSquare(universal(...getCordsOfPiece(clickedOn), 0, i, 1)[0]) != checkingPiece) {
                                break waterIf
                            }
                            break;
                        case 'Knight':
                            break waterIf
                        case 'Queen':
                            if(!lavaAbilityQueen(true).includes(getSquareFromPiece(checkingPiece))) {
                                break waterIf
                            }
                            break;
                        case 'King':
                            if(!lavaAbilityKing(true).includes(getSquareFromPiece(checkingPiece))) {
                                break waterIf
                            }
                            break;
                        default:
                            break;
                    }
                }
                if(pieceAboutToCheck != undefined) {
                    switch (sub) {
                        case 'Pawn':
                            let i = 1
                            if(whiteTurn) i = -1
                            if(getPieceFromSquare(universal(...getCordsOfPiece(clickedOn), 0, i, 1)[0]) != pieceAboutToCheck) {
                                break waterIf
                            }
                            break;
                        case 'Knight':
                            break waterIf
                        case 'Queen':
                            if(!lavaAbilityQueen(true).includes(getSquareFromPiece(pieceAboutToCheck))) {
                                break waterIf
                            }
                            break;
                        default:
                            break;
                    }
                }
                abilityBox.classList.add('show')
                abilityButton.addEventListener('click', window['waterAbility' + sub])
            }
            shipMoving = false
        }
    }

    if(window[color + 'TakenPieces'].length > 0) {
        let takenPieces = []
        for(let i = 0; i < window[color + 'TakenPieces'].length; i++) {
            takenPieces.push(window[color + 'TakenPieces'][i][0])
        }
        takenPieces.forEach(i => {
            canGo.push(window[i]
            (clickedOn.getAttribute('col'), clickedOn.getAttribute('row')));
        })
        canGo = [].concat(...canGo)
    }
    squares.forEach(square => {
        square.addEventListener('dragover', resetSelectedPiece)
        square.addEventListener('click', deleteSquareThings)
    })
    canGo.forEach(i => {
        if(i != undefined && !i.classList.contains('disabled')) {
            i.classList.add('can-go')
            i.removeEventListener('dragover', resetSelectedPiece)
            i.removeEventListener('click', deleteSquareThings)
            i.addEventListener('dragover', squareDragOver)
            i.addEventListener('click', squareClick)
            if((ability == 'cannibalism' || multiPieceMove.length > 0) && getPieceFromSquare(i) != undefined) {
                getPieceFromSquare(i).style.pointerEvents = 'none'
            }
            if(data.features.includes('triangle')) {
                let div = document.createElement("div")
                board.appendChild(div)
                div.classList.add('highlight')
                div.classList.add('active')
                div.style.pointerEvents = 'none'
                div.style.position = 'absolute'
                div.style.height = parseInt(window.getComputedStyle(columns[0].children[0]).getPropertyValue('height').replace('px', '')) / 10 * 3 + 'px'
                div.style.width = div.style.height

                let col = getCordsOfSquare(i)[0]
                let row = getCordsOfSquare(i)[1]

                div.setAttribute('col', col)
                div.setAttribute('row', row)
        
                let left = parseInt(columns[col-1].style.left) + (columns[col-1].style.width.replace('px', '') - div.style.width.replace('px', '')) / 2
                let top = parseInt((row-1)*(window.getComputedStyle(squares[row-1]).getPropertyValue('height').replace('px', ''))) -
                (columns[col-1].style.height.replace('px', '') - div.style.height.replace('px', ''))

                if(((col % 2) + (row % 2)) % 2 == 0) {
                    top = parseInt(top) - (columns[col-1].style.height.replace('px', '') - div.style.height.replace('px', '')) / 2
                } else {
                    top = parseInt(top) + (columns[col-1].style.height.replace('px', '') - div.style.height.replace('px', '')) / 3.5
                }
        
                div.style.transform = 'translateX(' + left + 'px)' + ' translateY(' + top + 'px)'

                let squareToTheRight = universal(...getCordsOfSquare(i), 1, 0, 1, true)[0]
                if(squareToTheRight != undefined) {
                    squareToTheRight.classList.add('can-go')
                    squareToTheRight.removeEventListener('dragover', resetSelectedPiece)
                    squareToTheRight.removeEventListener('click', deleteSquareThings)
                    squareToTheRight.addEventListener('dragover', squareDragOver)
                    squareToTheRight.addEventListener('click', squareClick)
                }
            }
            if(allPieceParts.length > 1) {
                i.addEventListener('mouseover', projectGhostOfPiece)
                i.addEventListener('mouseout', deleteAllGhostPieces)
            }
        }
    })
    takeWithoutMovingSquares.forEach(square => {
        if(getPieceFromSquare(square) != undefined) square.classList.add('without-moving')
    })

    if(startSquare == undefined) {
        clickedOn.classList.add('clicked')
    } else {
        startSquare.classList.add('clicked')
    }
    if(highlighted1 != undefined) {
        highlighted1.classList.add('clicked')
        highlighted2.classList.add('clicked')
    }
    if(data.features.includes('triangle') && boardFlipped) resizeFreeHighlights()
}

function squareSelect() {
    if(clickedOn == undefined || targetSquare == undefined) return
    if((canGo == undefined || !canGo.includes(targetSquare)) && !histPlaying) return

    if(clickedOn.classList.contains('missile')) {
        let squareNum = 0
        window[clickedOnImgName + 'boom'](...getCordsOfSquare(targetSquare)).forEach(square => {
            capturePiece(getPieceFromSquare(square))
            squareNum++
            imgOnSquare(square, 'boom')
        })
        explosion.play()
        fire.play()
        currentMove++
        window[itemQuantityVariableName]--
        endOfTurn()
        return
    } else if(clickedOn.classList.contains('tsunami-button')) {
        manageWaterEntities()
        spawnEntity(targetSquare, 'tsunami', 0, 3, 'water')
        histor.push([undefined, undefined, undefined])
        histor[histor.length-1][3] = {
            ...histor[histor.length-1][3],
            tsunamiAppears: [targetSquare]
        }
        currentMove++
        window[color + 'TsunamiUses']--
        endOfTurn()
        return
    }

    if(data.features.includes('evolvingPieces2')) {
        function searchThroughArray(array, name, iArray = []) {
            if(array.includes(name)) {
                return [array, iArray]
            }
            for (let j = 0; j < array.length; j++) {
                if(Array.isArray(array[j])) {
                    let answer = searchThroughArray(array[j], name, [...iArray, j])
                    if(answer != undefined) return answer
                }
            }
        }
        let nextEvoArrays = searchThroughArray(evolutionStages, clickedOnImgName, [])
        let arrayWithName = nextEvoArrays[0]
        
        let promoPieces = []
        for (let i = 0; i < arrayWithName.length; i++) {
            if(Array.isArray(arrayWithName[i])) {
                for (let j = 0; j < arrayWithName[i].length; j++) {
                    if(!Array.isArray(arrayWithName[i][j])) {
                        promoPieces.push(arrayWithName[i][j])
                    }
                }
            }
        }

        let numOfMoves = getElementFromMultidimentionalArray(movesBetweenStages, nextEvoArrays[1])[0]
        if(Math.floor((allHistorMentions(clickedOn).length-1))+1 >= numOfMoves && promoPieces.length > 0) {
            promotionPieces = promoPieces
            promotion(targetSquare)
            return
        }
    }

    if(!histPlaying) {
        if(pawnLikePieces.indexOf(clickedOnImgName) > -1
        && (isPieceWhite(clickedOn) && targetSquare.getAttribute('row') == promotionRow
        || (!isPieceWhite(clickedOn) && targetSquare.getAttribute('row') == columns[targetSquare.parentElement.getAttribute('col')-1].children.length - (promotionRow-1)))) {
            if(!(takeWithoutMovingButtons[0].classList.contains('active') && taking
            && takeWithoutMovingSquares.includes(targetSquare))) {
                promotion(targetSquare)
                return
            }
        }

        if(multiMovePieces.includes(clickedOnImgName) && !multiMovePlaying) {
            multiMove()
            return
        }
    }

    if(hopperPieces.includes(clickedOnImgName)) hopperTaking()

    if(targetSquare.classList.contains('without-moving') && taking && takeWithoutMovingSquares.includes(targetSquare)) {
        takeWithoutMovingPop(clickedOn)
        return
    }
    waterIf: if(!histPlaying && data.features.includes('water') && clickedOnImgName.includes('Ship')) {
        let takenPiece = getPieceFromSquare(targetSquare)
        if(allPieceParts.length > 0 && (takenPiece == undefined || allPieceParts.includes(takenPiece))) {
            let relaCords = getRelaPositionsOfPieces(allPieceParts)
            let cords = getCordsOfSquare(targetSquare)
            takenPiece = getPieceFromCords(parseInt(cords[0]) + relaCords[0][0], parseInt(cords[1]) + relaCords[0][1])
        }
        if(targetSquare.classList.contains('ocean-square')) {
            if(takenPiece == undefined || allPieceParts.includes(takenPiece)) break waterIf
            let shotDurability = parseInt(takenPiece.getAttribute('shotDurability'))
            let durabilityTaken
            if(clickedOnImgName.includes('heavyShip')) {
                durabilityTaken = 2
            } else {
                durabilityTaken = 1
            }
            let allParts = getAllPieceParts(takenPiece)
            for (let i = 0; i < allParts.length; i++) {
                allParts[i].setAttribute('shotDurability', shotDurability - durabilityTaken)
                let items = getPieceItemsOfPiece(allParts[i])
                for (let i = 0; i < items.length; i++) {
                    if(items[i].classList.contains('ship-shot-dura-counter')) {
                        items[i].innerHTML = shotDurability - durabilityTaken
                        break
                    }
                }
                imgOnSquare(getSquareFromPiece(allParts[i]), 'boom')
            }
            histor.push([undefined, undefined, getPieceId(clickedOn)])
            currentMove++
            histor[histor.length-1][3] = {
                ...histor[histor.length-1][3],
                shipShot: [getPieceId(takenPiece), durabilityTaken]
            }
            if(shotDurability - durabilityTaken <= 0) {
                for (let i = 0; i < allParts.length; i++) {
                    capturePiece(allParts[i])
                }
            }
        } else {
            let squaresToConfuse = [targetSquare]
            histor.push([undefined, undefined, getPieceId(clickedOn)])
            currentMove++
            shipShooting = true
            if(clickedOnImgName.includes('heavyShip')) {
                let movements = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
                let cords = getCordsOfSquare(targetSquare)
                for (let i = 0; i < movements.length; i++) {
                    squaresToConfuse.push(universal(...cords, ...movements[i], 1, true)[0])
                }
            } else if(!clickedOnImgName.includes('lightShip')) {
                let movements = [[-1, 0], [0, -1], [1, 0], [0, 1]]
                let cords = getCordsOfSquare(targetSquare)
                for (let i = 0; i < movements.length; i++) {
                    squaresToConfuse.push(universal(...cords, ...movements[i], 1, true)[0])
                }
            }
            shipShooting = false
            histor[histor.length-1][3] = {
                ...histor[histor.length-1][3],
                confusedPieces: []
            }
            for (let i = 0; i < squaresToConfuse.length; i++) {
                if(squaresToConfuse[i].classList.contains('ocean-square')) continue
                imgOnSquare(squaresToConfuse[i], 'boom')
                let piece = getPieceFromSquare(squaresToConfuse[i])
                if(piece != undefined) {
                    confusePiece(piece)
                    histor[histor.length-1][3].confusedPieces.push(piece)
                }
            }
        }
        canonSfx.play()
        endOfTurn()
        return
    }

    for(let i = 0; i < multiPieceMove.length; i++) {
        if(multiPieceMove[i][multiPieceMove[i].length-1] == targetSquare) {
            let histArr = []
            for(let j = 0; j < multiPieceMove[i].length-1; j++) {
                if(j != multiPieceMove[i].length-2) histArr.push(multiPieceMove[i][j])
                setHist = false
                setPiecePos(...multiPieceMove[i][j])
                castleSfx.play()
            }
            if(!histPlaying) {
                histor.push(multiPieceMove[i][multiPieceMove[i].length-2])
                if(histArr.length > 0) {
                    histor[histor.length-1][3] = {
                        ...histor[histor.length-1][3],
                        multiPieceMove: histArr
                    }
                    currentMove -= histArr.length
                }
            }
            endOfTurn()
            return
        }
    }

    if(!histPlaying) setHist = true
    setPiecePos(targetSquare.parentElement.getAttribute('col'),
    targetSquare.getAttribute('row'),
    getPieceId(clickedOn));
    setHist = false

    if(data.features.includes('water')) {
        manageWaterEntities()
        if(!histPlaying && (targetSquare.classList.contains('water') || targetSquare.classList.contains('boiling') || targetSquare.classList.contains('steam'))) {
            capturePiece(clickedOn)
            if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].capturedPieces != undefined) {
                histor[histor.length-1][3].capturedPieces.push(clickedOn)
            } else {
                histor[histor.length-1][3] = {
                    ...histor[histor.length-1][3],
                    capturedPieces: [clickedOn]
                }
            }
        }
    }
    if(data.features.includes('lava')) {
        manageLavaEntities()
        if(!histPlaying && (targetSquare.classList.contains('lava') || targetSquare.classList.contains('magma') || targetSquare.classList.contains('fire'))) {
            if(clickedOnImgName.includes('burnt')) {
                capturePiece(clickedOn)
                if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].capturedPieces != undefined) {
                    histor[histor.length-1][3].capturedPieces.push(clickedOn)
                } else {
                    histor[histor.length-1][3] = {
                        ...histor[histor.length-1][3],
                        capturedPieces: [clickedOn]
                    }
                }
            } else {
                goToHell(clickedOn)
            }
        }
    }
    
    if(!histPlaying) {
        if(data.features.includes('alice') && data.alice.length >= 2) aliceThings()

        if(clickedOnImgName.includes('_')) {
            let count = clickedOnImgName.split('_')
            count.push(count.shift())
            changeImgFileName(clickedOn, count.join('_'))
        }
    }

    pieceItemsOnBoard.forEach(item => {
        item.style.transition = 'all 0.45s ease-in-out'
    })

    endOfTurn()
}
//#endregion

/*  popups  */
//#region

function promotion(target) {
    promotionPopup = board.querySelector('.promotion')
    promotionPopup.setAttribute('col', getCordsOfSquare(target)[0])
    promotionPopup.innerHTML = ''

    if(whiteTurn) {
        promotionPopup.classList.remove('black')
        promotionPopup.classList.add('white')
    } else {
        promotionPopup.classList.remove('white')
        promotionPopup.classList.add('black')
    }

    if(ability == 'promotionFromOtherUpdates' || (data.features.includes('diffSets') && whiteTurn != data.normalWhite)) {
        promotionPieces = extendedPromotionPieces
    } else if(typeof normalPromotionPieces !== 'undefined') {
        promotionPieces = normalPromotionPieces
    }
    promotionPieces.forEach(piece => {
        let variant
        switch(true) {
            case typeof evolutionPieces2 !== 'undefined' && evolutionPieces2.includes(piece):
                variant = 'evolvingPieces2'
                break;
            case typeof waterPieces !== 'undefined' && waterPieces.includes(piece):
                variant = 'water'
                break;
            case typeof evolutionPieces !== 'undefined' && evolutionPieces.includes(piece):
                variant = 'evolvingPieces'
                break;
            case typeof lavaPieces !== 'undefined' && lavaPieces.includes(piece):
                variant = 'lava'
                break;
            case typeof massive2Pieces !== 'undefined' && massive2Pieces.includes(piece):
                variant = 'massive/2.0'
                break;
            case typeof massivePieces !== 'undefined' && massivePieces.includes(piece):
                variant = 'massive'
                break;
            case typeof checkersPieces !== 'undefined' && checkersPieces.includes(piece):
                variant = 'checkers'
                break;
            case typeof trianglePieces !== 'undefined' && trianglePieces.includes(piece):
                variant = 'triangle'
                break;
            case typeof chess5Pieces !== 'undefined' && chess5Pieces.includes(piece):
                variant = '5.0'
                break;
            case typeof DLC1Pieces !== 'undefined' && DLC1Pieces.includes(piece):
                variant = 'DLC1'
                break;
            case typeof chess4Pieces !== 'undefined' && chess4Pieces.includes(piece):
                variant = '4.0'
                break;
            case typeof chess3Pieces !== 'undefined' && chess3Pieces.includes(piece):
                variant = '3.0'
                break;
            case typeof chess2Pieces !== 'undefined' && chess2Pieces.includes(piece):
                variant = '2.0'
                break;
            case typeof chess1Pieces !== 'undefined' && chess1Pieces.includes(piece):
                variant = '1.0'
                break;
            default:
                variant = 'evolvingPieces2'
                break;
        }

        let square = document.createElement("div")
        square.classList.add('square')
        promotionPopup.appendChild(square)

        let img = document.createElement("img")
        img.src = folder + 'img/' + variant + '/' + color + 'Pieces/' + piece + '.png'
        loadPiecesSkins([img])
        img.style.height = '90%'
        img.style.width = '90%'
        square.appendChild(img)
    })

    promotionPopup.classList.remove('none')
    promotionPopup.style.pointerEvents = 'auto'

    let promotionSquares = promotionPopup.querySelectorAll('.square')
    promotionSquares.forEach(i => {
        i.addEventListener('click', (e) => {
            promotePiece(i.children[0], target)
            promotionPopupHide()
        })
    })
    resizePromo()
}

function promotePiece(piece, target) {
    if(multiMovePieces.includes(clickedOnImgName)) {
        let o = multiMove()
        setTimeout(function() {
            srcChange()
        }, o)
        return
    }

    setHist = true
    setPiecePos(target.parentElement.getAttribute('col'),
    target.getAttribute('row'),
    getPieceId(clickedOn));
    setHist = false

    if(data.features.includes('alice') && data.alice.length >= 2) aliceThings()

    srcChange()
    function srcChange() {
        histor[histor.length-1][3] = {
            ...histor[histor.length-1][3],
            oldSrc: clickedOn.src,
            newSrc: piece.src
        }
        clickedOn.src = piece.src
    }

    if(data.features.includes('lava')) manageLavaEntities()
    if(data.features.includes('water')) {
        if(waterThings()) return
    }

    if(itemCards.includes(data.whiteCard) || itemCards.includes(data.blackCard)) {
        pieceItemsOnBoard.forEach(item => {
            item.style.transition = 'all 0.45s ease-in-out'
        })
    }
    endOfTurn()
}

function promotionPopupHide() {
    promotionPopup.classList.add('none')
    promotionPopup.style.pointerEvents = 'none'
}


function takeWithoutMovingPop(piece) {
    takeWithoutMovingPopup = board.querySelector('.take-without-moving')
    takeWithoutMovingPopup.setAttribute('piece', getPieceId(piece))
    let width = window.getComputedStyle(squares[0]).getPropertyValue('width').replace('px', '')
    let translateX = piece.getAttribute('col') * width + 'px'
    let translateY = (piece.getAttribute('row')-1) * width + 'px'

    takeWithoutMovingPopup.style.transform = 'translateX(' + translateX + ')' + ' translateY(' + translateY + ')'

    takeWithoutMovingButtons.forEach(but => {
        but.classList.remove('active')
    })
    takeWithoutMovingPopup.classList.add('show')
}

function takeWithoutMovingPopupHide() {
    takeWithoutMovingButtons.forEach(but => {
        but.classList.remove('active')
    })
    takeWithoutMovingPopup.classList.remove('show')
}

takeWithoutMovingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        takeWithoutMovingButtons.forEach(but => {
            but.classList.remove('active')
        })
        e.target.classList.add('active')

        let oldCol = clickedOn.getAttribute('col')
        let oldRow = clickedOn.getAttribute('row')
        let pieceId = getPieceId(clickedOn)

        let targetCords = getCordsOfSquare(targetSquare)
        setPiecePos(...targetCords, pieceId);

        if(Array.prototype.indexOf.call(takeWithoutMovingButtons, e.target) % 2 == 0) {
            setTimeout(() => {
                setHist = true
                setPiecePos(oldCol, oldRow, pieceId)
                setHist = false
                histor[histor.length-1][3] = {
                    ...histor[histor.length-1][3],
                    multimove: [targetCords]
                }
                currentMove--
            }, 400)
        }

        if(data.features.includes('alice') && data.alice.length >= 2) aliceThings()
        
        if(itemCards.includes(data.whiteCard) || itemCards.includes(data.blackCard)) {
            pieceItemsOnBoard.forEach(item => {
                item.style.transition = 'all 0.45s ease-in-out'
            })
        }
        endOfTurn()
        takeWithoutMovingPopupHide()
    })
})
//#endregion

/*  End Of Turn, Game  */
//#region
function endOfTurn() {
    if(!histPlaying) {
        if(data.features.includes('evolvingPieces')) {
            let index = 0
            for (let i = 0; i < evolutionStages.length; i++) {
                if(evolutionStages[i].includes(clickedOnImgName)) {
                    index = i
                    break
                }
            }
            let currentStage = evolutionStages[index].indexOf(clickedOnImgName)
            if(Math.floor((allHistorMentions(clickedOn).length-1) / 3) > currentStage && evolutionStages[index][currentStage+1] != undefined) {
                histor[histor.length-1][3] = {
                    ...histor[histor.length-1][3],
                    oldSrc: clickedOn.src
                }
                changeImgFileName(clickedOn, evolutionStages[index][currentStage+1])
                histor[histor.length-1][3] = {
                    ...histor[histor.length-1][3],
                    newSrc: clickedOn.src
                }
            }
        }

        if(twoPieces != undefined) {
            if(clickedOnImgName == 'bomber' || clickedOnImgName == 'cylinderBomber') {
                let squaresAround = []
                let startCol = clickedOn.getAttribute('col')
                let startRow = clickedOn.getAttribute('row')
                squaresAround.push(universal(startCol, startRow, 1, 0, 1, true))
                squaresAround.push(universal(startCol, startRow, -1, 0, 1, true))
                squaresAround.push(universal(startCol, startRow, 0, 1, 1, true))
                squaresAround.push(universal(startCol, startRow, 0, -1, 1, true))
                squaresAround = [].concat(...squaresAround)
        
                squaresAround.forEach(square => {
                    let piece = getPieceFromSquare(square)
                    if(piece != undefined) {
                        capturePiece(piece)
                        if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].capturedPieces != undefined) {
                            histor[histor.length-1][3].capturedPieces.push(piece)
                        } else {
                            histor[histor.length-1][3] = {
                                ...histor[histor.length-1][3],
                                capturedPieces: [piece]
                            }
                        }
                    }
                })
            } else if(clickedOnImgName == 'waterKnight') {
                window[color + 'KnightWaterAbilityUses']++
            }
        }

        actualHist()
        switchClocks()
        resizeItems()
        deleteSquareThings()
        inCheck = false
        clickedOnCheck = false
        discoveredCheck = false

        fireDemons.forEach(i => {
            if(isPieceWhite(i) == whiteTurn && !i.classList.contains('none')) {
                let squaresAround = []
                let startCol = i.getAttribute('col')
                let startRow = i.getAttribute('row')
                squaresAround.push(universal(startCol, startRow, 1, 0, 1))
                squaresAround.push(universal(startCol, startRow, -1, 0, 1))
                squaresAround.push(universal(startCol, startRow, 0, 1, 1))
                squaresAround.push(universal(startCol, startRow, 0, -1, 1))
    
                squaresAround = [].concat(...squaresAround)
                let pieceNum = 0
                squaresAround.forEach(square => {
                    let piece = getPieceFromSquare(square)
                    if(piece != undefined && histor[histor.length-1][2] != getPieceId(piece)
                    && histor[histor.length-2][2] != getPieceId(piece)) {
                        capturePiece(piece)
                        imgOnSquare(square, 'fire')
                        pieceNum++
                        if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].capturedPieces != undefined) {
                            histor[histor.length-1][3].capturedPieces.push(piece)
                        } else {
                            histor[histor.length-1][3] = {
                                ...histor[histor.length-1][3],
                                capturedPieces: [piece]
                            }
                        }
                    }
                })
                if(pieceNum > 0) {
                    fire.play()
                }
            }
        })

        gameEnded = true
    }

    noMovePieces = []
    immobilizers.forEach(i => {
        if(!i.classList.contains('none')) {
            board = i.parentElement.parentElement
            columns = board.querySelectorAll('.column')
            squares = board.querySelectorAll('.square')
    
            let squaresAround = []
            let startCol = i.getAttribute('col')
            let startRow = i.getAttribute('row')
            squaresAround.push(universal(startCol, startRow, 1, 0, 1, true))
            squaresAround.push(universal(startCol, startRow, -1, 0, 1, true))
            squaresAround.push(universal(startCol, startRow, 0, 1, 1, true))
            squaresAround.push(universal(startCol, startRow, 0, -1, 1, true))
            squaresAround = [].concat(...squaresAround)
    
            squaresAround.forEach(square => {
                let piece = getPieceFromSquare(square)
                if(piece != undefined && isPieceWhite(piece) != isPieceWhite(i)) noMovePieces.push(piece)
            })
        }
    })
    if(data.features.includes('lava')) {
        if(!histPlaying) {
            let lastlyMovedPiece = getPieceFromId(histor[histor.length-1][2])
            if(getImgFileName(lastlyMovedPiece) == 'lavaBishop' && !lastlyMovedPiece.classList.contains('none')) {
                let lastMention = allHistorMentions(lastlyMovedPiece)[1]
                if(lastMention != undefined) {
                    let squaresInBetween = getSquaresInBetween([histor[lastMention][0], histor[lastMention][1]], [histor[histor.length-1][0], histor[histor.length-1][1]])
                    for (let i = 0; i < squaresInBetween.length-1; i++) {
                        spawnEntity(squaresInBetween[i], 'magma', 0, 3)
                        if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].magmaAppears != undefined) {
                            histor[histor.length-1][3].magmaAppears.push([squaresInBetween[i], 0])
                        } else {
                            histor[histor.length-1][3] = {
                                ...histor[histor.length-1][3],
                                magmaAppears: [[squaresInBetween[i], 0]]
                            }
                        }
                    }
                }
            }
            for (let i = 0; i < lavaRookAbility.length; i++) {
                if(lavaRookAbility[i][1] == currentMove) {
                    spawnEntity(lavaRookAbility[i][0], 'fire', 0)
                    if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].fireAppears != undefined) {
                        histor[histor.length-1][3].fireAppears.push([lavaRookAbility[i][0], 0])
                    } else {
                        histor[histor.length-1][3] = {
                            ...histor[histor.length-1][3],
                            fireAppears: [[lavaRookAbility[i][0], 0]]
                        }
                    }
                    lavaRookAbility.splice(i--, 1)
                }
            }
        }
        hell.querySelectorAll('.turns-left').forEach(i => {
            if(i.innerHTML > 0) {
                i.innerHTML = i.innerHTML - 1
            }
        })
    }
    for (let i = 0; i < confusedPieces.length; i++) {
        let items = getPieceItemsOfPiece(confusedPieces[i])
        for (let j = 0; j < items.length; j++) {
            if(items[j].classList.contains('confusion-counter')) {
                if(items[j].innerHTML == '1') {
                    confusedPieces[i].removeAttribute('confused')
                    confusedPieces.splice(i--, 1)
                    items[j].remove()
                    pieceItemsOnBoard = document.querySelectorAll('.board .piece-item')
                } else {
                    items[j].innerHTML = parseInt(items[j].innerHTML) - 1
                }
                break
            }
        }
    }

    if(data.features.includes('disappearing') && !histPlaying
    && (histor.length - neutralMove) % 2 == 0 && squares.length > 0) {
        while(true) {
            let randomSquare = getSquareFromCords(Math.floor(Math.random() * columns.length) + 1,
            Math.floor(Math.random() * columns[0].children.length) + 1)
            if(randomSquare != undefined && !randomSquare.classList.contains('disabled')) {
                let pieceToRemove = getPieceFromSquare(randomSquare)
                randomSquare.classList.add('disabled')
                squares = board.querySelectorAll('.square:not(.disabled)')
                histor[histor.length-1][3] = {
                    ...histor[histor.length-1][3],
                    removedSquare: randomSquare
                }
                if(pieceToRemove != undefined) {
                    capturePiece(pieceToRemove)
                    if(royals.includes(pieceToRemove) && isPieceWhite(pieceToRemove) != whiteTurn) {
                        endGame(whiteTurn)
                    }
                }
                break
            }
        }
    }
    
    mainIf: if(data.winConditions.includes('checkmate') && !histPlaying) {
        royalsLeft = 0
        let j
        for(let i = 0; i < royals.length; i++) {
            if(isPieceWhite(royals[i]) == whiteTurn && royals[i].getAttribute('col') > 0) {
                j = i
                royalsLeft++
            }
        }

        if(royalsLeft == 0) break mainIf

        let around
        // 1 royal piece left
        if(royalsLeft == 1 && !clickedOn.classList.contains('missile') && !clickedOn.classList.contains('ship')) {
            // if moved piece is checking
            whiteTurn = !whiteTurn
            let allAvailableSquares = window[clickedOnImgName](clickedOn.getAttribute('col'), clickedOn.getAttribute('row'), true)
            whiteTurn = !whiteTurn
            for(let i = 0; i < allAvailableSquares.length; i++) {
                let piece = getPieceFromSquare(allAvailableSquares[i])
                if(piece != undefined && piece.getAttribute('royal') == 'true') {
                    clickedOnCheck = true
                    inCheck = true
                }
            }

            whiteTurn = !whiteTurn
            around = piecesAroundKing(j)
            whiteTurn = !whiteTurn
            if(around[0]) {
                if(around[1] != clickedOn) discoveredCheck = true
                inCheck = true
            }
        } else if(royalsLeft > 1) {
            gameEnded = false
        }

        // if checkmate
        if(inCheck) {
            // check if king can run away
            let kingSquares = window[getImgFileName(royals[j])](...getCordsOfPiece(royals[j]))
            let allSquares = []
            whiteTurn = !whiteTurn
            ability = 'cannibalism'
            window[!whiteTurn ? 'blackPieces' : 'whitePieces'].forEach(piece => {
                if(piece != undefined && piece.getAttribute('col') != 0 && clickedOn.getAttribute('confused') != 'true') {
                    allSquares.push(window[getImgFileName(piece)](...getCordsOfPiece(piece), true))
                }
            })
            ability = undefined
            whiteTurn = !whiteTurn
            allSquares = [].concat(...allSquares)

            for(let k = 0; k < kingSquares.length; k++) {
                if(allSquares.includes(kingSquares[k])) kingSquares.splice(k--, 1)
            }

            // check if other pieces can get rid of the check
            let ableToBlock = false
            if(!(clickedOnCheck && discoveredCheck)) {
                allavailableSquares = []
                window[whiteTurn ? 'whitePieces' : 'blackPieces'].forEach(piece => {
                    if(piece != undefined && piece.getAttribute('col') != 0) {
                        let squs = window[getImgFileName(piece)](...getCordsOfPiece(piece), true)
                        if(piece.getAttribute('confused') == 'true') {
                            for (let i = 0; i < squs.length; i++) {
                                if(getPieceFromSquare(squs[i]) != undefined) {
                                    squs.splice(i--, 1)
                                }
                            }
                        }
                        allavailableSquares.push(squs)
                        if(data.features.includes('lava')) {
                            let imgName = getImgFileName(piece)
                            if(imgName == 'lavaPawn') {
                                allavailableSquares.push(universal(...getCordsOfPiece(piece), 0, (whiteTurn ? -1 : 1), 1))
                            } else if(imgName == 'lavaKing') {
                                allavailableSquares.push(lavaAbilityKing(true, piece))
                            }
                        }
                        if(piece.getAttribute('royal') == 'true') {
                            let allSquares = []
                            whiteTurn = !whiteTurn
                            ability = 'cannibalism'
                            window[whiteTurn ? 'whitePieces' : 'blackPieces'].forEach(piece => {
                                if(piece != undefined && piece.getAttribute('col') != 0) {
                                    allSquares.push(window[getImgFileName(piece)](...getCordsOfPiece(piece), true))
                                    if(piece.getAttribute('confused') == 'true') {
                                        for (let i = 0; i < allSquares.length; i++) {
                                            if(getPieceFromSquare(allSquares[i]) != undefined) {
                                                allSquares.splice(i--, 1)
                                            }
                                        }
                                    }
                                }
                            })
                            ability = undefined
                            whiteTurn = !whiteTurn
                            allSquares = [].concat(...allSquares)
            
                            for(let k = 0; k < allavailableSquares[allavailableSquares.length-1].length; k++) {
                                if(allSquares.includes(allavailableSquares[allavailableSquares.length-1][k])
                                && isPieceWhite(getPieceFromSquare(allavailableSquares[allavailableSquares.length-1][k])) != whiteTurn) {
                                    allavailableSquares[allavailableSquares.length-1].splice(k--, 1)
                                }
                            }
                        }
                    }
                })
                allavailableSquares = [].concat(...allavailableSquares)

                let squaresToBlock = []
                if(around[0]) {
                    squaresToBlock.push(getSquareFromPiece(around[1]))
                    squaresToBlock.push(universal(...getCordsOfPiece(around[1]), around[2][0]*-1, around[2][1]*-1, 0))
                    squaresToBlock = [].concat(...squaresToBlock)
                } else {
                    squaresToBlock.push(getSquareFromPiece(getPieceFromId(histor[histor.length-1][2])))
                }

                for(let i = 0; i < squaresToBlock.length; i++) {
                    if(allavailableSquares.includes(squaresToBlock[i])) {
                        ableToBlock = true
                        break
                    }
                }
            }

            if(kingSquares.length == 0 && !ableToBlock) {
                gameEnded = true
            } else {
                gameEnded = false
            }
        } else if(royalsLeft > 0) {
            gameEnded = false
        }
    } else if(data.winConditions.includes('capture')) {
        gameEnded = true
        for(let i = 0; i < royals.length; i++) {
            if(isPieceWhite(royals[i]) == whiteTurn && royals[i].getAttribute('col') > 0) {
                gameEnded = false
                break
            }
        }
    }

    if(inCheck) {
        check.play()
    } else if(twoPieces != undefined || (histor[histor.length-1][3] != undefined && histor[histor.length-1][3].capturedPieces != undefined)) {
        capture.play()
    } else {
        move.play()
        if(enpassant.length == 0 && !hopperTook && !inCheck) {
            taking = false
        } else {
            hopperTook = false
        }
    }

    if(gameEnded && !histPlaying) endGame(!whiteTurn)
}

function endGame(winner) {
    endGamePopup.classList.add('show')
    if(winner) {
        endGamePopupWinner.innerHTML = 'White Won!'
    } else {
        endGamePopupWinner.innerHTML = 'Black Won!'
    }
    stopClocks()
    deleteSquareThings()
    pieces.forEach(piece => {
        piece.removeEventListener('dragstart', pieceSelect)
        piece.removeEventListener('click', pieceSelect)
        piece.style.pointerEvents = 'none'
    })
    takeWithoutMovingPopupHide()
    promotionPopupHide()
}

function endGamePopupHide() {
    endGamePopup.classList.remove('show')
}
//#endregion

/*  Check functions  */
//#region
function piecesAroundKing(j, allowOtherCol = false) {
    let movements = [[1, 0], [-1, 0], [0, -1], [0, 1], [1, 1], [-1, 1], [1, -1], [-1, -1]]

    for(let i = 0; i < movements.length; i++) {
        // collecting piece around the king
        let last = universal(royals[j].getAttribute('col'), royals[j].getAttribute('row'), ...movements[i], 0, true).pop()
        if(last == undefined) continue

        let piece = getPieceFromSquare(last)
        if(piece == undefined || (isPieceWhite(piece) != whiteTurn && !allowOtherCol)) continue

        // movement of piece around the king
        let rev = false
        if(isPieceWhite(piece) != whiteTurn) {
            whiteTurn = !whiteTurn
            rev = true
        }
        let allSquares = window[getImgFileName(piece)](piece.getAttribute('col'), piece.getAttribute('row'), true)
        if(rev) whiteTurn = !whiteTurn
        for(let k = 0; k < allSquares.length; k++) {
            let pieceToMoveOn = getPieceFromSquare(allSquares[k])
            if(pieceToMoveOn != undefined && pieceToMoveOn.getAttribute('royal') == 'true') return [true, piece, movements[i]]
        }
    }
    return [false]
}

//#endregion

/*  */
//#region

function aliceThings() {
    clickedOn.style.transition = 'all 0.45s ease-in-out'
    clickedOn.style.opacity = '0'
    
    let boardIndex = Array.prototype.indexOf.call(boards, board)
    if(data.alice.includes(boardIndex)) {
        board = boards[data.alice[data.alice.indexOf(boardIndex) == data.alice.length-1 ? 0 : data.alice.indexOf(boardIndex) + 1]]
        board.querySelector('.pieces').appendChild(clickedOn)
        if(parseInt(clickedOn.getAttribute('lives')) > 0 || clickedOn.getAttribute('royal') == 'true') {
            for(let i = 0; i < pieceItemsOnBoard.length; i++) {
                if(pieceItemsOnBoard[i].getAttribute('pie') == getPieceId(clickedOn)) board.querySelector('.pieces').appendChild(pieceItemsOnBoard[i])
            }
        }
    }
    clickedOn.style.opacity = '1'
    clickedOn.style.animation = 'append 0.2s linear'
    clickedOn.style.transition = 'all 0s ease-in-out'
    histor[histor.length-1][3] = {
        ...histor[histor.length-1][3],
        board: Array.prototype.indexOf.call(boards, board)
    }
    board = boards[boardIndex]
    columns = board.querySelectorAll('.column')
    squares = board.querySelectorAll('.square')
    deleteSquareThings()
}

function multiMove() {
    if(movePathways == undefined) return
    multiMovePlaying = true
    let o = -500
    let histArr = []
    let maxMaterialPath
    let maxMaterial = 0        
    for(let i = 0; i < movePathways.length; i++) {
        if(movePathways[i].includes(targetSquare)) {
            let materialSum = 0
            for(let j = 0; j < movePathways[i].indexOf(targetSquare)+1; j++) {
                let pieceInBetween = getPieceInBetweenSquares(j == 0 ? getCordsOfPiece(clickedOn) : getCordsOfSquare(movePathways[i][j-1]), getCordsOfSquare(movePathways[i][j]))
                if(pieceInBetween != undefined)
                    materialSum += pieceValue[getImgFileName(pieceInBetween)]
            }
            if(materialSum >= maxMaterial) {
                maxMaterial = materialSum
                maxMaterialPath = movePathways[i]
            }
        }
    }
    let moveLength = maxMaterialPath.indexOf(targetSquare)
    for(let j = 0; j < moveLength+1; j++) {
        o += 500
        setTimeout(function() {
            targetSquare = maxMaterialPath[j]
            hopperTaking()
            setPiecePos(...getCordsOfSquare(targetSquare), getPieceId(clickedOn))
            if(j != moveLength) histArr.push(getCordsOfSquare(targetSquare))
        }, o)
    }
    multiMovePlaying = false

    let histWasPlaying = histPlaying
    deleteSquareThings()
    setTimeout(function() {
        if(!histWasPlaying) {
            histor.push([...getCordsOfSquare(targetSquare), getPieceId(clickedOn)])
            if(histArr.length > 0) {
                histor[histor.length-1][3] = {
                    ...histor[histor.length-1][3],
                    multimove: histArr
                }
                currentMove -= histArr.length
            }
        }
        endOfTurn()
    }, o)
    return o
}

function hopperTaking() {
    if(currentMove < neutralMove) return
    let newPos = getCordsOfSquare(targetSquare)
    let prevPos = getCordsOfPiece(clickedOn)
    
    let piec = getPieceInBetweenSquares(prevPos, newPos)
    if(piec != undefined) {
        hopperTook = true
        capturePiece(piec)
        taking = true
        capture.play()
    }
}

function imgOnSquare(square, name) {
    let img = document.createElement("img")
    
    img.src = folder + 'img/' + name + '.png'
    img.style.height = '100%'
    img.classList.add('squareImg')
    square.appendChild(img)

    setTimeout(() => {
        square.removeChild(img)
    }, 1500);
}

function spawnEntity(square, name, stage = 0, lifespan, updateFolder = 'lava') {
    if(square.getAttribute('lava-source') != undefined) {
        square.classList.remove('lava')
        square.querySelector('.square-bg').remove()
        square.removeAttribute('lava-source')
    }
    if(!square.classList.contains(name)) {
        square.classList.add(name, name + '-' + stage)
        window[name + 'Squares'].push(square)
        let img = document.createElement('img')
        img.src = folder + 'img/' + updateFolder + '/' + name + '.png'
        if(name == 'fire') img.style.zIndex = '15'
        img.classList.add('square-bg')
        square.appendChild(img)
        let allSquareBg = square.querySelectorAll('.square-bg')
        if1: if(allSquareBg.length > 1) {
            for (let i = 0; i < allSquareBg.length; i++) {
                if(getImgFileName(allSquareBg[i]) == 'fire') {
                    allSquareBg[i].style.zIndex = '15'
                    break if1
                }
            }
            let squareWidth = window.getComputedStyle(squares[0]).getPropertyValue('width')
            img.style.clip = 'rect(0px, ' + squareWidth + ', ' + squareWidth + ', ' + parseInt(squareWidth) / 2 + 'px)'
            img.style.zIndex = '2'
        }
        if(!histPlaying) {
            let piece = getPieceFromSquare(square)
            if(piece != undefined && piece != clickedOn && piece.classList.contains('piece')) {
                if(updateFolder != 'lava' || getImgFileName(piece).includes('burnt')) {
                    capturePiece(piece)
                    capture.play()
                    if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].capturedPieces != undefined) {
                        histor[histor.length-1][3].capturedPieces.push(piece)
                    } else {
                        histor[histor.length-1][3] = {
                            ...histor[histor.length-1][3],
                            capturedPieces: [piece]
                        }
                    }
                } else {
                    goToHell(piece)
                }
            }
            if(targetSquare == square && clickedOn.classList.contains('piece')) {
                if(!data.features.includes('lava') || clickedOnImgName.includes('burnt')) {
                    capturePiece(clickedOn)
                    if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].capturedPieces != undefined) {
                        histor[histor.length-1][3].capturedPieces.push(clickedOn)
                    } else {
                        histor[histor.length-1][3] = {
                            ...histor[histor.length-1][3],
                            capturedPieces: [clickedOn]
                        }
                    }
                } else {
                    goToHell(clickedOn)
                }
            }
        }
    } else {
        let existenceLength = 0
        for (let j = 0; j < square.classList.length; j++) {
            if(square.classList[j].includes(name + '-')) {
                existenceLength = parseInt(square.classList[j].substring(name.length+1, square.classList[j].length))
                break
            }
        }
        square.classList.replace(name + '-' + existenceLength, name + '-' + stage)
    }
    if(lifespan != undefined) {
        if(square.querySelector('.turns-left') != null) {
            square.querySelector('.turns-left').innerHTML = lifespan - stage
        } else {
            let div = document.createElement('div')
            div.classList.add('turns-left')
            div.style.fontSize = window.getComputedStyle(square).getPropertyValue('height')
            div.innerHTML = lifespan - stage
            square.appendChild(div)
        }
    }
}

function removeEntity(square, name, existenceLength = undefined, index) {
    if(existenceLength == undefined) {
        let entitySquares = window[name + 'Squares']
        for (let j = 0; j < entitySquares[index].classList.length; j++) {
            if(entitySquares[index].classList[j].includes(name + '-')) {
                existenceLength = parseInt(entitySquares[index].classList[j].substring((name + '-').length, entitySquares[index].classList[j].length))
                break
            }
        }
    }
    square.classList.remove(name, name + '-' + existenceLength)
    let allBg = square.querySelectorAll('.square-bg')
    for (let i = 0; i < allBg.length; i++) {
        if(getImgFileName(allBg[i]) == name) {
            allBg[i].remove()
        } else {
            allBg[i].style.clip = ''
            allBg[i].style.zIndex = ''
        }
    }
    if(square.querySelector('.turns-left') != null) square.querySelector('.turns-left').remove()
    window[name + 'Squares'].splice(index, 1)
}

function flipBoard() {
    boardFlipped = !boardFlipped
    if(boardFlipped) {
        board.style.flexDirection = 'row-reverse'
        columns.forEach(i => {
            i.style.flexDirection = 'column-reverse'
        })
        pieces.forEach(piece => {
            piece.style.left = 'auto'
            piece.style.top = 'auto'

            piece.style.right = '0'
            piece.style.bottom = '0'
        })
        pieceItemsOnBoard.forEach(piece => {
            piece.style.left = 'auto'
            piece.style.top = 'auto'

            piece.style.right = '0'
            piece.style.bottom = '0'
        })
    } else {
        board.style.flexDirection = 'row'
        columns.forEach(i => {
            i.style.flexDirection = 'column'
        })
        pieces.forEach(piece => {
            piece.style.right = 'auto'
            piece.style.bottom = 'auto'

            piece.style.left = '0'
            piece.style.top = '0'
        })
        pieceItemsOnBoard.forEach(piece => {
            piece.style.right = 'auto'
            piece.style.bottom = 'auto'

            piece.style.left = '0'
            piece.style.top = '0'
        })
    }
    resize()
}

function confusePiece(piece) {
    if(piece.getAttribute('confused') == 'true') return

    piece.setAttribute('confused', 'true')
    confusedPieces.push(piece)

    let id = getPieceId(piece)
    let confusionDura = document.createElement("div")
    confusionDura.classList.add('piece-item', 'counter-piece-item', 'confusion-counter')
    confusionDura.setAttribute('pie', id)
    board.querySelector('.pieces').appendChild(confusionDura)
    if(!histPlaying) {
        confusionDura.innerHTML = '11'
    } else {
        confusionDura.innerHTML = '10'
    }

    // let confusionImg = document.createElement("img")
    // confusionImg.classList.add('piece-item', 'confusion-img')
    // confusionImg.src = folder + 'img/' + color + 'confusion.png'
    // confusionImg.setAttribute('pie', id)
    // board.querySelector('.pieces').appendChild(confusionImg)

    pieceItemsOnBoard = document.querySelectorAll('.board .piece-item')
    resizeItems()
}

//#endregion

/*  Pieces movement functions  */
//#region

function universal(startCol, startRow, X_change, Y_change, iterations, canni) {
    let availableSquares = []

    if(ability == 'cannibalism' && canni == undefined) canni = true

    for(let i = 1; i <= iterations || iterations == 0; i++) {
        let targetColumn = columns[parseInt(startCol-1) + X_change * i]
        if(targetColumn == undefined) {
            if(data.features.includes('cylinderBoard')) {
                availableSquares.push(...cylindrical(availableSquares.length == 0 ? getSquareFromCords(startCol, startRow) : availableSquares[availableSquares.length-1], X_change, Y_change, iterations))
            }
            break
        }

        let targetSquare = targetColumn.children[parseInt(startRow-1) + Y_change * i]
        if(targetSquare == undefined || targetSquare.classList.contains('disabled')
        || (targetSquare.classList.contains('ocean-square') != shipMoving && shipShooting != true)) break

        let piece = getPieceFromCords(targetColumn.getAttribute('col'), targetSquare.getAttribute('row'))
        let isWhite = isPieceWhite(piece)
        if(isWhite == whiteTurn) {
            if(canni == true) availableSquares.push(targetSquare)
            if(piece.parentElement.parentElement == board && !goingThroughPieces) break
        }
        availableSquares.push(targetSquare)
        if(isWhite == !whiteTurn && piece.parentElement.parentElement == board && !goingThroughPieces) break
    }
    return availableSquares
}


/*  Cylindrical, Bouncy movement, Castling  */


function cylindrical(lastSquare, X_change, Y_change, iterations) {
    let cords = getCordsOfSquare(lastSquare)
    let lastSquareCol = cords[0]
    let lastSquareRow = cords[1]
    let moreAvailableSquares = []

    let piece = getPieceFromCords(lastSquareCol, lastSquareRow)
    if((piece != undefined && piece != clickedOn)
    || (lastSquareRow == 1 && Y_change < 0) || (lastSquareRow == columns[0].children.length && Y_change > 0)) return []

    if(lastSquareCol <= -X_change || (columns.length - lastSquareCol + 1 <= X_change)) {
        let newSquareCol
        if(lastSquareCol <= -X_change) {
            newSquareCol = columns.length + parseInt(lastSquareCol) + X_change
        } else {
            newSquareCol = parseInt(lastSquareCol) - columns.length + X_change
        }
        let newSquareRow = parseInt(lastSquareRow) + Y_change
        let square = getSquareFromCords(newSquareCol, newSquareRow)
        let piece = getPieceFromSquare(square)
        if(isPieceWhite(piece) != whiteTurn) {
            moreAvailableSquares.push(square)
            if(piece == undefined) {
                if(iterations == 0) {
                    moreAvailableSquares.push(universal(newSquareCol, newSquareRow, X_change, Y_change, iterations))
                } else if(iterations > 1) {
                    moreAvailableSquares.push(universal(newSquareCol, newSquareRow, X_change, Y_change, iterations-1))
                }
            }
        }
    }

    moreAvailableSquares = [].concat(...moreAvailableSquares)
    return moreAvailableSquares
}

function bouncy(lastSquare, X_change, Y_change, iterations) {
    let lastSquareCol = lastSquare.getAttribute('col')
    let lastSquareRow = lastSquare.getAttribute('row')
    let moreAvailableSquares = []

    if(isPieceWhite(getPieceFromCords(lastSquareCol, lastSquareRow)) == !whiteTurn) {
        if((lastSquareCol >= 1 && lastSquareCol <= X_change) ||
        (lastSquareCol <= columns.length - X_change && lastSquareCol >= columns.length)) {
            let newSquareCol = Math.abs(columns.length - lastSquareCol - X_change)
            let newSquareRow = lastSquareRow + Y_change
            moreAvailableSquares.push(universal(newSquareCol, newSquareRow, 0, 0, 1))
            moreAvailableSquares.push(universal(newSquareCol, newSquareRow, X_change, Y_change, iterations))
        }
    }
    moreAvailableSquares = [].concat(...moreAvailableSquares)
    return moreAvailableSquares
}

function castling(allPieces, landingSquaresCords, sameColor = true, spaceBetween = true, startingSquaresCords = undefined, didntMove = true) {
    for(let i = 0; i < allPieces.length; i++) {
        if(sameColor && isPieceWhite(allPieces[i]) != whiteTurn) return
        if(didntMove && lastHistorMention(allPieces[i]) > neutralMove) return
            else if(startingSquaresCords != undefined && startingSquaresCords[i] != getCordsOfPiece(piece)) return
    }
    let o = 0
    for(let i = 0; i < landingSquaresCords.length; i++) {
        let piece = getPieceFromCords(...landingSquaresCords[i])
        if(piece != undefined && !allPieces.includes(piece)) return
        if(allPieces[i] == piece) o++
    }
    if(o >= allPieces.length) return
    if(spaceBetween) {
        for(let i = 0; i < allPieces.length; i++) {
            let cords1 = getCordsOfPiece(allPieces[i])
            let cords2 = getCordsOfPiece(i != allPieces.length-1 ? allPieces[i+1] : allPieces[0])
            if(cords1 == undefined || cords2 == undefined) return
            if(cords1[1] == cords2[1]) {
                let j = 1
                if(parseInt(cords1[0]) > parseInt(cords2[0])) j = -1
                if(getPieceFromSquare(universal(...cords1, j, 0, 0, true).pop()) != (i != allPieces.length-1 ? allPieces[i+1] : allPieces[0])) return
            }
        }
    }

    multiPieceMove.push([])
    for(let i = 0; i < allPieces.length; i++) {
        multiPieceMove[multiPieceMove.length-1].push([...landingSquaresCords[i], getPieceId(allPieces[i])])
    }
    multiPieceMove[multiPieceMove.length-1].push(getSquareFromPiece(allPieces[allPieces.length-1]))
}
//#endregion

//#region pieces Movement
//#region
/*  1.0  */
//#region
function pawn(startCol, startRow, takeNoPiece = false) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    let moves = universal(startCol, startRow, 0, i, 2)
    if(moves[0] != undefined && getPieceFromSquare(moves[0]) == undefined && !takeNoPiece) {
        allAvailableSquares.push(moves[0])
        if(((startRow <= startingRow && !whiteTurn) || (startRow >= columns[0].children.length - (startingRow - 1) && whiteTurn))
        && moves[1] != undefined && isPieceWhite(getPieceFromSquare(moves[1])) == undefined) {
            allAvailableSquares.push(moves[1])
        }
    }

    let takes = []
    takes.push(universal(startCol, startRow, 1, i, 1))
    takes.push(universal(startCol, startRow, -1, i, 1))
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && (isPieceWhite(getPieceFromSquare(take)) == !whiteTurn || takeNoPiece)) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    let enpassants = []
    enpassants.push(universal(startCol, startRow, 1, 0, 1))
    enpassants.push(universal(startCol, startRow, -1, 0, 1))
    enpassants = [].concat(...enpassants)

    let iter = 0
    enpassants.forEach(i => {
        let piece = getPieceFromSquare(i)
        if(i != undefined && isPieceWhite(piece) == !whiteTurn
        && pawnLikePieces.includes(getImgFileName(piece))) {
            enpassant.push(piece)
            
            let lastHistMention
            for(let j = currentMove-2; j > 0; j--) {
                if(parseInt(histor[j][2]) == getPieceId(getPieceFromSquare(i))) {
                    lastHistMention = j
                    break
                }
            }

            if(getPieceId(piece) == histor[histor.length-1][2]
            && (getPieceFromSquare(takes[iter]) == undefined
            || pawnLikePieces.includes(getImgFileName(getPieceFromSquare(takes[iter]))))
            && (histor[histor.length-1][1] - histor[lastHistMention][1] >= 2
            || histor[lastHistMention][1] - histor[histor.length-1][1] >= 2)) {
                takingWithEnPassant = true
                allAvailableSquares.push(takes[iter])
            }
        }
        iter++
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function knight(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function bishop(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function rook(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function queen(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function king(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 1))

    if(!inCheck && window[color + 'Rooks'].length > 0) {
        let castlingPieces = [clickedOn, ...window[color + 'Rooks']]
        let startingPositions = []
        for (let i = 0; i < castlingPieces.length; i++) {
            let mentions = allHistorMentions(castlingPieces[i])
            let lastMention = histor[mentions[mentions.length-1]]
            startingPositions.push([lastMention[0], lastMention[1]])
        }

        castling([clickedOn, window[color + 'Rooks'][0]], [[startingPositions[0][0]-2, startingPositions[0][1]], [startingPositions[1][0]+3, startingPositions[1][1]]])
        castling([clickedOn, window[color + 'Rooks'][1]], [[startingPositions[0][0]+2, startingPositions[0][1]], [startingPositions[2][0]-2, startingPositions[2][1]]])

        multiPieceMove.forEach(move => {
            allAvailableSquares.push(move[move.length-1])
        })
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}
//#endregion

/*  2.0  */
//#region
function nwap(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    let moves = []
    moves.push(universal(startCol, startRow, 1, 1*i, 2))
    moves.push(universal(startCol, startRow, -1, 1*i, 2))

    moves.forEach(move => {
        if(move[0] != undefined
        && isPieceWhite(getPieceFromSquare(move[0])) == undefined) {
            allAvailableSquares.push(move[0])
            if(move[1] != undefined
            && ((startRow <= 2 && !whiteTurn) || (startRow >= columns[0].children.length - 1 && whiteTurn))
            && isPieceWhite(getPieceFromSquare(move[1])) == undefined) {
                allAvailableSquares.push(move[1])
            }
        }
    })

    let take1 = universal(startCol, startRow, 0, 1*i, 1)[0]
    if(take1 != undefined
    && isPieceWhite(getPieceFromSquare(take1)) == !whiteTurn) {
        allAvailableSquares.push(take1)    
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function infinityKnight(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 0))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function twoColoredBishop(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function jumper(startCol, startRow) {
    let allAvailableSquares = []
    startCol = parseInt(startCol)
    startRow = parseInt(startRow)

    let movements = [[1, 0], [-1, 0], [0, 1], [0, -1]]

    for(let i = 0; i < movements.length; i++) {
        let move = universal(startCol, startRow, movements[i][0], movements[i][1], 0, true)
        if(move.length <= 0) continue
        allAvailableSquares.push(move)

        if(getPieceFromSquare(allAvailableSquares[allAvailableSquares.length-1][allAvailableSquares[allAvailableSquares.length-1].length-1]) == undefined) continue
        let newCords = getCordsOfSquare(allAvailableSquares[allAvailableSquares.length-1].pop())

        allAvailableSquares.push(universal(...newCords, movements[i][0], movements[i][1], 0))
        allAvailableSquares = [].concat(...allAvailableSquares)

        if(allAvailableSquares.length != 0 && isPieceWhite(getPieceFromSquare(allAvailableSquares[allAvailableSquares.length-1])) == !whiteTurn) {
            allAvailableSquares.pop()
        }
    }
    
    let takes = []
    takes.push(universal(startCol, startRow, 2, 2, 1))
    takes.push(universal(startCol, startRow, -2, 2, 1))
    takes.push(universal(startCol, startRow, 2, -2, 1))
    takes.push(universal(startCol, startRow, -2, -2, 1))
    takes = [].concat(...takes)
    takeWithoutMovingSquares = [].concat(...takes)

    takes.forEach(take => {
        if(take != undefined
        && isPieceWhite(getPieceFromSquare(take)) == !whiteTurn) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function megaQueen(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 1))

    allAvailableSquares.push(universal(startCol, startRow, -3, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function doubleKing(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function god(startCol, startRow, onlyTakingMovement = false) {
    let allAvailableSquares = []

    if(!onlyTakingMovement) {
        let squaresWithPieces = []
        pieces.forEach(piece => {
            if(piece.getAttribute('col') > 0) {
                squaresWithPieces.push(getSquareFromPiece(piece))
            }
        })
        squares.forEach(square => {
            if(squaresWithPieces.indexOf(square) == -1) {
                allAvailableSquares.push(square)
            }
        })
    }

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}
//#endregion

/*  3.0  */
//#region
function peasant(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    let moves = universal(startCol, startRow, 0, 1*i, 2)
    if(moves[0] != undefined && getPieceFromSquare(moves[0]) == undefined) {
        allAvailableSquares.push(moves[0])
        if(((startRow <= 2 && !whiteTurn) || (startRow >= columns[0].children.length - 1 && whiteTurn))
        && moves[1] != undefined && isPieceWhite(getPieceFromSquare(moves[1])) == undefined) {
            allAvailableSquares.push(moves[1])
        }
    }

    let takes = []
    takes.push(universal(startCol, startRow, 1, 1*i, 1))
    takes.push(universal(startCol, startRow, -1, 1*i, 1))
    takes = [].concat(...takes)
    takeWithoutMovingSquares = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && isPieceWhite(getPieceFromSquare(take)) == !whiteTurn) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    let enpassants = []
    enpassants.push(universal(startCol, startRow, 1, 0, 1))
    enpassants.push(universal(startCol, startRow, -1, 0, 1))
    enpassants = [].concat(...enpassants)

    let iter = 0
    enpassants.forEach(i => {
        if(i != undefined && isPieceWhite(getPieceFromSquare(i)) == !whiteTurn
        && pawnLikePieces.includes(getImgFileName(getPieceFromSquare(i)))) {
            enpassant.push(getPieceFromSquare(i))
            
            let lastHistMention
            for(let j = currentMove-2; j > 0; j--) {
                if(parseInt(histor[j][2]) == getPieceId(enpassant)) {
                    lastHistMention = j
                    break
                }
            }
            if(getPieceId(enpassant) == histor[histor.length-1][2]
            && (getPieceFromSquare(takes[iter]) == undefined
            || pawnLikePieces.includes(getImgFileName(getPieceFromSquare(takes[iter]))))
            && (histor[histor.length-1][1] - histor[lastHistMention][1] >= 2
            || histor[lastHistMention][1] - histor[histor.length-1][1] >= 2)) {
                takingWithEnPassant = true
                allAvailableSquares.push(takes[iter])
            }
        }
        iter++
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function donkey(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 0, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -2, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function cheetah(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares.push(universal(startCol, startRow, -3, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function castle(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function princess3(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 4))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 4))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 4))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 4))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 4))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 4))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 4))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 4))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function emperor(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))

    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function jester(startCol, startRow) {
    let allAvailableSquares = []
    let color

    if(whiteTurn) {
        color = blackPieces
    } else {
        color = whitePieces
    }

    loop1:
    for(let i = currentMove-neutralMove; i > 0; i--) {
        for(let o = 0; o < color.length; o++) {
            if(getPieceId(color[o]) == histor[neutralMove+i-1][2]
            && getImgFileName(color[o]) != 'jester') {
                allAvailableSquares = window[getImgFileName(color[o])](startCol, startRow);
                break loop1
            } 
        }
        if(color == blackPieces) {
            color = whitePieces
        } else {
            color = blackPieces
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

/* evolution */

function centerPeasant(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    let moves = universal(startCol, startRow, 0, 1*i, 2)
    allAvailableSquares.push(moves[0])
    if(((startRow <= 2 && !whiteTurn) || (startRow >= columns[0].children.length - 1 && whiteTurn))
    && isPieceWhite(getPieceFromSquare(moves[1])) == undefined) {
        allAvailableSquares.push(moves[1])
    }


    let takes = []
    takes.push(universal(startCol, startRow, 1, 1*i, 1))
    takes.push(universal(startCol, startRow, -1, 1*i, 1))
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined
        && isPieceWhite(getPieceFromSquare(take)) == !whiteTurn) {
            taking = true
            allAvailableSquares.push(take)
        }
    })


    let enpassants = []
    enpassants.push(universal(startCol, startRow, 1, 0, 1))
    enpassants.push(universal(startCol, startRow, -1, 0, 1))
    enpassants = [].concat(...enpassants)

    let iter = 0
    enpassants.forEach(i => {
        if(i != undefined
        && isPieceWhite(getPieceFromSquare(i)) == !whiteTurn) {
            enpassant.push(getPieceFromSquare(i))
            
            let lastHistMention
            for(let i = currentMove-2; i > 0; i--) {
                if(parseInt(histor[i][2]) == getPieceId(enpassant)) {
                    lastHistMention = i
                    break
                }
            }
            if(getPieceId(enpassant) == histor[histor.length-1][2]
            && (getPieceFromSquare(takes[iter]) == undefined
            || pawnLikePieces.includes(getImgFileName(getPieceFromSquare(takes[iter]))))
            && (histor[histor.length-1][1] - histor[lastHistMention][1] >= 2
            || histor[lastHistMention][1] - histor[histor.length-1][1] >= 2)) {
                takingWithEnPassant = true
                allAvailableSquares.push(takes[iter])
            }
        }
        iter++
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function gigaPeasant(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    allAvailableSquares.push(universal(startCol, startRow, 0, 1*i, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1*i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)

    for(let j = 0; j < allAvailableSquares.length; j++) {
        if(isPieceWhite(getPieceFromSquare(allAvailableSquares[j])) == !whiteTurn) {
            taking = true
            break
        }
    }

    return allAvailableSquares
}

function giraffe(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, -2, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 3, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function tiger(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, -2, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 3, 1))

    let moreAvailableSquares = []

    moreAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    moreAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))
    moreAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    moreAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))

    moreAvailableSquares = [].concat(...moreAvailableSquares)

    moreAvailableSquares.forEach(square => {
        if(isPieceWhite(getPieceFromSquare(square)) == !whiteTurn) {
            allAvailableSquares.push(square)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function lion(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, -2, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 3, 1))

    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function fortress(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))
    allAvailableSquares = [].concat(...allAvailableSquares)

    let moreAvailableSquares = []
    allAvailableSquares.forEach(square => {
        if(getPieceFromSquare(square) == undefined) {
            let newCol = square.parentElement.getAttribute('col')
            let newRow = square.getAttribute('row')

            moreAvailableSquares.push(universal(newCol, newRow, 1, 0, 0))
            moreAvailableSquares.push(universal(newCol, newRow, -1, 0, 0))
            moreAvailableSquares.push(universal(newCol, newRow, 0, 1, 0))
            moreAvailableSquares.push(universal(newCol, newRow, 0, -1, 0))

            moreAvailableSquares = [].concat(...moreAvailableSquares)
        }
    })
    allAvailableSquares.push(moreAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massiveFortress(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))
    allAvailableSquares = [].concat(...allAvailableSquares)

    let moreAvailableSquares = []
    allAvailableSquares.forEach(square => {
        if(getPieceFromSquare(square) == undefined) {
            let newCol = square.parentElement.getAttribute('col')
            let newRow = square.getAttribute('row')

            moreAvailableSquares.push(universal(newCol, newRow, 1, 0, 0))
            moreAvailableSquares.push(universal(newCol, newRow, -1, 0, 0))
            moreAvailableSquares.push(universal(newCol, newRow, 0, 1, 0))
            moreAvailableSquares.push(universal(newCol, newRow, 0, -1, 0))

            moreAvailableSquares = [].concat(...moreAvailableSquares)
        }
    })
    allAvailableSquares.push(moreAvailableSquares)

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function queen3(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function empress(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0]]

    movements.forEach(move => {
        if(getPieceFromSquare(allAvailableSquares[allAvailableSquares.length-1]) == undefined) {
            allAvailableSquares.push(universal(startCol, startRow, ...move, 0))
            allAvailableSquares.push(cylindrical(allAvailableSquares[allAvailableSquares.length-1], ...move, 0))
            allAvailableSquares.push(bouncy(allAvailableSquares[allAvailableSquares.length-1], ...move, 0))
            allAvailableSquares = [].concat(...allAvailableSquares)   
        }
    })

    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))


    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}
//#endregion

/*  4.0  */
//#region
function bodyguard(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    allAvailableSquares.push(universal(startCol, startRow, 0, 1*i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -2*i, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function actualKnight(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 1))

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function unicorn(startCol, startRow) {
    let allAvailableSquares = []

    let array1 = []
    array1.push(universal(startCol, startRow, -2, -1, 1))
    array1.push(universal(startCol, startRow, -1, -2, 1))
    array1 = [].concat(...array1)
    array1.forEach(square => {
        let newCol = square.parentElement.getAttribute('col')
        let newRow = square.getAttribute('row')

        if(getPieceFromCords(newCol, newRow) == undefined) {
            array1.push(universal(newCol, newRow, -1, -1, 0))
        }
    })
    array1 = [].concat(...array1)

    let array2 = []
    array2.push(universal(startCol, startRow, -2, 1, 1))
    array2.push(universal(startCol, startRow, -1, 2, 1))
    array2 = [].concat(...array2)
    array2.forEach(square => {
        let newCol = square.parentElement.getAttribute('col')
        let newRow = square.getAttribute('row')

        if(getPieceFromCords(newCol, newRow) == undefined) {
            array2.push(universal(newCol, newRow, -1, 1, 0))
        }
    })
    array2 = [].concat(...array2)
    

    let array3 = []
    array3.push(universal(startCol, startRow, 1, -2, 1))
    array3.push(universal(startCol, startRow, 2, -1, 1))
    array3 = [].concat(...array3)
    array3.forEach(square => {
        let newCol = square.parentElement.getAttribute('col')
        let newRow = square.getAttribute('row')

        if(getPieceFromCords(newCol, newRow) == undefined) {
            array3.push(universal(newCol, newRow, 1, -1, 0))
        }
    })
    array3 = [].concat(...array3)
    

    let array4 = []
    array4.push(universal(startCol, startRow, 1, 2, 1))
    array4.push(universal(startCol, startRow, 2, 1, 1))
    array4 = [].concat(...array4)
    array4.forEach(square => {
        let newCol = square.parentElement.getAttribute('col')
        let newRow = square.getAttribute('row')

        if(getPieceFromCords(newCol, newRow) == undefined) {
            array4.push(universal(newCol, newRow, 1, 1, 0))
        }
    })
    array4 = [].concat(...array4)
    
    
    allAvailableSquares.push(array1, array2, array3, array4)
    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = [].concat(...allAvailableSquares)

    return allAvailableSquares
}

function grasshopper(startCol, startRow) {
    let allAvailableSquares = []
    
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2)[1])
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2)[1])
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2)[1])

    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2)[1])
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2)[1])

    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2)[1])
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2)[1])
    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2)[1])
    
    allAvailableSquares = allAvailableSquares.filter(function( element ) {
        return element !== undefined;
    });

    let allSquaresWithTaking = []
    allSquaresWithTaking.push(allAvailableSquares)
    allSquaresWithTaking = [].concat(...allSquaresWithTaking)
    for(let i = 0; i < allAvailableSquares.length; i++) {
        if(isPieceWhite(getPieceFromSquare(allAvailableSquares[i])) == !whiteTurn) allAvailableSquares.splice(i--, 1)
    }

    let moreAvailableSquares = []
    allAvailableSquares.forEach(square => {
        let newCol = square.parentElement.getAttribute('col')
        let newRow = square.getAttribute('row')

        moreAvailableSquares.push(universal(newCol, newRow, -1, -1, 2)[1])
        moreAvailableSquares.push(universal(newCol, newRow, -1, 0, 2)[1])
        moreAvailableSquares.push(universal(newCol, newRow, -1, 1, 2)[1])
    
        moreAvailableSquares.push(universal(newCol, newRow, 0, -1, 2)[1])
        moreAvailableSquares.push(universal(newCol, newRow, 0, 1, 2)[1])
    
        moreAvailableSquares.push(universal(newCol, newRow, 1, -1, 2)[1])
        moreAvailableSquares.push(universal(newCol, newRow, 1, 0, 2)[1])
        moreAvailableSquares.push(universal(newCol, newRow, 1, 1, 2)[1])
        
        moreAvailableSquares = moreAvailableSquares.filter(function( element ) {
            return element !== undefined;
        });

        moreAvailableSquares = [].concat(...moreAvailableSquares)
    })
    allAvailableSquares.push(moreAvailableSquares)
    allAvailableSquares = allAvailableSquares.concat(allSquaresWithTaking)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function prince(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function king4(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 1))

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function princess4(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 3))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 3))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 3))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function queen4(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 3))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 3))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 3))

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function kiok(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))

    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function fireDemon(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))

    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function dragon(startCol, startRow) {
    let allAvailableSquares = []

    let takes = []
    takes.push(universal(startCol, startRow, -2, -1, 1))
    takes.push(universal(startCol, startRow, -1, -2, 1))
    takes.push(universal(startCol, startRow, -2, 1, 1))
    takes.push(universal(startCol, startRow, -1, 2, 1))
    takes.push(universal(startCol, startRow, 1, -2, 1))
    takes.push(universal(startCol, startRow, 2, -1, 1))
    takes.push(universal(startCol, startRow, 1, 2, 1))
    takes.push(universal(startCol, startRow, 2, 1, 1))
    takes = [].concat(...takes)
    takeWithoutMovingSquares = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && isPieceWhite(getPieceFromSquare(take)) == !whiteTurn) {
            taking = true
        }
        allAvailableSquares.push(take)
    })

    startCol = parseInt(startCol)
    startRow = parseInt(startRow)
    allAvailableSquares.push(universal(startCol+1, startRow-1, 1, -1, 2))
    allAvailableSquares.push(universal(startCol-1, startRow+1, -1, 1, 2))
    allAvailableSquares.push(universal(startCol+1, startRow+1, 1, 1, 2))
    allAvailableSquares.push(universal(startCol-1, startRow-1, -1, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function neutral(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}
//#endregion

/*  Atomic 2.0  */
//#region
function A62() {
    let allAvailableSquares = []

    squares.forEach(square => {
        if(square.getAttribute('row') >= columns[0].children.length-2 && whiteTurn) {
            allAvailableSquares.push(square)
        } else if(square.getAttribute('row') <= 3 && !whiteTurn) {
            allAvailableSquares.push(square)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function B34() {
    let allAvailableSquares = []

    squares.forEach(square => {
        if(square.getAttribute('row') >= columns[0].children.length-2 && whiteTurn) {
            allAvailableSquares.push(square)
        } else if(square.getAttribute('row') <= 3 && !whiteTurn) {
            allAvailableSquares.push(square)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function C01() {
    let allAvailableSquares = []

    squares.forEach(square => {
        if(square.getAttribute('row') >= columns[0].children.length-4 && whiteTurn) {
            allAvailableSquares.push(square)
        } else if(square.getAttribute('row') <= 5 && !whiteTurn) {
            allAvailableSquares.push(square)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function Y20() {
    let allAvailableSquares = []

    squares.forEach(square => {
        if(square.getAttribute('row') >= columns[0].children.length-2 && whiteTurn) {
            allAvailableSquares.push(square)
        } else if(square.getAttribute('row') <= 3 && !whiteTurn) {
            allAvailableSquares.push(square)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function jesterMissile() {
    let allAvailableSquares = []

    squares.forEach(square => {
        if(square.getAttribute('row') >= columns[0].children.length-3 && whiteTurn) {
            allAvailableSquares.push(square)
        } else if(square.getAttribute('row') <= 4 && !whiteTurn) {
            allAvailableSquares.push(square)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


function A62boom(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[0, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]]

    movements.forEach(move => {
        let last = universal(startCol, startRow, ...move, 3, true).pop()
        if(last != undefined && getPieceFromSquare(last) != undefined
        && pieceValue[getImgFileName(getPieceFromSquare(last))] <= 3) {
            allAvailableSquares.push(last)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function B34boom(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[0, 0], [1, 0], [-1, 0], [0, -1], [0, 1]]

    movements.forEach(move => {
        let last = universal(startCol, startRow, ...move, 2, true).pop()
        if(last != undefined && getPieceFromSquare(last) != undefined
        && pieceValue[getImgFileName(getPieceFromSquare(last))] <= 3) {
            allAvailableSquares.push(last)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function C01boom(startCol, startRow) {
    let allAvailableSquares = []

    for(let i = 1; i <= columns.length; i++) {
        if(getPieceFromCords(i, startRow) != undefined
        && pieceValue[getImgFileName(getPieceFromCords(i, startRow))] <= 1) {
            allAvailableSquares.push(getSquareFromCords(i, startRow))
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function Y20boom(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[0, 0], [1, 0], [-1, 0], [0, -1], [0, 1], [1, 1], [-1, 1], [1, -1], [-1, -1]]

    movements.forEach(move => {
        let last = universal(startCol, startRow, ...move, 1, true).pop()
        if(last != undefined && getPieceFromSquare(last) != undefined
        && pieceValue[getImgFileName(getPieceFromSquare(last))] <= 3) {
            allAvailableSquares.push(last)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function jesterMissileboom(startCol, startRow) {
    let allAvailableSquares = []
    let pieceName

    if(!whiteTurn) {
        color = blackPieces
    } else {
        color = whitePieces
    }

    loop1:
    for(let i = currentMove-neutralMove; i > 0; i--) {
        for(let o = 0; o < color.length; o++) {
            if(getPieceId(color[o]) == histor[neutralMove+i-2][2]
            && getImgFileName(color[o]) != 'jester') {
                pieceName = getImgFileName(color[o])
                allAvailableSquares = window[getImgFileName(color[o])](startCol, startRow);
                break loop1
            } 
        }
        if(color == blackPieces) {
            color = whitePieces
        } else {
            color = blackPieces
        }
    }
    allAvailableSquares.push(getSquareFromCords(startCol, startRow))

    for(let i = 0; i < allAvailableSquares.length; i++) {
        if(getPieceFromSquare(allAvailableSquares[i]) == undefined
        || pieceValue[getImgFileName(getPieceFromSquare(allAvailableSquares[i]))] > pieceValue[pieceName]) allAvailableSquares.splice(i--, 1)
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}
//#endregion

/*  Wizard Chess  */
//#region
function wizard(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2))

    let takes = []
    takes.push(universal(startCol, startRow, 2, 2, 1))
    takes.push(universal(startCol, startRow, -2, 2, 1))
    takes.push(universal(startCol, startRow, 2, -2, 1))
    takes.push(universal(startCol, startRow, -2, -2, 1))
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && isPieceWhite(getPieceFromSquare(take)) == !whiteTurn) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function witch(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function teleporter(startCol, startRow) {
    window[whiteTurn ? 'whitePieces' : 'blackPieces'].forEach(piece => {
        castling([clickedOn, piece], [getCordsOfSquare(piece), [startCol, startRow]])
    })
}

function iceWizard(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function iceDragon(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[-2, -1], [-1, -2], [-2, 1], [-1, 2], [1, -2], [2, -1], [1, 2], [2, 1]]

    movements.forEach(move => {
        let square = universal(startCol, startRow, ...move, 1)
        allAvailableSquares.push(square)
        if(isPieceWhite(getPieceFromSquare(square)) != whiteTurn) {
            allAvailableSquares.push(universal(...getCordsOfSquare(square), move[0] != -1 && move[0] != 1 ? move[0] / 2 * 3 : move[0],
            move[1] != -1 && move[1] != 1 ? move[1] / 2 * 3 : move[1], 1));
        }
    })
    allAvailableSquares = [].concat(...allAvailableSquares)

    return allAvailableSquares
}

function golem(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2))

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function wand(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    allAvailableSquares.push(universal(startCol, startRow, 0, 2*i, 1))
    if(allAvailableSquares[0].length == 2) {
        allAvailableSquares.push(universal(startCol, startRow, -1, 2*i, 1))
        allAvailableSquares.push(universal(startCol, startRow, 1, 2*i, 1))
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function beast(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 2, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -2, 1))

    let takes = []
    takes.push(universal(startCol, startRow, 1, 1, 1))
    takes.push(universal(startCol, startRow, 1, -1, 1))
    takes.push(universal(startCol, startRow, -1, 1, 1))
    takes.push(universal(startCol, startRow, -1, -1, 1))
    takes.push(universal(startCol, startRow, 1, 0, 1))
    takes.push(universal(startCol, startRow, -1, 0, 1))
    takes.push(universal(startCol, startRow, 0, 1, 1))
    takes.push(universal(startCol, startRow, 0, -1, 1))
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && isPieceWhite(getPieceFromSquare(take)) == !whiteTurn) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function giant(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function magicFrog(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2))

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function hat(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function owl(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

//#endregion

/*  DLC 1  */
//#region
// combined normal
function archbishop(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(bishop(startCol, startRow))
    allAvailableSquares.push(knight(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function chancellor(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(rook(startCol, startRow))
    allAvailableSquares.push(knight(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function amazon(startCol, startRow) {
    let allAvailableSquares = []
    
    allAvailableSquares.push(queen(startCol, startRow))
    allAvailableSquares.push(knight(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function horseyPawn(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(pawn(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function pawnRook(startCol, startRow) {
    let allAvailableSquares = []
    
    allAvailableSquares.push(rook(startCol, startRow))
    allAvailableSquares.push(pawn(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

// leapers
function camel(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, -3, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

// giraffe

function elephant(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 2, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, -2, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function stag(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, -4, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, -4, 1))
    allAvailableSquares.push(universal(startCol, startRow, -4, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 4, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -4, 1))
    allAvailableSquares.push(universal(startCol, startRow, 4, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 4, 1))
    allAvailableSquares.push(universal(startCol, startRow, 4, 2, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


// riders
function giraffeRider(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, -2, -3, 0))
    allAvailableSquares.push(universal(startCol, startRow, -3, -2, 0))
    allAvailableSquares.push(universal(startCol, startRow, -2, 3, 0))
    allAvailableSquares.push(universal(startCol, startRow, -3, 2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 3, -2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 2, -3, 0))
    allAvailableSquares.push(universal(startCol, startRow, 3, 2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 2, 3, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function dabbabaRider(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 2, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -2, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, 2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 0, -2, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function knightRider2(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 2))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 2))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 2))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function elephantRider(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 2, 2, 0))
    allAvailableSquares.push(universal(startCol, startRow, -2, 2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 2, -2, 0))
    allAvailableSquares.push(universal(startCol, startRow, -2, -2, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


// leapers + riders
function squarePiece(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 2, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -2, 1))

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function pope(startCol, startRow) {
    let allAvailableSquares = []
    
    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 0))

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 0))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 0))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 0))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function dabElephant(startCol, startRow) {
    let allAvailableSquares = []
    
    allAvailableSquares.push(universal(startCol, startRow, 2, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -2, 1))

    allAvailableSquares.push(universal(startCol, startRow, 2, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, -2, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function kniper(startCol, startRow) {
    let allAvailableSquares = []
    
    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(universal(startCol, startRow, 3, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, 3, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, -3, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, -3, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


// circular riders
function rose(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1]]
    
    for(let i = 0; i < movements.length; i++) {
        let last = [getSquareFromCords(startCol, startRow)]
        for(let j = i; j < movements.length + i; j++) {
            last = universal(...getCordsOfSquare(last[0]), ...movements[j % movements.length], 1)
            allAvailableSquares.push(last)
            if(last.length == 0 || getPieceFromSquare(last[last.length-1]) != undefined) break
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function tulip(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[-3, -1], [-1, -3], [1, -3], [3, -1], [3, 1], [1, 3], [-1, 3], [-3, 1]]
    
    for(let i = 0; i < movements.length; i++) {
        let last = [getSquareFromCords(startCol, startRow)]
        for(let j = i; j < movements.length + i; j++) {
            last = universal(...getCordsOfSquare(last[0]), ...movements[j % movements.length], 1)
            allAvailableSquares.push(last)
            if(last.length == 0 || getPieceFromSquare(last[last.length-1]) != undefined) break
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


// two moves
function gryphon(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[1, 1], [1, -1], [-1, 1], [-1, -1]]

    movements.forEach(move => {
        allAvailableSquares.push(universal(startCol, startRow, ...move, 1))
    })

    let moreAvailableSquares = []
    for (let i = 0; i < allAvailableSquares.length; i++) {
        let square = allAvailableSquares[i][0]
        if(square != undefined && getPieceFromSquare(square) == undefined) {
            let newCol = square.parentElement.getAttribute('col')
            let newRow = square.getAttribute('row')

            moreAvailableSquares.push(universal(newCol, newRow, movements[i][0], 0, 0))
            moreAvailableSquares.push(universal(newCol, newRow, 0, movements[i][1], 0))

            moreAvailableSquares = [].concat(...moreAvailableSquares)
        }
    }
    allAvailableSquares.push(moreAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function noJumpingKnight(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    
    movements.forEach(move => {
        let last = universal(startCol, startRow, ...move, 1)
        if(last.length == 0 || getPieceFromSquare(last[0]) == undefined) {
            if(move[0] != 0) {
                allAvailableSquares.push(universal(...getCordsOfSquare(last[0]), move[0], -1, 1))
                allAvailableSquares.push(universal(...getCordsOfSquare(last[0]), move[0], 1, 1))
            } else {
                allAvailableSquares.push(universal(...getCordsOfSquare(last[0]), -1, move[1], 1))
                allAvailableSquares.push(universal(...getCordsOfSquare(last[0]), 1, move[1], 1))
            }
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function washop(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 1))
    allAvailableSquares = [].concat(...allAvailableSquares)

    let moreAvailableSquares = []
    allAvailableSquares.forEach(square => {
        if(getPieceFromSquare(square) == undefined) {
            let newCol = square.parentElement.getAttribute('col')
            let newRow = square.getAttribute('row')

            moreAvailableSquares.push(bishop(newCol, newRow))
            moreAvailableSquares = [].concat(...moreAvailableSquares)
        }
    })
    allAvailableSquares.push(moreAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


// diff move/take
function knightBishop(startCol, startRow) {
    let allAvailableSquares = bishop(startCol, startRow)

    let takes = knight(startCol, startRow)
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && (isPieceWhite(getPieceFromSquare(take)) == !whiteTurn)) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function roshop(startCol, startRow) {
    let allAvailableSquares = rook(startCol, startRow)
    
    let takes = bishop(startCol, startRow)
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && (isPieceWhite(getPieceFromSquare(take)) == !whiteTurn)) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function squareKnight(startCol, startRow) {
    let allAvailableSquares = squarePiece(startCol, startRow)

    let takes = knight(startCol, startRow)
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && (isPieceWhite(getPieceFromSquare(take)) == !whiteTurn)) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function knightRideroBishop(startCol, startRow) {
    let allAvailableSquares = infinityKnight(startCol, startRow)

    let takes = bishop(startCol, startRow)
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && (isPieceWhite(getPieceFromSquare(take)) == !whiteTurn)) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


// Without moving
function knightWithoutMoving(startCol, startRow) {
    let allAvailableSquares = knight(startCol, startRow)

    allAvailableSquares = [].concat(...allAvailableSquares)
    takeWithoutMovingSquares = allAvailableSquares
    
    takeWithoutMovingSquares.forEach(take => {
        if(take != undefined && isPieceWhite(getPieceFromSquare(take)) == !whiteTurn) taking = true
    })

    return allAvailableSquares
}

function modifiedAmazon(startCol, startRow) {
    let allAvailableSquares = rook(startCol, startRow)
    let takes = []
    takes.push(knight(startCol, startRow))
    takes.push(bishop(startCol, startRow))
    takes = [].concat(...takes)
    takeWithoutMovingSquares = [].concat(...knight(startCol, startRow))
    
    takes.forEach(take => {
        if(take != undefined && (isPieceWhite(getPieceFromSquare(take)) == !whiteTurn)) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


//#endregion

/*  5.0  */
//#region
function king5(startCol, startRow) {
    return king(startCol, startRow)
}

function pawn5(startCol, startRow, takeNoPiece) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    let moves = universal(startCol, startRow, 0, i, 2)
    if(moves[0] != undefined && getPieceFromSquare(moves[0]) == undefined && !takeNoPiece && moves[0].parentElement.parentElement == board) {
        allAvailableSquares.push(moves[0])
        if(((startRow <= 2 && !whiteTurn) || (startRow >= columns[0].children.length - 1 && whiteTurn))
        && moves[1] != undefined && isPieceWhite(getPieceFromSquare(moves[1])) == undefined && moves[1].parentElement.parentElement == board) {
            allAvailableSquares.push(moves[1])
        }
    }
    let o = 1
    if(((startRow <= 2 && !whiteTurn) || (startRow >= columns[0].children.length - 1 && whiteTurn))) o = 2
    allAvailableSquares.push(universal(startCol, startRow, 1, i, o))
    allAvailableSquares.push(universal(startCol, startRow, -1, i, o))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function centaur(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function pig(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    allAvailableSquares.push(universal(startCol, startRow, 1, i*-1, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, i*-1, 0))

    allAvailableSquares.push(universal(startCol, startRow, 1, i*2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, i*2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, i, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function tank(startCol, startRow) {
    return queen(startCol, startRow)
}

function bishop_knightrider2(startCol, startRow) {
    return bishop(startCol, startRow)
}

function knightrider2_bishop(startCol, startRow) {
    return knightRider2(startCol, startRow)
}

function shieldedBishop(startCol, startRow) {
    return bishop(startCol, startRow)
}

function immobilizer(startCol, startRow) {
    return queen(startCol, startRow)
}

function llama(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    allAvailableSquares.push(universal(startCol, startRow, 1, i*2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, i*2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, -i, 1))

    allAvailableSquares.push(universal(startCol, startRow, 0, -i, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function viking(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}
//#endregion

/*  Triangle  */
//#region
function trianglePawn(startCol, startRow) {
    let i = 1
    if(whiteTurn) i = -1
    if(universal(startCol, startRow, 0, i, 1)[0] == undefined || universal(startCol, startRow, 0, i, 1)[0].classList.contains('disabled')) {
        let allAvailableSquares = []

        allAvailableSquares.push(universal(startCol, startRow, 1, i, 1))
        allAvailableSquares.push(universal(startCol, startRow, -1, i, 1))

        allAvailableSquares = [].concat(...allAvailableSquares)
        return allAvailableSquares
    }
    return pawn(startCol, startRow)
}

function triangleKnight(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1 // black triangle
    if(((startCol % 2) + (startRow % 2)) % 2 == 0) i = -1 // white triangle
    
    allAvailableSquares.push(universal(startCol, startRow, 1, 2*i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2*i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 4, -i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -4, -i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 3, 2*-i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, 2*-i, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleBishop(startCol, startRow, j = 0) {
    let allAvailableSquares = []
    let i = 1
    if((((startCol % 2) + (startRow % 2)) % 2 == 0 && j == 0) || (((startCol % 2) + (startRow % 2)) % 2 == 1 && j == 1)) i = -1
    movements = [[2, -i], [-2, -i], [0, i]]

    movements.forEach(move => {
        for(let k = 0; true; k++) {
            let squ
            let arr
            if(k == 0)
                arr = [startCol, startRow]
            else
                arr = getCordsOfSquare(allAvailableSquares[allAvailableSquares.length-1])
            
            if(k % 2 == j) {
                squ = universal(...arr, ...move, 1)
            } else {
                squ = universal(...arr, move[0] / 2, move[1] == i ? i : 0, 1)
            }
            allAvailableSquares.push(squ)
            allAvailableSquares = [].concat(...allAvailableSquares)
            if(squ.length == 0 || getPieceFromSquare(allAvailableSquares[allAvailableSquares.length-1]) != undefined) break
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleRook(startCol, startRow) {
    return triangleBishop(startCol, startRow, 1)
}

function triangleStrongerRook(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(((startCol % 2) + (startRow % 2)) % 2 == 0) i = -1
    
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 0))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 0))
    
    let diagMovements = [[1, 1], [-1, -1], [1, -1], [-1, 1]]
    diagMovements.forEach(move => {
        let o = ((move[1] > 0 && i == -1) || (move[1] < 0 && i == 1)) ? 0 : 1
        for(let k = 0; true; k++) {
            let squ
            let arr
            if(k == 0)
                arr = [startCol, startRow]
            else
                arr = getCordsOfSquare(allAvailableSquares[allAvailableSquares.length-1])
            
            if(k % 2 == o) {
                squ = universal(...arr, 0, move[1], 1)
            } else {
                squ = universal(...arr, move[0], 0, 1)
            }
            allAvailableSquares.push(squ)
            allAvailableSquares = [].concat(...allAvailableSquares)
            if(squ.length == 0 || getPieceFromSquare(allAvailableSquares[allAvailableSquares.length-1]) != undefined) break
        }
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleQueen(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(triangleBishop(startCol, startRow))
    allAvailableSquares.push(triangleStrongerRook(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleKing(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(((startCol % 2) + (startRow % 2)) % 2 == 0) i = -1

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 1))

    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))

    allAvailableSquares.push(universal(startCol, startRow, 2, -i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, -i, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleUnicorn(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(((startCol % 2) + (startRow % 2)) % 2 == 0) i = -1

    allAvailableSquares.push(universal(startCol, startRow, 3, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -3, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2*-i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2*-i, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

// bonus pieces

function triangleStrongerUnicorn(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(triangleKnight(startCol, startRow))
    allAvailableSquares.push(triangleUnicorn(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleRoshop(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(triangleBishop(startCol, startRow))
    allAvailableSquares.push(triangleRook(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleArchbishop(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(triangleKnight(startCol, startRow))
    allAvailableSquares.push(triangleBishop(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleChancellor(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(triangleRook(startCol, startRow))
    allAvailableSquares.push(triangleBishop(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleStrongerQueen(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(triangleQueen(startCol, startRow))
    allAvailableSquares.push(triangleRook(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleAmazon(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(triangleAbsoluteQueen(startCol, startRow))
    allAvailableSquares.push(triangleKnight(startCol, startRow))
    allAvailableSquares.push(triangleUnicorn(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function triangleCamel(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1 // black triangle
    if(((startCol % 2) + (startRow % 2)) % 2 == 0) i = -1 // white triangle

    allAvailableSquares.push(universal(startCol, startRow, 1, 3*i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 3*i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 5, -i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -5, -i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 4, 2*-i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -4, 2*-i, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}
//#endregion

/*  Checkers  */
//#region
function checker(startCol, startRow) {
    let allAvailableSquares = []
    let o = 1
    if(whiteTurn) o = -1
    let movements = [[1, o], [-1, o], [-1, -o], [1, -o]]
    
    let arr = []
    movements.forEach(i => {
        let squ = universal(startCol, startRow, ...i, 1)
        if(squ.length == 0) squ = undefined
        arr.push(squ)
    })
    arr = [].concat(...arr)

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] == undefined) continue
        if(getPieceFromSquare(arr[i]) != undefined && !isSquareOnEdge(arr[i])) {
            checkerIteration(i, arr[i])
        } else if(i <= 1 || (getPieceFromSquare(arr[i]) != undefined && isSquareOnEdge(arr[i]))) {
            allAvailableSquares.push([arr[i]])
        }
    }

    function checkerIteration(i, square, iter = 0, piecesToTake = []) {
        let startSqu = universal(...getCordsOfSquare(square), ...movements[i], 1, true)[0]
        let piecee = getPieceFromSquare(square)
        if(startSqu == undefined || (getPieceFromSquare(startSqu) != undefined
        && getPieceFromSquare(startSqu) != clickedOn) || piecesToTake.includes(piecee)) return
        if(getPieceFromSquare(startSqu) != clickedOn)
            clickedOn.style.pointerEvents = 'none'
            addPointerEventsAgain = clickedOn
        if(iter == 0) {
            allAvailableSquares.push([])
        } else if(iter < allAvailableSquares[allAvailableSquares.length-1].length) {
            let arr = []
            for(let p = 0; p < iter; p++) {
                arr.push(allAvailableSquares[allAvailableSquares.length-1][p])
            }
            allAvailableSquares.push(arr)
        }
        piecesToTake.push(piecee)
        allAvailableSquares[allAvailableSquares.length-1].push(startSqu)
        if((whiteTurn && startSqu.getAttribute('row') == promotionRow
        || (!whiteTurn && startSqu.getAttribute('row') == columns[startSqu.parentElement.getAttribute('col')-1].children.length - (promotionRow-1)))) return

        for(let j = 0; j < movements.length; j++) {
            if(Math.abs(i - j) == 2) continue
            let squAround = universal(...getCordsOfSquare(startSqu), ...movements[j], 1)[0]
            if(getPieceFromSquare(squAround) != undefined)
                checkerIteration(j, squAround, iter+1, piecesToTake)
        }
    }

    return allAvailableSquares
}

function checkerQueen(startCol, startRow) {
    let allAvailableSquares = []
    let o = 1
    if(whiteTurn) o = -1
    let movements = [[1, o], [-1, o], [-1, -o], [1, -o]]
    
    let arr = []
    movements.forEach(i => {
        arr.push(universal(startCol, startRow, ...i, 0))
    })

    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr[i].length; j++) {
            if(getPieceFromSquare(arr[i][j]) != undefined && !isSquareOnEdge(arr[i][j])) {
                checkerIteration(i, arr[i][j])
            } else {
                allAvailableSquares.push([arr[i][j]])
            }
        }
    }

    function checkerIteration(i, square, iter = 0, piecesToTake = []) {
        let startSqu = universal(...getCordsOfSquare(square), ...movements[i], 0, true)
        let piecee = getPieceFromSquare(square)
        while(piecesToTake.includes(piecee)) {
            startSqu = universal(...getCordsOfSquare(startSqu[0]), ...movements[i], 0)
            for(let o = 0; o < startSqu.length; o++) {
                if(getPieceFromSquare(startSqu[o]) != undefined
                && getPieceFromSquare(startSqu[o]) != clickedOn) {
                    square = startSqu[o]
                    piecee = getPieceFromSquare(square)
                    break
                }
            }
            if(startSqu.length == 0 || isSquareOnEdge(startSqu[startSqu.length-1]) == true) return
        }
        for(let o = 0; o < startSqu.length; o++) {
            if(startSqu[o] == undefined || (getPieceFromSquare(startSqu[o]) != undefined
            && getPieceFromSquare(startSqu[o]) != clickedOn)) continue
            if(getPieceFromSquare(startSqu[o]) != clickedOn)
                clickedOn.style.pointerEvents = 'none'
                addPointerEventsAgain = clickedOn
            if(iter == 0) {
                allAvailableSquares.push([])
                piecesToTake = []
            } else if(o > 1 || iter < allAvailableSquares[allAvailableSquares.length-1].length) {
                let arr = []
                for(let p = 0; p < iter; p++) {
                    arr.push(allAvailableSquares[allAvailableSquares.length-1][p])
                }
                allAvailableSquares.push(arr)
                piecesToTake.pop()
            }
            allAvailableSquares[allAvailableSquares.length-1].push(startSqu[o])
            if(!piecesToTake.includes(piecee)) piecesToTake.push(piecee)

            for(let j = 0; j < movements.length; j++) {
                if(Math.abs(i - j) == 2) continue
                let squAround = universal(...getCordsOfSquare(startSqu[o]), ...movements[j], 0)
                for(let k = 0; k < squAround.length; k++) {
                    if(getPieceFromSquare(squAround[k]) != undefined)
                        checkerIteration(j, squAround[k], iter+1, piecesToTake)
                }
            }
        }
    }
    return allAvailableSquares
}

//#endregion

/*  Massive  */
//#region
function indexOfItemInArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][0] == item[0] && array[i][1] == item[1]) {
            return i
        }
    }
    return -1
}

function getRelaPositionsOfPieces(arr, not = clickedOn) {
    let movementsToCheck = []
    let oldCords = getCordsOfPiece(not)
    arr.forEach(part => {
        if(not != part) {
            let otherPartCords = getCordsOfPiece(part)
            movementsToCheck.push([otherPartCords[0] - oldCords[0], otherPartCords[1] - oldCords[1]])
        }
    })
    return movementsToCheck
}

function makeSpaceForOtherParts(allAvailableSquares) {
    if(allPieceParts.length <= 1) return allAvailableSquares
    let movementsToCheck = getRelaPositionsOfPieces(allPieceParts)
    for(let o = 0; o < allAvailableSquares.length; o++) {
        for(let j = 0; j < movementsToCheck.length; j++) {
            let squareOnTheWay = universal(...getCordsOfSquare(allAvailableSquares[o]), ...movementsToCheck[j], 1, true)[0]
            let pieceOnTheWay = getPieceFromSquare(squareOnTheWay)
            if(squareOnTheWay == undefined || (pieceOnTheWay != undefined && !allPieceParts.includes(pieceOnTheWay)
            && isPieceWhite(pieceOnTheWay) == whiteTurn && ability != 'cannibalism')) {
                allAvailableSquares.splice(o--, 1)
                break
            }
        }
    }
    return allAvailableSquares
}

function cutOffWhereOtherPartsOnTheWay(allAvailableSquares, movements) {
    let otherPartAvailableSquares = []
    for (let i = 0; i < allPieceParts.length; i++) {
        if(allPieceParts[i] != clickedOn) {
            otherPartAvailableSquares.push(window[getImgFileName(allPieceParts[i])](...getCordsOfPiece(allPieceParts[i]), true))
        }
    }
    if(otherPartAvailableSquares.length > 0) {
        for (let j = 0; j < otherPartAvailableSquares.length; j++) {
            for (let i = 0; i < allAvailableSquares.length; i++) {
                if(movements != undefined) {
                    let piece = getPieceFromSquare(universal(...getCordsOfPiece(allPieceParts[j]), ...movements[i % movements.length], 1, true)[0])
                    if(otherPartAvailableSquares[j][i].length == 0 && (allPieceParts.includes(piece) || piece == undefined)) {
                        continue
                    }
                }
                let iters = allAvailableSquares[i].length - otherPartAvailableSquares[j][i].length
                for (let j = 0; j < iters; j++) {
                    allAvailableSquares[i].pop()
                }
            }
        }
    }
    return allAvailableSquares
}


// pawn
function massivePawn(startCol, startRow, takeNoPiece = false) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    let moves = universal(startCol, startRow, 0, i, 7)
    if(moves[0] != undefined && getPieceFromSquare(moves[0]) == undefined && !takeNoPiece) {
        allAvailableSquares.push(moves[0])
        if(moves[1] != undefined && getPieceFromSquare(moves[1]) == undefined && !takeNoPiece) {
            allAvailableSquares.push(moves[1])
            if(((startRow <= startingRow && !whiteTurn) || (startRow >= columns[0].children.length - (startingRow - 1) && whiteTurn))) {
                for(let i = 1; i < moves.length; i++) {
                    if(moves[i] != undefined && getPieceFromSquare(moves[i]) == undefined) {
                        allAvailableSquares.push(moves[i])
                    } else {
                        break
                    }
                }
            }
        }
    }

    let takes = []
    takes.push(universal(startCol, startRow, 1, i, 1))
    takes.push(universal(startCol, startRow, -1, i, 1))
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && (isPieceWhite(getPieceFromSquare(take)) == !whiteTurn || takeNoPiece)) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    let enpassants = []
    enpassants.push(universal(startCol, startRow, 1, 0, 1))
    enpassants.push(universal(startCol, startRow, -1, 0, 1))
    enpassants = [].concat(...enpassants)

    let iter = 0
    enpassants.forEach(i => {
        if(i != undefined && isPieceWhite(getPieceFromSquare(i)) == !whiteTurn
        && pawnLikePieces.includes(getImgFileName(getPieceFromSquare(i)))) {
            enpassant.push(getPieceFromSquare(i))
            
            let lastHistMention
            for(let j = currentMove-2; j > 0; j--) {
                if(parseInt(histor[j][2]) == getPieceId(enpassant)) {
                    lastHistMention = j
                    break
                }
            }
            if(getPieceId(enpassant) == histor[histor.length-1][2]
            && (getPieceFromSquare(takes[iter]) == undefined
            || pawnLikePieces.includes(getImgFileName(getPieceFromSquare(takes[iter]))))
            && (histor[histor.length-1][1] - histor[lastHistMention][1] >= 7
            || histor[lastHistMention][1] - histor[histor.length-1][1] >= 7)) {
                takingWithEnPassant = true
                allAvailableSquares.push(takes[iter])
            }
        }
        iter++
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

// rook
function massiveRookLeft(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[-1, 0], [0, -1], [1, 0], [0, 1]]
    
    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 0))
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn], allPieceParts[1])
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        allAvailableSquares[indexOfItemInArray(movements, [relaCords[0][0] * -1, relaCords[0][1] * -1])] = universal(startCol, startRow, relaCords[0][0] * -1, relaCords[0][1] * -1, 0)
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])] = universal(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1], ...relaCords[0], 0)
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1]))
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massiveRookRight(startCol, startRow, getFractured = false) {
    return massiveRookLeft(startCol, startRow, getFractured)
}

// bishop
function massiveBishopLeft(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[-1, -1], [1, -1], [1, 1], [-1, 1]]

    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 0))
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn], allPieceParts[1])
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        allAvailableSquares[indexOfItemInArray(movements, [relaCords[0][0] * -1, relaCords[0][1] * -1])] = universal(startCol, startRow, relaCords[0][0] * -1, relaCords[0][1] * -1, 0)
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])] = universal(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1], ...relaCords[0], 0)
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1]))
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massiveBishopRight(startCol, startRow, getFractured = false) {
    return massiveBishopLeft(startCol, startRow, getFractured)
}

// wall
function massiveWallLeft(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [1, -1], [1, 1], [-1, 1]]

    for(let i = 0; i < movements.length; i++) {
        if(i <= 3) {
            allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 2))
            if(i == 0 || i == 2) {
                let squs = [universal(startCol, startRow, ...movements[i], 1, true)[0], universal(startCol, startRow, movements[i][0] * 2, movements[i][1] * 2, 1, true)[0]]
                for (let i = 0; i < squs.length; i++) {
                    let pie = getPieceFromSquare(squs[i])
                    if(pie == undefined || allPieceParts.includes(pie)) {
                        allAvailableSquares.push(squs[i])
                    } else {
                        break
                    }
                }
            }
        } else {
            allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 1))
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveWallMiddle(startCol, startRow) {
    return massiveWallLeft(startCol, startRow)
}

function massiveWallRight(startCol, startRow) {
    return massiveWallLeft(startCol, startRow)
}

// car
function massiveCarLeft(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[2, 1], [2, -1], [1, 2], [1, -2], [-2, 1], [-2, -1], [-1, 2], [-1, -2]]

    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 0))
    }
    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(parseInt(startCol) + (movements[i][0] > 0 ? 1 : -1),
        parseInt(startRow) + (movements[i][1] > 0 ? 1 : -1), ...movements[i], 0))
        let startingSqu = universal(startCol, startRow, (movements[i][0] > 0 ? 1 : -1), (movements[i][1] > 0 ? 1 : -1), 1)[0]
        if(startingSqu != undefined) {
            allAvailableSquares[allAvailableSquares.length-1].unshift(startingSqu)
            let startingPiece = getPieceFromSquare(startingSqu)
            if(startingPiece != undefined) {
                if(isPieceWhite(startingPiece) == whiteTurn) {
                    allAvailableSquares[allAvailableSquares.length-1] = []
                } else {
                    allAvailableSquares[allAvailableSquares.length-1] = [allAvailableSquares[allAvailableSquares.length-1][0]]
                }
            }
        } else {
            allAvailableSquares[allAvailableSquares.length-1] = []
        }
    }

    for (let i = 0; i < movements.length; i++) {
        let iters = allAvailableSquares[i].length - allAvailableSquares[i+movements.length].length
        if(iters >= 0) {
            if(getPieceFromSquare(allAvailableSquares[i+movements.length][allAvailableSquares[i+movements.length].length-1]) != undefined
            && isPieceWhite(getPieceFromSquare(allAvailableSquares[i+movements.length][allAvailableSquares[i+movements.length].length-1])) != whiteTurn) {
                iters++
            }
            for (let j = 0; j < iters; j++) {
                allAvailableSquares[i].pop()
            }
        } else {
            iters = -iters
            if(getPieceFromSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]) != undefined
            && isPieceWhite(getPieceFromSquare(allAvailableSquares[i][allAvailableSquares[i].length-1])) != whiteTurn) {
                iters++
            }
            for (let j = 0; j < iters-1; j++) {
                allAvailableSquares[i+movements.length].pop()
            }
        } 
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massiveCarRight(startCol, startRow, getFractured = false) {
    return massiveCarLeft(startCol, startRow, getFractured)
}

// bear
function massiveBearLeft(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[2, 1], [2, -1], [1, 2], [1, -2], [-2, 1], [-2, -1], [-1, 2], [-1, -2]]

    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 0))
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massiveBearRight(startCol, startRow, getFractured = false) {
    return massiveBearLeft(startCol, startRow, getFractured)
}

// truck
function massiveTruckLeft(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[1, 1], [-1, 1], [-1, -1], [1, -1]]
    let movements2 = [[1, 0], [0, 1], [-1, 0], [0, -1]]

    let beginningSquares = []
    for(let i = 0; i < movements.length; i++) {
        beginningSquares.push(universal(startCol, startRow, ...movements[i], 2))
    }
    for (let i = 0; i < movements2.length; i++) {
        if(beginningSquares[i][1] != undefined) {
            for (let j = 0; j < 2; j++) {
                allAvailableSquares[allAvailableSquares.length] = [...beginningSquares[i]]
                allAvailableSquares[allAvailableSquares.length-1].push(...universal(...getCordsOfSquare(beginningSquares[i][1]), ...movements2[(i+j) % movements2.length], 2))
            }
        } else {
            allAvailableSquares[allAvailableSquares.length] = [...beginningSquares[i]]
            allAvailableSquares[allAvailableSquares.length] = []
        }
    }

    for (let i = 0; i < allAvailableSquares.length; i++) {
        for (let j = 0; true; j++) {
            if(allAvailableSquares[i].length < 4
            || (getPieceFromSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]) != undefined
            && isPieceWhite(getPieceFromSquare(allAvailableSquares[i][allAvailableSquares[i].length-1])) != whiteTurn)) break
            let squs
            if(j % 2 == 0) {
                squs = universal(...getCordsOfSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]), ...movements[Math.floor(i/2)], 2)
                allAvailableSquares[i].push(...squs)
            } else {
                squs = universal(...getCordsOfSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]), ...movements2[Math.floor(((i+1)/2)) % movements2.length], 2)
                allAvailableSquares[i].push(...squs)
            }
            if(squs.length < 2) break
        }
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn, ...allPieceParts], getPieceFromCords(startCol, startRow))
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        for (let i = 0; i < relaCords.length; i++) {
            allAvailableSquares[indexOfItemInArray(movements, [relaCords[i][0] * -1, relaCords[i][1] * -1])] = universal(startCol, startRow, relaCords[i][0] * -1, relaCords[i][1] * -1, 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])] = universal(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1], ...relaCords[i], 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1]))
        }
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massiveTruckMiddle(startCol, startRow, getFractured = false) {
    return massiveTruckLeft(startCol, startRow, getFractured)
}

function massiveTruckRight(startCol, startRow, getFractured = false) {
    return massiveTruckLeft(startCol, startRow, getFractured)
}

// king
function massiveKingLeft(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[1, 1], [1, -1], [1, 0], [-1, 0], [-1, 1], [-1, -1], [0, 1], [0, -1]]
    let movementsToCheck = getRelaPositionsOfPieces(allPieceParts)

    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 1))
    }
    for(let i = 0; i < movementsToCheck.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movementsToCheck[i], 1, true))
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveKingRight(startCol, startRow) {
    return massiveKingLeft(startCol, startRow)
}

// queen
function massiveQueenLeftTop(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[1, 1], [1, -1], [1, 0], [-1, 0], [-1, 1], [-1, -1], [0, 1], [0, -1]]

    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 0))
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn, ...allPieceParts], getPieceFromCords(startCol, startRow))
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        for (let i = 0; i < relaCords.length; i++) {
            allAvailableSquares[indexOfItemInArray(movements, [relaCords[i][0] * -1, relaCords[i][1] * -1])] = universal(startCol, startRow, relaCords[i][0] * -1, relaCords[i][1] * -1, 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])] = universal(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1], ...relaCords[i], 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1]))
        }
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);
    
    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares, movements)

    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveQueenLeftBottom(startCol, startRow, getFractured = false) {
    return massiveQueenLeftTop(startCol, startRow, getFractured)
}

function massiveQueenRightTop(startCol, startRow, getFractured = false) {
    return massiveQueenLeftTop(startCol, startRow, getFractured)
}

function massiveQueenRightBottom(startCol, startRow, getFractured = false) {
    return massiveQueenLeftTop(startCol, startRow, getFractured)
}

// hippo
function massiveHippoLeft(startCol, startRow) {
    let allAvailableSquares = []
    let i = -1
    if(whiteTurn) i = 1
    let movements = [[-3*i, -i], [-i, -3*i], [i, -3*i], [3*i, -i], [3*i, i], [i, 3*i], [-i, 3*i], [-3*i, i]]

    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 1))
    }
    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)

    let allAvailableSquaresLen = allAvailableSquares.length

    for (let j = 0; j < allAvailableSquaresLen; j++) {
        for(let i = j; i < j+2; i++) {
            allAvailableSquares.push(universal(...getCordsOfSquare(allAvailableSquares[j]), ...movements[i % movements.length], 1))
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveHippoRight(startCol, startRow) {
    return massiveHippoLeft(startCol, startRow)
}

// alligator
function massiveAlligatorLeft(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[-1, 0], [1, 0], [0, -1], [0, 1]]

    for(let i = 0; i < movements.length / 2; i++) {
        let squs = [universal(startCol, startRow, ...movements[i], 1, true)[0], universal(startCol, startRow, movements[i][0] * 2, movements[i][1] * 2, 1, true)[0],
        ...universal(parseInt(startCol) + movements[i][0] * 2, parseInt(startRow) + movements[i][1] * 2, ...movements[i], 0)]
        allAvailableSquares.push([])
        for (let i = 0; i < squs.length; i++) {
            let pie = getPieceFromSquare(squs[i])
            if(pie == undefined || allPieceParts.includes(pie) || (i == 0 && isPieceWhite(pie) != whiteTurn)) {
                allAvailableSquares[allAvailableSquares.length-1].push(squs[i])
            } else {
                break
            }
        }
    }
    for(let i = 0; i < movements.length / 2; i++) {
        if(allAvailableSquares[i][2] != undefined) {
            for(let j = 0; j < 2; j++) {
                allAvailableSquares.push(universal(...getCordsOfSquare(allAvailableSquares[i][2]), ...movements[j+2], 0))
            }
        }
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn, ...allPieceParts], getPieceFromCords(startCol, startRow))
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        for (let i = 0; i < relaCords.length; i++) {
            allAvailableSquares[indexOfItemInArray(movements, [relaCords[i][0] * -1, relaCords[i][1] * -1])] = universal(startCol, startRow, relaCords[i][0] * -1, relaCords[i][1] * -1, 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])] = universal(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1], ...relaCords[i], 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1]))
        }
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    for(let i = 0; i < movements.length / 2; i++) {
        let squs = [universal(startCol, startRow, ...movements[i], 1, true)[0], universal(startCol, startRow, movements[i][0] * 2, movements[i][1] * 2, 1, true)[0],
        ...universal(parseInt(startCol) + movements[i][0] * 2, parseInt(startRow) + movements[i][1] * 2, ...movements[i], 0)]
        allAvailableSquares.push([])
        for (let i = 0; i < squs.length; i++) {
            let pie = getPieceFromSquare(squs[i])
            if(pie == undefined || allPieceParts.includes(pie)) {
                allAvailableSquares[allAvailableSquares.length-1].push(squs[i])
            } else {
                break
            }
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = allAvailableSquares.filter((square) => square != undefined)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveAlligatorMiddle(startCol, startRow, getFractured = false) {
    return massiveAlligatorLeft(startCol, startRow, getFractured)
}

function massiveAlligatorRight(startCol, startRow, getFractured = false) {
    return massiveAlligatorLeft(startCol, startRow, getFractured)
}

// kangaroo
function massiveKangarooTop(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    allAvailableSquares.length = 8
    let movements = [[-2, -1], [-1, -2], [-2, 1], [-1, 2], [1, -2], [2, -1], [1, 2], [2, 1]]
    let movements2 = [[-3, -1], [-1, -3], [-3, 1], [-1, 3], [1, -3], [3, -1], [1, 3], [3, 1]]

    for (let i = 0; i < allAvailableSquares.length; i++) {
        for (let j = 0; true; j++) {
            if(allAvailableSquares[i] != undefined
            && allAvailableSquares[i][allAvailableSquares[i].length-1] != undefined
            && getPieceFromSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]) != undefined
            && isPieceWhite(getPieceFromSquare(allAvailableSquares[i][allAvailableSquares[i].length-1])) != whiteTurn) break
            let squs
            if(j % 2 == 0) {
                if(allAvailableSquares[i] == undefined || allAvailableSquares[i][allAvailableSquares[i].length-1] == undefined) {
                    squs = universal(startCol, startRow, ...movements[i], 1)
                } else {
                    squs = universal(...getCordsOfSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]), ...movements[i], 1)
                }
                if(allAvailableSquares[i] == undefined) {
                    allAvailableSquares[i] = []
                }
                allAvailableSquares[i].push(...squs)
            } else {
                squs = universal(...getCordsOfSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]), ...movements2[i], 1)
                allAvailableSquares[i].push(...squs)
            }
            if(squs.length == 0) break
        }
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn], allPieceParts[1])
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        allAvailableSquares[indexOfItemInArray(movements, [relaCords[0][0] * -1, relaCords[0][1] * -1])] = universal(startCol, startRow, relaCords[0][0] * -1, relaCords[0][1] * -1, 0)
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])] = universal(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1], ...relaCords[0], 0)
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1]))
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massiveKangarooBottom(startCol, startRow, getFractured = false) {
    return massiveKangarooTop(startCol, startRow, getFractured)
}


// 2.0

// orangutan
function massiveOrangutanLeftTop(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[1, 0], [0, -1], [-1, 0], [0, 1]]
    let movements2 = [[1, 1], [1, -1], [-1, -1], [-1, 1]]

    let beginningSquares = []
    for(let i = 0; i < movements.length; i++) {
        beginningSquares.push(universal(startCol, startRow, ...movements[i], 4))
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn, ...allPieceParts], getPieceFromCords(startCol, startRow))
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        for (let i = 0; i < relaCords.length; i++) {
            beginningSquares[indexOfItemInArray(movements, relaCords[i])] = universal(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1], ...relaCords[i], 4 - (relaCords[i][0] != 0 || relaCords[i][1] != 0 ? 1 : 0))
            beginningSquares[indexOfItemInArray(movements, relaCords[i])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1]))
        }
    }

    for (let i = 0; i < movements2.length; i++) {
        if(beginningSquares[i][3] != undefined) {
            for (let j = 0; j < 2; j++) {
                allAvailableSquares[allAvailableSquares.length] = [...beginningSquares[i]]
                allAvailableSquares[allAvailableSquares.length-1].push(...universal(...getCordsOfSquare(beginningSquares[i][3]), ...movements2[(i+j) % movements2.length], 0))
            }
        } else {
            allAvailableSquares[allAvailableSquares.length] = [...beginningSquares[i]]
            allAvailableSquares[allAvailableSquares.length] = []
        }
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);
    
    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares, movements)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massiveOrangutanLeftBottom(startCol, startRow, getFractured = false) {
    return massiveOrangutanLeftTop(startCol, startRow, getFractured)
}

function massiveOrangutanRightTop(startCol, startRow, getFractured = false) {
    return massiveOrangutanLeftTop(startCol, startRow, getFractured)
}

function massiveOrangutanRightBottom(startCol, startRow, getFractured = false) {
    return massiveOrangutanLeftTop(startCol, startRow, getFractured)
}

// knight
function massiveKnightLeftTop(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[-2, -4], [-4, -2], [4, -2], [2, -4], [2, 4], [4, 2], [-4, 2], [-2, 4]]

    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 1))
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveKnightLeftBottom(startCol, startRow) {
    return massiveKnightLeftTop(startCol, startRow)
}

function massiveKnightRightTop(startCol, startRow) {
    return massiveKnightLeftTop(startCol, startRow)
}

function massiveKnightRightBottom(startCol, startRow) {
    return massiveKnightLeftTop(startCol, startRow)
}

// megatruck
function massiveMegatruckLeft(startCol, startRow, getFractured = false) {
    return massiveTruckLeft(startCol, startRow, getFractured)
}

function massiveMegatruckMiddleLeft(startCol, startRow, getFractured = false) {
    return massiveTruckLeft(startCol, startRow, getFractured)
}

function massiveMegatruckMiddleRight(startCol, startRow, getFractured = false) {
    return massiveTruckLeft(startCol, startRow, getFractured)
}

function massiveMegatruckRight(startCol, startRow, getFractured = false) {
    return massiveTruckLeft(startCol, startRow, getFractured)
}

// whale
function massiveWhaleLeftTop(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[-3, -1], [-1, -3], [1, -3], [3, -1], [3, 1], [1, 3], [-1, 3], [-3, 1]]
    let movements2 = [[-1, 0], [0, -1], [1, 0], [0, 1]]  

    for (let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 1))
    }
    for(let i = 0; i < movements.length; i++) {
        if(allAvailableSquares[i][0] != undefined
        && isPieceWhite(getPieceFromSquare(allAvailableSquares[i][0])) != whiteTurn) {
            allAvailableSquares[i].push(...universal(...getCordsOfSquare(allAvailableSquares[i][0]), ...movements2[Math.floor((i+1)/2) % movements2.length], 0))
        }
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn, ...allPieceParts], getPieceFromCords(startCol, startRow))
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        for (let i = 0; i < relaCords.length; i++) {
            allAvailableSquares[indexOfItemInArray(movements, [relaCords[i][0] * -1, relaCords[i][1] * -1])] = universal(startCol, startRow, relaCords[i][0] * -1, relaCords[i][1] * -1, 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])] = universal(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1], ...relaCords[i], 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1]))
        }
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);
    
    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares, movements)

    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveWhaleMiddleTop(startCol, startRow, getFractured = false) {
    return massiveWhaleLeftTop(startCol, startRow, getFractured)
}

function massiveWhaleRightTop(startCol, startRow, getFractured = false) {
    return massiveWhaleLeftTop(startCol, startRow, getFractured)
}

function massiveWhaleLeftBottom(startCol, startRow, getFractured = false) {
    return massiveWhaleLeftTop(startCol, startRow, getFractured)
}

function massiveWhaleMiddleBottom(startCol, startRow, getFractured = false) {
    return massiveWhaleLeftTop(startCol, startRow, getFractured)
}

function massiveWhaleRightBottom(startCol, startRow, getFractured = false) {
    return massiveWhaleLeftTop(startCol, startRow, getFractured)
}

// moon
function massiveMoonLeftTop(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[-1, -1], [-1, 1], [1, 1], [1, -1]]

    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 0))
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn, ...allPieceParts], getPieceFromCords(startCol, startRow))
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        for (let i = 0; i < relaCords.length; i++) {
            allAvailableSquares[indexOfItemInArray(movements, [relaCords[i][0] * -1, relaCords[i][1] * -1])] = universal(startCol, startRow, relaCords[i][0] * -1, relaCords[i][1] * -1, 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])] = universal(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1], ...relaCords[i], 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1]))
        }
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares, movements)

    for (let i = 0; i < allAvailableSquares.length; i++) {
        let allLength = allAvailableSquares[i].length
        for (let j = 1; j < allLength; j+=2) {
            allAvailableSquares[i].push(...universal(...getCordsOfSquare(allAvailableSquares[i][j]), ...movements[(i+1) % movements.length], 1))
            allAvailableSquares[i].push(...universal(...getCordsOfSquare(allAvailableSquares[i][j]), ...movements[(i-1+movements.length) % movements.length], 1))
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveMoonLeftBottom(startCol, startRow, getFractured = false) {
    return massiveMoonLeftTop(startCol, startRow, getFractured)
}

function massiveMoonRightTop(startCol, startRow, getFractured = false) {
    return massiveMoonLeftTop(startCol, startRow, getFractured)
}

function massiveMoonRightBottom(startCol, startRow, getFractured = false) {
    return massiveMoonLeftTop(startCol, startRow, getFractured)
}

// elephant
function massiveElephantLeftTop(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[-5, 5], [-5, -5], [5, 5], [5, -5]]

    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 1))
    }
    
    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveElephantLeftBottom(startCol, startRow) {
    return massiveElephantLeftTop(startCol, startRow)
}

function massiveElephantRightTop(startCol, startRow) {
    return massiveElephantLeftTop(startCol, startRow)
}

function massiveElephantRightBottom(startCol, startRow) {
    return massiveElephantLeftTop(startCol, startRow)
}

// mars
function massiveMarsLeftTop(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    allAvailableSquares.length = 8
    let movements = [[-2, -1], [-1, -2], [-2, 1], [-1, 2], [1, -2], [2, -1], [1, 2], [2, 1]]
    let movements2 = [[-1, -2], [-2, -1], [-1, 2], [-2, 1], [2, -1], [1, -2], [2, 1], [1, 2]]

    for (let i = 0; i < allAvailableSquares.length; i++) {
        for (let j = 0; true; j++) {
            if(allAvailableSquares[i] != undefined
            && allAvailableSquares[i][allAvailableSquares[i].length-1] != undefined
            && getPieceFromSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]) != undefined
            && isPieceWhite(getPieceFromSquare(allAvailableSquares[i][allAvailableSquares[i].length-1])) != whiteTurn) break
            let squs
            if(j % 2 == 0) {
                if(allAvailableSquares[i] == undefined || allAvailableSquares[i][allAvailableSquares[i].length-1] == undefined) {
                    squs = universal(startCol, startRow, ...movements[i], 1)
                } else {
                    squs = universal(...getCordsOfSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]), ...movements[i], 1)
                }
                if(allAvailableSquares[i] == undefined) {
                    allAvailableSquares[i] = []
                }
                allAvailableSquares[i].push(...squs)
            } else {
                squs = universal(...getCordsOfSquare(allAvailableSquares[i][allAvailableSquares[i].length-1]), ...movements2[i], 1)
                allAvailableSquares[i].push(...squs)
            }
            if(squs.length == 0) break
        }
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares, movements)

    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveMarsLeftBottom(startCol, startRow, getFractured = false) {
    return massiveMarsLeftTop(startCol, startRow, getFractured)
}

function massiveMarsRightTop(startCol, startRow, getFractured = false) {
    return massiveMarsLeftTop(startCol, startRow, getFractured)
}

function massiveMarsRightBottom(startCol, startRow, getFractured = false) {
    return massiveMarsLeftTop(startCol, startRow, getFractured)
}

// pin
function massivePinTop(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[-2, 0], [0, -2], [2, 0], [0, 2]]
    
    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 0))
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn, ...allPieceParts], getPieceFromCords(startCol, startRow))
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        allAvailableSquares[indexOfItemInArray(movements, [relaCords[0][0] * -1, relaCords[0][1] * -1])] = universal(startCol, startRow, relaCords[0][0] * -1, relaCords[0][1] * -1, 0)
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])] = universal(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1], ...relaCords[0], 0)
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1]))
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massivePinBottom(startCol, startRow, getFractured = false) {
    return massivePinTop(startCol, startRow, getFractured)
}

// lamp
function massiveLampTop(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[-1, 0], [0, -1], [1, 0], [0, 1]]
    
    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 0))
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn, ...allPieceParts], getPieceFromCords(startCol, startRow))
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        for (let i = 0; i < relaCords.length; i++) {
            allAvailableSquares[indexOfItemInArray(movements, [relaCords[i][0] * -1, relaCords[i][1] * -1])] = universal(startCol, startRow, relaCords[i][0] * -1, relaCords[i][1] * -1, 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])] = universal(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1], ...relaCords[i], 0)
            allAvailableSquares[indexOfItemInArray(movements, relaCords[i])].unshift(getSquareFromCords(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1]))
        }
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    for (let i = 0; i < allAvailableSquares.length; i++) {
        let allLength = allAvailableSquares[i].length
        for (let j = 3; j < allLength; j+=4) {
            allAvailableSquares[i].push(...universal(...getCordsOfSquare(allAvailableSquares[i][j]), ...movements[(i+1) % movements.length], 1))
            allAvailableSquares[i].push(...universal(...getCordsOfSquare(allAvailableSquares[i][j]), ...movements[(i-1+movements.length) % movements.length], 1))
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function massiveLampBottom(startCol, startRow, getFractured = false) {
    return massiveLampTop(startCol, startRow, getFractured)
}

// jupiter
function massiveJupiterLeftTop(startCol, startRow, getFractured = false) {
    let allAvailableSquares = []
    let movements = [[-1, 0], [0, -1], [1, 0], [0, 1], [-3, -3], [3, -3], [3, 3], [-3, 3]]

    for (let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], 0))
    }

    if(allPieceParts.length > 1) {
        let relaCords
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn, ...allPieceParts], getPieceFromCords(startCol, startRow))
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        relaCords = relaCords.filter(function(cords) {
            return cords.includes(0);
        });
        for (let i = 0; i < relaCords.length; i++) {
            for (let j = 0; j < relaCords.length; j++) {
                if((relaCords[i][0] != 0 && Math.abs(relaCords[i][0]) < Math.abs(relaCords[j][0]))
                || (relaCords[i][1] != 0 && Math.abs(relaCords[i][1]) < Math.abs(relaCords[j][1]))) {
                    relaCords.splice(i--, 1)
                    break
                }
            }
        }
        for (let i = 0; i < relaCords.length; i++) {
            let index = indexOfItemInArray(movements, relaCords[i])
            if(index == -1) {
                index = indexOfItemInArray(movements, [relaCords[i][0] / 2, relaCords[i][1] / 2])
                allAvailableSquares[index] = universal(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1], relaCords[i][0] / 2, relaCords[i][1] / 2, 0)
                allAvailableSquares[index].unshift(getSquareFromCords(parseInt(startCol) + relaCords[i][0] / 2, parseInt(startRow) + relaCords[i][1] / 2))
            } else {
                allAvailableSquares[index] = universal(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1], ...relaCords[i], 0)
            }
            allAvailableSquares[index].unshift(getSquareFromCords(parseInt(startCol) + relaCords[i][0], parseInt(startRow) + relaCords[i][1]))
        }
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);
    
    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares, movements)

    allAvailableSquares = [].concat(...allAvailableSquares)
    allAvailableSquares = makeSpaceForOtherParts(allAvailableSquares)
    return allAvailableSquares
}

function massiveJupiterMiddleTop(startCol, startRow, getFractured = false) {
    return massiveJupiterLeftTop(startCol, startRow, getFractured)
}

function massiveJupiterRightTop(startCol, startRow, getFractured = false) {
    return massiveJupiterLeftTop(startCol, startRow, getFractured)
}

function massiveJupiterLeftMiddle(startCol, startRow, getFractured = false) {
    return massiveJupiterLeftTop(startCol, startRow, getFractured)
}

function massiveJupiterMiddleMiddle(startCol, startRow, getFractured = false) {
    return massiveJupiterLeftTop(startCol, startRow, getFractured)
}

function massiveJupiterRightMiddle(startCol, startRow, getFractured = false) {
    return massiveJupiterLeftTop(startCol, startRow, getFractured)
}

function massiveJupiterLeftBottom(startCol, startRow, getFractured = false) {
    return massiveJupiterLeftTop(startCol, startRow, getFractured)
}

function massiveJupiterMiddleBottom(startCol, startRow, getFractured = false) {
    return massiveJupiterLeftTop(startCol, startRow, getFractured)
}

function massiveJupiterRightBottom(startCol, startRow, getFractured = false) {
    return massiveJupiterLeftTop(startCol, startRow, getFractured)
}



//#endregion

/*  Lava Update  */
//#region
function lavaPawn(startCol, startRow, takeNoPiece = false) {
    return pawn(startCol, startRow, takeNoPiece)
}

function lavaKnight(startCol, startRow) {
    return knight(startCol, startRow)
}

function lavaBishop(startCol, startRow) {
    return bishop(startCol, startRow)
}

function lavaRook(startCol, startRow) {
    return rook(startCol, startRow)
}

function lavaQueen(startCol, startRow) {
    return queen(startCol, startRow)
}

function lavaKing(startCol, startRow) {
    return king(startCol, startRow)
}

// Burnt Lava

function burntLavaPawn(startCol, startRow, takeNoPiece = false) {
    return pawn(startCol, startRow, takeNoPiece)
}

function burntLavaKnight(startCol, startRow) {
    return knight(startCol, startRow)
}

function burntLavaBishop(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 3))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function burntLavaRook(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 3))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 3))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function burntLavaQueen(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 3))

    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 3))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 3))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 3))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 3))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

// Abilities

function lavaAbilityPawn() {
    let cords = getCordsOfPiece(clickedOn)
    manageLavaEntities()
    let square = getSquareFromCords(cords[0], parseInt(cords[1]) + (!whiteTurn ? 1 : -1))
    capturePiece(clickedOn)
    histor.push([undefined, undefined, getPieceId(clickedOn)])
    histor[histor.length-1][3] = {
        ...histor[histor.length-1][3],
        lavaAppears: [[square, 0]],
        capturedPieces: [clickedOn]
    }
    spawnEntity(square, 'lava', 0, 2)
    currentMove++
    fire.play()
    endOfTurn()
}

function lavaAbilityKnight() {
    manageLavaEntities()
    histor.push([undefined, undefined, getPieceId(clickedOn)])
    let square = getSquareFromPiece(clickedOn)
    spawnEntity(square, 'fire', 0)
    if(clickedOnImgName.includes('burnt')) {
        capturePiece(clickedOn)
        if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].capturedPieces != undefined) {
            histor[histor.length-1][3].capturedPieces.push(clickedOn)
        } else {
            histor[histor.length-1][3] = {
                ...histor[histor.length-1][3],
                capturedPieces: [clickedOn]
            }
        }
    } else {
        goToHell(clickedOn)
    }
    if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].fireAppears != undefined) {
        histor[histor.length-1][3].fireAppears.push([square, 0])
    } else {
        histor[histor.length-1][3] = {
            ...histor[histor.length-1][3],
            fireAppears: [[square, 0]]
        }
    }
    currentMove++
    fire.play()
    endOfTurn()
}

function lavaAbilityQueen(justGet = false) {
    let allSquares = []
    let startCords = getCordsOfPiece(clickedOn)
    allSquares.push(universal(...startCords, 1, 1, 0))
    allSquares.push(universal(...startCords, 1, -1, 0))
    allSquares.push(universal(...startCords, -1, 1, 0))
    allSquares.push(universal(...startCords, -1, -1, 0))
    allSquares.push(universal(...startCords, 1, 0, 0))
    allSquares.push(universal(...startCords, -1, 0, 0))
    allSquares.push(universal(...startCords, 0, 1, 0))
    allSquares.push(universal(...startCords, 0, -1, 0))

    for (let i = 0; i < allSquares.length; i++) {
        if(allSquares[i].length > 0 && (!inCheck || allSquares[i].includes(getSquareFromPiece(checkingPiece)))
        && (pieceAboutToCheck == undefined || allSquares[i].includes(getSquareFromPiece(pieceAboutToCheck)))) {
            allSquares[i] = allSquares[i][allSquares[i].length-1]
        } else {
            allSquares.splice(i--, 1)
        }
    }

    if(justGet == true) return allSquares

    squares.forEach(i => {
        i.classList.remove('clicked')
        i.classList.remove('right-clicked')
        i.classList.remove('can-go')
        i.classList.remove('without-moving')
        i.removeEventListener('dragover', squareDragOver)
        i.removeEventListener('click', squareClick)
        i.addEventListener('click', deleteSquareThings)
    })
    allSquares.forEach(i => {
        i.classList.add('can-go')
        i.addEventListener('click', queenPlaceLava)
        i.removeEventListener('click', deleteSquareThings)
    })
    canGo = allSquares
}

function queenPlaceLava(e) {
    let squaresInBetween = getSquaresInBetween(getCordsOfPiece(clickedOn), getCordsOfSquare(e.target))
    histor.push([undefined, undefined, getPieceId(clickedOn)])
    manageLavaEntities()
    for (let i = 0; i < squaresInBetween.length; i++) {
        spawnEntity(squaresInBetween[i], 'lava', -1, 2)
        if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].lavaAppears != undefined) {
            histor[histor.length-1][3].lavaAppears.push([squaresInBetween[i], -1])
        } else {
            histor[histor.length-1][3] = {
                ...histor[histor.length-1][3],
                lavaAppears: [[squaresInBetween[i], -1]]
            }
        }
    }
    currentMove++
    fire.play()
    canGo.forEach(i => {
        i.removeEventListener('click', queenPlaceLava)
    })
    goToHell(clickedOn)
    endOfTurn()
}

function lavaAbilityKing(justGet = false, piece = clickedOn) {
    let allSquares = []
    let startCords = getCordsOfPiece(piece)
    allSquares.push(universal(...startCords, 1, 1, 2))
    allSquares.push(universal(...startCords, 1, -1, 2))
    allSquares.push(universal(...startCords, -1, 1, 2))
    allSquares.push(universal(...startCords, -1, -1, 2))
    allSquares.push(universal(...startCords, 1, 0, 2))
    allSquares.push(universal(...startCords, -1, 0, 2))
    allSquares.push(universal(...startCords, 0, 1, 2))
    allSquares.push(universal(...startCords, 0, -1, 2))
    allSquares = [].concat(...allSquares)

    if(justGet == true) return allSquares

    if(inCheck) {
        allSquares = [getSquareFromPiece(checkingPiece)]
    }

    squares.forEach(i => {
        i.classList.remove('clicked')
        i.classList.remove('right-clicked')
        i.classList.remove('can-go')
        i.classList.remove('without-moving')
        i.removeEventListener('dragover', squareDragOver)
        i.removeEventListener('click', squareClick)
        i.addEventListener('click', deleteSquareThings)
    })
    allSquares.forEach(i => {
        i.classList.add('can-go')
        i.addEventListener('click', kingPlaceLava)
        i.removeEventListener('click', deleteSquareThings)
    })
    canGo = allSquares
}

function kingPlaceLava(e) {
    histor.push([undefined, undefined, getPieceId(clickedOn)])
    manageLavaEntities()
    spawnEntity(e.target, 'lava', -1, 2)
    histor[histor.length-1][3] = {
        ...histor[histor.length-1][3],
        lavaAppears: [[e.target, -1]]
    }
    currentMove++
    fire.play()
    canGo.forEach(i => {
        i.removeEventListener('click', kingPlaceLava)
    })
    clickedOn.setAttribute('lavaAbilityUses', clickedOn.getAttribute('lavaAbilityUses')-1)
    endOfTurn()
}
//#endregion

/*  Evolving Pieces  */
//#region
function megaPawn(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1
    let movements = [[0, i], [1, i], [-1, i]]

    movements.forEach(move => {
        let moves = universal(startCol, startRow, ...move, 2)
        if(moves[0] != undefined) {
            allAvailableSquares.push(moves[0])
            if(((startRow <= startingRow && !whiteTurn) || (startRow >= columns[0].children.length - (startingRow - 1) && whiteTurn))
            && moves[1] != undefined) {
                allAvailableSquares.push(moves[1])
            }
        }
    })

    let takes = []
    takes.push(universal(startCol, startRow, 1, i, 1))
    takes.push(universal(startCol, startRow, -1, i, 1))
    takes = [].concat(...takes)

    let enpassants = []
    enpassants.push(universal(startCol, startRow, 1, 0, 1))
    enpassants.push(universal(startCol, startRow, -1, 0, 1))
    enpassants = [].concat(...enpassants)

    let iter = 0
    enpassants.forEach(i => {
        if(i != undefined && isPieceWhite(getPieceFromSquare(i)) == !whiteTurn
        && pawnLikePieces.includes(getImgFileName(getPieceFromSquare(i)))) {
            enpassant.push(getPieceFromSquare(i))
            
            let lastHistMention
            for(let j = currentMove-2; j > 0; j--) {
                if(parseInt(histor[j][2]) == getPieceId(getPieceFromSquare(i))) {
                    lastHistMention = j
                    break
                }
            }
            if(getPieceId(getPieceFromSquare(i)) == histor[histor.length-1][2]
            && (getPieceFromSquare(takes[iter]) == undefined
            || pawnLikePieces.includes(getImgFileName(getPieceFromSquare(takes[iter]))))
            && (histor[histor.length-1][1] - histor[lastHistMention][1] >= 2
            || histor[lastHistMention][1] - histor[histor.length-1][1] >= 2)) {
                takingWithEnPassant = true
                allAvailableSquares.push(takes[iter])
            }
        }
        iter++
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

// bishop

function checkerBishop(startCol, startRow, removeLastSquares = false) {
    let allAvailableSquares = []
    let movements = [[1, 1], [-1, 1], [-1, -1], [1, -1]]
    let oldGoingThroughPieces = goingThroughPieces
    goingThroughPieces = false
    
    movements.forEach(i => {
        allAvailableSquares.push(universal(startCol, startRow, ...i, 0))
    })

    for(let i = 0; i < allAvailableSquares.length; i++) {
        let piece = getPieceFromSquare(allAvailableSquares[i][allAvailableSquares[i].length-1])
        if(piece == undefined) continue
        if(isPieceOnEdge(piece)) {
            allAvailableSquares[i].pop()
            if(removeLastSquares) {
                allAvailableSquares[i].pop()
                if(isPieceWhite(getPieceFromCords(startCol, startRow)) != whiteTurn) allAvailableSquares[i].pop()
            }
        } else if(isPieceWhite(piece) == !whiteTurn) {
            let last = allAvailableSquares[i].pop()
            if(removeLastSquares) {
                allAvailableSquares[i].pop()
                if(isPieceWhite(getPieceFromCords(startCol, startRow)) != whiteTurn) allAvailableSquares[i].pop()
                if(getPieceFromSquare(universal(...getCordsOfSquare(last), ...movements[i], 1, true)[0]) == undefined) {
                    allAvailableSquares[i].push(last)
                }
                continue
            }
            let moreSquares = universal(...getCordsOfSquare(last), ...movements[i], 0)
            if(getPieceFromSquare(moreSquares[0]) == undefined) {
                if(getPieceFromSquare(moreSquares[moreSquares.length-1]) != undefined) {
                    moreSquares.pop()
                }
                allAvailableSquares.push(moreSquares)
            }
        }
    }

    goingThroughPieces = oldGoingThroughPieces
    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function bomber(startCol, startRow) {
    return bishop(startCol, startRow)
}

function cylinderBishop(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
    
    movements.forEach(move => {
        allAvailableSquares.push(universal(startCol, startRow, ...move, 0))
    })
    for (let i = 0; i < movements.length; i++) {
        if(allAvailableSquares[i][allAvailableSquares[i].length-1] != undefined) {
            allAvailableSquares.push(cylindrical(allAvailableSquares[i][allAvailableSquares[i].length-1], ...movements[i], 0))
        } else {
            allAvailableSquares.push(cylindrical(getSquareFromCords(startCol, startRow), ...movements[i], 0))
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function cylinderBomber(startCol, startRow) {
    return cylinderBishop(startCol, startRow)
}

// rook

function bigCastle(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(castle(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function megaGryphon(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[1, 1], [1, -1], [-1, 1], [-1, -1]]

    movements.forEach(move => {
        allAvailableSquares.push(universal(startCol, startRow, ...move, 2))
    })

    let moreAvailableSquares = []
    for (let i = 0; i < allAvailableSquares.length; i++) {
        let square = allAvailableSquares[i][1]
        if(square != undefined && getPieceFromSquare(square) == undefined) {
            let newCol = square.parentElement.getAttribute('col')
            let newRow = square.getAttribute('row')

            moreAvailableSquares.push(universal(newCol, newRow, movements[i][0], 0, 0))
            moreAvailableSquares.push(universal(newCol, newRow, 0, movements[i][1], 0))

            moreAvailableSquares = [].concat(...moreAvailableSquares)
        }
    }
    allAvailableSquares.push(moreAvailableSquares)

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function rookMaster(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[-1, 0], [0, -1], [1, 0], [0, 1]]

    movements.forEach(move => {
        allAvailableSquares.push(universal(startCol, startRow, ...move, 0))
    })

    let length = allAvailableSquares.length
    for (let i = 0; i < length; i++) {
        if(allAvailableSquares[i][1] != undefined && getPieceFromSquare(allAvailableSquares[i][1]) == undefined) {
            allAvailableSquares.push(universal(...getCordsOfSquare(allAvailableSquares[i][1]), ...movements[(movements.length+i-1) % movements.length], 0))
            allAvailableSquares.push(universal(...getCordsOfSquare(allAvailableSquares[i][1]), ...movements[(i+1) % movements.length], 0))
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function cylinderAmazon(startCol, startRow) {
    let allAvailableSquares = []
    let movements = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]]
    
    movements.forEach(move => {
        allAvailableSquares.push(universal(startCol, startRow, ...move, 0))
    })
    for (let i = 0; i < movements.length; i++) {
        if(allAvailableSquares[i][allAvailableSquares[i].length-1] != undefined) {
            allAvailableSquares.push(cylindrical(allAvailableSquares[i][allAvailableSquares[i].length-1], ...movements[i], 0))
        } else {
            allAvailableSquares.push(cylindrical(getSquareFromCords(startCol, startRow), ...movements[i], 0))
        }
    }

    let square = getSquareFromCords(startCol, startRow)
    allAvailableSquares.push(cylindrical(square, -2, -1, 1))
    allAvailableSquares.push(cylindrical(square, -1, -2, 1))
    allAvailableSquares.push(cylindrical(square, -2, 1, 1))
    allAvailableSquares.push(cylindrical(square, -1, 2, 1))
    allAvailableSquares.push(cylindrical(square, 1, -2, 1))
    allAvailableSquares.push(cylindrical(square, 2, -1, 1))
    allAvailableSquares.push(cylindrical(square, 1, 2, 1))
    allAvailableSquares.push(cylindrical(square, 2, 1, 1))

    allAvailableSquares.push(universal(startCol, startRow, -2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, -2, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 2, 1))
    allAvailableSquares.push(universal(startCol, startRow, 2, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

//#endregion

/*  Water Update  */
//#region
function waterPawn(startCol, startRow, takeNoPiece = false) {
    return pawn(startCol, startRow, takeNoPiece)
}

function waterKnight(startCol, startRow) {
    return knight(startCol, startRow)
}

function waterBishop(startCol, startRow) {
    return bishop(startCol, startRow)
}

function waterRook(startCol, startRow) {
    return rook(startCol, startRow)
}

function waterQueen(startCol, startRow) {
    return queen(startCol, startRow)
}

function waterKing(startCol, startRow) {
    return king(startCol, startRow)
}

// Burnt Water

function burntWaterPawn(startCol, startRow, takeNoPiece = false) {
    return pawn(startCol, startRow, takeNoPiece)
}

function burntWaterKnight(startCol, startRow) {
    return knight(startCol, startRow)
}

function burntWaterBishop(startCol, startRow) {
    return burntLavaBishop(startCol, startRow)
}

function burntWaterRook(startCol, startRow) {
    return burntLavaRook(startCol, startRow)
}

function burntWaterQueen(startCol, startRow) {
    return burntLavaQueen(startCol, startRow)
}

function burntWaterKing(startCol, startRow) {
    return burntLavaKing(startCol, startRow)
}

// Abilities

function waterAbilityPawn(justGet = false) {
    let allSquares = []
    let startCords = getCordsOfPiece(clickedOn)
    let i = 1
    if(whiteTurn) i = -1
    allSquares.push(universal(...startCords, 1, i, 1))
    allSquares.push(universal(...startCords, -1, i, 1))

    for (let i = 0; i < allSquares.length; i++) {
        if(getPieceFromSquare(allSquares[i][0]) != undefined
        && allSquares[i].length > 0 && (!inCheck || allSquares[i].includes(getSquareFromPiece(checkingPiece)))
        && (pieceAboutToCheck == undefined || allSquares[i].includes(getSquareFromPiece(pieceAboutToCheck)))) {
            allSquares[i] = allSquares[i][allSquares[i].length-1]
        } else {
            allSquares.splice(i--, 1)
        }
    }
    for (let i = 0; i < allSquares.length; i++) {
        if(allSquares[i].classList.contains('ocean-square')) {
            allSquares.splice(i--, 1)
        }
    }

    if(justGet == true) return allSquares

    squares.forEach(i => {
        i.classList.remove('clicked')
        i.classList.remove('right-clicked')
        i.classList.remove('can-go')
        i.classList.remove('without-moving')
        i.removeEventListener('dragover', squareDragOver)
        i.removeEventListener('click', squareClick)
        i.addEventListener('click', deleteSquareThings)
    })
    allSquares.forEach(i => {
        i.classList.add('can-go')
        i.addEventListener('click', pawnPlaceWater)
        i.removeEventListener('click', deleteSquareThings)
    })
    canGo = allSquares
}

function pawnPlaceWater(e) {
    capturePiece(clickedOn)
    histor.push([undefined, undefined, getPieceId(clickedOn)])
    histor[histor.length-1][3] = {
        ...histor[histor.length-1][3],
        waterAppears: [[e.target, 0]],
        capturedPieces: [clickedOn]
    }
    manageWaterEntities()
    spawnEntity(e.target, 'water', 0, 3, 'water')
    currentMove++
    canGo.forEach(i => {
        i.removeEventListener('click', pawnPlaceWater)
    })
    endOfTurn()
}

function waterAbilityKnight(justGet = false) {
    let allSquares = []
    let startCords = getCordsOfPiece(clickedOn)
    allSquares.push(universal(...startCords, 1, 0, 1))
    allSquares.push(universal(...startCords, 0, 1, 1))
    allSquares.push(universal(...startCords, 0, -1, 1))
    allSquares.push(universal(...startCords, -1, 0, 1))

    for (let i = 0; i < allSquares.length; i++) {
        if(allSquares[i].length > 0 && (!inCheck || allSquares[i].includes(getSquareFromPiece(checkingPiece)))
        && (pieceAboutToCheck == undefined || allSquares[i].includes(getSquareFromPiece(pieceAboutToCheck)))) {
            allSquares[i] = allSquares[i][allSquares[i].length-1]
        } else {
            allSquares.splice(i--, 1)
        }
    }
    for (let i = 0; i < allSquares.length; i++) {
        if(allSquares[i].classList.contains('ocean-square')) {
            allSquares.splice(i--, 1)
        }
    }

    if(justGet == true) return allSquares

    squares.forEach(i => {
        i.classList.remove('clicked')
        i.classList.remove('right-clicked')
        i.classList.remove('can-go')
        i.classList.remove('without-moving')
        i.removeEventListener('dragover', squareDragOver)
        i.removeEventListener('click', squareClick)
        i.addEventListener('click', deleteSquareThings)
    })
    allSquares.forEach(i => {
        i.classList.add('can-go')
        i.addEventListener('click', knightPlaceWater)
        i.removeEventListener('click', deleteSquareThings)
    })
    canGo = allSquares
}

function knightPlaceWater(e) {
    histor.push([undefined, undefined, getPieceId(clickedOn)])
    histor[histor.length-1][3] = {
        ...histor[histor.length-1][3],
        boilingAppears: [[e.target, 0]]
    }
    manageWaterEntities()
    spawnEntity(e.target, 'boiling', 0, 3, 'water')
    currentMove++
    canGo.forEach(i => {
        i.removeEventListener('click', knightPlaceWater)
    })
    clickedOn.setAttribute('waterAbilityUses', clickedOn.getAttribute('waterAbilityUses')-1)
    endOfTurn()
}

function waterAbilityBishop() {
    canGo.forEach(i => {
        i.removeEventListener('click', squareClick)
        i.removeEventListener('dragover', squareDragOver)
        i.addEventListener('click', bishopPlaceWater)
    })
}

function bishopPlaceWater(e) {
    let oldSquare = getSquareFromPiece(clickedOn)
    targetSquare = e.target
    squareSelect()
    histor[histor.length-1][3] = {
        ...histor[histor.length-1][3],
        boilingAppears: [[oldSquare, 0]]
    }
    spawnEntity(oldSquare, 'boiling', 0, 3, 'water')
    canGo.forEach(i => {
        i.removeEventListener('click', bishopPlaceWater)
    })
}

function waterAbilityRook(justGet = false) {
    let allSquares = []
    let startCords = getCordsOfPiece(clickedOn)
    allSquares.push(universal(...startCords, 1, 0, 0))
    allSquares.push(universal(...startCords, -1, 0, 0))
    allSquares.push(universal(...startCords, 0, 1, 0))
    allSquares.push(universal(...startCords, 0, -1, 0))

    for (let i = 0; i < allSquares.length; i++) {
        if(getPieceFromSquare(allSquares[i][allSquares[i].length-1]) != undefined) {
            allSquares[i].pop()
        }
        if(allSquares[i].length > 0 && (!inCheck || allSquares[i].includes(getSquareFromPiece(checkingPiece)))
        && (pieceAboutToCheck == undefined || allSquares[i].includes(getSquareFromPiece(pieceAboutToCheck)))) continue

        allSquares.splice(i--, 1)
    }
    allSquares = [].concat(...allSquares)
    for (let i = 0; i < allSquares.length; i++) {
        if(allSquares[i].classList.contains('ocean-square')) {
            allSquares.splice(i--, 1)
        }
    }

    if(justGet == true) return allSquares

    squares.forEach(i => {
        i.classList.remove('clicked')
        i.classList.remove('right-clicked')
        i.classList.remove('can-go')
        i.classList.remove('without-moving')
        i.removeEventListener('dragover', squareDragOver)
        i.removeEventListener('click', squareClick)
        i.addEventListener('click', deleteSquareThings)
    })
    allSquares.forEach(i => {
        i.classList.add('can-go')
        i.addEventListener('click', rookPlaceWater)
        i.removeEventListener('click', deleteSquareThings)
    })
    canGo = allSquares
}

function rookPlaceWater(e) {
    histor.push([undefined, undefined, getPieceId(clickedOn)])
    histor[histor.length-1][3] = {
        ...histor[histor.length-1][3],
        steamAppears: [[e.target, 0]]
    }
    manageWaterEntities()
    spawnEntity(e.target, 'steam', 0, 2, 'water')
    currentMove++
    canGo.forEach(i => {
        i.removeEventListener('click', rookPlaceWater)
    })
    clickedOn.setAttribute('waterAbilityUses', clickedOn.getAttribute('waterAbilityUses')-1)
    endOfTurn()
}

function waterAbilityQueen(justGet = false) {
    let allSquares = []
    let startCords = getCordsOfPiece(clickedOn)
    allSquares.push(universal(...startCords, 1, 0, 2))
    allSquares.push(universal(...startCords, -1, 0, 2))
    allSquares.push(universal(...startCords, 0, 1, 2))
    allSquares.push(universal(...startCords, 0, -1, 2))
    allSquares.push(universal(...startCords, 1, 1, 2))
    allSquares.push(universal(...startCords, -1, 1, 2))
    allSquares.push(universal(...startCords, 1, -1, 2))
    allSquares.push(universal(...startCords, -1, -1, 2))

    for (let i = 0; i < allSquares.length; i++) {
        if(getPieceFromSquare(allSquares[i][allSquares[i].length-1]) != undefined) {
            allSquares[i].pop()
        }
        if(getPieceFromSquare(allSquares[i][0]) == undefined
        && allSquares[i].length > 0 && (!inCheck || allSquares[i].includes(getSquareFromPiece(checkingPiece)))
        && (pieceAboutToCheck == undefined || allSquares[i].includes(getSquareFromPiece(pieceAboutToCheck)))) {
            allSquares[i] = allSquares[i][allSquares[i].length-1]
        } else {
            allSquares.splice(i--, 1)
        }
    }
    for (let i = 0; i < allSquares.length; i++) {
        if(allSquares[i].classList.contains('ocean-square')) {
            allSquares.splice(i--, 1)
        }
    }

    if(justGet == true) return allSquares

    squares.forEach(i => {
        i.classList.remove('clicked')
        i.classList.remove('right-clicked')
        i.classList.remove('can-go')
        i.classList.remove('without-moving')
        i.removeEventListener('dragover', squareDragOver)
        i.removeEventListener('click', squareClick)
        i.addEventListener('click', deleteSquareThings)
    })
    allSquares.forEach(i => {
        i.classList.add('can-go')
        i.addEventListener('click', queenPlaceWater)
        i.removeEventListener('click', deleteSquareThings)
    })
    canGo = allSquares
}

function queenPlaceWater(e) {
    histor.push([undefined, undefined, getPieceId(clickedOn)])
    histor[histor.length-1][3] = {
        ...histor[histor.length-1][3],
        steamAppears: [[e.target, 0]]
    }
    manageWaterEntities()
    spawnEntity(e.target, 'steam', 0, 2, 'water')
    currentMove++
    canGo.forEach(i => {
        i.removeEventListener('click', queenPlaceWater)
    })
    clickedOn.setAttribute('waterAbilityUses', clickedOn.getAttribute('waterAbilityUses')-1)
    endOfTurn()
}

function waterAbilityKing() {
    canGo.forEach(i => {
        i.classList.remove('clicked')
        i.classList.remove('right-clicked')
        i.classList.remove('can-go')
        i.classList.remove('without-moving')
        i.removeEventListener('dragover', squareDragOver)
        i.removeEventListener('click', squareClick)
        i.addEventListener('click', deleteSquareThings)
        if(allPieceParts.length > 1) {
            i.removeEventListener('mouseover', projectGhostOfPiece)
            i.removeEventListener('mouseout', deleteAllGhostPieces)
        }
        if(data.features.includes('lava')) {
            i.removeEventListener('click', queenPlaceLava)
            i.removeEventListener('click', kingPlaceLava)
        }
    })
    let allSquares = []
    canGo = []
    let startCords = getCordsOfPiece(clickedOn)
    allSquares.push(universal(...startCords, 1, 1, 3))
    allSquares.push(universal(...startCords, 1, -1, 3))
    allSquares.push(universal(...startCords, -1, 1, 3))
    allSquares.push(universal(...startCords, -1, -1, 3))
    allSquares.push(universal(...startCords, 1, 0, 3))
    allSquares.push(universal(...startCords, -1, 0, 3))
    allSquares.push(universal(...startCords, 0, 1, 3))
    allSquares.push(universal(...startCords, 0, -1, 3))
    allSquares.forEach(i => {
        if(i[1] != undefined && getPieceFromSquare(i[1]) == undefined) {
            canGo.push(i[1])
        }
        if(i[2] != undefined && getPieceFromSquare(i[2]) == undefined) {
            canGo.push(i[2])
        }
    })
    for (let i = 0; i < canGo.length; i++) {
        if(canGo[i].classList.contains('ocean-square')) {
            canGo.splice(i--, 1)
        }
    }
    canGo.forEach(i => {
        i.classList.add('can-go')
        i.addEventListener('click', kingPlaceWater)
        i.removeEventListener('click', deleteSquareThings)
    })
}

function kingPlaceWater(e) {
    clickedOn.setAttribute('waterAbilityUses', clickedOn.getAttribute('waterAbilityUses')-1)
    targetSquare = e.target
    squareSelect()
}


function tsunami() {
    let allAvailableSquares = []

    for (let i = 0; i < squares.length; i++) {
        if(!squares[i].classList.contains('ocean-square')) {
            let nonOceanAmount = 0
            for (let j = 0; j < squares[i].parentElement.children.length; j++) {
                if(!squares[i].parentElement.children[j].classList.contains('ocean-square')) {
                    nonOceanAmount++
                }
            }
            allAvailableSquares.push(squares[i].parentElement.children[Math.floor(nonOceanAmount/2+i%squares[i].parentElement.children.length)])
            if(nonOceanAmount % 2 == 0) {
                allAvailableSquares.push(squares[i].parentElement.children[Math.floor(nonOceanAmount/2+i%squares[i].parentElement.children.length)-1])
            }
            break
        }
    }
    for (let i = squares.length-1; i >= 0; i--) {
        if(!squares[i].classList.contains('ocean-square')) {
            let nonOceanAmount = 0
            for (let j = 0; j < squares[i].parentElement.children.length; j++) {
                if(!squares[i].parentElement.children[j].classList.contains('ocean-square')) {
                    nonOceanAmount++
                }
            }
            allAvailableSquares.push(squares[i].parentElement.children[Math.floor(i%squares[i].parentElement.children.length-nonOceanAmount/2)+1])
            if(nonOceanAmount % 2 == 0) {
                allAvailableSquares.push(squares[i].parentElement.children[Math.floor(i%squares[i].parentElement.children.length-nonOceanAmount/2)])
            }
            break
        }
    }

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


// ships

function lightShip(startCol, startRow, move = 4, shoot = 2) {
    let allAvailableSquares = []
    let movements = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    
    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], move))
        for (let j = 0; j < allAvailableSquares[i].length; j++) {
            if(!allAvailableSquares[i][j].classList.contains('ocean-square') || getPieceFromSquare(allAvailableSquares[i][j]) != undefined) {
                allAvailableSquares[i].splice(j--, 1)
            }
        }
    }
    
    shipShooting = true
    for (let i = 0; i < movements.length / 2; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], shoot))
        for (let j = 0; j < allAvailableSquares[allAvailableSquares.length-1].length; j++) {
            if(!allAvailableSquares[allAvailableSquares.length-1][j].classList.contains('ocean-square')
            || getPieceFromSquare(allAvailableSquares[allAvailableSquares.length-1][j]) != undefined) continue
            allAvailableSquares[allAvailableSquares.length-1].splice(j--, 1)
        }
    }
    shipShooting = false

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


function mediumShipLeft(startCol, startRow, getFractured = false, move = 4, shoot = 3) {
    let allAvailableSquares = []
    let movements = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]
    
    for(let i = 0; i < movements.length; i++) {
        allAvailableSquares.push(universal(startCol, startRow, ...movements[i], move))
        for (let j = 0; j < allAvailableSquares[i].length; j++) {
            if(!allAvailableSquares[i][j].classList.contains('ocean-square') || getPieceFromSquare(allAvailableSquares[i][j]) != undefined) {
                allAvailableSquares[i].splice(j--, 1)
            }
        }
    }

    let relaCords
    if(allPieceParts.length > 1) {
        if(getFractured) {
            relaCords = getRelaPositionsOfPieces([clickedOn], allPieceParts[1])
        } else {
            relaCords = getRelaPositionsOfPieces(allPieceParts)
        }
        let squaresToAdd = [universal(startCol, startRow, relaCords[0][0] * -1, relaCords[0][1] * -1, move),
        universal(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1], ...relaCords[0], move),
        getSquareFromCords(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1])]
        for (let i = 0; i < squaresToAdd.length; i++) {
            for (let j = 0; j < squaresToAdd[i].length; j++) {
                if(!squaresToAdd[i][j].classList.contains('ocean-square') || getPieceFromSquare(squaresToAdd[i][j]) != undefined) {
                    squaresToAdd[i].splice(j--, 1)
                }
            }
        }
        allAvailableSquares[indexOfItemInArray(movements, [relaCords[0][0] * -1, relaCords[0][1] * -1])] = squaresToAdd[0]
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])] = squaresToAdd[1]
        allAvailableSquares[indexOfItemInArray(movements, relaCords[0])].unshift(squaresToAdd[2])
    }

    if(getFractured) return allAvailableSquares;
    if(allPieceParts == undefined || allPieceParts.length == 1) return [].concat(...allAvailableSquares);

    allAvailableSquares = cutOffWhereOtherPartsOnTheWay(allAvailableSquares)

    shipShooting = true
    for (let i = 0; i < movements.length / 2; i++) {
        allAvailableSquares.push([...universal(startCol, startRow, ...movements[i], shoot),
        ...universal(parseInt(startCol) + relaCords[0][0], parseInt(startRow) + relaCords[0][1], ...movements[i], shoot)])
        for (let j = 0; j < allAvailableSquares[allAvailableSquares.length-1].length; j++) {
            if(!allAvailableSquares[allAvailableSquares.length-1][j].classList.contains('ocean-square')
            || getPieceFromSquare(allAvailableSquares[allAvailableSquares.length-1][j]) != undefined) continue
            allAvailableSquares[allAvailableSquares.length-1].splice(j--, 1)
        }
    }
    shipShooting = false

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function mediumShipRight(startCol, startRow, getFractured = false) {
    return mediumShipLeft(startCol, startRow, getFractured)
}


function galleyShipLeft(startCol, startRow, getFractured = false) {
    return mediumShipLeft(startCol, startRow, getFractured, 4, 4)
}

function galleyShipRight(startCol, startRow, getFractured = false) {
    return galleyShipLeft(startCol, startRow, getFractured)
}


function heavyShipLeft(startCol, startRow, getFractured = false) {
    return mediumShipLeft(startCol, startRow, getFractured, 3, 3)
}

function heavyShipRight(startCol, startRow, getFractured = false) {
    return heavyShipLeft(startCol, startRow, getFractured)
}


//#endregion
//#endregion

/*  Evolving Pieces 2  */
//#region

// pawn

function grandPawn(startCol, startRow) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    allAvailableSquares.push(universal(startCol, startRow, 0, i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, i, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, i, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function pawnPlus(startCol, startRow, takeNoPiece = false) {
    let allAvailableSquares = []
    let i = 1
    if(whiteTurn) i = -1

    let moves = universal(startCol, startRow, 0, i, 2)
    if(moves[0] != undefined && getPieceFromSquare(moves[0]) == undefined && !takeNoPiece) {
        allAvailableSquares.push(moves[0])
        if(moves[1] != undefined && isPieceWhite(getPieceFromSquare(moves[1])) == undefined) {
            allAvailableSquares.push(moves[1])
        }
    }

    let takes = []
    takes.push(universal(startCol, startRow, 1, i, 1))
    takes.push(universal(startCol, startRow, -1, i, 1))
    takes = [].concat(...takes)
    
    takes.forEach(take => {
        if(take != undefined && (isPieceWhite(getPieceFromSquare(take)) == !whiteTurn || takeNoPiece)) {
            taking = true
            allAvailableSquares.push(take)
        }
    })

    let enpassants = []
    enpassants.push(universal(startCol, startRow, 1, 0, 1))
    enpassants.push(universal(startCol, startRow, -1, 0, 1))
    enpassants = [].concat(...enpassants)

    let iter = 0
    enpassants.forEach(i => {
        if(i != undefined && isPieceWhite(getPieceFromSquare(i)) == !whiteTurn
        && pawnLikePieces.includes(getImgFileName(getPieceFromSquare(i)))) {
            enpassant.push(getPieceFromSquare(i))
            
            let lastHistMention
            for(let j = currentMove-2; j > 0; j--) {
                if(parseInt(histor[j][2]) == getPieceId(enpassant)) {
                    lastHistMention = j
                    break
                }
            }
            if(getPieceId(enpassant) == histor[histor.length-1][2]
            && (getPieceFromSquare(takes[iter]) == undefined
            || pawnLikePieces.includes(getImgFileName(getPieceFromSquare(takes[iter]))))
            && (histor[histor.length-1][1] - histor[lastHistMention][1] >= 2
            || histor[lastHistMention][1] - histor[histor.length-1][1] >= 2)) {
                takingWithEnPassant = true
                allAvailableSquares.push(takes[iter])
            }
        }
        iter++
    })

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

// knight

function arabianHorse(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function arabianHorse2(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function arabianHorse3(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(universal(startCol, startRow, -1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, 0, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 0, -1, 2))
    allAvailableSquares.push(camel(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function arabianHorse4(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(rook(startCol, startRow))
    allAvailableSquares.push(camel(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function arabianHors54(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(bishop(startCol, startRow))
    if(getPieceFromSquare(allAvailableSquares[0][allAvailableSquares[0].length-1]) != undefined) {
        allAvailableSquares[0].pop()
    }
    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(rook(startCol, startRow))
    allAvailableSquares.push(camel(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}


function shireHorse(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 1))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 1))
    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 1))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function shireHorse2(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function shireHorse3(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(universal(startCol, startRow, -1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, -1, 2))
    allAvailableSquares.push(universal(startCol, startRow, -1, 1, 2))
    allAvailableSquares.push(universal(startCol, startRow, 1, 1, 2))
    allAvailableSquares.push(camel(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function shireHorse4(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(bishop(startCol, startRow))
    allAvailableSquares.push(camel(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

function shireHorse5(startCol, startRow) {
    let allAvailableSquares = []

    allAvailableSquares.push(rook(startCol, startRow))
    if(getPieceFromSquare(allAvailableSquares[0][allAvailableSquares[0].length-1]) != undefined) {
        allAvailableSquares[0].pop()
    }
    allAvailableSquares.push(knight(startCol, startRow))
    allAvailableSquares.push(bishop(startCol, startRow))
    allAvailableSquares.push(camel(startCol, startRow))

    allAvailableSquares = [].concat(...allAvailableSquares)
    return allAvailableSquares
}

// bishop



// rook



//#endregion


//#endregion

/*  Playing history  */
//#region

if(sideBar != null) {
    backButton.addEventListener('click', back)
    totalBackButton.addEventListener('click', () => {
        if(neutralMove == histor.length || gameEnded) return
        if(currentMove == histor.length) back()
        histor.pop()
        inCheck = false
        discoveredCheck = false
        clickedOnCheck = false
        if(!whiteTurn && actualHistory.children[0].children.length > 1) {
            actualHistory.children[0].children[actualHistory.children[0].children.length-1].remove()
        } else if(actualHistory.children[1].children.length > 1) {
            actualHistory.children[1].children[actualHistory.children[1].children.length-1].remove()
        }
        switchClocks()
    })
    
    function back() {
        if(neutralMove == currentMove) return
        let curr = currentMove - 1
        reset()
        histPlay(neutralMove, curr, 0)
        multiMovePlaying = false
    }
    
    forwardButton.addEventListener('click', forward)
    
    function forward() {
        if(currentMove == histor.length) return
        histPlay(currentMove, currentMove+1, 0)
    }
    
    resetButton.addEventListener('click', reset)
    
    function reset() {
        if(currentMove == neutralMove) return
        currentMove = 0
        if(data.features.includes('lava')) {
            for (let i = 0; i < lavaSquares.length;) {
                removeEntity(lavaSquares[i], 'lava', undefined, i)
            }
            squares.forEach(square => {
                let bg = square.querySelector('.square-bg')
                if(bg != null) {
                    bg.remove()
                    if(square.querySelector('.turns-left') != null) square.querySelector('.turns-left').remove()
                }
                square.classList.remove('lava')
                square.removeAttribute('lava-source')
            })
            for (let i = 0; i < magmaSquares.length;) {
                removeEntity(magmaSquares[i], 'magma', undefined, i)
            }
            for (let i = 0; i < fireSquares.length;) {
                removeEntity(fireSquares[i], 'fire', undefined, i)
            }
            hell.querySelectorAll('.square').forEach(square => {
                if(square.querySelector('.turns-left') != null) {
                    square.querySelector('.turns-left').remove()
                }
            })
            lavaSquares = []
            fireSquares = []
            magmaSquares = []
            whiteKingLavaAbilityUses = 1
            blackKingLavaAbilityUses = 1
        }
        if(data.features.includes('water')) {
            for (let i = 0; i < waterSquares.length;) {
                removeEntity(waterSquares[i], 'water', undefined, i)
            }
            squares.forEach(square => {
                let bg = square.querySelector('.square-bg')
                if(bg != null) {
                    bg.remove()
                    if(square.querySelector('.turns-left') != null) square.querySelector('.turns-left').remove()
                }
                square.classList.remove('water')
                square.removeAttribute('water-source')
                square.classList.remove('steam')
                square.removeAttribute('steam-source')
                square.classList.remove('boiling')
                square.removeAttribute('boiling-source')
                square.classList.remove('tsunami')
                square.removeAttribute('tsunami-source')
            })
            for (let i = 0; i < steamSquares.length;) {
                removeEntity(steamSquares[i], 'steam', undefined, i)
            }
            for (let i = 0; i < boilingSquares.length;) {
                removeEntity(boilingSquares[i], 'boiling', undefined, i)
            }
            for (let i = 0; i < tsunamiSquares.length;) {
                removeEntity(tsunamiSquares[i], 'tsunami', undefined, i)
            }
            waterSquares = []
            boilingSquares = []
            steamSquares = []
            whiteTsunamiUses = 1
            blackTsunamiUses = 1
            tsunamiSquares = []
        }
        pieces.forEach(piece => {
            piece.classList.remove('none')
            if(getImgFileName(piece) == 'neutral') {
                let sourceArray = piece.src.split('/')
                sourceArray[sourceArray.length - 2] = piece.getAttribute('originalcolor')
                piece.src = sourceArray.join('/')
                if(piece.getAttribute('originalcolor') == 'whitePieces') {
                    blackPieces.splice(blackPieces.indexOf(piece), 1)
                    whitePieces.push(piece)
                } else {
                    whitePieces.splice(whitePieces.indexOf(piece), 1)
                    blackPieces.push(piece)
                }
            }
        })
        if(data.features.includes('disappearing')) {
            squares = document.querySelectorAll('.square')
            squares.forEach(square => {
                square.classList.remove('disabled')
            })
        }
        for(let i = histor.length-1; i > 0; i--) {
            if(histor[i].length == 4) {
                if(histor[i][3].oldSrc != undefined) {
                    getPieceFromId(histor[i][2]).src = histor[i][3].oldSrc
                }
                if(histor[i][3].multiPieceMove != undefined) {
                    for(let j = 0; j < histor[i][3].multiPieceMove.length; j++) {
                        if(histor[i][3].multiPieceMove[j][3] != undefined && histor[i][3].multiPieceMove[j][3].oldSrc != undefined) {
                            getPieceFromId(histor[i][3].multiPieceMove[j][2]).src = histor[i][3].multiPieceMove[j][3].oldSrc
                        }
                    }
                }
                if(histor[i][3].shipShot != undefined) {
                    let takenPiece = getPieceFromId(histor[i][3].shipShot[0])
                    let shotDurability = takenPiece.getAttribute('shotDurability')
                    let durabilityTaken = -histor[i][3].shipShot[1]
                    let allParts = getAllPieceParts(takenPiece)
                    for (let i = 0; i < allParts.length; i++) {
                        allParts[i].setAttribute('shotDurability', shotDurability - durabilityTaken)
                        let items = getPieceItemsOfPiece(allParts[i])
                        for (let i = 0; i < items.length; i++) {
                            if(items[i].classList.contains('ship-shot-dura-counter')) {
                                items[i].innerHTML = shotDurability - durabilityTaken
                                break
                            }
                        }
                    }
                }
                if(histor[i][3].confusedPieces != undefined) {
                    histor[i][3].confusedPieces.forEach(piece => {
                        if(piece.getAttribute('confused') == 'true') {
                            let items = getPieceItemsOfPiece(piece)
                            for (let j = 0; j < items.length; j++) {
                                if(items[j].classList.contains('confusion-counter')) {
                                    piece.removeAttribute('confused')
                                    items[j].remove()
                                    pieceItemsOnBoard = document.querySelectorAll('.board .piece-item')
                                    break
                                }
                            }
                        }
                    })
                }
                if(histor[i][3].goesToHell != undefined) {
                    histor[i][3].goesToHell.forEach(piece => {
                        histPlaying = true
                        goBackFromHell(piece)
                        let sourceArray = piece.src.split('/')
                        sourceArray[sourceArray.length-1] = sourceArray[sourceArray.length-1].substring(5, sourceArray[sourceArray.length-1].length)
                        sourceArray[sourceArray.length-1][0] = sourceArray[sourceArray.length-1][0].toLowerCase()
                        piece.src = sourceArray.join('/')
                        histPlaying = false
                    })
                }
            }
        }
        confusedPieces = []
        if(data.lives != undefined) {
            for(let i = 0; i < data.lives.length; i++) {
                let piece = getPieceFromId(data.lives[i][0])
                piece.setAttribute('lives', data.lives[i][1])
            }
        }
        histPlay(0, neutralMove)
        pieceItemsOnBoard.forEach(item => {
            item.classList.remove('none')
        })
        currentMove = neutralMove
        deleteSquareThings()
    }
    
    function histPlay(startMove, endMove) {
        histPlaying = true
        for(startMove; startMove < endMove; startMove++) {
            if(histor[startMove] == undefined) break
            if(histor[startMove].length == 4) {
                if(histor[startMove][3].multimove != undefined) {
                    clickedOn = getPieceFromId(histor[startMove][2])
                    for(let i = 0; i < histor[startMove][3].multimove.length; i++) {
                        targetSquare = getSquareFromCords(...histor[startMove][3].multimove[i])
                        setPiecePos(...histor[startMove][3].multimove[i])
                        currentMove--
                    }
                }  
                if(histor[startMove][3].multiPieceMove != undefined) {
                    for(let i = 0; i < histor[startMove][3].multiPieceMove.length; i++) {
                        clickedOn = getPieceFromId(histor[startMove][3].multiPieceMove[i][2])
                        if(histor[startMove][3].multiPieceMove[i][0] != undefined) {
                            targetSquare = getSquareFromCords(histor[startMove][3].multiPieceMove[i][0], histor[startMove][3].multiPieceMove[i][1])
                            allPieceParts = getAllPieceParts(clickedOn)
                            setPiecePos(...histor[startMove][3].multiPieceMove[i])
                            histPlaying = true
                            currentMove--
                        }
                        if(histor[startMove][3].multiPieceMove[i][3] != undefined && histor[startMove][3].multiPieceMove[i][3].newSrc != undefined) {
                            clickedOn.src = histor[startMove][3].multiPieceMove[i][3].newSrc
                        }
                    }
                }
            }
            clickedOn = getPieceFromId(histor[startMove][2])
            clickedOnImgName = getImgFileName(clickedOn)
            if(histor[startMove][3] != undefined && histor[startMove][3].newSrc != undefined) clickedOn.src = histor[startMove][3].newSrc
            if(histor[startMove][0] != undefined) {
                targetSquare = getSquareFromCords(histor[startMove][0], histor[startMove][1])
            } else {
                clickedOn = undefined
            }
            squareSelect()
            if(histor[startMove].length == 4) {
                if(histor[startMove][3].board != undefined) {
                    clickedOn = getPieceFromId(histor[startMove][2])
                    board = boards[histor[startMove][3].board]
                    columns = board.querySelectorAll('.column')
                    squares = board.querySelectorAll('.square')
                    board.querySelector('.pieces').appendChild(clickedOn)
                }
                if(histor[startMove][3].removedSquare != undefined) {
                    let pieceToRemove = getPieceFromSquare(histor[startMove][3].removedSquare)
                    histor[startMove][3].removedSquare.classList.add('disabled')
                    squares = board.querySelectorAll('.square:not(.disabled)')
                    capturePiece(pieceToRemove)
                }
                if(histor[startMove][0] == undefined) {
                    currentMove++
                    endOfTurn()
                }
                if(data.features.includes('lava')) {
                    if(histor[startMove][3].goesToHell != undefined) {
                        histor[startMove][3].goesToHell.forEach(i => {
                            goToHell(i)
                        })
                    }
                    if(histor[startMove][3].goesBackFromHell != undefined) {
                        histor[startMove][3].goesBackFromHell.forEach(i => {
                            let turnsChanged = false
                            let isWhite = isPieceWhite(i)
                            if(whiteTurn != isWhite) {
                                whiteTurn = isWhite
                                turnsChanged = true
                            }
                            goBackFromHell(i)
                            if(turnsChanged) {
                                whiteTurn = !whiteTurn
                            }
                            currentMove--
                        })
                    }
                    if(histor[startMove][3].lavaAppears != undefined) {
                        histor[startMove][3].lavaAppears.forEach(i => {
                            spawnEntity(i[0], 'lava', i[1], 2)
                        })
                    }
                    if(histor[startMove][3].fireAppears != undefined) {
                        histor[startMove][3].fireAppears.forEach(i => {
                            spawnEntity(i[0], 'fire', i[1])
                        })
                    }
                    if(histor[startMove][3].fireDisappears != undefined) {
                        let fireDisappearsSquares = []
                        for (let i = 0; i < histor[startMove][3].fireDisappears.length; i++) {
                            fireDisappearsSquares.push(histor[startMove][3].fireDisappears[i][0])
                        }
                        for (let i = 0; i < fireSquares.length; i++) {
                            if(!fireDisappearsSquares.includes(fireSquares[i])) continue
                            let existenceLength = 0
                            for (let j = 0; j < fireSquares[i].classList.length; j++) {
                                if(fireSquares[i].classList[j].includes('fire-')) {
                                    existenceLength = parseInt(fireSquares[i].classList[j].substring(5, fireSquares[i].classList[j].length))
                                    break
                                }
                            }
                            fireSquares[i].classList.remove('fire', 'fire-' + existenceLength)
                            fireSquares[i].querySelector('.square-bg').remove()
                            fireSquares.splice(i--, 1)
                        }
                    }
                    if(histor[startMove][3].magmaAppears != undefined) {
                        histor[startMove][3].magmaAppears.forEach(i => {
                            spawnEntity(i[0], 'magma', i[1], 3)
                        })
                    }
                }
                if(data.features.includes('water')) {
                    if(histor[startMove][0] == undefined) {
                        manageWaterEntities()
                    }
                    if(histor[startMove][3].waterAppears != undefined) {
                        histor[startMove][3].waterAppears.forEach(i => {
                            spawnEntity(i[0], 'water', i[1], 3, 'water')
                        })
                    }
                    if(histor[startMove][3].steamAppears != undefined) {
                        histor[startMove][3].steamAppears.forEach(i => {
                            spawnEntity(i[0], 'steam', i[1], 2, 'water')
                        })
                    }
                    if(histor[startMove][3].boilingAppears != undefined) {
                        histor[startMove][3].boilingAppears.forEach(i => {
                            spawnEntity(i[0], 'boiling', i[1], 3, 'water')
                        })
                    }
                    if(histor[startMove][3].tsunamiAppears != undefined) {
                        histor[startMove][3].tsunamiAppears.forEach(i => {
                            spawnEntity(i, 'tsunami', 0, 3, 'water')
                            window[color + 'TsunamiUses']--
                        })
                    }
                    if(histor[startMove][3].shipShot != undefined) {
                        let takenPiece = getPieceFromId(histor[startMove][3].shipShot[0])
                        let shotDurability = takenPiece.getAttribute('shotDurability')
                        let durabilityTaken = histor[startMove][3].shipShot[1]
                        let allParts = getAllPieceParts(takenPiece)
                        for (let i = 0; i < allParts.length; i++) {
                            allParts[i].setAttribute('shotDurability', shotDurability - durabilityTaken)
                            let items = getPieceItemsOfPiece(allParts[i])
                            for (let i = 0; i < items.length; i++) {
                                if(items[i].classList.contains('ship-shot-dura-counter')) {
                                    items[i].innerHTML = shotDurability - durabilityTaken
                                    break
                                }
                            }
                            imgOnSquare(getSquareFromPiece(allParts[i]), 'boom')
                        }
                        canonSfx.play()
                    }
                }
                if(histor[startMove][3].confusedPieces != undefined) {
                    histor[startMove][3].confusedPieces.forEach(piece => {
                        confusePiece(piece)
                    })
                }
                if(histor[startMove][3].capturedPieces != undefined) {
                    histor[startMove][3].capturedPieces.forEach(i => {
                        capturePiece(i)
                    })
                }
            }
        }
        histPlaying = false
        deleteSquareThings()
        resize()
        // if(isPieceWhite(getPieceFromId(histor[histor.length-1][2])) == whiteTurn) switchClocks()
    }
    
    function actualHist(move, col) {
        if(histPlaying) return
        let lastMove
        if(move == undefined) {
            lastMove = histor[histor.length-1]
        } else {
            lastMove = histor[move]
        }
        let alfa = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
        let div = document.createElement("div")
        let img = document.createElement("img")

        if(lastMove[2] != undefined) {
            let piec = getPieceFromId(lastMove[2])
            let sourceArray = piec.src.split('/')
            if(getImgFileName(piec) == 'neutral') sourceArray[piec.src.split('/').length - 2] = color + 'Pieces'
            
            img.src = sourceArray.join('/')
            if(lastMove[3] != undefined && lastMove[3].oldSrc != undefined) {
                img.src = lastMove[3].oldSrc
            }
            img.style.height = '2rem'
        }
        
        if(col == undefined ? whiteTurn : col) {
            actualHistory.children[0].appendChild(div)
        } else {
            actualHistory.children[1].appendChild(div)
        }
        div.appendChild(img)
    
        if(lastMove[0] != undefined) div.innerHTML = div.innerHTML + (alfa[lastMove[0] - 1]).toString() + ((columns[0].children.length+1) - lastMove[1]).toString()
        if(lastMove.length == 4 && lastMove[3].oldSrc != undefined) {
            div.innerHTML = div.innerHTML + ' ='
            let img = document.createElement("img")
            img.src = lastMove[3].newSrc
            img.style.height = '2rem'
            div.appendChild(img)
        }
    }
    
    function resetActualHist() {
        let firstEle = actualHistory.children[0].children[0]
        actualHistory.children[0].innerHTML = ''
        actualHistory.children[0].appendChild(firstEle)
        firstEle = actualHistory.children[1].children[0]
        actualHistory.children[1].innerHTML = ''
        actualHistory.children[1].appendChild(firstEle)
    
        for(let i = neutralMove; i < histor.length; i++) {
            actualHist(i, i % 2 == 0)
        }
    }
}
//#endregion
