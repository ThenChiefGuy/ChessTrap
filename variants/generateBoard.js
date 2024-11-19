var board = document.querySelector('.board')
var columns
var squares
var pieces = document.querySelectorAll('.board .piece')
var squareColors = {
    water: {
        lightSquare: '#006996',
        darkSquare: '#015478',
        lightClicked: '#56bae5',
        darkClicked: '#39a3d0',
        lightHighlight: 'rgb(236, 78, 78)',
        darkHighlight: 'rgb(206, 61, 61)'
    },
    lava: {
        lightSquare: '#ab0000',
        darkSquare: '#540000',
        lightClicked: '#c77a00',
        darkClicked: '#c86b00',
        lightHighlight: 'rgb(236, 78, 78)',
        darkHighlight: 'rgb(206, 61, 61)'
    },
    normal: {
        lightSquare: '#e7cda3',
        darkSquare: '#ba855d',
        lightClicked: '#dbc34a',
        darkClicked: '#f6ea71',
        lightHighlight: 'rgb(206, 61, 61)',
        darkHighlight: 'rgb(236, 78, 78)'
    },
    weird: {
        lightSquare: 'rgb(241, 157, 88)',
        darkSquare: 'rgb(194, 122, 28)',
        lightClicked: '#e6d95c',
        darkClicked: '#dec43e',
        lightHighlight: 'rgb(236, 78, 78)',
        darkHighlight: 'rgb(206, 61, 61)'
    },
    green: {
        lightSquare: '#ededc8',
        darkSquare: '#70934d',
        lightClicked: '#f6ea71',
        darkClicked: '#dbc34a',
        lightHighlight: 'rgb(236, 78, 78)',
        darkHighlight: 'rgb(206, 61, 61)'
    },
    blue: {
        lightSquare: '#ededc8',
        darkSquare: 'rgb(77, 87, 166)',
        lightClicked: '#f6ea71',
        darkClicked: '#dbc34a',
        lightHighlight: 'rgb(236, 78, 78)',
        darkHighlight: 'rgb(206, 61, 61)'
    },
    purple: {
        lightSquare: '#f2f2d3',
        darkSquare: '#9364d1',
        lightClicked: '#f6ea71',
        darkClicked: '#dbc34a',
        lightHighlight: 'rgb(236, 78, 78)',
        darkHighlight: 'rgb(206, 61, 61)'
    },
    red: {
        lightSquare: 'radial-gradient(circle, #ededce, #bfbf6b)',
        darkSquare: 'radial-gradient(circle, #ff2921, #8a0900)',
        lightClicked: '#f6ea71',
        darkClicked: '#dbc34a',
        lightHighlight: 'rgb(236, 78, 78)',
        darkHighlight: 'rgb(196, 37, 37)',
        patreon: true
    },
    blackwhite: {
        lightSquare: '#eeeeee',
        darkSquare: '#111111',
        lightClicked: '#f6ea71',
        darkClicked: '#dbc34a',
        lightHighlight: '#aaaaaa',
        darkHighlight: '#888888',
        patreon: true
    }
}
var titlesToFolderNames = {
    ChessVsCheckers: 'checkers'
}
var root = document.querySelector(':root')
var currentMove = 0

var move = new Audio('../../sounds/Move.mp3')


/*  Piece Position Setting  */


function setPiecePos(col, row, pie) {
    let piece = getPieceFromId(pie)

    let left = (col-1)*(window.getComputedStyle(columns[col-1]).getPropertyValue('width').replace('px', ''))
    let top = (parseInt((row-1)*(window.getComputedStyle(squares[row-1]).getPropertyValue('height').replace('px', ''))) +
    (window.getComputedStyle(squares[row-1]).getPropertyValue('height').replace('px', '') - 
    window.getComputedStyle(piece).getPropertyValue('height').replace('px', '')) / 2)
    if(data.features.includes('triangle')) {
        left = (parseInt(columns[col-1].style.left) + (window.getComputedStyle(columns[col-1]).getPropertyValue('width').replace('px', '') - 
        window.getComputedStyle(piece).getPropertyValue('width').replace('px', '')) / 2)
        if(((col % 2) + (row % 2)) % 2 == 1) {
            top = parseInt(top) - ((window.getComputedStyle(squares[row-1]).getPropertyValue('height').replace('px', '') - 
            window.getComputedStyle(piece).getPropertyValue('height').replace('px', '')) / 1.5)
        } else {
            top = parseInt(top) + ((window.getComputedStyle(squares[row-1]).getPropertyValue('height').replace('px', '') - 
            window.getComputedStyle(piece).getPropertyValue('height').replace('px', '')) / 1.5)
        }
    }

    piece.style.transform = 'translateX(' + left + 'px)' + ' translateY(' + top + 'px)';

    piece.setAttribute('col', col)
    piece.setAttribute('row', row)

    currentMove++
    histor.push([col, row, pie])
}


