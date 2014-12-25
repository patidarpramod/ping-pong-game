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

ai = {
    x: null,
    y: null,
    width: 20,
    height: 100,
    
    update: function(){},
    draw: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height );
    }
};

ball = {
    x: null,
    y: null,
    size: 20,
    
    
    update: function(){},
    draw: function() {
        ctx.fillRect(this.x, this.y, this.size, this.size );
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
    //init real player
    player.x = player.width;
    player.y = (HEIGHT - player.height)/2;
    //init ai
    ai.x = WIDTH - (player.width + ai.width);
    ai.y = (HEIGHT - ai.height)/2;
   //init ball
    ball.x = (WIDTH - ball.size)/2;
    ball.y = (HEIGHT - ball.size)/2;
 
}

function update(){
    player.update();
    ai.update();
    ball.update();
}

function draw(){
    player.draw();
    ai.draw();
    ball.draw();
}


main();