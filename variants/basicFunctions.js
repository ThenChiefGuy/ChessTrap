

function othergetPieceFromCords(col, row, pie) {
    for(let i = 0; i < pieces.length; i++) {
        if(pieces[i].getAttribute('col') == col && pieces[i].getAttribute('row') == row && pie != i && pieces[i].parentElement.parentElement == board) return pieces[i]
    }
}

function getPieceFromId(pie) {
    return pieces[pie]
}

function getPieceId(piece) {
    return Array.prototype.indexOf.call(pieces, piece)
}


function getSquareFromPiece(piece) {
    if(piece == undefined || piece.getAttribute('col') == 0) return
    return columns[piece.getAttribute('col')-1].children[piece.getAttribute('row')-1]
}

function getPieceFromSquare(square) {
    if(square == undefined || getCordsOfSquare(square) == undefined) return
    return getPieceFromCords(...getCordsOfSquare(square))
}


function getSquareFromCords(col, row) {
    return columns[col-1].children[row-1]
}

function getPieceFromCords(col, row) {
    for(let i = 0; i < pieces.length; i++) {
        if(pieces[i].getAttribute('col') == col && pieces[i].getAttribute('row') == row && pieces[i].parentElement.parentElement == board) return pieces[i]
    }
}


function getCordsOfSquare(square) {
    if(square == undefined || square.parentElement == undefined) return
    return [square.parentElement.getAttribute('col'), square.getAttribute('row')]
}

function getCordsOfPiece(piece) {
    if(piece == undefined || piece.getAttribute('col') == 0) return
    return [piece.getAttribute('col'), piece.getAttribute('row')]
}


function isSquareOnEdge(square) {
    if(square == undefined) return
    let cords = getCordsOfSquare(square)
    return (cords[0] == 1 || cords[0] == columns.length
    || cords[1] == columns[0].children.length || cords[1] == 1)
}

function isPieceOnEdge(piece) {
    if(piece == undefined) return
    let cords = getCordsOfPiece(piece)
    return (cords[0] == 1 || cords[0] == columns.length
    || cords[1] == columns[0].children.length || cords[1] == 1)
}

function areCordsOnEdge(col, row) {
    let cords = [col, row]
    return (cords[0] == 1 || cords[0] == columns.length
    || cords[1] == columns[0].children.length || cords[1] == 1)
}


function removeSquaresWithPieceOnThem(allSquares) {
    for (let i = 0; i < allSquares.length; i++) {
        if(getPieceFromSquare(allSquares[i]) != undefined) {
            allSquares.splice(i--, 1)
        }
    }
    return allSquares
}


function getSquaresInBetween(prevPos, newPos) {
    let movement = []
    let colDifference = newPos[0] - prevPos[0]
    let rowDifference = newPos[1] - prevPos[1]
    movement[0] = colDifference != 0 ? colDifference / Math.abs(colDifference) : 0
    movement[1] = rowDifference != 0 ? rowDifference / Math.abs(rowDifference) : 0

    return universal(...prevPos, ...movement, 0)
}

function getPieceInBetweenSquares(prevPos, newPos) {
    let movement = []
    let colDifference = newPos[0] - prevPos[0]
    let rowDifference = newPos[1] - prevPos[1]
    movement[0] = colDifference != 0 ? colDifference / Math.abs(colDifference) : 0
    movement[1] = rowDifference != 0 ? rowDifference / Math.abs(rowDifference) : 0

    colDifference = Math.abs(colDifference)
    rowDifference = Math.abs(rowDifference)

    let currentSqu = getSquareFromCords(...prevPos)
    for(let i = 0; i < (colDifference != 0 ? colDifference : rowDifference); i++) {
        currentSqu = universal(...getCordsOfSquare(currentSqu), ...movement, 1, true)[0]
        let piec = getPieceFromSquare(currentSqu)
        if(piec != undefined) {
            if(isPieceWhite(piec) != whiteTurn || ability == 'cannibalism' || histPlaying) {
                return piec
            }
            // add how many pieces can it jump
        }
    }
}


