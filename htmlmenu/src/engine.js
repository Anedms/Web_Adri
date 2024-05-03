
var canvas = /** @type {HTMLCanvasElement} */(null);
var ctx = /** @type {CanvasRenderingContext2D} */(null);

var time = 0,
    fps = 0,
    framesAcum = 0,
    acumDelta = 0;
var targetDT = 1/60; // 60 fps
var globalDT;

// game variables
var assets = {

}

var rectangle = {
    x: 0,
    y: 0,
    with: 100,
    height: 100,
    rotation: 0,
    color: 'red'
}

function LoadImages(assets, onloaded) {
    let imagesToLoad = 0;
    
    if (Object.keys(assets).length === 0)
        onloaded();

    const onload = () => --imagesToLoad === 0 && onloaded();

    /*const onload = function() {
        --imagesToLoad;
        if (imagesToLoad === 0) {
            onloaded();
        }
    }*/

    // iterate through the object of assets and load every image
    for (let asset in assets) {
        if (assets.hasOwnProperty(asset)) {
            imagesToLoad++; // one more image to load

            // create the new image and set its path and onload event
            const img = assets[asset].img = new Image;
            img.src = assets[asset].path;
            img.onload = onload;
        }
     }
    return assets;
}

function Init() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    // input setup
    SetupKeyboardEvents();
    SetupMouseEvents();
    
    // assets loading
    LoadImages(assets, () => {
        // setup main menu
        MainMenuSetup(() => {
            Start();
            Loop();
        });        
    });
}

function Start() {
    time = performance.now();

    rectangle.x = canvas.width / 2;
    rectangle.y = canvas.height / 2;
}

function Loop() {
    requestAnimationFrame(Loop);
    
    // compute FPS
    let now = performance.now();

    let deltaTime = (now - time) / 1000;
    globalDT = deltaTime;

    time = now;

    framesAcum++;
    acumDelta += deltaTime;

    if (acumDelta >= 1) {
        fps = framesAcum;
        framesAcum = 0;
        acumDelta -= 1;
    }

    if (deltaTime > 1000)
        return;

    // Game logic -------------------
    Update(deltaTime);

    // Draw the game ----------------
    Draw(ctx);

    // reset input data
    Input.PostUpdate();
}

function Update(deltaTime) {
    if (Input.IsKeyDown(KEY_ESCAPE))
        ShowMenu();

    rectangle.rotation += deltaTime * 2;
}

function Draw(ctx) {
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the rectangle
    ctx.fillStyle = rectangle.color;
    ctx.save();
    ctx.translate(rectangle.x, rectangle.y);
    ctx.rotate(rectangle.rotation);
    ctx.fillRect(-rectangle.with / 2, -rectangle.height / 2, rectangle.with, rectangle.height);
    ctx.restore();

    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "24px Comic Sans MS regular";
    ctx.fillText("Press Escape to return to main menu", canvas.width / 2, canvas.height - 60);

    // draw the fps
    DrawStats(ctx);
}

function DrawStats(ctx) {
    ctx.textAlign = "start";
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(2, 2, 110, 54);
    ctx.fillStyle = "white";
    ctx.font = "12px Comic Sans MS regular";
    
    
    ctx.fillText("FPS: " + fps, 6, 14);
    ctx.fillText("FPS (dt): " + (1 / globalDT).toFixed(2), 6, 32);
    ctx.fillText("deltaTime: " + (globalDT).toFixed(4), 6, 50);
}

window.onload = Init;
