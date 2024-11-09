game = {
    canvas: null,
    ctx: null,
    image: null,
    cover: true,
}

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
    game.player = new Player(game.canvas.width / 2);
    game.positionX = game.canvas.width / 2;
    game.player.draw(game.positionX); 
    animate();
}


window.onload = function(){
    game.canvas = document.getElementById('canvas');
    if(game.canvas && game.canvas.getContext){
        game.ctx = canvas.getContext('2d');
    
        if(game.ctx){

            cover();
            game.canvas.addEventListener('click', select, false);

        } else{
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