function isPieceWhite(piece) {
    if(piece == undefined) return undefined
    return piece.src.split('/')[piece.src.split('/').length - 2] == 'whitePieces'
}

function getImgFileName(obj) {
    if(obj == undefined || obj.src == undefined) return ''
    return obj.src.split('/').pop().split('.').shift()
}

function changeImgFileName(obj, name, setHist = true) {
    if(obj == undefined) return
    let srcArray = obj.src.split('/')
    let last = name + '.' + srcArray.pop().split('.').pop()
    srcArray = srcArray.join('/')
    if(setHist) {
        histor[histor.length-1][3] = {
            ...histor[histor.length-1][3],
            oldSrc: obj.src,
            newSrc: srcArray + '/' + last
        }
    }
    obj.src = srcArray + '/' + last
}

function getPieceIdFromName(name, startIndex = 0) {
    for(let i = startIndex; i < pieces.length; i++) {
        if(getImgFileName(pieces[i]) == name) return i
    }
    return -1
}


function pieceColorSwitch(piece) {
    if(isPieceWhite(piece)) {
        let sourceArray = piece.src.split('/')
        sourceArray[sourceArray.length - 2] = 'blackPieces'
        piece.src = sourceArray.join('/')
        whitePieces.splice(whitePieces.indexOf(piece), 1)
        blackPieces.push(piece)
    } else {
        let sourceArray = piece.src.split('/')
        sourceArray[sourceArray.length - 2] = 'whitePieces'
        piece.src = sourceArray.join('/')
        blackPieces.splice(blackPieces.indexOf(piece), 1)
        whitePieces.push(piece)
    }
}


function lastHistorMention(piece) {
    for(let j = currentMove-1; j > 0; j--) {
        if(histor[j] != undefined && histor[j][2] == getPieceId(piece)) return j
    }
    return -1
}

function allHistorMentions(piece) {
    let arr = []
    for(let j = currentMove-1; j > -1; j--) {
        if(histor[j] != undefined && histor[j][2] == getPieceId(piece)) arr.push(j)
    }
    return arr
}


function getAllPieceParts(piece) {
    let parts = piece.getAttribute('otherParts')
    if(parts == null) return [piece]
    let arr = parts.split(' ')
    let pieceParts = [piece]
    for(let i = 0; i < arr.length; i++) {
        let piece = getPieceFromId(arr[i])
        if(piece.getAttribute('col') != 0) {
            pieceParts.push(piece)
        }
    }
    return pieceParts
}


function getPieceItemsOfPiece(piece) {
    let items = []
    for(let i = 0; i < pieceItemsOnBoard.length; i++) {
        if(piece == getPieceFromId(pieceItemsOnBoard[i].getAttribute('pie'))) {
            items.push(pieceItemsOnBoard[i])
        }
    }
    return items
}


function checkIfImageExists(url) {
    let exists
    fetch(url, { method: 'HEAD' })
    .then(res => {
        if (res.ok) {
            exists = true
        } else {
            exists = false
        }
    })
    .catch(err => console.log('Error:', err))
    return exists
}


function loadPiecesSkins(pieces) {
    pieces.forEach(piece => {
        let variant = piece.src.split('/')[piece.src.split('/').length - 3]
        if(typeof data !== 'undefined' && data.skinSet != undefined) variant = data.skinSet
        let item = localStorage.getItem(variant)
        if(item != null && item != 'normal') {
            let oldSrc = piece.src
            let secondPart = piece.src.split('/')[piece.src.split('/').length-2] + '/' + piece.src.split('/').pop()
            let firstPart = piece.src.split('/')
            firstPart.pop()
            firstPart.pop()
            firstPart.pop()
            firstPart = firstPart.join('/')
            piece.src = firstPart + '/' + variant + '/' + item + '/' + secondPart
            piece.onerror = function() {
                this.src = oldSrc
            }
        }
    })
}


function getElementFromMultidimentionalArray(array, indexes) {
    if(indexes.length > 1) {
        let i = indexes.shift()
        return getElementFromMultidimentionalArray(array[i], indexes)
    }
    return array[indexes[0]]
}