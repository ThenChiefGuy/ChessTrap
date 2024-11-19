var urlParams = new URLSearchParams(window.location.search); // supported on most modern browsers
var variant = urlParams.get('variant')


if(window.location.href.includes('play.html')) {
    switch (variant) {
        //#region
        case '2.0':
            document.querySelector('.variant-icon').src = '../img/2.0/whitePieces/twoColoredBishop.png'
            document.querySelector('.variant-name').innerHTML = 'Chess 2.0'
            document.querySelector('.actual-desc').innerHTML = "My first ever chess update, it's not the greatest, but you can give it a go and see for yourself."
            var feature = document.createElement('div')
            feature.classList.add('feature')
            feature.innerHTML = `
                <div class="button button-main button-dash feature-button">
                    <div>with shop</div>
                    <div>not available</div>
                    <!-- <img src="../img/2.0/shop.png" alt="play with the shop"> -->
                </div>
                <div class="button button-main button-dash feature-button active">
                    <div>no shop</div>
                    <img src="../img/2.0/noShop.png" alt="play without the shop">
                </div>
            `
            document.querySelector('.side-bar.side-bar-1').insertBefore(feature, document.querySelector('a.play'))
            addCssLink('optionsOnSidebar')
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            break;
        case '3.0':
            document.querySelector('.variant-icon').src = '../img/3.0/whitePieces/giraffe.png'
            document.querySelector('.variant-name').innerHTML = 'Chess 3.0'
            document.querySelector('.actual-desc').innerHTML = 'Third version of chess, little better than the last one, but chess 4.0 definitely beats it.'
            var feature = document.createElement('div')
            feature.classList.add('feature')
            feature.innerHTML = `
                <div class="button button-main button-dash feature-button">
                    <div>with quests</div>
                    <div>not available</div>
                    <!-- <img src="../img/3.0/bonus.png" alt=""> -->
                </div>
                <div class="button button-main button-dash feature-button active">
                    <div>no quests</div>
                    <img src="../img/3.0/nofeature.png" alt="">
                </div>
            `
            document.querySelector('.side-bar.side-bar-1').insertBefore(feature, document.querySelector('a.play'))
            addCssLink('optionsOnSidebar')
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            break;
        case '4.0':
            document.querySelector('.variant-icon').src = '../img/4.0/dragonIcon.png'
            document.querySelector('.variant-name').innerHTML = 'Chess 4.0'
            document.querySelector('.actual-desc').innerHTML = `Chess 4.0 is my the best update so far (at least that's what I think),
            but I mean you're the judge so give it a go!`
            var feature = document.createElement('div')
            feature.classList.add('feature')
            feature.innerHTML = `
                <div class="button button-main button-dash feature-button">
                    <div>with cards</div>
                    <img src="../img/4.0/cards.png" alt="">
                </div>
                <div class="button button-main button-dash feature-button active">
                    <div>no cards</div>
                    <img src="../img/4.0/noCards.png" alt="">
                </div>
            `
            document.querySelector('.side-bar.side-bar-1').insertBefore(feature, document.querySelector('a.play'))
            feature = document.createElement('div')
            feature.classList.add('feature')
            feature.innerHTML = `
                <div class="button button-main button-dash feature-button">
                    <div>placing pieces</div>
                    <img src="../img/4.0/placingPiecesIcon.png" alt="">
                </div>
                <div class="button button-main button-dash feature-button active">
                    <div>default setup</div>
                    <img src="../img/4.0/noPlacingPiecesIcon.png" alt="">
                </div>
            `
            document.querySelector('.side-bar.side-bar-1').insertBefore(feature, document.querySelector('a.play'))
            addCssLink('optionsOnSidebar')
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    .feature {
                        height: 20%;
                    }
                </style>
            `
            window.onload = function() {
                var features = document.querySelectorAll('.feature')
        
                for(let i = 0; i < features.length; i++) {
                    let featureChildren = features[i].querySelectorAll('.feature-button')
                    featureChildren.forEach(button => {
                        button.addEventListener('click', (e) => {
                            featureChildren.forEach(but => {
                                but.classList.remove('active')
                            })
                            e.target.classList.add('active')
                            if(!features[0].children[0].classList.contains('active')
                            && !features[1].children[0].classList.contains('active')) {
                                url = 'game.html'
                                placing = false
                            } else if(features[0].children[0].classList.contains('active')
                            && !features[1].children[0].classList.contains('active')) {
                                url = '4.0/cardsChoosing.html'
                                placing = false
                            } else if(!features[0].children[0].classList.contains('active')
                            && features[1].children[0].classList.contains('active')) {
                                url = '4.0/placePieces.html'
                                placing = true
                            } else if(features[0].children[0].classList.contains('active')
                            && features[1].children[0].classList.contains('active')) {
                                url = '4.0/cardsChoosing.html'
                                placing = true
                            }
                            preparePlayButton()
                        })
                    })
                }
                preparePlayButton()
            }
            break;
        case '5.0':
            document.querySelector('.mid-con').innerHTML = `
                <h1 class="variant-name">Chess 5.0</h1>
                <div>
                    <img src="../img/5.0/whitePieces/pig.png" alt="" class="variant-icon">
                    <p class="actual-desc">
                        Chess update with more than 1 board, you can set the number of boards down below ⬇.
                    </p>
                    <div class="feature">
                        <h2>min: 1&nbsp;&nbsp;&nbsp;&nbsp;max: 4</h2>
                        <input type="text" name="" value="2" min="1" max="4" maxlength="1" placeholder="1-4">
                    </div>
                </div>
            `
            var data = {
                alice: [0, 1]
            }
            window.onload = function() {
                document.querySelector('.feature input').addEventListener('change', (e) => {
                    data.alice = []
                    let num = parseInt(document.querySelector('.feature input').value)
                    if(num > document.querySelector('.feature input').max) {
                        num = document.querySelector('.feature input').max
                        document.querySelector('.feature input').value = document.querySelector('.feature input').max
                    } else if(num < document.querySelector('.feature input').min) {
                        num = document.querySelector('.feature input').min
                        document.querySelector('.feature input').value = document.querySelector('.feature input').min
                    }
                    for(let i = 0; i < num; i++) {
                        data.alice.push(i)
                    }
                })
            }
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    .feature {
                        height: 30%;
                        justify-content: flex-start;
                        flex-direction: column;
                    }

                    input {
                        width: 6rem;
                        font-size: 3rem;
                    }
                </style>
            `
            break;
        case 'atomic2.0':
            document.querySelector('.variant-name').innerHTML = 'Atomic Chess 2.0'
            document.querySelector('.variant-icon').src = '../img/atomic2.0/atomic2Icon.png'
            document.querySelector('.actual-desc').innerHTML = `<h2 style="margin: 0;">*very explosive</h2><br>
            A chess version of atomic chess, a variant, where pieces explode on capture.
            My variant is a lot different though, as it also features missiles you can 
            launch at your opponent to destroy their pieces.`
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            break;
        case 'atomicNormal':
            document.querySelector('.variant-icon').src = '../img/atomic2.0/atomic2Icon.png'
            document.querySelector('.variant-name').innerHTML = 'Atomic-Normal Chess'
            document.querySelector('.actual-desc').innerHTML = `This is what I call atomic-normal chess, it's a variant in which while you 
            play you switch between normal chess and atomic chess every move.<br>
            (it's actually really fun, go try it out)`
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            break;
        case 'cylinder':
            document.querySelector('.variant-name').innerHTML = 'Cylinder Chess'
            document.querySelector('.variant-icon').src = '../img/evolvingPieces/whitePieces/cylinderBishop.png'
            document.querySelector('.actual-desc').innerHTML = `Chess, but the board is a cylinder.`
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            url = 'game.php'
            break;
        case 'disappearing':
            document.querySelector('.variant-name').innerHTML = 'Disappearing Chess'
            document.querySelector('.variant-icon').src = '../img/disappearing/icon.png'
            document.querySelector('.actual-desc').innerHTML = `This is one of my old variants that I created even before Chess 2.0.
                <br>
                <a href="https://www.youtube.com/watch?v=VGDjQH9YrUY">Click here if you wanna watch it.</a>
                <br>
                <br>
                <h2 style="margin: 0;">How it works?</h2>
                <br>
                Basically every move 1 square disappears from the board, the square is
                randomly chosen meaning there's an element of luck here and it can make
                the game really chaotic, enjoy!
            `
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            url = 'game.php'
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    .variant-icon {
                        box-shadow: 0 0 5px 0 var(--text-color);
                    }
            
                    .actual-desc a {
                        color: var(--theme-color);
                        text-decoration: underline;
                    }
                </style>
            `
            break;
        case 'DLC1':
            document.querySelector('.mid-con').innerHTML = `
                <div class="conta button button-main button-dash active">
                    <h2>Small<br>setup</h2>
                    <img class="button" src="../img/DLC1/smallSetup.png" alt="DLC #1 small setup">
                </div>
                <div class="conta button button-main button-dash">
                    <h2>Medium<br>setup</h2>
                    <img class="button" src="../img/DLC1/mediumSetup.png" alt="DLC #1 medium setup">
                </div>
                <div class="conta button button-main button-dash">
                    <h2>Big<br>setup</h2>
                    <img class="button" src="../img/DLC1/bigSetup.png" alt="DLC #1 big setup">
                </div>
                <div class="conta button button-main button-dash">
                    <h2>Custom<br>setup</h2>
                    <img class="button" src="../img/DLC1/DLCIcon.png" alt="DLC #1 custom setup">
                </div>
            `
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    .container {
                        align-items: center;
                    }
            
                    .mid-container {
                        justify-content: center;
                    }
            
                    .mid-con {
                        display: grid;
                        grid-template-columns: repeat(2, 40%);
                        justify-content: center;
                        justify-items: center;
                        align-content: center;
                        gap: 2.5rem;
                        background-color: inherit;
                        padding: 0;
                    }
            
                    .conta {
                        display: flex;
                        justify-content: space-evenly;
                        align-items: center;
                        flex-direction: row;
                    }
            
                    .conta > * {
                        pointer-events: none;
                    }
                    .conta > img {
                        height: 35%;
                        width: 35%;
                    }
            
            
                    /*  Media Queries  */
            
                    /* Medium devices (landscape tablets, 992px and down) */
                    @media only screen and (max-width: 992px) {
                        h2 {
                            font-size: 1.4rem;
                        }
                    }
            
                    /* Small devices (portrait tablets and large phones, 768px and down) */
                    @media only screen and (max-width: 768px) {
                        .mid-container {
                            margin-bottom: 1rem;
                        }
            
                        h2 {
                            font-size: 1.2rem;
                        }
                    }
            
                    /* Extra small devices (phones, 600px and down) */
                    @media only screen and (max-width: 600px) {
                        h2 {
                            font-size: 0.9rem;
                        }
                    }
                </style>
            `
            document.querySelector('.mid-con').classList.remove('variant-desc', 'cool-p')
            window.onload = function() {
                var setups = document.querySelectorAll('.conta.button')
                var url = 'small.html'
                variant = 'DLC1Small'

                document.querySelectorAll('.conta.button').forEach(button => {
                    button.addEventListener('click', function(e) {
                        setups.forEach(but => {
                            but.classList.remove('active')
                        })
                        e.target.classList.add('active')
        
                        switch (e.target) {
                            case setups[0]:
                                url = 'small.html'
                                variant = 'DLC1Small'
                                break;
                            case setups[1]:
                                url = 'medium.html'
                                variant = 'DLC1Medium'
                                break;
                            case setups[2]:
                                url = 'big.html'
                                variant = 'DLC1Big'
                                break;
                            case setups[3]:
                                url = '../positionEditor/play.php'
                                break;
                            default:
                                url = 'small.html'
                                break;
                        }
                    })
                })
            }
            break;
        case 'evolvingPieces':
            document.querySelector('.variant-name').innerHTML = 'Evolution Chess'
            document.querySelector('.variant-icon').src = '../img/evolvingPieces/whitePieces/bomber.png'
            document.querySelector('.actual-desc').innerHTML = 'In this chess variant your pieces evolve every 3 moves that you make with that piece!'
            document.querySelector('.mid-container').innerHTML = document.querySelector('.mid-container').innerHTML +
            `<div class="con new-con mid-con variant-desc">
                <a class="button patreon-only" href="../variants/play.html?variant=cylinder">
                    <img src="../img/cylinder/thumb.jpg" alt="Cylinder">
                </a>
            </div>`
            addCssLink('../mainPage/main', '../play.css')
            addCssLink('secondVariant')
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            break;
        case 'halfBoard':
            document.querySelector('.variant-name').innerHTML = 'Half Chess'
            document.querySelector('.actual-desc').innerHTML = "This is chess, but on only half the board!"
            document.querySelector('.variant-icon').src = '../img/half/board.png'
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            url = 'game.php'
            break;
        case 'jesterArmy':
            document.querySelector('.variant-name').innerHTML = 'Jester Chess'
            document.querySelector('.variant-icon').src = '../img/3.0/whitePieces/jester.png'
            document.querySelector('.actual-desc').innerHTML = `Jester Chess is basically a Normal Chess Set Vs Jester Army.
            <br>
            <br>
            Btw jester moves like a previously moved by opponent piece.`
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            url = 'game.php'
            break;
        case 'lava':
            document.querySelector('.variant-name').innerHTML = 'Lava Chess'
            document.querySelector('.variant-icon').src = '../img/lava/thumbBoard.png'
            document.querySelector('.actual-desc').innerHTML = ''
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            addCssLink('biggerVariantIcon')
            break;
        case 'magical':
            
            break;
        case 'massive':
            document.querySelector('.variant-name').innerHTML = 'Massive Chess'
            document.querySelector('.variant-icon').src = '../img/massive/whitePieces/massiveHippoLeft.png'
            document.querySelector('.mid-container').innerHTML = document.querySelector('.mid-container').innerHTML +
            `<div class="con new-con mid-con variant-desc">
                <a class="button patreon-only" href="../variants/play.html?variant=massive2.0">
                    <img src="../img/massive/2.0/thumb.jpg" alt="Massive Chess 2.0">
                </a>
            </div>`
            addCssLink('../mainPage/main', '../play.css')
            addCssLink('secondVariant')
            break;
        case 'massive2.0':
            document.querySelector('.variant-name').innerHTML = 'Massive Chess <h1 style="font-size: 4rem; margin: 0;" class="variant-name">(2.0)</h1>'
            document.querySelector('.variant-icon').src = '../img/massive/2.0/thumb.jpg'
            document.querySelector('.mid-container').innerHTML = document.querySelector('.mid-container').innerHTML +
            `<div class="mid-con variant-desc cool-p">
                <div>
                    <a href="massive2.0/2.0Pieces.php">
                        <div class="play-button button button-main">How the pieces move?</div>
                    </a>
                </div>
            </div>`
            addCssLink('secondVariant')
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    .variant-name {
                        margin-bottom: 0;
                    }

                    .variant-icon {
                        border-radius: 1rem;
                        margin-top: 2rem;
                    }
                </style>
            `
            url = 'game.php'
            break;
        case 'triangle':
            document.querySelector('.variant-name').innerHTML = 'Triangle Chess'
            document.querySelector('.variant-icon').src = '../img/triangle/triangleWithPiece.png'
            document.querySelector('.actual-desc').innerHTML = 'Chess on a Triangle Board!'
            document.querySelector('.mid-container').innerHTML = document.querySelector('.mid-container').innerHTML +
            `<div class="mid-con variant-desc cool-p">
                <!-- <h1 class="variant-name">Custom Position</h1> -->
                <div>
                    <a href="triangle/posEditor.php">
                        <!-- <img src="../img/triangle/triangleWithPiece.png" alt="" class="variant-icon button button-main button-dash"> -->
                        <div class="play-button button button-main">Setup<br>Custom Position</div>
                    </a>
                    <p class="actual-desc">
                        Setup your custom position on Triangle Board!<br>(Patrons only)
                    </p>
                </div>
            </div>`
            addCssLink('secondVariant')
            break;
        case 'vsCheckers':
            document.querySelector('.mid-con').innerHTML = `
                <h1 class="variant-name">Chess VS Checkers...</h1>
                <div>
                    <img src="../img/checkers/checkers.png" alt="" class="variant-icon">
                    <h2>Choose colors:</h2>
                    <div class="button button-main feature-but active">Chess white, Checkers black</div>
                    <div class="button button-main feature-but">Chess black, Checkers white</div>
                </div>
            `
            addCssLink('choiceInMidCon')
            var data = {
                ...data,
                normalWhite: true
            }
            window.onload = function() {
                document.querySelectorAll('.feature-but').forEach(button => {
                    button.addEventListener('click', (e) => {
                        document.querySelectorAll('.feature-but').forEach(but => {
                            but.classList.remove('active')
                        })
                        e.target.classList.add('active')
                        if(document.querySelectorAll('.feature-but')[0] == e.target) {
                            data.normalWhite = true
                        } else {
                            data.normalWhite = false
                        }
                    })
                })
            }
            break;
        case 'water':
            document.querySelector('.variant-name').innerHTML = 'Water Chess'
            document.querySelector('.variant-icon').src = '../img/water/waterBg.png'
            document.querySelector('.actual-desc').innerHTML = ''
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            addCssLink('biggerVariantIcon')
            break;
        //#endregion
        case 'evolvingPieces2':
            document.querySelector('.variant-name').innerHTML = 'Evolution Chess 2'
            document.querySelector('.variant-icon').src = '../img/evolvingPieces/whitePieces/bomber.png'
            document.querySelector('.actual-desc').innerHTML = 'Part 2 of chess variant where pieces evolve!'
            addCssLink('../mainPage/main', '../play.css')
            addCssLink('secondVariant')
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            break;
        case 'tiny':
            document.querySelector('.variant-name').innerHTML = 'Tiny Chess'
            document.querySelector('.variant-icon').src = '../img/tiny/miniBoard.png'
            document.querySelector('.actual-desc').innerHTML = 'TINY Chess!'
            data = {
                winConditions: ['checkmate'],
                drawConditions: []
            }
            break;
        case 'lavaVsWater':
            document.querySelector('.mid-con').innerHTML = `
                <h1 class="variant-name">Lava VS Water...</h1>
                <div>
                    <img src="../img/lavaVsWater/thumb.jpg" alt="" class="variant-icon">
                    <h2>Choose colors:</h2>
                    <div class="button button-main feature-but active">Water white, Lava black</div>
                    <div class="button button-main feature-but">Water black, Lava white</div>
                </div>
            `
            addCssLink('choiceInMidCon')
            data = {
                ...data,
                normalWhite: true,
                winConditions: ['checkmate'],
                drawConditions: []
            }
            window.onload = function() {
                document.querySelectorAll('.feature-but').forEach(button => {
                    button.addEventListener('click', (e) => {
                        document.querySelectorAll('.feature-but').forEach(but => {
                            but.classList.remove('active')
                        })
                        e.target.classList.add('active')
                        if(document.querySelectorAll('.feature-but')[0] == e.target) {
                            data.normalWhite = true
                        } else {
                            data.normalWhite = false
                        }
                    })
                })
            }
            break;
        default:
            break;
    }
} else {
    switch (data.variant) {
        //#region
        case '2.0':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/2.0/whitePieces/doubleKing.png" alt="double king" class="piece" royal="true">
                <img src="../img/2.0/whitePieces/god.png" alt="god" class="piece">
                <img src="../img/2.0/whitePieces/megaQueen.png" alt="mega queen" class="piece">
                <img src="../img/2.0/whitePieces/megaQueen.png" alt="mega queen" class="piece">
                <img src="../img/2.0/whitePieces/twoColoredBishop.png" alt="two colored bishop" class="piece">
                <img src="../img/2.0/whitePieces/twoColoredBishop.png" alt="two colored bishop" class="piece">
                <img src="../img/2.0/whitePieces/infinityKnight.png" alt="infinity knight" class="piece">
                <img src="../img/2.0/whitePieces/infinityKnight.png" alt="infinity knight" class="piece">
                <img src="../img/2.0/whitePieces/jumper.png" alt="jumper" class="piece">
                <img src="../img/2.0/whitePieces/jumper.png" alt="jumper" class="piece">

                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/whitePieces/nwap.png" alt="nwap" class="piece">


                <img src="../img/2.0/blackPieces/doubleKing.png" alt="double king" class="piece" royal="true">
                <img src="../img/2.0/blackPieces/god.png" alt="god" class="piece">
                <img src="../img/2.0/blackPieces/megaQueen.png" alt="mega queen" class="piece">
                <img src="../img/2.0/blackPieces/megaQueen.png" alt="mega queen" class="piece">
                <img src="../img/2.0/blackPieces/twoColoredBishop.png" alt="two colored bishop" class="piece">
                <img src="../img/2.0/blackPieces/twoColoredBishop.png" alt="two colored bishop" class="piece">
                <img src="../img/2.0/blackPieces/infinityKnight.png" alt="infinity knight" class="piece">
                <img src="../img/2.0/blackPieces/infinityKnight.png" alt="infinity knight" class="piece">
                <img src="../img/2.0/blackPieces/jumper.png" alt="jumper" class="piece">
                <img src="../img/2.0/blackPieces/jumper.png" alt="jumper" class="piece">

                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
                <img src="../img/2.0/blackPieces/nwap.png" alt="nwap" class="piece">
            `
            generateBoardHtml(10, 10)
            var neutralMove = 40

            window.onload = function() {
                setHist = true
                setPiecePos(6, 10, 0)
                setPiecePos(5, 10, 1)
                setPiecePos(7, 10, 2)
                setPiecePos(4, 10, 3)
                setPiecePos(3, 10, 4)
                setPiecePos(8, 10, 5)
                setPiecePos(2, 10, 6)
                setPiecePos(9, 10, 7)
                setPiecePos(1, 10, 8)
                setPiecePos(10, 10, 9)

                setPiecePos(1, 9, 10)
                setPiecePos(2, 9, 11)
                setPiecePos(3, 9, 12)
                setPiecePos(4, 9, 13)
                setPiecePos(5, 9, 14)
                setPiecePos(6, 9, 15)
                setPiecePos(7, 9, 16)
                setPiecePos(8, 9, 17)
                setPiecePos(9, 9, 18)
                setPiecePos(10, 9, 19)


                setPiecePos(6, 1, 20)
                setPiecePos(5, 1, 21)
                setPiecePos(7, 1, 22)
                setPiecePos(4, 1, 23)
                setPiecePos(3, 1, 24)
                setPiecePos(8, 1, 25)
                setPiecePos(2, 1, 26)
                setPiecePos(9, 1, 27)
                setPiecePos(1, 1, 28)
                setPiecePos(10, 1, 29)

                setPiecePos(1, 2, 30)
                setPiecePos(2, 2, 31)
                setPiecePos(3, 2, 32)
                setPiecePos(4, 2, 33)
                setPiecePos(5, 2, 34)
                setPiecePos(6, 2, 35)
                setPiecePos(7, 2, 36)
                setPiecePos(8, 2, 37)
                setPiecePos(9, 2, 38)
                setPiecePos(10, 2, 39)
                setHist = false
            }
            var promotionPieces = [
                'infinityKnight',
                'twoColoredBishop',
                'jumper',
                'megaQueen',
                'god'
            ]
            var chess2Pieces = [
                'nwap',
                'infinityKnight',
                'twoColoredBishop',
                'jumper',
                'megaQueen',
                'doubleKing',
                'god'
            ]
            var chess2Royals = [
                'doubleKing'
            ]
            break;
        case '3.0':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/3.0/blackPieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/peasant.png" alt="" class="piece">
        
                <img src="../img/3.0/whitePieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/peasant.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/peasant.png" alt="" class="piece">
        
        
                <img src="../img/3.0/blackPieces/castle.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/castle.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/donkey.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/donkey.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/cheetah.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/cheetah.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/princess3.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece">
                <img src="../img/3.0/blackPieces/emperor.png" alt="" class="piece" royal="true">
        
                <img src="../img/3.0/whitePieces/castle.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/castle.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/donkey.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/donkey.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/cheetah.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/cheetah.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/princess3.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/jester.png" alt="" class="piece">
                <img src="../img/3.0/whitePieces/emperor.png" alt="" class="piece" royal="true">
            `
            generateBoardHtml(9, 9)
            var neutralMove = 36

            window.onload = function() {
                setHist = true
                setPiecePos(1, 2, 0)
                setPiecePos(2, 2, 1)
                setPiecePos(3, 2, 2)
                setPiecePos(4, 2, 3)
                setPiecePos(5, 2, 4)
                setPiecePos(6, 2, 5)
                setPiecePos(7, 2, 6)
                setPiecePos(8, 2, 7)
                setPiecePos(9, 2, 8)

                setPiecePos(1, 8, 9)
                setPiecePos(2, 8, 10)
                setPiecePos(3, 8, 11)
                setPiecePos(4, 8, 12)
                setPiecePos(5, 8, 13)
                setPiecePos(6, 8, 14)
                setPiecePos(7, 8, 15)
                setPiecePos(8, 8, 16)
                setPiecePos(9, 8, 17)


                setPiecePos(1, 1, 18)
                setPiecePos(9, 1, 19)
                setPiecePos(2, 1, 20)
                setPiecePos(8, 1, 21)
                setPiecePos(3, 1, 22)
                setPiecePos(7, 1, 23)
                setPiecePos(4, 1, 24)
                setPiecePos(6, 1, 25)
                setPiecePos(5, 1, 26)

                setPiecePos(1, 9, 27)
                setPiecePos(9, 9, 28)
                setPiecePos(2, 9, 29)
                setPiecePos(8, 9, 30)
                setPiecePos(3, 9, 31)
                setPiecePos(7, 9, 32)
                setPiecePos(4, 9, 33)
                setPiecePos(6, 9, 34)
                setPiecePos(5, 9, 35)
                setHist = false
            }
            var promotionPieces = [
                'donkey',
                'cheetah',
                'castle',
                'princess3',
                'jester'
            ]
            var chess3Pieces = [
                'peasant',
                'donkey',
                'cheetah',
                'castle',
                'princess3',
                'jester',
                'emperor'
            ]
            var chess3Royals = [
                'emperor'
            ]
            
            function quests(piece) {
                let array = []
            
                switch (getImgFileName(piece)) {
                    case 'peasant':
                        if(enpassant != undefined) {
                            array.push('gigaPeasant')
                        }
                        break;
                    default:
                        break;
                }
            }
            break;
        case '4.0':
            var placeForPieces = document.querySelector('.pieces')
            generateBoardHtml(8, 8)
            var neutralMove = 0

            if(data.hist != undefined) {
                placeForPieces.innerHTML = ''
                data.pieces.forEach(piece => {
                    let img = document.createElement("img")
                    img.src = piece
                    img.classList.add('piece')
                    img.setAttribute('col', 0)
                    img.setAttribute('row', 0)
                    placeForPieces.appendChild(img)
                })
            } else {
                placeForPieces.innerHTML = `<img src="../img/4.0/blackPieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/blackPieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/blackPieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/blackPieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/blackPieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/blackPieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/blackPieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/blackPieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/blackPieces/dragon.png" alt="" class="piece"><img src="../img/4.0/blackPieces/neutral.png" alt="" class="piece"><img src="../img/4.0/blackPieces/fireDemon.png" alt="" class="piece"><img src="../img/4.0/blackPieces/queen4.png" alt="" class="piece" royal="true"><img src="../img/4.0/blackPieces/king4.png" alt="" class="piece" royal="true"><img src="../img/4.0/blackPieces/grasshopper.png" alt="" class="piece"><img src="../img/4.0/blackPieces/actualKnight.png" alt="" class="piece"><img src="../img/4.0/blackPieces/unicorn.png" alt="" class="piece"><img src="../img/4.0/whitePieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/whitePieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/whitePieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/whitePieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/whitePieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/whitePieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/whitePieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/whitePieces/bodyguard.png" alt="" class="piece"><img src="../img/4.0/whitePieces/unicorn.png" alt="" class="piece"><img src="../img/4.0/whitePieces/actualKnight.png" alt="" class="piece"><img src="../img/4.0/whitePieces/grasshopper.png" alt="" class="piece"><img src="../img/4.0/whitePieces/queen4.png" alt="" class="piece" royal="true"><img src="../img/4.0/whitePieces/king4.png" alt="" class="piece" royal="true"><img src="../img/4.0/whitePieces/fireDemon.png" alt="" class="piece"><img src="../img/4.0/whitePieces/neutral.png" alt="" class="piece"><img src="../img/4.0/whitePieces/dragon.png" alt="" class="piece"><img src="../img/4.0/blackPieces/kiok.png" alt="" class="piece"><img src="../img/4.0/blackPieces/princess4.png" alt="" class="piece" royal="true"><img src="../img/4.0/blackPieces/prince.png" alt="" class="piece" royal="true"><img src="../img/4.0/whitePieces/kiok.png" alt="" class="piece"><img src="../img/4.0/whitePieces/princess4.png" alt="" class="piece" royal="true"><img src="../img/4.0/whitePieces/prince.png" alt="" class="piece" royal="true">`
            }

            var promotionPieces = [
                'actualKnight',
                'unicorn',
                'grasshopper',
                'kiok',
                'dragon',
                'neutral',
                'fireDemon'
            ]
            var normalPromotionPieces = [
                'actualKnight',
                'unicorn',
                'grasshopper',
                'kiok',
                'dragon',
                'neutral',
                'fireDemon'
            ]
            var extendedPromotionPieces = [
                'infinityKnight',
                'twoColoredBishop',
                'jumper',
                'megaQueen',
                'god',
                'donkey',
                'cheetah',
                'castle',
                'princess3',
                'jester',
                'actualKnight',
                'unicorn',
                'grasshopper',
                'kiok',
                'dragon',
                'neutral',
                'fireDemon'
            ]
            var chess4Pieces = [
                'bodyguard',
                'actualKnight',
                'unicorn',
                'prince',
                'king4',
                'princess4',
                'queen4',
                'grasshopper',
                'kiok',
                'dragon',
                'neutral',
                'fireDemon'
            ]
            var chess4Royals = [
                'prince',
                'king4',
                'princess4',
                'queen4'
            ]
            
            
            var chess3Pieces = [
                'peasant',
                'donkey',
                'cheetah',
                'castle',
                'princess3',
                'jester',
                'emperor'
            ]
            var chess2Pieces = [
                'nwap',
                'infinityKnight',
                'twoColoredBishop',
                'jumper',
                'megaQueen',
                'doubleKing',
                'god'
            ]

            window.onload = function() {
                if(data.hist != undefined) {
                    pieces = document.querySelectorAll('.piece')
                    neutralMove = data.hist.length
        
                    setHist = true
                    let whiteRoyals = 0
                    let blackRoyals = 0
                    data.hist.forEach(i => {
                        if((isPieceWhite(getPieceFromId(i[2])) ? whiteRoyals < 4 : blackRoyals < 4)
                        && chess4Royals.includes(getImgFileName(getPieceFromId(i[2])))) {
                            getPieceFromId(i[2]).setAttribute('royal', true)
                            isPieceWhite(getPieceFromId(i[2])) ? whiteRoyals++ : blackRoyals++
                        }
                        setPiecePos(...i)
                    })
                    setHist = false
                } else {
                    neutralMove = 38
        
                    setHist = true
                    setPiecePos(1, 3, 0)
                    setPiecePos(2, 3, 1)
                    setPiecePos(3, 3, 2)
                    setPiecePos(4, 3, 3)
                    setPiecePos(5, 3, 4)
                    setPiecePos(6, 3, 5)
                    setPiecePos(7, 3, 6)
                    setPiecePos(8, 3, 7)
        
                    setPiecePos(1, 1, 8)
                    setPiecePos(2, 1, 9)
                    setPiecePos(3, 1, 10)
                    setPiecePos(4, 1, 11)
                    setPiecePos(5, 1, 12)
                    setPiecePos(6, 1, 13)
                    setPiecePos(7, 1, 14)
                    setPiecePos(8, 1, 15)
        
        
                    setPiecePos(1, 6, 16)
                    setPiecePos(2, 6, 17)
                    setPiecePos(3, 6, 18)
                    setPiecePos(4, 6, 19)
                    setPiecePos(5, 6, 20)
                    setPiecePos(6, 6, 21)
                    setPiecePos(7, 6, 22)
                    setPiecePos(8, 6, 23)
        
                    setPiecePos(1, 8, 24)
                    setPiecePos(2, 8, 25)
                    setPiecePos(3, 8, 26)
                    setPiecePos(4, 8, 27)
                    setPiecePos(5, 8, 28)
                    setPiecePos(6, 8, 29)
                    setPiecePos(7, 8, 30)
                    setPiecePos(8, 8, 31)
        
        
        
                    setPiecePos(8, 2, 32)
                    setPiecePos(4, 2, 33)
                    setPiecePos(5, 2, 34)
        
        
                    setPiecePos(1, 7, 35)
                    setPiecePos(4, 7, 36)
                    setPiecePos(5, 7, 37)
                    setHist = false
                }
                resize()
            }
            break;
        case '5.0':
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    .board-con {
                        height: 100%;
                        width: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
            
                    .side-bar-game {
                        height: 80% !important;
                    }
                </style>
            `
            document.querySelector('.mid-container').innerHTML = `
                <div class="board-con">
                    <div class="board">
                        <div class="pieces">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">

                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">


                            <img src="../img/5.0/blackPieces/knightrider2_bishop.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pig.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/centaur.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/tank.png" alt="" class="piece" lives="2">
                            <img src="../img/5.0/blackPieces/king5.png" alt="" class="piece" royal="true">
                            <img src="../img/5.0/blackPieces/centaur.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pig.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/knightrider2_bishop.png" alt="" class="piece">

                            <img src="../img/5.0/whitePieces/knightrider2_bishop.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pig.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/centaur.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/tank.png" alt="" class="piece" lives="2">
                            <img src="../img/5.0/whitePieces/king5.png" alt="" class="piece" royal="true">
                            <img src="../img/5.0/whitePieces/centaur.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pig.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/knightrider2_bishop.png" alt="" class="piece">
                        </div>
                    </div>
                </div>
                <div class="board-con">
                    <div class="board">
                        <div class="pieces">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/pawn5.png" alt="" class="piece">

                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/pawn5.png" alt="" class="piece">


                            <img src="../img/5.0/blackPieces/shieldedBishop.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/immobilizer.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/llama.png" alt="" class="piece">
                            <img src="../img/5.0/blackPieces/viking.png" alt="" class="piece">

                            <img src="../img/5.0/whitePieces/shieldedBishop.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/immobilizer.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/llama.png" alt="" class="piece">
                            <img src="../img/5.0/whitePieces/viking.png" alt="" class="piece">
                        </div>
                    </div>
                </div>
            `
            data = {
                ...data,
                whiteCard: 'moreLives+5',
                blackCard: 'moreLives+5',
                lives: [[19, 2], [27, 2]]
            }
            if(data.alice.length > 1) data.lives = [[19, 2], [27, 2], [48, 1], [52, 1]]
    
            if(data.alice.length == 1) document.querySelectorAll('.board-con')[1].remove()
    
            document.querySelectorAll('.board').forEach(i => {
                board = i
                generateBoardHtml(8, 8)
            })
    
            for(let i = 2; i < data.alice.length; i++) {
                let div = document.createElement("div")
                div.classList.add('board-con')
                document.querySelector('.mid-container').appendChild(div)
                div.innerHTML = `
                    <div class="board">
                        <div class="pieces"></div>
                    </div>
                `
                board = document.querySelectorAll('.board')[i]
                generateBoardHtml(8, 8)
            }
            document.querySelectorAll('.board-con').forEach(i => {
                i.style.width = 100 / document.querySelectorAll('.board-con').length + '%'
            })

            data.features.push('alice')
            neutralMove = 32

            board = document.querySelectorAll('.board')[0]
            columns = board.querySelectorAll('.column')
            squares = board.querySelectorAll('.square')

            window.onload = function() {
                setHist = true
                for (let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 2, i)
                }

                for (let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 7, i+8)
                }


                for (let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 1, i+16)            
                }

                for (let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 8, i+24)            
                }
                histor.forEach(i => {
                    i[3] = {
                        board: 0
                    }
                })

                
                if(document.querySelectorAll('.board').length > 1) {
                    neutralMove = 56

                    board = document.querySelectorAll('.board')[1]
                    columns = board.querySelectorAll('.column')
                    squares = board.querySelectorAll('.square')

                    setPiecePos(2, 1, 32)
                    setPiecePos(2, 2, 33)
                    setPiecePos(3, 2, 34)
                    setPiecePos(4, 2, 35)
                    setPiecePos(5, 2, 36)
                    setPiecePos(6, 2, 37)
                    setPiecePos(7, 2, 38)
                    setPiecePos(7, 1, 39)

                    setPiecePos(2, 8, 40)
                    setPiecePos(2, 7, 41)
                    setPiecePos(3, 7, 42)
                    setPiecePos(4, 7, 43)
                    setPiecePos(5, 7, 44)
                    setPiecePos(6, 7, 45)
                    setPiecePos(7, 7, 46)
                    setPiecePos(7, 8, 47)


                    setPiecePos(3, 1, 48)
                    setPiecePos(4, 1, 49)
                    setPiecePos(5, 1, 50)
                    setPiecePos(6, 1, 51)

                    setPiecePos(3, 8, 52)
                    setPiecePos(4, 8, 53)
                    setPiecePos(5, 8, 54)
                    setPiecePos(6, 8, 55)
                    for(let i = 32; i < histor.length; i++) {
                        histor[i][3] = {
                            board: 1
                        }
                    }
                    
                    pieces = document.querySelectorAll('.board .piece')
                }
                setHist = false
            }

            var promotionPieces = [
                'knightrider2_bishop',
                'bishop_knightrider2',
                'pig',
                'centaur',
                'tank'
            ]

            break;
        case 'atomic2.0':
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    .right-con > .space {
                        height: 17%;
                    }
                </style>
            `
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
        
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
        
        
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">

                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
            `
            generateBoardHtml(8, 8)
            var promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var normalPromotionPieces = promotionPieces
            var chess1Pieces = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var chess1Royals = [
                'king'
            ]
            document.querySelector('.mid-container').innerHTML = document.querySelector('.mid-container').innerHTML + `
                <div class="right-con">
                    <div class="space">
                        <div>1x</div>
                        <img src="../img/atomic2.0/C01.png" alt="" class="missile" quantity="1">
                    </div>
                    <div class="space">
                        <div>1x</div>
                        <img src="../img/atomic2.0/A62.png" alt="" class="missile" quantity="1">
                    </div>
                    <div class="space">
                        <div>1x</div>
                        <img src="../img/atomic2.0/B34.png" alt="" class="missile" quantity="1">
                    </div>
                    <div class="space">
                        <div>1x</div>
                        <img src="../img/atomic2.0/Y20.png" alt="" class="missile" quantity="1">
                    </div>
                    <div class="space">
                        <div>1x</div>
                        <img src="../img/atomic2.0/jesterMissile.png" alt="" class="missile" quantity="1">
                    </div>
                </div>
            `
            var neutralMove = 32
            data.features.push('atomic2')

            window.onload = function() {
                setHist = true
                setPiecePos(1, 2, 0)
                setPiecePos(2, 2, 1)
                setPiecePos(3, 2, 2)
                setPiecePos(4, 2, 3)
                setPiecePos(5, 2, 4)
                setPiecePos(6, 2, 5)
                setPiecePos(7, 2, 6)
                setPiecePos(8, 2, 7)

                setPiecePos(1, 7, 8)
                setPiecePos(2, 7, 9)
                setPiecePos(3, 7, 10)
                setPiecePos(4, 7, 11)
                setPiecePos(5, 7, 12)
                setPiecePos(6, 7, 13)
                setPiecePos(7, 7, 14)
                setPiecePos(8, 7, 15)


                let startIndex = 16
                let randArray = [1, 2, 3, 4, 5, 6, 7, 8]
                let setupArray = []

                for(let j = 0; j < columns.length; j++) {            
                    if(j == 1) {
                        for(let i = 0; i < randArray.length; i++) {
                            let rand = randArray[Math.floor(Math.random() * randArray.length)]
                            if(setupArray[0] % 2 != rand % 2) {
                                setupArray.push(rand)
                                break
                            }
                        }
                    } else if(j < 5) {
                        setupArray.push(randArray[Math.floor(Math.random() * randArray.length)])
                    } else {
                        setupArray.push(randArray[0])
                    }

                    setPiecePos(setupArray[j], 1, startIndex + j)
                    setPiecePos(setupArray[j], columns[0].children.length, startIndex + j + columns.length)
                    randArray.splice(randArray.indexOf(setupArray[j]), 1)
                }
                setHist = false
            }
            break;
        case 'atomicNormal':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
        
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
        
        
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">

                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
            `
            generateBoardHtml(8, 8)
            var promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var normalPromotionPieces = promotionPieces
            var chess1Pieces = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var chess1Royals = [
                'king'
            ]

            var neutralMove = 32
            data.features.push('atomicNormal')

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 2, i)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 7, i+8)
                }


                let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 1, i+16)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 8, i+24)
                }
                setHist = false
            }
            break;
        case 'cylinder':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
        
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
        
        
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">

                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
            `
            generateBoardHtml(8, 8)
            var promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var normalPromotionPieces = promotionPieces
            var chess1Pieces = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var chess1Royals = [
                'king'
            ]

            var neutralMove = 32
            data.features.push('cylinderBoard')

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 2, i)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 7, i+8)
                }


                let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 1, i+16)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 8, i+24)
                }
                setHist = false
            }
            break;
        case 'disappearing':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
        
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
        
        
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">

                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
            `
            generateBoardHtml(8, 8)
            var promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var normalPromotionPieces = promotionPieces
            var chess1Pieces = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var chess1Royals = [
                'king'
            ]

            var neutralMove = 32
            data.features.push('disappearing')

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 2, i)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 7, i+8)
                }


                let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 1, i+16)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 8, i+24)
                }
                setHist = false
            }
            break;
        case 'DLC1Small':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/DLC1/whitePieces/squarePiece.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/dabElephant.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/elephant.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/DLC1/whitePieces/elephant.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/knightBishop.png" alt="" class="piece">

                <img src="../img/DLC1/whitePieces/horseyPawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/horseyPawn.png" alt="" class="piece">


                <img src="../img/DLC1/blackPieces/squarePiece.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/dabElephant.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/elephant.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/DLC1/blackPieces/elephant.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/knightBishop.png" alt="" class="piece">
                
                <img src="../img/DLC1/blackPieces/horseyPawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/horseyPawn.png" alt="" class="piece">
            `
            generateBoardHtml(6, 6)
            var DLC1Pieces = [
                'amazon',
                'archbishop',
                'camel',
                'chancellor',
                'dabbabaRider',
                'dabElephant',
                'elephant',
                'elephantRider',
                'giraffe',
                'giraffeRider',
                'gryphon',
                'horseyPawn',
                'knightBishop',
                'knightRider2',
                'knightRideroBishop',
                'knightWithoutMoving',
                'kniper',
                'modifiedAmazon',
                'noJumpingKnight',
                'pawnRook',
                'pope',
                'rose',
                'roshop',
                'squareKnight',
                'squarePiece',
                'stag',
                'tulip',
                'washop'
            ]
            var promotionPieces = [
                'squarePiece',
                'dabElephant',
                'elephant',
                'knightBishop',
                'horseyPawn'
            ]

            var neutralMove = 24

            window.onload = function() {
                setHist = true
                setPiecePos(1, 6, 0)
                setPiecePos(2, 6, 1)
                setPiecePos(3, 6, 2)
                setPiecePos(4, 6, 3)
                setPiecePos(5, 6, 4)
                setPiecePos(6, 6, 5)

                setPiecePos(1, 5, 6)
                setPiecePos(2, 5, 7)
                setPiecePos(3, 5, 8)
                setPiecePos(4, 5, 9)
                setPiecePos(5, 5, 10)
                setPiecePos(6, 5, 11)

                setPiecePos(1, 1, 12)
                setPiecePos(2, 1, 13)
                setPiecePos(3, 1, 14)
                setPiecePos(4, 1, 15)
                setPiecePos(5, 1, 16)
                setPiecePos(6, 1, 17)

                setPiecePos(1, 2, 18)
                setPiecePos(2, 2, 19)
                setPiecePos(3, 2, 20)
                setPiecePos(4, 2, 21)
                setPiecePos(5, 2, 22)
                setPiecePos(6, 2, 23)
                setHist = false
            }
            break;
        case 'DLC1Medium':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/DLC1/blackPieces/elephant.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/elephant.png" alt="" class="piece">
        
                <img src="../img/DLC1/whitePieces/elephant.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/elephant.png" alt="" class="piece">
        
        
                <img src="../img/DLC1/blackPieces/roshop.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/knightWithoutMoving.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/knightRider2.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/knightRider2.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/amazon.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/camel.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/DLC1/blackPieces/camel.png" alt="" class="piece">

                <img src="../img/DLC1/whitePieces/roshop.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/knightWithoutMoving.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/knightRider2.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/knightRider2.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/amazon.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/camel.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/DLC1/whitePieces/camel.png" alt="" class="piece">
            `
            generateBoardHtml(8, 8)
            var DLC1Pieces = [
                'amazon',
                'archbishop',
                'camel',
                'chancellor',
                'dabbabaRider',
                'dabElephant',
                'elephant',
                'elephantRider',
                'giraffe',
                'giraffeRider',
                'gryphon',
                'horseyPawn',
                'knightBishop',
                'knightRider2',
                'knightRideroBishop',
                'knightWithoutMoving',
                'kniper',
                'modifiedAmazon',
                'noJumpingKnight',
                'pawnRook',
                'pope',
                'rose',
                'roshop',
                'squareKnight',
                'squarePiece',
                'stag',
                'tulip',
                'washop'
            ]
            var promotionPieces = [
                'roshop',
                'knightWithoutMoving',
                'knightRider2',
                'amazon',
                'camel'
            ]

            var neutralMove = 32

            window.onload = function() {
                setHist = true
                setPiecePos(1, 2, 0)
                setPiecePos(2, 2, 1)
                setPiecePos(3, 2, 2)
                setPiecePos(4, 2, 3)
                setPiecePos(5, 2, 4)
                setPiecePos(6, 2, 5)
                setPiecePos(7, 2, 6)
                setPiecePos(8, 2, 7)

                setPiecePos(1, 7, 8)
                setPiecePos(2, 7, 9)
                setPiecePos(3, 7, 10)
                setPiecePos(4, 7, 11)
                setPiecePos(5, 7, 12)
                setPiecePos(6, 7, 13)
                setPiecePos(7, 7, 14)
                setPiecePos(8, 7, 15)


                setPiecePos(3, 1, 16)
                setPiecePos(6, 1, 17)
                setPiecePos(2, 1, 18)
                setPiecePos(7, 1, 19)
                setPiecePos(4, 1, 20)
                setPiecePos(1, 1, 21)
                setPiecePos(5, 1, 22)
                setPiecePos(8, 1, 23)

                setPiecePos(3, 8, 24)
                setPiecePos(6, 8, 25)
                setPiecePos(2, 8, 26)
                setPiecePos(7, 8, 27)
                setPiecePos(4, 8, 28)
                setPiecePos(1, 8, 29)
                setPiecePos(5, 8, 30)
                setPiecePos(8, 8, 31)
                setHist = false
            }
            break;
        case 'DLC1Big':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
            
                <img src="../img/DLC1/blackPieces/rose.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/squareKnight.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/kniper.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/washop.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/stag.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/modifiedAmazon.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/DLC1/blackPieces/knightRider2.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/knightWithoutMoving.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/squareKnight.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/kniper.png" alt="" class="piece">
                <img src="../img/DLC1/blackPieces/rose.png" alt="" class="piece">


                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
            
                <img src="../img/DLC1/whitePieces/rose.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/squareKnight.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/kniper.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/washop.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/stag.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/modifiedAmazon.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/DLC1/whitePieces/knightRider2.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/knightWithoutMoving.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/kniper.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/squareKnight.png" alt="" class="piece">
                <img src="../img/DLC1/whitePieces/rose.png" alt="" class="piece">
            `
            generateBoardHtml(12, 12)
            var DLC1Pieces = [
                'amazon',
                'archbishop',
                'camel',
                'chancellor',
                'dabbabaRider',
                'dabElephant',
                'elephant',
                'elephantRider',
                'giraffe',
                'giraffeRider',
                'gryphon',
                'horseyPawn',
                'knightBishop',
                'knightRider2',
                'knightRideroBishop',
                'knightWithoutMoving',
                'kniper',
                'modifiedAmazon',
                'noJumpingKnight',
                'pawnRook',
                'pope',
                'rose',
                'roshop',
                'squareKnight',
                'squarePiece',
                'stag',
                'tulip',
                'washop'
            ]
            var promotionPieces = [
                'rose',
                'squareKnight',
                'kniper',
                'washop',
                'stag',
                'modifiedAmazon',
                'knightRider2',
                'knightWithoutMoving'
            ]

            var neutralMove = 48

            window.onload = function() {
                setHist = true
                setPiecePos(1, 2, 0)
                setPiecePos(2, 2, 1)
                setPiecePos(3, 2, 2)
                setPiecePos(4, 2, 3)
                setPiecePos(5, 2, 4)
                setPiecePos(6, 2, 5)
                setPiecePos(7, 2, 6)
                setPiecePos(8, 2, 7)
                setPiecePos(9, 2, 8)
                setPiecePos(10, 2, 9)
                setPiecePos(11, 2, 10)
                setPiecePos(12, 2, 11)

                setPiecePos(1, 1, 12)
                setPiecePos(2, 1, 13)
                setPiecePos(3, 1, 14)
                setPiecePos(4, 1, 15)
                setPiecePos(5, 1, 16)
                setPiecePos(6, 1, 17)
                setPiecePos(7, 1, 18)
                setPiecePos(8, 1, 19)
                setPiecePos(9, 1, 20)
                setPiecePos(10, 1, 21)
                setPiecePos(11, 1, 22)
                setPiecePos(12, 1, 23)


                setPiecePos(1, 11, 24)
                setPiecePos(2, 11, 25)
                setPiecePos(3, 11, 26)
                setPiecePos(4, 11, 27)
                setPiecePos(5, 11, 28)
                setPiecePos(6, 11, 29)
                setPiecePos(7, 11, 30)
                setPiecePos(8, 11, 31)
                setPiecePos(9, 11, 32)
                setPiecePos(10, 11, 33)
                setPiecePos(11, 11, 34)
                setPiecePos(12, 11, 35)

                setPiecePos(1, 12, 36)
                setPiecePos(2, 12, 37)
                setPiecePos(3, 12, 38)
                setPiecePos(4, 12, 39)
                setPiecePos(5, 12, 40)
                setPiecePos(6, 12, 41)
                setPiecePos(7, 12, 42)
                setPiecePos(8, 12, 43)
                setPiecePos(9, 12, 44)
                setPiecePos(10, 12, 45)
                setPiecePos(11, 12, 46)
                setPiecePos(12, 12, 47)
                setHist = false
            }
            break;
        case 'evolvingPieces':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
        
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
        
        
                <img src="../img/evolvingPieces/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/queen.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/rook.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/evolvingPieces/blackPieces/rook.png" alt="" class="piece">

                <img src="../img/evolvingPieces/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/evolvingPieces/whitePieces/rook.png" alt="" class="piece">
            `
            generateBoardHtml(8, 8)
            promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var evolutionPieces = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var evolutionStages = [
                ['pawn', 'megaPawn'],
                ['knight', 'camel', 'knightRider2', 'unicorn', 'rose'],
                ['bishop', 'checkerBishop', 'cylinderBishop', 'bomber', 'cylinderBomber'],
                ['rook', 'chancellor', 'castle', 'bigCastle', 'gryphon', 'megaGryphon', 'rookMaster'],
                ['queen', 'amazon', 'megaQueen', 'cylinderAmazon'],
                ['king', 'emperor', 'doubleKing']
            ]

            data.features.push('evolvingPieces')
            var neutralMove = 32

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 2, i)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 7, i+8)
                }


                let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 1, i+16)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 8, i+24)
                }
                setHist = false
            }
            break;
        case 'halfBoard':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
        
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
        
        
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">

                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
            `
            generateBoardHtml(4, 8)
            var promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var normalPromotionPieces = promotionPieces
            var chess1Pieces = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var chess1Royals = [
                'king'
            ]

            var neutralMove = 24

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 4; i++) {
                    setPiecePos(i+1, 3, i)
                }

                for(let i = 0; i < 4; i++) {
                    setPiecePos(i+1, 6, i+4)
                }


                let colsArr = [2, 3, 1, 4]
                for(let i = 0; i < 4; i++) {
                    setPiecePos(colsArr[i], 2, i+8)
                }
                for(let i = 0; i < 4; i++) {
                    setPiecePos(colsArr[i], 1, i+12)
                }

                for(let i = 0; i < 4; i++) {
                    setPiecePos(colsArr[i], 7, i+16)
                }
                for(let i = 0; i < 4; i++) {
                    setPiecePos(colsArr[i], 8, i+20)
                }
                setHist = false
            }
            break;
        case 'jesterArmy':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
        
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
        
        
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">
                <img src="../img/3.0/blackPieces/jester.png" alt="" class="piece" royal="true">

                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
            `
            generateBoardHtml(8, 8)
            var promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var normalPromotionPieces = promotionPieces
            var chess1Pieces = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var chess1Royals = [
                'king'
            ]

            var neutralMove = 32

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 2, i)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 7, i+8)
                }


                let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 1, i+16)
                }

                let o = 0
                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 8, i+24-o)
                }
                setHist = false
            }
            break;
        case 'lava':
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    :root {
                        --background-color-main: rgb(49, 5, 5);
                        --background-color-nav: rgb(42, 3, 3);
                        --color2: rgb(35, 3, 3);
                        --shadow-color: rgb(30, 4, 4);
                        --shadow-dark: rgb(27, 3, 3);
            
                        --theme-darkest: #611414;
                        --theme-darker: #781717;
                        --theme-dark: #971a1a;
                        --theme-color: #ad1d1d;
                        --theme-light: #c81f1f;
            
                        --dark-square: #540000;
                        --light-square: #ab0000;
            
                        --dark-clicked: #c86b00;
                        --light-clicked: #c77a00;
                    }
            
                    .board-con {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
            
                    .board-con:first-of-type {
                        width: 70%;
                        padding: 2.5rem;
                    }
            
                    .board-con:last-of-type {
                        position: relative;
                        width: 30%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        gap: 1rem;
                    }
            
                    .side-bar-game {
                        height: 80% !important;
                    }
            
            
                    .hell > .square {
                        position: relative;
                    }
            
                    .hell-img {
                        width: 60%;
                    }
            
                    .hell-box {
                        position: absolute !important;
                        bottom: -35% !important;
                    }
            
                    .demon-img {
                        position: absolute;
                        width: 40%;
                        z-index: 20;
                        pointer-events: none;
                    }
            
                    .demon-img:first-of-type {
                        left: -20%;
                        transform: rotateY(180deg);
                    }
            
                    .demon-img:last-of-type {
                        right: -20%;
                    }
                </style>
            `
            document.querySelector('.mid-container').innerHTML = `
                <div class="board-con">
                    <div class="board">
                        <div class="pieces">
                            
                        </div>
                        <div class="ability-box">
                            Use ability?
                            <div class="button button-main ability-button">Yes</div>
                        </div>
                    </div>
                </div>
            `

            if(!data.placing) {
                document.querySelector('.mid-container .pieces').innerHTML += `
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
            
                    <img src="../img/lava/whitePieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaPawn.png" alt="" class="piece">
            
            
                    <img src="../img/lava/blackPieces/lavaBishop.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaBishop.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaKnight.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaKnight.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaQueen.png" alt="" class="piece" lavaAbilityUses="1">
                    <img src="../img/lava/blackPieces/lavaRook.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaKing.png" alt="" class="piece" royal="true" lavaAbilityUses="1">
                    <img src="../img/lava/blackPieces/lavaRook.png" alt="" class="piece">

                    <img src="../img/lava/whitePieces/lavaBishop.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaBishop.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaKnight.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaKnight.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaQueen.png" alt="" class="piece" lavaAbilityUses="1">
                    <img src="../img/lava/whitePieces/lavaRook.png" alt="" class="piece">
                    <img src="../img/lava/whitePieces/lavaKing.png" alt="" class="piece" royal="true" lavaAbilityUses="1">
                    <img src="../img/lava/whitePieces/lavaRook.png" alt="" class="piece">
                `
                document.querySelector('.mid-container').innerHTML += `
                    <div class="board-con">
                        <img class="demon-img" src="../img/lava/demon.png" alt="">
                        <img class="hell-img" src="../img/lava/hellText.png" alt="">
                        <img class="demon-img" src="../img/lava/demon.png" alt="">
                        <div class="board hell">
                            <div class="pieces">

                            </div>
                            <div class="ability-box hell-box button button-main">
                                Respawn?
                            </div>
                        </div>
                    </div>
                `
                board = document.querySelectorAll('.board')[0]
                generateBoardHtml(8, 8)
                board = document.querySelectorAll('.board')[1]
                generateBoardHtml(6, 6)

                var neutralMove = 32

                window.onload = function() {
                    board = document.querySelectorAll('.board')[0]

                    setHist = true
                    for(let i = 0; i < 8; i++) {
                        setPiecePos(i+1, 2, i)
                    }

                    for(let i = 0; i < 8; i++) {
                        setPiecePos(i+1, 7, i+8)
                    }


                    let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                    for(let i = 0; i < 8; i++) {
                        setPiecePos(colsArr[i], 1, i+16)
                    }

                    for(let i = 0; i < 8; i++) {
                        setPiecePos(colsArr[i], 8, i+24)
                    }
                    setHist = false

                    histor.forEach(i => {
                        i[3] = {
                            board: 0
                        }
                    })
                }

                data.features.push('lava')

                var hellBox = document.querySelector('.hell-box')
                var hell = document.querySelector('.hell')
            } else if(data.hell == true) {
                document.querySelector('.mid-container').innerHTML += `
                    <div class="board-con">
                        <img class="demon-img" src="../img/lava/demon.png" alt="">
                        <img class="hell-img" src="../img/lava/hellText.png" alt="">
                        <img class="demon-img" src="../img/lava/demon.png" alt="">
                        <div class="board hell">
                            <div class="pieces">

                            </div>
                            <div class="ability-box hell-box button button-main">
                                Respawn?
                            </div>
                        </div>
                    </div>
                `

                var hellBox = document.querySelector('.hell-box')
                var hell = document.querySelector('.hell')
            }

            var promotionPieces = [
                'lavaKnight',
                'lavaBishop',
                'lavaRook',
                'lavaQueen'
            ]
            var lavaPieces = [
                'lavaPawn',
                'lavaKnight',
                'lavaBishop',
                'lavaRook',
                'lavaQueen',
                'lavaKing'
            ]

            data.features.push('lava')

            var magmaSquares = []
            var lavaSquares = []
            var fireSquares = []
            var lavaRookAbility = []
            break;
        case 'magical':
            
            break;
        case 'massive':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">

                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">


                <img src="../img/massive/whitePieces/massiveKingLeft.png" alt="" class="piece" otherParts="39" royal="true">
                <img src="../img/massive/whitePieces/massiveKingRight.png" alt="" class="piece" otherParts="38" royal="true">

                <img src="../img/massive/blackPieces/massiveKingLeft.png" alt="" class="piece" otherParts="41" royal="true">
                <img src="../img/massive/blackPieces/massiveKingRight.png" alt="" class="piece" otherParts="40" royal="true">

                <img src="../img/massive/whitePieces/massiveAlligatorLeft.png" alt="" class="piece" otherParts="43 44">
                <img src="../img/massive/whitePieces/massiveAlligatorMiddle.png" alt="" class="piece" otherParts="42 44">
                <img src="../img/massive/whitePieces/massiveAlligatorRight.png" alt="" class="piece" otherParts="42 43">

                <img src="../img/massive/blackPieces/massiveAlligatorLeft.png" alt="" class="piece" otherParts="46 47">
                <img src="../img/massive/blackPieces/massiveAlligatorMiddle.png" alt="" class="piece" otherParts="45 47">
                <img src="../img/massive/blackPieces/massiveAlligatorRight.png" alt="" class="piece" otherParts="45 46">

                <img src="../img/massive/whitePieces/massiveBearLeft.png" alt="" class="piece" otherParts="49">
                <img src="../img/massive/whitePieces/massiveBearRight.png" alt="" class="piece" otherParts="48">

                <img src="../img/massive/blackPieces/massiveBearLeft.png" alt="" class="piece" otherParts="51">
                <img src="../img/massive/blackPieces/massiveBearRight.png" alt="" class="piece" otherParts="50">

                <img src="../img/massive/whitePieces/massiveRookLeft.png" alt="" class="piece" otherParts="53">
                <img src="../img/massive/whitePieces/massiveRookRight.png" alt="" class="piece" otherParts="52">

                <img src="../img/massive/blackPieces/massiveRookLeft.png" alt="" class="piece" otherParts="55">
                <img src="../img/massive/blackPieces/massiveRookRight.png" alt="" class="piece" otherParts="54">

                <img src="../img/massive/whitePieces/massiveRookLeft.png" alt="" class="piece" otherParts="57">
                <img src="../img/massive/whitePieces/massiveRookRight.png" alt="" class="piece" otherParts="56">

                <img src="../img/massive/blackPieces/massiveRookLeft.png" alt="" class="piece" otherParts="59">
                <img src="../img/massive/blackPieces/massiveRookRight.png" alt="" class="piece" otherParts="58">

                <img src="../img/massive/whitePieces/massiveWallLeft.png" alt="" class="piece" otherParts="61 62">
                <img src="../img/massive/whitePieces/massiveWallMiddle.png" alt="" class="piece" otherParts="60 62">
                <img src="../img/massive/whitePieces/massiveWallRight.png" alt="" class="piece" otherParts="60 61">
                <img src="../img/massive/whitePieces/massiveWallLeft.png" alt="" class="piece" otherParts="64 65">
                <img src="../img/massive/whitePieces/massiveWallMiddle.png" alt="" class="piece" otherParts="63 65">
                <img src="../img/massive/whitePieces/massiveWallRight.png" alt="" class="piece" otherParts="63 64">

                <img src="../img/massive/blackPieces/massiveWallLeft.png" alt="" class="piece" otherParts="67 68">
                <img src="../img/massive/blackPieces/massiveWallMiddle.png" alt="" class="piece" otherParts="66 68">
                <img src="../img/massive/blackPieces/massiveWallRight.png" alt="" class="piece" otherParts="66 67">
                <img src="../img/massive/blackPieces/massiveWallLeft.png" alt="" class="piece" otherParts="70 71">
                <img src="../img/massive/blackPieces/massiveWallMiddle.png" alt="" class="piece" otherParts="69 71">
                <img src="../img/massive/blackPieces/massiveWallRight.png" alt="" class="piece" otherParts="69 70">

                <img src="../img/massive/whitePieces/massiveHippoLeft.png" alt="" class="piece" otherParts="73">
                <img src="../img/massive/whitePieces/massiveHippoRight.png" alt="" class="piece" otherParts="72">

                <img src="../img/massive/blackPieces/massiveHippoLeft.png" alt="" class="piece" otherParts="75">
                <img src="../img/massive/blackPieces/massiveHippoRight.png" alt="" class="piece" otherParts="74">

                <img src="../img/massive/whitePieces/massiveCarLeft.png" alt="" class="piece" otherParts="77">
                <img src="../img/massive/whitePieces/massiveCarRight.png" alt="" class="piece" otherParts="76">

                <img src="../img/massive/blackPieces/massiveCarLeft.png" alt="" class="piece" otherParts="79">
                <img src="../img/massive/blackPieces/massiveCarRight.png" alt="" class="piece" otherParts="78">

                <img src="../img/massive/whitePieces/massiveBishopLeft.png" alt="" class="piece" otherParts="81" rotated="45">
                <img src="../img/massive/whitePieces/massiveBishopRight.png" alt="" class="piece" otherParts="80" rotated="45">

                <img src="../img/massive/blackPieces/massiveBishopLeft.png" alt="" class="piece" otherParts="83" rotated="-45">
                <img src="../img/massive/blackPieces/massiveBishopRight.png" alt="" class="piece" otherParts="82" rotated="-45">

                <img src="../img/massive/whitePieces/massiveBishopLeft.png" alt="" class="piece" otherParts="85" rotated="-45">
                <img src="../img/massive/whitePieces/massiveBishopRight.png" alt="" class="piece" otherParts="84" rotated="-45">

                <img src="../img/massive/blackPieces/massiveBishopLeft.png" alt="" class="piece" otherParts="87" rotated="45">
                <img src="../img/massive/blackPieces/massiveBishopRight.png" alt="" class="piece" otherParts="86" rotated="45">

                <img src="../img/massive/whitePieces/massiveTruckLeft.png" alt="" class="piece" otherParts="89 90">
                <img src="../img/massive/whitePieces/massiveTruckMiddle.png" alt="" class="piece" otherParts="88 90">
                <img src="../img/massive/whitePieces/massiveTruckRight.png" alt="" class="piece" otherParts="88 89">

                <img src="../img/massive/blackPieces/massiveTruckLeft.png" alt="" class="piece" otherParts="92 93">
                <img src="../img/massive/blackPieces/massiveTruckMiddle.png" alt="" class="piece" otherParts="91 93">
                <img src="../img/massive/blackPieces/massiveTruckRight.png" alt="" class="piece" otherParts="91 92">

                <img src="../img/massive/whitePieces/massiveQueenLeftTop.png" alt="" class="piece" otherParts="95 96 97">
                <img src="../img/massive/whitePieces/massiveQueenLeftBottom.png" alt="" class="piece" otherParts="94 96 97">
                <img src="../img/massive/whitePieces/massiveQueenRightTop.png" alt="" class="piece" otherParts="94 95 97">
                <img src="../img/massive/whitePieces/massiveQueenRightBottom.png" alt="" class="piece" otherParts="94 95 96">

                <img src="../img/massive/blackPieces/massiveQueenLeftTop.png" alt="" class="piece" otherParts="99 100 101">
                <img src="../img/massive/blackPieces/massiveQueenLeftBottom.png" alt="" class="piece" otherParts="98 100 101">
                <img src="../img/massive/blackPieces/massiveQueenRightTop.png" alt="" class="piece" otherParts="98 99 101">
                <img src="../img/massive/blackPieces/massiveQueenRightBottom.png" alt="" class="piece" otherParts="98 99 100">

                <img src="../img/massive/whitePieces/massiveKangarooTop.png" alt="" class="piece" otherParts="103">
                <img src="../img/massive/whitePieces/massiveKangarooBottom.png" alt="" class="piece" otherParts="102">

                <img src="../img/massive/blackPieces/massiveKangarooTop.png" alt="" class="piece" otherParts="105">
                <img src="../img/massive/blackPieces/massiveKangarooBottom.png" alt="" class="piece" otherParts="104">
            `
            generateBoardHtml(20, 20)
            var promotionPieces = [
                'massiveAlligatorLeft',
                'massiveAlligatorMiddle',
                'massiveAlligatorRight',
                'massiveBearLeft',
                'massiveBearRight',
                'massiveBishopLeft',
                'massiveBishopRight',
                'massiveCarLeft',
                'massiveCarRight',
                'massiveHippoLeft',
                'massiveHippoRight',
                'massiveKangarooBottom',
                'massiveKangarooTop',
                'massiveQueenLeftBottom',
                'massiveQueenLeftTop',
                'massiveQueenRightBottom',
                'massiveQueenRightTop',
                'massiveRookLeft',
                'massiveRookRight',
                'massiveTruckLeft',
                'massiveTruckMiddle',
                'massiveTruckRight',
                'massiveWallLeft',
                'massiveWallMiddle',
                'massiveWallRight'
            ]
            var massivePieces = [
                'massiveAlligatorLeft',
                'massiveAlligatorMiddle',
                'massiveAlligatorRight',
                'massiveBearLeft',
                'massiveBearRight',
                'massiveBishopLeft',
                'massiveBishopRight',
                'massiveCarLeft',
                'massiveCarRight',
                'massiveHippoLeft',
                'massiveHippoRight',
                'massiveKangarooBottom',
                'massiveKangarooTop',
                'massiveQueenLeftBottom',
                'massiveQueenLeftTop',
                'massiveQueenRightBottom',
                'massiveQueenRightTop',
                'massiveRookLeft',
                'massiveRookRight',
                'massiveTruckLeft',
                'massiveTruckMiddle',
                'massiveTruckRight',
                'massiveWallLeft',
                'massiveWallMiddle',
                'massiveWallRight',
                'massiveKingLeft',
                'massiveKingRight',
                'massivePawn'
            ]

            data.features.push('biggerPieces')

            var neutralMove = 106

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 5; i++) {
                    setPiecePos(i+1, 2, i)
                }
                for(let i = 0; i < 14; i++) {
                    setPiecePos(i+7, 3, i+5)
                }
                for(let i = 0; i < 5; i++) {
                    setPiecePos(i+1, 19, i+19)
                }
                for(let i = 0; i < 14; i++) {
                    setPiecePos(i+7, 18, i+24)
                }

                setPiecePos(10, 20, 38)
                setPiecePos(11, 20, 39)

                setPiecePos(10, 1, 40)
                setPiecePos(11, 1, 41)

                setPiecePos(1, 18, 42)
                setPiecePos(2, 18, 43)
                setPiecePos(3, 18, 44)

                setPiecePos(1, 3, 45)
                setPiecePos(2, 3, 46)
                setPiecePos(3, 3, 47)

                setPiecePos(14, 19, 48)
                setPiecePos(15, 19, 49)

                setPiecePos(14, 2, 50)
                setPiecePos(15, 2, 51)

                setPiecePos(8, 20, 52)
                setPiecePos(9, 20, 53)

                setPiecePos(8, 1, 54)
                setPiecePos(9, 1, 55)
                
                setPiecePos(12, 20, 56)
                setPiecePos(13, 20, 57)

                setPiecePos(12, 1, 58)
                setPiecePos(13, 1, 59)

                setPiecePos(8, 19, 60)
                setPiecePos(9, 19, 61)
                setPiecePos(10, 19, 62)
                setPiecePos(11, 19, 63)
                setPiecePos(12, 19, 64)
                setPiecePos(13, 19, 65)

                setPiecePos(8, 2, 66)
                setPiecePos(9, 2, 67)
                setPiecePos(10, 2, 68)
                setPiecePos(11, 2, 69)
                setPiecePos(12, 2, 70)
                setPiecePos(13, 2, 71)

                setPiecePos(6, 20, 72)
                setPiecePos(7, 20, 73)

                setPiecePos(6, 1, 74)
                setPiecePos(7, 1, 75)

                setPiecePos(14, 20, 76)
                setPiecePos(15, 20, 77)

                setPiecePos(14, 1, 78)
                setPiecePos(15, 1, 79)

                setPiecePos(16, 19, 80)
                setPiecePos(17, 20, 81)

                setPiecePos(16, 2, 82)
                setPiecePos(17, 1, 83)

                setPiecePos(5, 20, 84)
                setPiecePos(6, 19, 85)

                setPiecePos(5, 1, 86)
                setPiecePos(6, 2, 87)

                setPiecePos(1, 20, 88)
                setPiecePos(2, 20, 89)
                setPiecePos(3, 20, 90)

                setPiecePos(1, 1, 91)
                setPiecePos(2, 1, 92)
                setPiecePos(3, 1, 93)

                setPiecePos(18, 19, 94)
                setPiecePos(18, 20, 95)
                setPiecePos(19, 19, 96)
                setPiecePos(19, 20, 97)

                setPiecePos(18, 1, 98)
                setPiecePos(18, 2, 99)
                setPiecePos(19, 1, 100)
                setPiecePos(19, 2, 101)

                setPiecePos(20, 19, 102)
                setPiecePos(20, 20, 103)

                setPiecePos(20, 1, 104)
                setPiecePos(20, 2, 105)
                setHist = false
            }
            startingRow = 3
            break;
        case 'massive2.0':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/blackPieces/massivePawn.png" alt="" class="piece">

                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
                <img src="../img/massive/whitePieces/massivePawn.png" alt="" class="piece">
            
                <img src="../img/massive/2.0/whitePieces/massiveOrangutanLeftTop.png" alt="" class="piece" otherParts="43 44 45">
                <img src="../img/massive/2.0/whitePieces/massiveOrangutanLeftBottom.png" alt="" class="piece" otherParts="42 44 45">
                <img src="../img/massive/2.0/whitePieces/massiveOrangutanRightTop.png" alt="" class="piece" otherParts="42 43 45">
                <img src="../img/massive/2.0/whitePieces/massiveOrangutanRightBottom.png" alt="" class="piece" otherParts="42 43 44">

                <img src="../img/massive/2.0/blackPieces/massiveOrangutanLeftTop.png" alt="" class="piece" otherParts="47 48 49">
                <img src="../img/massive/2.0/blackPieces/massiveOrangutanLeftBottom.png" alt="" class="piece" otherParts="46 48 49">
                <img src="../img/massive/2.0/blackPieces/massiveOrangutanRightTop.png" alt="" class="piece" otherParts="46 47 49">
                <img src="../img/massive/2.0/blackPieces/massiveOrangutanRightBottom.png" alt="" class="piece" otherParts="46 47 48">

                <img src="../img/massive/2.0/whitePieces/massivePinTop.png" alt="" class="piece" otherParts="51">
                <img src="../img/massive/2.0/whitePieces/massivePinBottom.png" alt="" class="piece" otherParts="50">

                <img src="../img/massive/2.0/blackPieces/massivePinTop.png" alt="" class="piece" otherParts="53">
                <img src="../img/massive/2.0/blackPieces/massivePinBottom.png" alt="" class="piece" otherParts="52">

                <img src="../img/massive/2.0/whitePieces/massiveLampTop.png" alt="" class="piece" otherParts="55">
                <img src="../img/massive/2.0/whitePieces/massiveLampBottom.png" alt="" class="piece" otherParts="54">

                <img src="../img/massive/2.0/blackPieces/massiveLampTop.png" alt="" class="piece" otherParts="57">
                <img src="../img/massive/2.0/blackPieces/massiveLampBottom.png" alt="" class="piece" otherParts="56">

                <img src="../img/massive/2.0/whitePieces/massiveJupiterLeftTop.png" alt="" class="piece" otherParts="59 60 61 62 63 64 65 66">
                <img src="../img/massive/2.0/whitePieces/massiveJupiterMiddleTop.png" alt="" class="piece" otherParts="58 60 61 62 63 64 65 66">
                <img src="../img/massive/2.0/whitePieces/massiveJupiterRightTop.png" alt="" class="piece" otherParts="58 59 61 62 63 64 65 66">
                <img src="../img/massive/2.0/whitePieces/massiveJupiterLeftMiddle.png" alt="" class="piece" otherParts="58 59 60 62 63 64 65 66">
                <img src="../img/massive/2.0/whitePieces/massiveJupiterMiddleMiddle.png" alt="" class="piece" otherParts="58 59 60 61 63 64 65 66">
                <img src="../img/massive/2.0/whitePieces/massiveJupiterRightMiddle.png" alt="" class="piece" otherParts="58 59 60 61 62 64 65 66">
                <img src="../img/massive/2.0/whitePieces/massiveJupiterLeftBottom.png" alt="" class="piece" otherParts="58 59 60 61 62 63 65 66">
                <img src="../img/massive/2.0/whitePieces/massiveJupiterMiddleBottom.png" alt="" class="piece" otherParts="58 59 60 61 62 63 64 66">
                <img src="../img/massive/2.0/whitePieces/massiveJupiterRightBottom.png" alt="" class="piece" otherParts="58 59 60 61 62 63 64 65">

                <img src="../img/massive/2.0/blackPieces/massiveJupiterLeftTop.png" alt="" class="piece" otherParts="68 69 70 71 72 73 74 75">
                <img src="../img/massive/2.0/blackPieces/massiveJupiterMiddleTop.png" alt="" class="piece" otherParts="67 69 70 71 72 73 74 75">
                <img src="../img/massive/2.0/blackPieces/massiveJupiterRightTop.png" alt="" class="piece" otherParts="67 68 70 71 72 73 74 75">
                <img src="../img/massive/2.0/blackPieces/massiveJupiterLeftMiddle.png" alt="" class="piece" otherParts="67 68 69 71 72 73 74 75">
                <img src="../img/massive/2.0/blackPieces/massiveJupiterMiddleMiddle.png" alt="" class="piece" otherParts="67 68 69 70 72 73 74 75">
                <img src="../img/massive/2.0/blackPieces/massiveJupiterRightMiddle.png" alt="" class="piece" otherParts="67 68 69 70 71 73 74 75">
                <img src="../img/massive/2.0/blackPieces/massiveJupiterLeftBottom.png" alt="" class="piece" otherParts="67 68 69 70 71 72 74 75">
                <img src="../img/massive/2.0/blackPieces/massiveJupiterMiddleBottom.png" alt="" class="piece" otherParts="67 68 69 70 71 72 73 75">
                <img src="../img/massive/2.0/blackPieces/massiveJupiterRightBottom.png" alt="" class="piece" otherParts="67 68 69 70 71 72 73 74">
            
                <img src="../img/massive/2.0/whitePieces/massiveMarsLeftTop.png" alt="" class="piece" otherParts="77 78 79">
                <img src="../img/massive/2.0/whitePieces/massiveMarsLeftBottom.png" alt="" class="piece" otherParts="76 78 79">
                <img src="../img/massive/2.0/whitePieces/massiveMarsRightTop.png" alt="" class="piece" otherParts="76 77 79">
                <img src="../img/massive/2.0/whitePieces/massiveMarsRightBottom.png" alt="" class="piece" otherParts="76 77 78">

                <img src="../img/massive/2.0/blackPieces/massiveMarsLeftTop.png" alt="" class="piece" otherParts="81 82 83">
                <img src="../img/massive/2.0/blackPieces/massiveMarsLeftBottom.png" alt="" class="piece" otherParts="80 82 83">
                <img src="../img/massive/2.0/blackPieces/massiveMarsRightTop.png" alt="" class="piece" otherParts="80 81 83">
                <img src="../img/massive/2.0/blackPieces/massiveMarsRightBottom.png" alt="" class="piece" otherParts="80 81 82">
            
                <img src="../img/massive/whitePieces/massiveKingLeft.png" alt="" class="piece" otherParts="85" royal="true">
                <img src="../img/massive/whitePieces/massiveKingRight.png" alt="" class="piece" otherParts="84" royal="true">

                <img src="../img/massive/blackPieces/massiveKingLeft.png" alt="" class="piece" otherParts="87" royal="true">
                <img src="../img/massive/blackPieces/massiveKingRight.png" alt="" class="piece" otherParts="86" royal="true">

                <img src="../img/massive/whitePieces/massiveWallLeft.png" alt="" class="piece" otherParts="89 90">
                <img src="../img/massive/whitePieces/massiveWallMiddle.png" alt="" class="piece" otherParts="88 90">
                <img src="../img/massive/whitePieces/massiveWallRight.png" alt="" class="piece" otherParts="88 89">

                <img src="../img/massive/blackPieces/massiveWallLeft.png" alt="" class="piece" otherParts="92 93">
                <img src="../img/massive/blackPieces/massiveWallMiddle.png" alt="" class="piece" otherParts="91 93">
                <img src="../img/massive/blackPieces/massiveWallRight.png" alt="" class="piece" otherParts="91 92">

                <img src="../img/massive/2.0/whitePieces/massiveKnightLeftTop.png" alt="" class="piece" otherParts="95 96 97">
                <img src="../img/massive/2.0/whitePieces/massiveKnightLeftBottom.png" alt="" class="piece" otherParts="94 96 97">
                <img src="../img/massive/2.0/whitePieces/massiveKnightRightTop.png" alt="" class="piece" otherParts="94 95 97">
                <img src="../img/massive/2.0/whitePieces/massiveKnightRightBottom.png" alt="" class="piece" otherParts="94 95 96">
        
                <img src="../img/massive/2.0/blackPieces/massiveKnightLeftTop.png" alt="" class="piece" otherParts="99 100 101">
                <img src="../img/massive/2.0/blackPieces/massiveKnightLeftBottom.png" alt="" class="piece" otherParts="98 100 101">
                <img src="../img/massive/2.0/blackPieces/massiveKnightRightTop.png" alt="" class="piece" otherParts="98 99 101">
                <img src="../img/massive/2.0/blackPieces/massiveKnightRightBottom.png" alt="" class="piece" otherParts="98 99 100">

                <img src="../img/massive/2.0/whitePieces/massiveMegatruckLeft.png" alt="" class="piece" otherParts="103 104 105">
                <img src="../img/massive/2.0/whitePieces/massiveMegatruckMiddleLeft.png" alt="" class="piece" otherParts="102 104 105">
                <img src="../img/massive/2.0/whitePieces/massiveMegatruckMiddleRight.png" alt="" class="piece" otherParts="102 103 105">
                <img src="../img/massive/2.0/whitePieces/massiveMegatruckRight.png" alt="" class="piece" otherParts="102 103 104">
            
                <img src="../img/massive/2.0/blackPieces/massiveMegatruckLeft.png" alt="" class="piece" otherParts="107 108 109">
                <img src="../img/massive/2.0/blackPieces/massiveMegatruckMiddleLeft.png" alt="" class="piece" otherParts="106 108 109">
                <img src="../img/massive/2.0/blackPieces/massiveMegatruckMiddleRight.png" alt="" class="piece" otherParts="106 107 109">
                <img src="../img/massive/2.0/blackPieces/massiveMegatruckRight.png" alt="" class="piece" otherParts="106 107 108">
            
                <img src="../img/massive/2.0/whitePieces/massiveMoonLeftTop.png" alt="" class="piece" otherParts="111 112 113">
                <img src="../img/massive/2.0/whitePieces/massiveMoonLeftBottom.png" alt="" class="piece" otherParts="110 112 113">
                <img src="../img/massive/2.0/whitePieces/massiveMoonRightTop.png" alt="" class="piece" otherParts="110 111 113">
                <img src="../img/massive/2.0/whitePieces/massiveMoonRightBottom.png" alt="" class="piece" otherParts="110 111 112">

                <img src="../img/massive/2.0/blackPieces/massiveMoonLeftTop.png" alt="" class="piece" otherParts="115 116 117">
                <img src="../img/massive/2.0/blackPieces/massiveMoonLeftBottom.png" alt="" class="piece" otherParts="114 116 117">
                <img src="../img/massive/2.0/blackPieces/massiveMoonRightTop.png" alt="" class="piece" otherParts="114 115 117">
                <img src="../img/massive/2.0/blackPieces/massiveMoonRightBottom.png" alt="" class="piece" otherParts="114 115 116">

                <img src="../img/massive/2.0/whitePieces/massiveElephantLeftTop.png" alt="" class="piece" otherParts="119 120 121">
                <img src="../img/massive/2.0/whitePieces/massiveElephantLeftBottom.png" alt="" class="piece" otherParts="118 120 121">
                <img src="../img/massive/2.0/whitePieces/massiveElephantRightTop.png" alt="" class="piece" otherParts="118 119 121">
                <img src="../img/massive/2.0/whitePieces/massiveElephantRightBottom.png" alt="" class="piece" otherParts="118 119 120">

                <img src="../img/massive/2.0/blackPieces/massiveElephantLeftTop.png" alt="" class="piece" otherParts="123 124 125">
                <img src="../img/massive/2.0/blackPieces/massiveElephantLeftBottom.png" alt="" class="piece" otherParts="122 124 125">
                <img src="../img/massive/2.0/blackPieces/massiveElephantRightTop.png" alt="" class="piece" otherParts="122 123 125">
                <img src="../img/massive/2.0/blackPieces/massiveElephantRightBottom.png" alt="" class="piece" otherParts="122 123 124">
            
                <img src="../img/massive/2.0/whitePieces/massiveWhaleLeftTop.png" alt="" class="piece" otherParts="127 128 129 130 131">
                <img src="../img/massive/2.0/whitePieces/massiveWhaleMiddleTop.png" alt="" class="piece" otherParts="126 128 129 130 131">
                <img src="../img/massive/2.0/whitePieces/massiveWhaleRightTop.png" alt="" class="piece" otherParts="126 127 129 130 131">
                <img src="../img/massive/2.0/whitePieces/massiveWhaleLeftBottom.png" alt="" class="piece" otherParts="126 127 128 130 131">
                <img src="../img/massive/2.0/whitePieces/massiveWhaleMiddleBottom.png" alt="" class="piece" otherParts="126 127 128 129 131">
                <img src="../img/massive/2.0/whitePieces/massiveWhaleRightBottom.png" alt="" class="piece" otherParts="126 127 128 129 130">

                <img src="../img/massive/2.0/blackPieces/massiveWhaleLeftTop.png" alt="" class="piece" otherParts="133 134 135 136 137">
                <img src="../img/massive/2.0/blackPieces/massiveWhaleMiddleTop.png" alt="" class="piece" otherParts="132 134 135 136 137">
                <img src="../img/massive/2.0/blackPieces/massiveWhaleRightTop.png" alt="" class="piece" otherParts="132 133 135 136 137">
                <img src="../img/massive/2.0/blackPieces/massiveWhaleLeftBottom.png" alt="" class="piece" otherParts="132 133 134 136 137">
                <img src="../img/massive/2.0/blackPieces/massiveWhaleMiddleBottom.png" alt="" class="piece" otherParts="132 133 134 135 137">
                <img src="../img/massive/2.0/blackPieces/massiveWhaleRightBottom.png" alt="" class="piece" otherParts="132 133 134 135 136">
            `
            generateBoardHtml(24, 24)
            var promotionPieces = [
                'massiveElephantLeftBottom',
                'massiveElephantLeftTop',
                'massiveElephantRightBottom',
                'massiveElephantRightTop',
                'massiveJupiterLeftBottom',
                'massiveJupiterMiddleBottom',
                'massiveJupiterRightBottom',
                'massiveJupiterLeftMiddle',
                'massiveJupiterMiddleMiddle',
                'massiveJupiterRightMiddle',
                'massiveJupiterLeftTop',
                'massiveJupiterMiddleTop',
                'massiveJupiterRightTop',
                'massiveKnightLeftBottom',
                'massiveKnightLeftTop',
                'massiveKnightRightBottom',
                'massiveKnightRightTop',
                'massiveLampBottom',
                'massiveLampTop',
                'massiveMarsLeftBottom',
                'massiveMarsLeftTop',
                'massiveMarsRightBottom',
                'massiveMarsRightTop',
                'massiveMegatruckLeftBottom',
                'massiveMegatruckLeftTop',
                'massiveMegatruckRightBottom',
                'massiveMegatruckRightTop',
                'massiveMoonLeftBottom',
                'massiveMoonLeftTop',
                'massiveMoonRightBottom',
                'massiveMoonRightTop',
                'massiveOrangutanLeftBottom',
                'massiveOrangutanLeftTop',
                'massiveOrangutanRightBottom',
                'massiveOrangutanRightTop',
                'massivePinBottom',
                'massivePinTop',
                'massiveWhaleLeftBottom',
                'massiveWhaleMiddleBottom',
                'massiveWhaleRightBottom',
                'massiveWhaleLeftTop',
                'massiveWhaleMiddleTop',
                'massiveWhaleRightTop',
                'massiveWallLeft',
                'massiveWallMiddle',
                'massiveWallRight'
            ]
            var massive2Pieces = [
                ...promotionPieces,
                'massiveKingLeft',
                'massiveKingRight',
                'massivePawn'
            ]

            data.features.push('biggerPieces')

            var neutralMove = 106

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 4; i++) {
                    setPiecePos(i+1, 3, i)
                }
                for(let i = 0; i < 17; i++) {
                    setPiecePos(i+8, 3, i+4)
                }

                for(let i = 0; i < 4; i++) {
                    setPiecePos(i+1, 22, i+21)
                }
                for(let i = 0; i < 17; i++) {
                    setPiecePos(i+8, 22, i+25)
                }

                setPiecePos(1, 23, 42)
                setPiecePos(1, 24, 43)
                setPiecePos(2, 23, 44)
                setPiecePos(2, 24, 45)

                setPiecePos(1, 1, 46)
                setPiecePos(1, 2, 47)
                setPiecePos(2, 1, 48)
                setPiecePos(2, 2, 49)

                setPiecePos(3, 23, 50)
                setPiecePos(3, 24, 51)

                setPiecePos(3, 1, 52)
                setPiecePos(3, 2, 53)

                setPiecePos(4, 23, 54)
                setPiecePos(4, 24, 55)

                setPiecePos(4, 1, 56)
                setPiecePos(4, 2, 57)

                setPiecePos(5, 22, 58)
                setPiecePos(6, 22, 59)
                setPiecePos(7, 22, 60)
                setPiecePos(5, 23, 61)
                setPiecePos(6, 23, 62)
                setPiecePos(7, 23, 63)
                setPiecePos(5, 24, 64)
                setPiecePos(6, 24, 65)
                setPiecePos(7, 24, 66)

                setPiecePos(5, 1, 67)
                setPiecePos(6, 1, 68)
                setPiecePos(7, 1, 69)
                setPiecePos(5, 2, 70)
                setPiecePos(6, 2, 71)
                setPiecePos(7, 2, 72)
                setPiecePos(5, 3, 73)
                setPiecePos(6, 3, 74)
                setPiecePos(7, 3, 75)

                setPiecePos(8, 23, 76)
                setPiecePos(8, 24, 77)
                setPiecePos(9, 23, 78)
                setPiecePos(9, 24, 79)

                setPiecePos(8, 1, 80)
                setPiecePos(8, 2, 81)
                setPiecePos(9, 1, 82)
                setPiecePos(9, 2, 83)

                setPiecePos(12, 24, 84)
                setPiecePos(13, 24, 85)

                setPiecePos(12, 1, 86)
                setPiecePos(13, 1, 87)

                setPiecePos(12, 23, 88)
                setPiecePos(13, 23, 89)
                setPiecePos(14, 23, 90)

                setPiecePos(12, 2, 91)
                setPiecePos(13, 2, 92)
                setPiecePos(14, 2, 93)

                setPiecePos(10, 23, 94)
                setPiecePos(10, 24, 95)
                setPiecePos(11, 23, 96)
                setPiecePos(11, 24, 97)

                setPiecePos(10, 1, 98)
                setPiecePos(10, 2, 99)
                setPiecePos(11, 1, 100)
                setPiecePos(11, 2, 101)

                setPiecePos(14, 24, 102)
                setPiecePos(15, 24, 103)
                setPiecePos(16, 24, 104)
                setPiecePos(17, 24, 105)

                setPiecePos(14, 1, 106)
                setPiecePos(15, 1, 107)
                setPiecePos(16, 1, 108)
                setPiecePos(17, 1, 109)

                setPiecePos(18, 23, 110)
                setPiecePos(18, 24, 111)
                setPiecePos(19, 23, 112)
                setPiecePos(19, 24, 113)

                setPiecePos(18, 1, 114)
                setPiecePos(18, 2, 115)
                setPiecePos(19, 1, 116)
                setPiecePos(19, 2, 117)

                setPiecePos(20, 23, 118)
                setPiecePos(20, 24, 119)
                setPiecePos(21, 23, 120)
                setPiecePos(21, 24, 121)

                setPiecePos(20, 1, 122)
                setPiecePos(20, 2, 123)
                setPiecePos(21, 1, 124)
                setPiecePos(21, 2, 125)

                setPiecePos(22, 23, 126)
                setPiecePos(23, 23, 127)
                setPiecePos(24, 23, 128)
                setPiecePos(22, 24, 129)
                setPiecePos(23, 24, 130)
                setPiecePos(24, 24, 131)

                setPiecePos(22, 1, 132)
                setPiecePos(23, 1, 133)
                setPiecePos(24, 1, 134)
                setPiecePos(22, 2, 135)
                setPiecePos(23, 2, 136)
                setPiecePos(24, 2, 137)
                setHist = false
            }
            startingRow = 3
            break;
        case 'triangle':
            document.querySelector('.mid-container').innerHTML = `
                <div class="board diff-shape">
                    <img src="../img/triangle/board.png" alt="">

                    <div class="pieces">
                        <img src="../img/triangle/blackPieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/trianglePawn.png" alt="" class="piece">

                        <img src="../img/triangle/whitePieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/trianglePawn.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/trianglePawn.png" alt="" class="piece">


                        <img src="../img/triangle/blackPieces/triangleStrongerRook.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleStrongerRook.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleBishop.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleBishop.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleKnight.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleKnight.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleUnicorn.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleRook.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleRook.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleQueen.png" alt="" class="piece">
                        <img src="../img/triangle/blackPieces/triangleKing.png" alt="" class="piece" royal="true">

                        <img src="../img/triangle/whitePieces/triangleStrongerRook.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleStrongerRook.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleBishop.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleBishop.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleKnight.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleKnight.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleUnicorn.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleRook.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleRook.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleQueen.png" alt="" class="piece">
                        <img src="../img/triangle/whitePieces/triangleKing.png" alt="" class="piece" royal="true">
                    </div>
                </div>
            `
            addCssLink('triangle/triangle')
            if(data.hist != undefined) {
                placeForPieces.innerHTML = ''
                data.pieces.forEach(piece => {
                    let img = document.createElement("img")
                    img.src = piece
                    img.classList.add('piece')
                    img.setAttribute('col', 0)
                    img.setAttribute('row', 0)
    
                    placeForPieces.appendChild(img)
                })
            }
            data.features.push('triangle')
            board = document.querySelectorAll('.board')[0]
            var actualColumns = 7

            generateBoardHtml(13, 14)

            var trianglePieces = [
                'trianglePawn',
                'triangleKnight',
                'triangleBishop',
                'triangleRook',
                'triangleStrongerRook',
                'triangleQueen',
                'triangleUnicorn',
                'triangleKing'
            ]
            var promotionPieces = [
                'triangleUnicorn',
                'triangleKnight',
                'triangleBishop',
                'triangleRook',
                'triangleStrongerRook',
                'triangleQueen'
            ]

            var neutralMove = 32
            startingRow = 5
            promotionRow = 4

            window.onload = function() {
                setHist = true
                if(data.hist != undefined) {
                    pieces = document.querySelectorAll('.piece')
                    neutralMove = data.hist.length

                    data.hist.forEach(i => {
                        setPiecePos(...i)
                    })
                } else {
                    neutralMove = 40

                    for(let i = 0; i < 9; i++) {
                        setPiecePos(i+3, 5, i)
                    }

                    for(let i = 0; i < 9; i++) {
                        setPiecePos(i+3, 10, i+9)
                    }

                    
                    setPiecePos(4, 4, 18)
                    setPiecePos(10, 4, 19)
                    setPiecePos(5, 4, 20)
                    setPiecePos(9, 4, 21)
                    setPiecePos(6, 4, 22)
                    setPiecePos(8, 4, 23)
                    setPiecePos(7, 4, 24)
                    setPiecePos(5, 3, 25)
                    setPiecePos(9, 3, 26)
                    setPiecePos(6, 3, 27)
                    setPiecePos(8, 3, 28)

                    setPiecePos(4, 11, 29)
                    setPiecePos(10, 11, 30)
                    setPiecePos(5, 11, 31)
                    setPiecePos(9, 11, 32)
                    setPiecePos(6, 11, 33)
                    setPiecePos(8, 11, 34)
                    setPiecePos(7, 11, 35)
                    setPiecePos(5, 12, 36)
                    setPiecePos(9, 12, 37)
                    setPiecePos(6, 12, 38)
                    setPiecePos(8, 12, 39)
                }
                setHist = false

                resize()
            }

            let cordsToDelete = [
                [1, 1, 1, 6], [2, 2, 1, 5], [3, 3, 1, 4], [4, 4, 1, 3], [5, 5, 1, 2], [6, 6, 1, 1],
                [13, 13, 1, 6], [12, 12, 1, 5], [11, 11, 1, 4], [10, 10, 1, 3], [9, 9, 1, 2], [8, 8, 1, 1],
                [1, 1, 9, 14], [2, 2, 10, 14], [3, 3, 11, 14], [4, 4, 12, 14], [5, 5, 13, 14], [6, 6, 14, 14],
                [13, 13, 9, 14], [12, 12, 10, 14], [11, 11, 11, 14], [10, 10, 12, 14], [9, 9, 13, 14], [8, 8, 14, 14]
            ]
            cordsToDelete.forEach(cord => {
                deleteSquares(...cord)
            })

            function isInTriangle(e) {
                let x = e.clientX
                let y = e.clientY
                let rect = e.target.getBoundingClientRect();
                x = x - rect.left
                let cords = getCordsOfSquare(e.target)
                if(((cords[0] % 2) + (cords[1] % 2)) % 2 == 0) {
                    y = rect.bottom - y
                } else {
                    y = y - rect.top
                }
                
                let a = [0, 0]
                let b = [parseInt(window.getComputedStyle(e.target).getPropertyValue('width')) / 2, 
                parseInt(window.getComputedStyle(e.target).getPropertyValue('height'))]
            
                return y <= (a[1] - b[1]) / (a[0] - b[0]) * x + (a[1] - (a[1] - b[1]) / (a[0] - b[0]) * a[0])
            }
            break;
        case 'vsCheckers':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
        
                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">


                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">

                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">

                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
                <img src="../img/checkers/blackPieces/checker.png" alt="" class="piece" royal="true">
            `
            data.skinSet = 'checkers'

            generateBoardHtml(8, 8)
            var promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var normalPromotionPieces = promotionPieces
            var chess1Pieces = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var chess1Royals = [
                'king'
            ]

            data.features.push('diffSets')
            var checkersPieces = [
                'checker',
                'checkerQueen'
            ]
            extendedPromotionPieces = ['checkerQueen']

            var neutralMove = 46

            window.onload = function() {
                setHist = true
                let arr = [7, 8, 1, 2, 3, 4]
                if(!data.normalWhite) {
                    for(let i = 0; i < arr.length; i++) {
                        arr[i] = columns[0].children.length - (arr[i] - 1)
                    }
                    switchClocks()
                    switchClocks()
                    stopClocks()
                }

                for (let i = 0; i < 8; i++) {
                    setPiecePos(i+1, arr[0], i)            
                }

                let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                for (let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], arr[1], i+8)            
                }


                for (let i = 0; i < 8; i++) {
                    setPiecePos(i+1, arr[2], i+16)
                }

                for (let i = 0; i < 8; i++) {
                    setPiecePos(i+1, arr[3], i+24)
                }

                for (let i = 0; i < 8; i++) {
                    setPiecePos(i+1, arr[4], i+32)
                }
                for (let i = 0; i < 6; i++) {
                    setPiecePos(i+2, arr[5], i+40)
                }
                setHist = false
            }
            break;
        case 'water':
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    :root {
                        --dark-square: #015478;
                        --light-square: #006996;
            
                        --dark-clicked: #39a3d0;
                        --light-clicked: #56bae5;
                    }
                </style>
            `
            document.querySelector('.board').innerHTML += `
                <img src="../img/water/tsunami.png" class="button tsunami-button">
                <div class="ability-box">
                    Use ability?
                    <div class="button button-main ability-button">Yes</div>
                </div>
                <div class="button button-main no-ship-move-button none">No ship move</div>
            `
            if(!data.placing) {
                document.querySelector('.mid-container .pieces').innerHTML += `
                    <img src="../img/water/blackPieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/blackPieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/blackPieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/blackPieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/blackPieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/blackPieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/blackPieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/blackPieces/waterPawn.png" alt="" class="piece">
            
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
            
            
                    <img src="../img/water/blackPieces/waterBishop.png" alt="" class="piece">
                    <img src="../img/water/blackPieces/waterBishop.png" alt="" class="piece">
                    <img src="../img/water/blackPieces/waterKnight.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/blackPieces/waterKnight.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/blackPieces/waterQueen.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/blackPieces/waterRook.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/blackPieces/waterKing.png" alt="" class="piece" royal="true" waterAbilityUses="1">
                    <img src="../img/water/blackPieces/waterRook.png" alt="" class="piece" waterAbilityUses="1">

                    <img src="../img/water/whitePieces/waterBishop.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterBishop.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterKnight.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterKnight.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterQueen.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterRook.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterKing.png" alt="" class="piece" royal="true" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterRook.png" alt="" class="piece" waterAbilityUses="1">


                    <img src="../img/water/blackPieces/lightShip.png" alt="" class="piece ship" shotDurability="2">
                    <img src="../img/water/blackPieces/galleyShipLeft.png" alt="" class="piece ship" otherParts="34" shotDurability="5">
                    <img src="../img/water/blackPieces/galleyShipRight.png" alt="" class="piece ship" otherParts="33" shotDurability="5">
                    <img src="../img/water/blackPieces/mediumShipLeft.png" alt="" class="piece ship" otherParts="36" shotDurability="4">
                    <img src="../img/water/blackPieces/mediumShipRight.png" alt="" class="piece ship" otherParts="35" shotDurability="4">
                    <img src="../img/water/blackPieces/heavyShipLeft.png" alt="" class="piece ship" otherParts="38" shotDurability="10">
                    <img src="../img/water/blackPieces/heavyShipRight.png" alt="" class="piece ship" otherParts="37" shotDurability="10">
                    
                    <img src="../img/water/whitePieces/lightShip.png" alt="" class="piece ship" shotDurability="2">
                    <img src="../img/water/whitePieces/galleyShipLeft.png" alt="" class="piece ship" otherParts="41" shotDurability="5">
                    <img src="../img/water/whitePieces/galleyShipRight.png" alt="" class="piece ship" otherParts="40" shotDurability="5">
                    <img src="../img/water/whitePieces/mediumShipLeft.png" alt="" class="piece ship" otherParts="43" shotDurability="4">
                    <img src="../img/water/whitePieces/mediumShipRight.png" alt="" class="piece ship" otherParts="42" shotDurability="4">
                    <img src="../img/water/whitePieces/heavyShipLeft.png" alt="" class="piece ship" otherParts="45" shotDurability="10">
                    <img src="../img/water/whitePieces/heavyShipRight.png" alt="" class="piece ship" otherParts="44" shotDurability="10">


                    <div class="piece-item ship-shot-dura-counter" pie="32"></div>
                    <div class="piece-item ship-shot-dura-counter" pie="34"></div>
                    <div class="piece-item ship-shot-dura-counter" pie="36"></div>
                    <div class="piece-item ship-shot-dura-counter" pie="38"></div>

                    <div class="piece-item ship-shot-dura-counter" pie="39"></div>
                    <div class="piece-item ship-shot-dura-counter" pie="41"></div>
                    <div class="piece-item ship-shot-dura-counter" pie="43"></div>
                    <div class="piece-item ship-shot-dura-counter" pie="45"></div>
                `
                board = document.querySelectorAll('.board')[0]
                generateBoardHtml(18, 16)

                let colss = board.querySelectorAll('.column')
                for (let i = 0; i < colss.length; i++) {
                    for (let j = 0; j < colss[i].children.length; j++) {
                        if(i > 4 && i < 13 && j > 3 && j < 12) {
                            j += 8
                        }
                        colss[i].children[j].classList.add('ocean-square')
                    }
                }

                var whiteTsunamiUses = 1
                var blackTsunamiUses = 1

                var neutralMove = 46

                window.onload = function() {
                    setHist = true
                    for(let i = 0; i < 8; i++) {
                        setPiecePos(i+6, 6, i)
                    }

                    for(let i = 0; i < 8; i++) {
                        setPiecePos(i+6, 11, i+8)
                    }


                    let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                    for(let i = 0; i < 8; i++) {
                        setPiecePos(colsArr[i]+5, 5, i+16)
                    }

                    for(let i = 0; i < 8; i++) {
                        setPiecePos(colsArr[i]+5, 12, i+24)
                    }


                    setPiecePos(2, 3, 32)

                    setPiecePos(3, 3, 33)
                    setPiecePos(4, 3, 34)
                    setPiecePos(14, 3, 35)
                    setPiecePos(15, 3, 36)

                    setPiecePos(16, 3, 37)
                    setPiecePos(17, 3, 38)


                    setPiecePos(2, 14, 39)

                    setPiecePos(3, 14, 40)
                    setPiecePos(4, 14, 41)
                    setPiecePos(14, 14, 42)
                    setPiecePos(15, 14, 43)

                    setPiecePos(16, 14, 44)
                    setPiecePos(17, 14, 45)
                    setHist = false

                    resizeItems()
                }
                startingRow = 6
                var promotionRow = 5

                let piecess = document.querySelectorAll('.piece')
                let items = document.querySelectorAll('.ship-shot-dura-counter')
                for (let i = 0; i < items.length; i++) {
                    items[i].innerHTML = piecess[items[i].getAttribute('pie')].getAttribute('shotDurability')
                }
                data.features.push('water')
                data.features.push('biggerPieces')
            } else {
                let tsuButton = document.querySelector('.tsunami-button')
                let sourceArray = tsuButton.src.split('/')
                sourceArray.splice(sourceArray.length-4, 1)
                tsuButton.src = sourceArray.join('/')

                let piecess = document.querySelectorAll('.piece')
                if(data.shotDurabilities != undefined) {
                    for (let i = 0; i < data.shotDurabilities.length; i++) {
                        piecess[data.shotDurabilities[i][0]].setAttribute('shotDurability', data.shotDurabilities[i][1])
                    }
                }
                for (let i = 0; i < piecess.length; i++) {
                    let imgName = getImgFileName(piecess[i])
                    if(imgName.includes('Ship') && !imgName.includes('Left')) {
                        let shotDura = document.createElement("div")
                        shotDura.classList.add('piece-item', 'counter-piece-item', 'ship-shot-dura-counter')
                        shotDura.setAttribute('pie', i)
                        document.querySelector('.pieces').appendChild(shotDura)
                        shotDura.innerHTML = piecess[i].getAttribute('shotDurability')
                    }
                }
                pieceItemsOnBoard = document.querySelectorAll('.board .piece-item')
            }

            var promotionPieces = [
                'waterKnight',
                'waterBishop',
                'waterRook',
                'waterQueen'
            ]
            var waterPieces = [
                'waterPawn',
                'waterKnight',
                'waterBishop',
                'waterRook',
                'waterQueen',
                'waterKing'
            ]

            var tsunamiButton = document.querySelector('.tsunami-button')

            var waterSquares = []
            var boilingSquares = []
            var steamSquares = []
            var tsunamiSquares = []

            var whiteShips = []
            var blackShips = []

            document.querySelectorAll('.ship').forEach(ship => {
                if(isPieceWhite(ship)) {
                    whiteShips.push(ship)
                } else {
                    blackShips.push(ship)
                }
            })
            break;
        //#endregion
        case 'evolvingPieces2':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/pawn.png" alt="" class="piece">
        
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/pawn.png" alt="" class="piece">
        
        
                <img src="../img/evolvingPieces/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/queen.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/rook.png" alt="" class="piece">
                <img src="../img/evolvingPieces/blackPieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/evolvingPieces/blackPieces/rook.png" alt="" class="piece">

                <img src="../img/evolvingPieces/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/evolvingPieces/whitePieces/king.png" alt="" class="piece" royal="true">
                <img src="../img/evolvingPieces/whitePieces/rook.png" alt="" class="piece">
            `
            generateBoardHtml(8, 8)
            promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var evolutionPieces2 = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var movesBetweenStages = [
                [1,
                    [],
                    []
                ],
                [2,
                    [4,
                        [7,
                            [11,
                                [16,
                                    []
                                ]
                            ]
                        ]
                    ],
                    [4,
                        [7,
                            [11,
                                [16,
                                    []
                                ]
                            ]
                        ]
                    ]
                ],
                [2,
                    [5,
                        [9,
                            
                        ],
                        [9,
                            
                        ]
                    ]
                ],
                [0],
                [0],
                [0]
            ]
            var evolutionStages = [
                ['pawn',
                    ['pawnPlus'],
                    ['grandPawn']
                ],
                ['knight',
                    ['arabianHorse',
                        ['',
                            ['',
                                ['',
                                    ['']
                                ]
                            ]
                        ]
                    ],
                    ['shireHorse',
                        ['',
                            ['',
                                ['',
                                    ['']
                                ]
                            ]
                        ]
                    ]
                ],
                ['bishop',
                    ['twoColoredBishop',
                        ['',
                            
                        ],
                        ['',
                            
                        ]
                    ]
                ],
                ['rook'],
                ['queen'],
                ['king']
            ]

            data.features.push('evolvingPieces2')
            var neutralMove = 32

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 2, i)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(i+1, 7, i+8)
                }


                let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 1, i+16)
                }

                for(let i = 0; i < 8; i++) {
                    setPiecePos(colsArr[i], 8, i+24)
                }
                setHist = false
            }
            break;
        case 'tiny':
            document.querySelector('.board .pieces').innerHTML = `
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/pawn.png" alt="" class="piece">
        
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/pawn.png" alt="" class="piece">
        
        
                <img src="../img/1.0/blackPieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/blackPieces/king.png" alt="" class="piece" royal="true">

                <img src="../img/1.0/whitePieces/rook.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/knight.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/bishop.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/queen.png" alt="" class="piece">
                <img src="../img/1.0/whitePieces/king.png" alt="" class="piece" royal="true">
            `
            generateBoardHtml(5, 6)
            var promotionPieces = [
                'knight',
                'bishop',
                'rook',
                'queen'
            ]
            var normalPromotionPieces = promotionPieces
            var chess1Pieces = [
                'pawn',
                'knight',
                'bishop',
                'rook',
                'queen',
                'king'
            ]
            var chess1Royals = [
                'king'
            ]
            var neutralMove = 20

            window.onload = function() {
                setHist = true
                for(let i = 0; i < 5; i++) {
                    setPiecePos(i+1, 2, i)
                }

                for(let i = 0; i < 5; i++) {
                    setPiecePos(i+1, 5, i+5)
                }


                for(let i = 0; i < 5; i++) {
                    setPiecePos(i+1, 1, i+10)
                }

                for(let i = 0; i < 5; i++) {
                    setPiecePos(i+1, 6, i+15)
                }
                setHist = false
            }
            break;
        case 'lavaVsWater':
            document.getElementsByTagName('HEAD')[0].innerHTML = document.getElementsByTagName('HEAD')[0].innerHTML + `
                <style>
                    .hell .square {
                        --dark-square: #540000;
                        --light-square: #ab0000;
            
                        --dark-clicked: #c86b00;
                        --light-clicked: #c77a00;
                    }

                    .board-con {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
            
                    .board-con:first-of-type {
                        width: 70%;
                        margin-right: 2rem;
                    }
            
                    .board-con:last-of-type {
                        position: relative;
                        width: 30%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        gap: 1rem;
                    }
            
                    .side-bar-game {
                        height: 80% !important;
                    }
            
            
                    .hell > .square {
                        position: relative;
                    }
            
                    .hell-img {
                        width: 60%;
                    }
            
                    .hell-box {
                        position: absolute !important;
                        bottom: -35% !important;
                    }
            
                    .demon-img {
                        position: absolute;
                        width: 40%;
                        z-index: 20;
                        pointer-events: none;
                    }
            
                    .demon-img:first-of-type {
                        left: -20%;
                        transform: rotateY(180deg);
                    }
            
                    .demon-img:last-of-type {
                        right: -20%;
                    }
                </style>
            `
            document.querySelector('.mid-container').innerHTML = `
                <div class="board-con">
                    <div class="board">
                        <div class="pieces">
                            
                        </div>
                        <div class="ability-box">
                            Use ability?
                            <div class="button button-main ability-button">Yes</div>
                        </div>
                    </div>
                </div>
            `
            document.querySelector('.board').innerHTML += `
                <img src="../img/water/tsunami.png" class="button tsunami-button">
                <div class="ability-box">
                    Use ability?
                    <div class="button button-main ability-button">Yes</div>
                </div>
                <div class="button button-main no-ship-move-button none">No ship move</div>
            `
            if(!data.placing) {
                document.querySelector('.mid-container .pieces').innerHTML += `
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaPawn.png" alt="" class="piece">
            
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterPawn.png" alt="" class="piece">
            
            
                    <img src="../img/lava/blackPieces/lavaBishop.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaBishop.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaKnight.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaKnight.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaQueen.png" alt="" class="piece" lavaAbilityUses="1">
                    <img src="../img/lava/blackPieces/lavaRook.png" alt="" class="piece">
                    <img src="../img/lava/blackPieces/lavaKing.png" alt="" class="piece" royal="true" lavaAbilityUses="1">
                    <img src="../img/lava/blackPieces/lavaRook.png" alt="" class="piece">

                    <img src="../img/water/whitePieces/waterBishop.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterBishop.png" alt="" class="piece">
                    <img src="../img/water/whitePieces/waterKnight.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterKnight.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterQueen.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterRook.png" alt="" class="piece" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterKing.png" alt="" class="piece" royal="true" waterAbilityUses="1">
                    <img src="../img/water/whitePieces/waterRook.png" alt="" class="piece" waterAbilityUses="1">


                    <img src="../img/water/whitePieces/lightShip.png" alt="" class="piece ship" shotDurability="2">
                    <img src="../img/water/whitePieces/galleyShipLeft.png" alt="" class="piece ship" otherParts="34" shotDurability="5">
                    <img src="../img/water/whitePieces/galleyShipRight.png" alt="" class="piece ship" otherParts="33" shotDurability="5">
                    <img src="../img/water/whitePieces/mediumShipLeft.png" alt="" class="piece ship" otherParts="36" shotDurability="4">
                    <img src="../img/water/whitePieces/mediumShipRight.png" alt="" class="piece ship" otherParts="35" shotDurability="4">
                    <img src="../img/water/whitePieces/heavyShipLeft.png" alt="" class="piece ship" otherParts="38" shotDurability="10">
                    <img src="../img/water/whitePieces/heavyShipRight.png" alt="" class="piece ship" otherParts="37" shotDurability="10">


                    <div class="piece-item ship-shot-dura-counter" pie="32"></div>
                    <div class="piece-item ship-shot-dura-counter" pie="34"></div>
                    <div class="piece-item ship-shot-dura-counter" pie="36"></div>
                    <div class="piece-item ship-shot-dura-counter" pie="38"></div>
                `
                document.querySelector('.mid-container').innerHTML += `
                    <div class="board-con">
                        <img class="demon-img" src="../img/lava/demon.png" alt="">
                        <img class="hell-img" src="../img/lava/hellText.png" alt="">
                        <img class="demon-img" src="../img/lava/demon.png" alt="">
                        <div class="board hell">
                            <div class="pieces">

                            </div>
                            <div class="ability-box hell-box button button-main">
                                Respawn?
                            </div>
                        </div>
                    </div>
                `

                board = document.querySelectorAll('.board')[0]
                generateBoardHtml(14, 12)
                board = document.querySelectorAll('.board')[1]
                generateBoardHtml(6, 6)

                board = document.querySelectorAll('.board')[0]
                let colss = board.querySelectorAll('.column')
                for (let i = 0; i < colss.length; i++) {
                    for (let j = 0; j < colss[i].children.length; j++) {
                        if(i > 2 && i < 11 && j > 1 && j < 11) {
                            j += 8
                        }
                        colss[i].children[j].classList.add('ocean-square')
                    }
                }

                if(data.normalWhite) {
                    var whiteTsunamiUses = 1
                } else {
                    var blackTsunamiUses = 1
                }

                var neutralMove = 39

                window.onload = function() {
                    setHist = true

                    let arr = [4, 9, 3, 10, 11]
                    if(!data.normalWhite) {
                        for(let i = 0; i < arr.length; i++) {
                            arr[i] = columns[0].children.length - (arr[i] - 1)
                        }
                        switchClocks()
                        switchClocks()
                        stopClocks()
                    }

                    for(let i = 0; i < 8; i++) {
                        setPiecePos(i+4, arr[0], i)
                    }

                    for(let i = 0; i < 8; i++) {
                        setPiecePos(i+4, arr[1], i+8)
                    }


                    let colsArr = [3, 6, 2, 7, 4, 1, 5, 8]
                    for(let i = 0; i < 8; i++) {
                        setPiecePos(colsArr[i]+3, arr[2], i+16)
                    }

                    for(let i = 0; i < 8; i++) {
                        setPiecePos(colsArr[i]+3, arr[3], i+24)
                    }


                    setPiecePos(1, arr[4], 32)

                    setPiecePos(2, arr[4], 33)
                    setPiecePos(3, arr[4], 34)
                    setPiecePos(11, arr[4], 35)
                    setPiecePos(12, arr[4], 36)

                    setPiecePos(13, arr[4], 37)
                    setPiecePos(14, arr[4], 38)

                    setHist = false

                    histor.forEach(i => {
                        i[3] = {
                            board: 0
                        }
                    })

                    resizeItems()
                }

                startingRow = 4
                var promotionRow = 3

                let piecess = document.querySelectorAll('.piece')
                let items = document.querySelectorAll('.ship-shot-dura-counter')
                for (let i = 0; i < items.length; i++) {
                    items[i].innerHTML = piecess[items[i].getAttribute('pie')].getAttribute('shotDurability')
                }

                data.features.push('lava')
                data.features.push('water')
                data.features.push('biggerPieces')

                var hellBox = document.querySelector('.hell-box')
                var hell = document.querySelector('.hell')
            } else {
                if(data.hell == true) {
                    document.querySelector('.mid-container').innerHTML += `
                        <div class="board-con">
                            <img class="demon-img" src="../img/lava/demon.png" alt="">
                            <img class="hell-img" src="../img/lava/hellText.png" alt="">
                            <img class="demon-img" src="../img/lava/demon.png" alt="">
                            <div class="board hell">
                                <div class="pieces">
    
                                </div>
                                <div class="ability-box hell-box button button-main">
                                    Respawn?
                                </div>
                            </div>
                        </div>
                    `
    
                    var hellBox = document.querySelector('.hell-box')
                    var hell = document.querySelector('.hell')
                }

                let tsuButton = document.querySelector('.tsunami-button')
                let sourceArray = tsuButton.src.split('/')
                sourceArray.splice(sourceArray.length-4, 1)
                tsuButton.src = sourceArray.join('/')

                let piecess = document.querySelectorAll('.piece')
                if(data.shotDurabilities != undefined) {
                    for (let i = 0; i < data.shotDurabilities.length; i++) {
                        piecess[data.shotDurabilities[i][0]].setAttribute('shotDurability', data.shotDurabilities[i][1])
                    }
                }
                for (let i = 0; i < piecess.length; i++) {
                    let imgName = getImgFileName(piecess[i])
                    if(imgName.includes('Ship') && !imgName.includes('Left')) {
                        let shotDura = document.createElement("div")
                        shotDura.classList.add('piece-item', 'counter-piece-item', 'ship-shot-dura-counter')
                        shotDura.setAttribute('pie', i)
                        document.querySelector('.pieces').appendChild(shotDura)
                        shotDura.innerHTML = piecess[i].getAttribute('shotDurability')
                    }
                }
                pieceItemsOnBoard = document.querySelectorAll('.board .piece-item')
            }
            data.features.push('diffSets')

            var promotionPieces = [
                'lavaKnight',
                'lavaBishop',
                'lavaRook',
                'lavaQueen'
            ]
            var normalPromotionPieces = [
                'waterKnight',
                'waterBishop',
                'waterRook',
                'waterQueen'
            ]
            var extendedPromotionPieces = [
                'lavaKnight',
                'lavaBishop',
                'lavaRook',
                'lavaQueen'
            ]
            var waterPieces = [
                'waterPawn',
                'waterKnight',
                'waterBishop',
                'waterRook',
                'waterQueen',
                'waterKing'
            ]
            var lavaPieces = [
                'lavaPawn',
                'lavaKnight',
                'lavaBishop',
                'lavaRook',
                'lavaQueen',
                'lavaKing'
            ]

            var tsunamiButton = document.querySelector('.tsunami-button')

            var waterSquares = []
            var boilingSquares = []
            var steamSquares = []
            var tsunamiSquares = []

            var whiteShips = []
            var blackShips = []

            document.querySelectorAll('.ship').forEach(ship => {
                if(isPieceWhite(ship)) {
                    whiteShips.push(ship)
                } else {
                    blackShips.push(ship)
                }
            })

            var magmaSquares = []
            var lavaSquares = []
            var fireSquares = []
            var lavaRookAbility = []
            break;
        default:
            break;
    }
}


// Lava Functions

function manageLavaEntities() {
    if(currentMove <= neutralMove) return
    let length = lavaSquares.length
    for (let i = 0; i < length; i++) {
        let existenceLength = 0
        for (let j = 0; j < lavaSquares[i].classList.length; j++) {
            if(lavaSquares[i].classList[j].includes('lava-')) {
                existenceLength = parseInt(lavaSquares[i].classList[j].substring(5, lavaSquares[i].classList[j].length))
                break
            }
        }
        lavaSquares[i].classList.replace('lava-' + existenceLength, 'lava-' + ++existenceLength)
        if(lavaSquares[i].querySelector('.turns-left') != null) {
            lavaSquares[i].querySelector('.turns-left').innerHTML = 2 - existenceLength
        } else {
            let div = document.createElement('div')
            div.classList.add('turns-left')
            div.style.fontSize = window.getComputedStyle(lavaSquares[i]).getPropertyValue('height')
            div.innerHTML = 2 - existenceLength
            lavaSquares[i].appendChild(div)
        }
        let squaresAround = []
        let cords = getCordsOfSquare(lavaSquares[i])
        if(existenceLength > 0) {
            if(existenceLength != 2) {
                let movements = [[1, 0], [-1, 0], [0, 1], [0, -1]]
                for(let i = 0; i < movements.length; i++) {
                    squaresAround.push(...universal(...cords, ...movements[i], 1, true))
                }
                squaresAround.forEach(square => {
                    if(!lavaSquares.includes(square) && !square.classList.contains('lava')) {
                        square.classList.add('lava')
                        square.setAttribute('lava-source', Array.prototype.indexOf.call(squares, lavaSquares[i]))
                        let img = document.createElement('img')
                        img.src = '../img/lava/lava.png'
                        img.classList.add('square-bg')
                        square.appendChild(img)
                        if1: if(square.querySelectorAll('.square-bg').length > 1) {
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
                            if(piece != undefined && piece != clickedOn) {
                                if(getImgFileName(piece).includes('burnt')) {
                                    capturePiece(piece)
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
                            if(targetSquare == square) {
                                if(getImgFileName(clickedOn).includes('burnt')) {
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
                    }
                })
            } else {
                squares.forEach(square => {
                    if(square.getAttribute('lava-source') == Array.prototype.indexOf.call(squares, lavaSquares[i])) {
                        let removeLava = true
                        for (let j = 0; j < square.classList.length; j++) {
                            if(square.classList[j].includes('lava-')) {
                                removeLava = false
                                break
                            }
                        }
                        if(removeLava) {
                            square.classList.remove('lava')
                            square.querySelector('.square-bg').remove()    
                        }
                        square.removeAttribute('lava-source')
                    }
                })
                removeEntity(lavaSquares[i], 'lava', existenceLength, i)
                i--
                length--
            }
        }
    }
    length = fireSquares.length
    for (let i = 0; i < length; i++) {
        let existenceLength = 0
        for (let j = 0; j < fireSquares[i].classList.length; j++) {
            if(fireSquares[i].classList[j].includes('fire-')) {
                existenceLength = parseInt(fireSquares[i].classList[j].substring(5, fireSquares[i].classList[j].length))
                break
            }
        }
        fireSquares[i].classList.replace('fire-' + existenceLength, 'fire-' + ++existenceLength)
        if(!histPlaying) {
            let squaresAround = []
            let cords = getCordsOfSquare(fireSquares[i])
            let movements = [[1, 1], [1, -1], [1, 0], [-1, 0], [-1, 1], [-1, -1], [0, 1], [0, -1]]
            for(let i = 0; i < movements.length; i++) {
                squaresAround.push(...universal(...cords, ...movements[i], 1, true))
            }
            squaresAround.forEach(square => {
                if(!fireSquares.includes(square) && Math.random() < .25 / existenceLength) {
                    spawnEntity(square, 'fire', existenceLength)
                    if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].fireAppears != undefined) {
                        histor[histor.length-1][3].fireAppears.push([square, existenceLength])
                    } else {
                        histor[histor.length-1][3] = {
                            ...histor[histor.length-1][3],
                            fireAppears: [[square, existenceLength]]
                        }
                    }
                }
            })
            if(Math.random() < .3 + .1 * existenceLength) {
                if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].fireDisappears != undefined) {
                    histor[histor.length-1][3].fireDisappears.push([fireSquares[i], existenceLength])
                } else {
                    histor[histor.length-1][3] = {
                        ...histor[histor.length-1][3],
                        fireDisappears: [[fireSquares[i], existenceLength]]
                    }
                }
                removeEntity(fireSquares[i], 'fire', existenceLength, i)
                i--
                length--
            }
        }
    }
    length = magmaSquares.length
    for (let i = 0; i < length; i++) {
        let existenceLength = 0
        for (let j = 0; j < magmaSquares[i].classList.length; j++) {
            if(magmaSquares[i].classList[j].includes('magma-')) {
                existenceLength = parseInt(magmaSquares[i].classList[j].substring(6, magmaSquares[i].classList[j].length))
                break
            }
        }
        magmaSquares[i].classList.replace('magma-' + existenceLength, 'magma-' + ++existenceLength)
        if(magmaSquares[i].querySelector('.turns-left') != null) {
            magmaSquares[i].querySelector('.turns-left').innerHTML = 3 - existenceLength
        } else {
            let div = document.createElement('div')
            div.classList.add('turns-left')
            div.style.fontSize = window.getComputedStyle(magmaSquares[i]).getPropertyValue('height')
            div.innerHTML = 3 - existenceLength
            magmaSquares[i].appendChild(div)
        }
        if(existenceLength == 3) {
            removeEntity(magmaSquares[i], 'magma', existenceLength, i)
            i--
            length--
        }
    }
}


function goToHell(piece) {
    if(parseInt(piece.getAttribute('lives')) > 0) {
        respawn(piece)
        return
    }
    let imgName = getImgFileName(piece)
    if(hell == null || imgName == 'lavaKing') {
        capturePiece(piece)
        return
    }
    fire.play()
    piece.style.transition = 'all 0.45s ease-in-out'
    piece.style.opacity = '0'

    if(!histPlaying) {
        if(histor[histor.length-1][3] != undefined && histor[histor.length-1][3].goesToHell != undefined) {
            histor[histor.length-1][3].goesToHell.push(piece)
        } else {
            histor[histor.length-1][3] = {
                ...histor[histor.length-1][3],
                goesToHell: [piece]
            }
        }
        piece.removeEventListener('click', pieceSelect)
        piece.removeEventListener('dragstart', pieceSelect)
    }
    
    hell.querySelector('.pieces').appendChild(piece)

    board = hell
    columns = board.querySelectorAll('.column')
    squares = board.querySelectorAll('.square')
    let oldPieces = [...pieces]
    pieces = board.querySelectorAll('.piece')

    setPiecePos(...getCordsOfSquare(squares[pieces.length-1]), getPieceId(piece))
    resizePieces()
    currentMove--

    let turnsCounter = document.createElement('div')
    if(histPlaying) {
        turnsCounter.innerHTML = '6'
    } else {
        turnsCounter.innerHTML = '7'
    }
    turnsCounter.classList.add('turns-left')
    turnsCounter.style.height = 'auto'
    turnsCounter.style.fontSize = parseInt(window.getComputedStyle(hell.querySelector('.square')).getPropertyValue('height')) / 10 * 8 + 'px'
    squares[pieces.length-1].appendChild(turnsCounter)

    if(!imgName.includes('burnt')) {
        let sourceArray = piece.src.split('/')
        sourceArray[sourceArray.length-1] = 'burnt' + sourceArray[sourceArray.length-1][0].toUpperCase() + sourceArray[sourceArray.length-1].substring(1, sourceArray[sourceArray.length-1].length)
        piece.src = sourceArray.join('/')
    }
    piece.style.opacity = '1'
    piece.style.animation = 'append 0.2s linear'
    piece.style.transition = 'all 0s ease-in-out'
    piece.setAttribute('gotInHell', currentMove)
    board = boards[0]
    columns = board.querySelectorAll('.column')
    squares = board.querySelectorAll('.square')
    pieces = oldPieces
}


function goBackFromHellPopup(e) {
    if(currentMove < histor.length) return
    clickedOn = e.target
    hellBox.classList.add('show')
    hellBox.addEventListener('click', function() {
        goBackFromHell(clickedOn)
    })
}

function goBackFromHell(piece) {
    let indexInPieces = Array.prototype.indexOf.call(hell.querySelectorAll('.piece'), piece)
    if(indexInPieces == -1) return
    piece.style.transition = 'all 0.45s ease-in-out'
    piece.style.opacity = '0'

    columns = hell.querySelectorAll('.column')
    let square = getSquareFromPiece(piece)
    if(square.querySelector('.turns-left') != null) square.querySelector('.turns-left').remove()
    columns = board.querySelectorAll('.column')

    board.querySelector('.pieces').appendChild(piece)

    piece.style.opacity = '1'
    piece.style.animation = 'append 0.2s linear'
    piece.style.transition = 'all 0s ease-in-out'

    whiteTurn = !whiteTurn
    respawn(piece)
    whiteTurn = !whiteTurn

    resizePieces()

    squares = hell.querySelectorAll('.square')
    let oldPieces = [...pieces]
    pieces = hell.querySelectorAll('.piece')
    for (let i = indexInPieces; i < pieces.length; i++) {
        setPiecePos(...getCordsOfSquare(squares[i]), i)
        squares[i].appendChild(squares[i+1].querySelector('.turns-left'))
        currentMove--
    }
    pieces = oldPieces
    squares = board.querySelectorAll('.square')

    if(!histPlaying) {
        histor.push([undefined, undefined, getPieceId(piece)])
        histor[histor.length-1][3] = {
            ...histor[histor.length-1][3],
            goesBackFromHell: [piece]
        }
        piece.removeEventListener('click', goBackFromHellPopup)
    }
    manageLavaEntities()
    endOfTurn()
}

// Water Functions

function manageWaterEntities() {
    if(currentMove <= neutralMove) return
    let length = waterSquares.length
    for (let i = 0; i < length; i++) {
        let existenceLength = 0
        for (let j = 0; j < waterSquares[i].classList.length; j++) {
            if(waterSquares[i].classList[j].includes('water-')) {
                existenceLength = parseInt(waterSquares[i].classList[j].substring(6, waterSquares[i].classList[j].length))
                break
            }
        }
        waterSquares[i].classList.replace('water-' + existenceLength, 'water-' + ++existenceLength)
        if(waterSquares[i].querySelector('.turns-left') != null) {
            waterSquares[i].querySelector('.turns-left').innerHTML = 3 - existenceLength
        } else {
            let div = document.createElement('div')
            div.classList.add('turns-left')
            div.style.fontSize = window.getComputedStyle(waterSquares[i]).getPropertyValue('height')
            div.innerHTML = 3 - existenceLength
            waterSquares[i].appendChild(div)
        }
        let squaresAround = []
        let cords = getCordsOfSquare(waterSquares[i])
        if(existenceLength > 0) {
            if(existenceLength != 3) {
                let movements = [[1, 0], [-1, 0], [0, 1], [0, -1]]
                for(let i = 0; i < movements.length; i++) {
                    squaresAround.push(...universal(...cords, ...movements[i], 1, true))
                }
                squaresAround.forEach(square => {
                    if(!square.classList.contains('ocean-square')) {
                        if(!waterSquares.includes(square) && !square.classList.contains('water')) {
                            square.classList.add('water')
                            square.setAttribute('water-source', Array.prototype.indexOf.call(squares, waterSquares[i]))
                            let img = document.createElement('img')
                            img.src = '../img/water/water.png'
                            img.classList.add('square-bg')
                            square.appendChild(img)
                            if(square.querySelectorAll('.square-bg').length > 1) {
                                let squareWidth = window.getComputedStyle(squares[0]).getPropertyValue('width')
                                img.style.clip = 'rect(0px, ' + squareWidth + ', ' + squareWidth + ', ' + parseInt(squareWidth) / 2 + 'px)'
                                img.style.zIndex = '2'
                            }
                        }
                        if(!histPlaying) {
                            let piece = getPieceFromSquare(square)
                            if(piece != undefined && piece != clickedOn) {
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
                            if(targetSquare == square) {
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
                    }
                })
            } else {
                squares.forEach(square => {
                    if(square.getAttribute('water-source') == Array.prototype.indexOf.call(squares, waterSquares[i])) {
                        let removewater = true
                        for (let j = 0; j < square.classList.length; j++) {
                            if(square.classList[j].includes('water-')) {
                                removewater = false
                                break
                            }
                        }
                        if(removewater) {
                            square.classList.remove('water')
                            square.querySelector('.square-bg').remove()    
                        }
                        square.removeAttribute('water-source')
                    }
                })
                removeEntity(waterSquares[i], 'water', existenceLength, i)
                i--
                length--
            }
        }
    }
    length = steamSquares.length
    for (let i = 0; i < length; i++) {
        let existenceLength = 0
        for (let j = 0; j < steamSquares[i].classList.length; j++) {
            if(steamSquares[i].classList[j].includes('steam-')) {
                existenceLength = parseInt(steamSquares[i].classList[j].substring(6, steamSquares[i].classList[j].length))
                break
            }
        }
        steamSquares[i].classList.replace('steam-' + existenceLength, 'steam-' + ++existenceLength)
        if(steamSquares[i].querySelector('.turns-left') != null) {
            steamSquares[i].querySelector('.turns-left').innerHTML = 2 - existenceLength
        } else {
            let div = document.createElement('div')
            div.classList.add('turns-left')
            div.style.fontSize = window.getComputedStyle(steamSquares[i]).getPropertyValue('height')
            div.innerHTML = 2 - existenceLength
            steamSquares[i].appendChild(div)
        }
        let squaresAround = []
        let cords = getCordsOfSquare(steamSquares[i])
        if(existenceLength > 0) {
            if(existenceLength != 2) {
                let movements = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]
                for(let i = 0; i < movements.length; i++) {
                    squaresAround.push(...universal(...cords, ...movements[i], 1, true))
                }
                squaresAround.forEach(square => {
                    if(Math.random() < .25 && !square.classList.contains('ocean-square')) {
                        if(!steamSquares.includes(square) && !square.classList.contains('steam')) {
                            square.classList.add('steam')
                            square.setAttribute('steam-source', Array.prototype.indexOf.call(squares, steamSquares[i]))
                            let img = document.createElement('img')
                            img.src = '../img/water/steam.png'
                            img.classList.add('square-bg')
                            square.appendChild(img)
                            if(square.querySelectorAll('.square-bg').length > 1) {
                                let squareWidth = window.getComputedStyle(squares[0]).getPropertyValue('width')
                                img.style.clip = 'rect(0px, ' + squareWidth + ', ' + squareWidth + ', ' + parseInt(squareWidth) / 2 + 'px)'
                                img.style.zIndex = '2'
                            }
                        }
                        if(!histPlaying) {
                            let piece = getPieceFromSquare(square)
                            if(piece != undefined && piece != clickedOn) {
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
                            if(targetSquare == square) {
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
                    }
                })
            } else {
                squares.forEach(square => {
                    if(square.getAttribute('steam-source') == Array.prototype.indexOf.call(squares, steamSquares[i])) {
                        let removesteam = true
                        for (let j = 0; j < square.classList.length; j++) {
                            if(square.classList[j].includes('steam-')) {
                                removesteam = false
                                break
                            }
                        }
                        if(removesteam) {
                            square.classList.remove('steam')
                            square.querySelector('.square-bg').remove()    
                        }
                        square.removeAttribute('steam-source')
                    }
                })
                removeEntity(steamSquares[i], 'steam', existenceLength, i)
                i--
                length--
            }
        }
    }
    length = boilingSquares.length
    for (let i = 0; i < length; i++) {
        let existenceLength = 0
        for (let j = 0; j < boilingSquares[i].classList.length; j++) {
            if(boilingSquares[i].classList[j].includes('boiling-')) {
                existenceLength = parseInt(boilingSquares[i].classList[j].substring(8, boilingSquares[i].classList[j].length))
                break
            }
        }
        boilingSquares[i].classList.replace('boiling-' + existenceLength, 'boiling-' + ++existenceLength)
        if(boilingSquares[i].querySelector('.turns-left') != null) {
            boilingSquares[i].querySelector('.turns-left').innerHTML = 3 - existenceLength
        } else {
            let div = document.createElement('div')
            div.classList.add('turns-left')
            div.style.fontSize = window.getComputedStyle(boilingSquares[i]).getPropertyValue('height')
            div.innerHTML = 3 - existenceLength
            boilingSquares[i].appendChild(div)
        }
        let squaresAround = []
        let cords = getCordsOfSquare(boilingSquares[i])
        if(existenceLength > 0) {
            if(existenceLength != 3) {
                let movements = [[1, 1], [-1, 1], [1, -1], [-1, -1]]
                for(let i = 0; i < movements.length; i++) {
                    squaresAround.push(...universal(...cords, ...movements[i], 1, true))
                }
                if(existenceLength == 1) {
                    squaresAround.forEach(square => {
                        if(!square.classList.contains('ocean-square')) {
                            if(!boilingSquares.includes(square) && !square.classList.contains('boiling')) {
                                square.classList.add('boiling')
                                square.setAttribute('boiling-source', Array.prototype.indexOf.call(squares, boilingSquares[i]))
                                let img = document.createElement('img')
                                img.src = '../img/water/boiling.png'
                                img.classList.add('square-bg')
                                square.appendChild(img)
                                if(square.querySelectorAll('.square-bg').length > 1) {
                                    let squareWidth = window.getComputedStyle(squares[0]).getPropertyValue('width')
                                    img.style.clip = 'rect(0px, ' + squareWidth + ', ' + squareWidth + ', ' + parseInt(squareWidth) / 2 + 'px)'
                                    img.style.zIndex = '2'
                                }
                            }
                            if(!histPlaying) {
                                let piece = getPieceFromSquare(square)
                                if(piece != undefined && piece != clickedOn) {
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
                                if(targetSquare == square) {
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
                        }
                    })
                } else if(!histPlaying) {
                    squaresAround.forEach(square => {
                        if(Math.random() < .1) {
                            let removeboiling = true
                            for (let j = 0; j < square.classList.length; j++) {
                                if(square.classList[j].includes('boiling-')) {
                                    removeboiling = false
                                    break
                                }
                            }
                            if(removeboiling) {
                                square.classList.remove('boiling')
                                square.querySelector('.square-bg').remove()    
                            }
                            square.removeAttribute('boiling-source')
                            spawnEntity(square, 'steam', 0, 2, 'water')
                        }
                        let piece = getPieceFromSquare(square)
                        if(piece != undefined && piece != clickedOn) {
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
                        if(targetSquare == square) {
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
                    })
                }
            } else {
                squares.forEach(square => {
                    if(square.getAttribute('boiling-source') == Array.prototype.indexOf.call(squares, boilingSquares[i])) {
                        let removeboiling = true
                        for (let j = 0; j < square.classList.length; j++) {
                            if(square.classList[j].includes('boiling-')) {
                                removeboiling = false
                                break
                            }
                        }
                        if(removeboiling) {
                            square.classList.remove('boiling')
                            square.querySelector('.square-bg').remove()    
                        }
                        square.removeAttribute('boiling-source')
                    }
                })
                removeEntity(boilingSquares[i], 'boiling', existenceLength, i)
                i--
                length--
            }
        }
    }
    length = tsunamiSquares.length
    for (let i = 0; i < length; i++) {
        let existenceLength = 0
        for (let j = 0; j < tsunamiSquares[i].classList.length; j++) {
            if(tsunamiSquares[i].classList[j].includes('tsunami-')) {
                existenceLength = parseInt(tsunamiSquares[i].classList[j].substring(8, tsunamiSquares[i].classList[j].length))
                break
            }
        }
        tsunamiSquares[i].classList.replace('tsunami-' + existenceLength, 'tsunami-' + ++existenceLength)
        if(tsunamiSquares[i].querySelector('.turns-left') != null) {
            tsunamiSquares[i].querySelector('.turns-left').innerHTML = 3 - existenceLength
        } else {
            let div = document.createElement('div')
            div.classList.add('turns-left')
            div.style.fontSize = window.getComputedStyle(tsunamiSquares[i]).getPropertyValue('height')
            div.innerHTML = 3 - existenceLength
            tsunamiSquares[i].appendChild(div)
        }
        let squaresAround = []
        let cords = getCordsOfSquare(tsunamiSquares[i])
        let movements = []
        if(existenceLength == 1) {
            movements = [[0, 0], [1, 0], [0, 1], [0, -1], [-1, 0]]
        } else if(existenceLength == 2) {
            movements = [[0, 0], [1, 0], [0, 1], [0, -1], [-1, 0], [2, 0], [0, 2], [0, -2], [1, 1], [1, -1], [-2, 0], [-1, 1], [-1, -1]]
        } else if(existenceLength == 3) {
            squares.forEach(square => {
                if(square.getAttribute('tsunami-source') == Array.prototype.indexOf.call(squares, tsunamiSquares[i])) {
                    let removetsunami = true
                    for (let j = 0; j < square.classList.length; j++) {
                        if(square.classList[j].includes('tsunami-')) {
                            removetsunami = false
                            break
                        }
                    }
                    if(removetsunami) {
                        square.classList.remove('tsunami')
                        square.querySelector('.square-bg').remove()    
                    }
                    square.removeAttribute('tsunami-source')
                }
            })
            removeEntity(tsunamiSquares[i], 'tsunami', existenceLength, i)
            break
        }
        shipShooting = true
        movements.forEach(i => {
            squaresAround.push(universal(...cords, ...i, 1, true))
        })
        shipShooting = false
        squaresAround = [].concat(...squaresAround)
        histor[histor.length-1][3] = {
            ...histor[histor.length-1][3],
            confusedPieces: []
        }
        squaresAround.forEach(square => {
            if(!square.classList.contains('ocean-square')) {
                if(!tsunamiSquares.includes(square) && !square.classList.contains('tsunami')) {
                    square.classList.add('tsunami')
                    square.setAttribute('tsunami-source', Array.prototype.indexOf.call(squares, tsunamiSquares[i]))
                    let img = document.createElement('img')
                    img.src = '../img/water/tsunami.png'
                    img.classList.add('square-bg')
                    square.appendChild(img)
                }
                let piece = getPieceFromSquare(square)
                if(piece != undefined && piece != clickedOn) {
                    confusePiece(piece)
                    histor[histor.length-1][3].confusedPieces.push(piece)
                }
                if(targetSquare == square) {
                    confusePiece(clickedOn)
                    histor[histor.length-1][3].confusedPieces.push(clickedOn)
                }
            }
        })
    }
    // if(!histPlaying && histor[currentMove-11][3] != undefined && histor[currentMove-11][3].confusedPieces != undefined) {
    //     histor[currentMove-11][3].confusedPieces.forEach(piece => {
    //         if(piece.src.includes('confused')) {
    //             let sourceArray = piece.src.split('/')
    //             sourceArray[sourceArray.length-1] = sourceArray[sourceArray.length-1].substring(8)
    //             sourceArray[sourceArray.length-1] = sourceArray[sourceArray.length-1][0].toLowerCase() + sourceArray[sourceArray.length-1].substring(1, sourceArray[sourceArray.length-1].length)
    //             piece.src = sourceArray.join('/')
    //         }
    //     })
    // }
}



function addCssLink(name, linkBefore = undefined) {
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = name + '.css'
    if(linkBefore == undefined) {
        document.getElementsByTagName('HEAD')[0].appendChild(link)
    } else {
        let allLinkElements = document.querySelectorAll('link')
        let linkBeforeName = linkBefore.split('/').pop()
        for (let i = 0; i < allLinkElements.length; i++) {
            if(allLinkElements[i].href.split('/').pop() == linkBeforeName) {
                document.getElementsByTagName('HEAD')[0].insertBefore(link, allLinkElements[i])
                break
            }
        }
    }
}