function generateBoardHtml(cols, rows) {
    if(board == null) return
    /*  Columns and Squares  */

    for(let i = 0; i < cols; i++) {
        let col = document.createElement("div")
        col.classList.add('column')
        col.style.width = 100/cols + '%'
        col.setAttribute('col', i+1)
        board.appendChild(col)

        for(let j = 0; j < rows; j++) {
            let square = document.createElement("div")
            square.style.height = 100/rows + '%'
            square.classList.add('square')
            square.setAttribute('row', j+1)
            col.appendChild(square)

            let highlight = document.createElement("div")
            highlight.classList.add('highlight')
            square.appendChild(highlight)
        }
    }

    columns = board.querySelectorAll('.column')
    squares = board.querySelectorAll('.square')

    if(localStorage.getItem('skin') != null && localStorage.getItem('skin') != 'normal') {
        board.querySelectorAll('.piece').forEach(piece => {
            let oldSrc = piece.src
            let secondPart = piece.src.split('/')[piece.src.split('/').length-2] + '/' + piece.src.split('/').pop()
            let firstPart = piece.src.split('/')
            firstPart.pop()
            firstPart.pop()
            firstPart = firstPart.join('/')
            piece.src = firstPart + '/' + localStorage.getItem('skin') + '/' + secondPart
            piece.onerror = function() {
                this.src = oldSrc
            }
        })
    }

    loadPiecesSkins(board.querySelectorAll('.piece'))

    if(localStorage.getItem('boardColor') != null && localStorage.getItem('boardColor') != 'normal'
    && !data.features.includes('lava')) {
        for (let keyy in squareColors) {
            if(squareColors.hasOwnProperty(keyy) && localStorage.getItem('boardColor') == keyy) {
                for(let key in squareColors[keyy]) {
                    if(squareColors[keyy].hasOwnProperty(key)) {
                        value = squareColors[keyy][key];
                        if(key != 'patreon') {
                            actualKey = []
                            for (let i = 0; i < key.length; i++) {
                                if(key[i] == key[i].toUpperCase()) {
                                    actualKey.push('-')
                                    actualKey.push(key[i].toLowerCase())
                                } else {
                                    actualKey.push(key[i])
                                }
                            }
                            actualKey = actualKey.join('')
                            if(value.includes('gradient')) {
                                root.style.setProperty('--' + actualKey + '-grad', value);
                            } else {
                                root.style.setProperty('--' + actualKey, value);
                                root.style.setProperty('--' + actualKey + '-grad', 'none');
                            }   
                        }
                    }
                }
            }
        }
    }

    /*  Promotion  */

    let promo = document.createElement("div")
    promo.classList.add('promotion')
    promo.classList.add('none')
    board.appendChild(promo)


    /*  Take without moving  */

    let takeWithout = document.createElement("div")
    takeWithout.classList.add('take-without-moving')
    takeWithout.innerHTML = `
        <div>Take without moving?</div>
        <div class="options">
            <div class="button button-main">yes</div>
            <div class="button button-main active">nope</div>
        </div>
    `
    board.appendChild(takeWithout)


    /*  End Screen  */

    if(document.querySelector('.end-screen') == null) {
        let endScreen = document.createElement("div")
        endScreen.classList.add('end-screen')
        endScreen.innerHTML = `
            <div class="winner"></div>
            <a class="rematch" href="">
                <div class="button button-main">rematch</div>
            </a>
            <div class="button button-main rematch" onclick="endGamePopupHide()">close</div>
        `
        document.querySelector('body').appendChild(endScreen)
    }
}

function deleteSquares(startCol, endCol, startRow, endRow) {
    for(let j = startCol; j <= endCol; j++) {
        for(let k = startRow; k <= endRow; k++) {
            getSquareFromCords(j, k).classList.add('disabled')
        }
    }
    squares = board.querySelectorAll('.square:not(.disabled)')
}

