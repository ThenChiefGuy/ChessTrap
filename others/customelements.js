let body = document.querySelector('body')
let navBar = document.querySelector('.nav-bar')
let timeControls = document.querySelector('.time-controls')
let historCon = document.querySelector('.history')
let actualHistor = document.querySelector('.actual-history')

if(typeof chess4Pieces !== 'undefined' || folder == null) var folder = ''

//#region
navBar.innerHTML = `
    <div class="upper-nav-bar">
        <a href="` + folder + `index.html">
            <div class="main-web">
                <img src="` + folder + `img/ChessTrapss.webp" alt="" class="logo">
                <h3 class="button name">ChessTraps</h3>
            </div>
        </a>
        <a href="` + folder + `variants/play.html?variant=evolvingPieces">
            <div class="button button-nav">
                <img class="nav-icon" src="` + folder + `img/evolvingPieces/whitePieces/megaPawn.png" alt="">
                <div class="name">Evolution</div>
            </div>
        </a>
        <a href="` + folder + `variants/play.html?variant=cylinder" class="patreon-only">
            <div class="button button-nav">
                <img class="nav-icon" src="` + folder + `img/cylinder/cylinder.png" alt="">
                <div class="name">Cylinder Chess</div>
            </div>
        </a>
        <a href="` + folder + `variants/patreonVariants.html" class="patreon-only">
            <div class="button button-nav">
                <img style="transform: scale(.8);" class="nav-icon" src="` + folder + `img/3.0/bonus.png" alt="">
                <div class="name">Bonus Variants</div>
            </div>
        </a>
        <a href="` + folder + `variants/positionEditor/play.php">
            <div class="button button-nav">
                <img class="nav-icon" src="` + folder + `img/DLC1/whitePieces/archbishop.png" alt="">
                <div class="name">Editor</div>
            </div>
        </a>
    </div>
    <div class="lower-nav-bar">
        <a href="https://www.patreon.com/ChessTraps">
            <div class="button button-nav full-img">
                <img class="nav-icon for-small-screen" src="` + folder + `img/patreonSmall.png" alt="">
                <img class="nav-icon for-big-screen" src="` + folder + `img/patreon.png" alt="">
            </div>
        </a>
        <a href="` + folder + `settings/boards.php">
            <div class="button button-nav">
                <img class="nav-icon cosmetics" src="` + folder + `img/hat.png" alt="">
                <div class="name">Cosmetics</div>
            </div>
        </a>
        <a href="` + folder + `login/login.php">
            <div class="button button-nav">
                <img class="nav-icon" src="` + folder + `img/person.png" alt="">
                <div class="name">Login with Patreon</div>
            </div>
        </a>
    </div>
`
//#endregion


if(timeControls != null) {
    timeControls.innerHTML = `
        <h3>Time Controls: </h3>
        <div class="time-controls-row">
            <div class="button button-main time-control">1 min</div>
            <div class="button button-main time-control">2 min</div>
        </div>
        <div class="time-controls-row">
            <div class="button button-main time-control">3 min</div>
            <div class="button button-main time-control">5 min</div>
            <div class="button button-main time-control active">10 min</div>
        </div>
        <div class="time-controls-row" style="margin-top: .8em; padding-left: .7em; padding-right: .7em;">
            <div style="margin-right: .5em;">Selected:</div>
            <div class="button button-main time-control active selected-time">10 min</div>
        </div>
        <span class="button more-times">more time controls</span>
    `
    timeControls.parentElement.parentElement.innerHTML = timeControls.parentElement.parentElement.innerHTML + `
        <div class="side-bar side-bar-time abs">
            <div class="time-controls">
                <div class="iks-con">
                    <h3>Time Controls: </h3>
                    <div class="iks-container">
                        <div class="button iks">
                            <div class="main-axis"></div>
                            <div class="cross-axis"></div>
                        </div>
                    </div>
                </div>
                <div class="grid-times">
                    <div class="button button-main time-control entire-row">no clock</div>

                    <div class="button button-main time-control">1 min</div>
                    <div class="button button-main time-control">1 | 1</div>
                    <div class="button button-main time-control">2 min</div>

                    <div class="button button-main time-control">3 min</div>
                    <div class="button button-main time-control">3 | 2</div>
                    <div class="button button-main time-control">5 min</div>

                    <div class="button button-main time-control">5 | 3</div>
                    <div class="button button-main time-control active">10 min</div>
                    <div class="button button-main time-control">15 min</div>

                    <div class="button button-main time-control">15 | 10</div>
                    <div class="button button-main time-control">30 min</div>
                </div>
            </div>
        </div>
    `

    document.querySelectorAll('.time-control').forEach(timeControl => {
        timeControl.addEventListener('click', activeTimeControl)
    })

    document.querySelector('.more-times').addEventListener('click', function() {
        document.querySelector('.side-bar-time').classList.remove('abs')
        document.querySelector('.side-bar-1').classList.add('abs')
    })
    document.querySelector('.iks').addEventListener('click', function() {
        document.querySelector('.side-bar-1').classList.remove('abs')
        document.querySelector('.side-bar-time').classList.add('abs')
    })
}

if(historCon != null) {
    // <div class="button button-main save-game">
    //     save game
    // </div>
    historCon.innerHTML = `
        <div>
            <div onclick="flipBoard();" class="button button-main flip-board">
                flip board
            </div>
            
        </div>
        <div>
            <div class="button button-main history-button total-back">
                <img src="` + folder + `img/history/remove.png" alt="">
            </div>
            <div class="button button-main history-button back">
                <img src="` + folder + `img/history/back.png" alt="">
            </div>
            <div class="button button-main history-button forward">
                <img src="` + folder + `img/history/forward.png" alt="">
            </div>
            <div class="button button-main history-button reset">
                <img src="` + folder + `img/history/reset.png" alt="">
            </div>
        </div>
    `
}

if(actualHistor != null) {
    actualHistor.innerHTML = `
        <div class="white-moves">
            <div>White</div>
        </div>
        <div class="black-moves">
            <div>Black</div>
        </div>    
    `
}

if(getCookie('cookies_accepted') != 'true') {
    body.innerHTML = body.innerHTML + `
        <div class="cookie-consent-popup">
            <div class="cookie-message">
                <p>
                    We use cookies to enhance your experience on our website. By continuing to use our site, you accept our use of cookies. 
                    <a href="/privacyPolicy.html">Learn more</a>
                </p>
                <button id="acceptCookies">Accept</button>
            </div>
        </div>
    `

    document.querySelector('.cookie-consent-popup').addEventListener('click', () => {
        setCookie('cookies_accepted', 'true', 365);
        document.querySelector('.cookie-consent-popup').style.display = 'none';
    });
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}


function activeTimeControl(e) {
    let selectedTime = document.querySelector('.selected-time')
    e.target.classList.add('active')
    selectedTime.innerText = e.target.innerText

    document.querySelectorAll('.time-control').forEach(timeControl => {
        timeControl.classList.remove('active')
        if(timeControl.innerText == selectedTime.innerText) {
            timeControl.classList.add('active')
        }
    })
}


