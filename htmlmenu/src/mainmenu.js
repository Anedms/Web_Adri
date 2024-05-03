
var mainMenu;
var credits;
var startButton;
var creditsButton;

function MainMenuSetup(onStart) {
    mainMenu = document.getElementById("mainMenu");
    credits = document.getElementById("credits");
    startButton = document.getElementById("menuStart");
    creditsButton = document.getElementById("menuCredits");

    startButton.onclick = () => {
        mainMenu.setAttribute('style', 'left: -640px');
        if (typeof(onStart) !== 'undefined') {
            onStart();
        }
    }

    creditsButton.onclick = () => {
        ShowCredits();
    }
}

function ShowMenu() {
    mainMenu.setAttribute('style', 'left: 0px');
}

function ShowCredits() {
    credits.setAttribute('style', 'display: block');
    credits.classList.add('show');
    credits.onanimationend = () => {
        credits.classList.remove('show');
        credits.setAttribute('style', 'display: none');
    };
}