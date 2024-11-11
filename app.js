// VARIABLE DECLARATION
game = {
    canvas: null,
    ctx: null,
    playerImage: null,
    cover: true,
    endGame: false,

    positionX: 20,
    positionY: 640,

    keyPressed: null,
    key: [],
}


const keyEnter = 13;
const keyLeft = 37;
const keyUp = 38;
const keyRight = 39;
const keyDown = 40;
const spacebar = 32;


// STARTING GAME
const cover = () => {
    let image = new Image();
    image.src = 'img/cover.png';
    image.onload = () => {
        // Calculate scale
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Image proportions
        const imgWidth = image.width;
        const imgHeight = image.height;

        // Calculate new scale
        const scale = Math.min(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * scale;
        const newHeight = imgHeight * scale;

        // Calculate center position
        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        game.ctx.drawImage(image, x, y, newWidth, newHeight);
    };
};

const start = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.cover = false;
    game.player = new Player(game.positionX);
    game.player.draw(game.positionX);
    animate();
}

const animate = () => {
    if (game.endGame == false) {
        requestAnimationFrame(animate);
        verifyPosition();
        draw();
    }
};

const select = (e) => {
    if (game.cover) {
        start();
    };
};

class Player {
    constructor(x) {
        this.x = x;
        this.y = 600;
        this.width = 170;
        this.height = 140;
        this.facingRight = true;
        this.draw = function (x) {
            this.x = x;
            this.y = game.positionY;
            game.ctx.drawImage(game.playerImage, this.x, this.y, this.width, this.height);
        };
    };
};

const verifyPosition = () => {
    if (game.key[keyRight]) game.positionX += 10;
    if (game.key[keyLeft]) game.positionX -= 10;

    if (game.positionX > game.canvas.width - 180) game.positionX = game.canvas.width - 180;
    if (game.positionX < 20) game.positionX = 20;
};



const draw = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    // score();
    game.player.draw(game.positionX);
    // Create square 1
    game.ctx.fillStyle = '#671616';
    game.ctx.lineWidth = 5;
    game.ctx.fillRect(0, 770, 1050, 50); // x, y, w, h  Draw figure
}







document.addEventListener('keydown', function (e) {
    game.keyPressed = e.keyCode;
    game.key[e.keyCode] = true;
});

document.addEventListener('keyup', function (e) {
    game.key[e.keyCode] = false;
});


window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) { window.setTimeout(callback, 17); }
})();

window.onload = function () {
    game.canvas = document.getElementById('canvas');
    if (game.canvas && game.canvas.getContext) {
        game.ctx = canvas.getContext('2d');

        if (game.ctx) {

            cover();
            game.canvas.addEventListener('click', select, false);
            game.playerImage = new Image();
            game.playerImage.src = 'img/player.png';

        } else {
            alert('Your browser does not support canvas')
        };



    };
};


// function drawRandomPacmans(n, ctx) {
//     for (let i = 0; i < n; i++) {
//       const x = Math.floor(Math.random() * ctx.canvas.width);
//       const y = Math.floor(Math.random() * ctx.canvas.height);
//       const radius = Math.floor(Math.random() * 100) + 50;
//       drawPacman(x, y, radius, ctx);
//     }
//   }