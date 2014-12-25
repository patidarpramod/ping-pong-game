var WIDTH=700, HEIGHT=600;

var canvas, ctx, keystate;

player = {
    x: null,
    y: null,
    width: 20,
    height: 100,
    
    update: function(){},
    draw: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height );
    }
};


function main(){
    canvas = document.createElement("canvas");
    canvas.width=WIDTH;
    canvas.height=HEIGHT;
    ctx= canvas.getContext("2d");
    document.body.appendChild(canvas);
    init();
    
    var loop = function(){
        update();
        draw();
        window.requestAnimationFrame(loop, canvas);
    }
   
    window.requestAnimationFrame(loop, canvas);
}

function init(){
    player.x = player.width;
    player.y = (HEIGHT - player.height)/2;
 
}

function update(){
    player.update();
}

function draw(){
    player.draw();
}


main();