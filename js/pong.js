
var logger = document.getElementById("log");
var WIDTH=700, HEIGHT=600;

var canvas, ctx, keystate;
var upArrow = 38, downArrow=40;
player = {
    x: null,
    y: null,
    width: 20,
    height: 100,
    
    update: function(){
    if(keystate[upArrow]) this.y = this.y -7;
    if(keystate[downArrow]) this.y = this.y + 7;   
    //this is so that paddle doesn't go outside of game world.
    this.y = Math.max(Math.min(this.y, HEIGHT-this.height),0);   
    },
    draw: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height );
    }
};

ai = {
    x: null,
    y: null,
    width: 20,
    height: 100,
    
    update: function(){
     var desty = ball.y -(this.height - ball.size)/ 2;
     this.y += (desty - this.y) *0.1;
     //this is so that paddle doesn't go outside of game world.
     this.y = Math.max(Math.min(this.y, HEIGHT-this.height),0);   
    },
    draw: function() {
        ctx.fillRect(this.x, this.y, this.width, this.height );
    }
};

ball = {
    x: null,
    y: null,
    velocity : null,
    size: 20,
    speed: 10,
    //to elimiate comdition where we can abuse game and always win by just keeping paddle on winning position
    server : function(side){
        var r = Math.random();
        this.x = side ===1 ? player.x+ player.width : ai.x - this.size;
        this.y = (HEIGHT - this.size)*r;
        var angle = 0.1 * Math.PI *(1 - 2*r);
        this.velocity = {
            x: side * this.speed * Math.cos(angle),
            y: this.speed * Math.sin(angle)
        }
    },

    update: function(){
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        //provide a ball bounce effect over the net line
        if( 0 > this.y || this.y+this.size > HEIGHT){
            //TODO: offset?
           this.velocity.y *= -1; 
        }
        
        var twoObjIntersect = function(ax, ay, aw, ah, bx, by, bw, bh){
            return ax< bx+bw && ay < by+bh && bx<ax+aw && by<ay+ah;
        }
        
        //determine whose paddle is in action (player or ai)
        var paddle =  this.velocity.x < 0 ? player : ai;
        if(twoObjIntersect(paddle.x,paddle.y,paddle.width,paddle.height, this.x,this.y,this.size,this.size))  {
        //this is to determine where ball hits on the paddle in terms of value between 0 and 1
        var n = (this.y+this.size - paddle.y)/ (paddle.height+this.size);
        var angle = (Math.PI/4)*(2*n - 1); //pi/4 == 45 degrees
        var smash = Math.abs(angle) > 0.2 * Math.PI ? 1.5 :1;
        //this.velocity.x *= -1;
        this.velocity.x = smash * ((paddle === player) ? 1 : -1) * this.speed*Math.cos(angle);
        this.velocity.y = smash * this.speed*Math.sin(angle);
               logme([angle,this.velocity.x , this.velocity.y]);
        }
        
       //SERVE new ball
       if (0> this.x+ this.size || this.x > WIDTH){
        //set ball directions..copied from init()

        /* ball.x = (WIDTH - ball.size)/2;
        ball.y = (HEIGHT - ball.size)/2;
        ball.velocity = {
            x: ((paddle === player) ? 1 : -1) * ball.speed,
            y: 0
        }*/
      
        this.server((paddle === player) ? 1 : -1);

       }     
        
    },
    draw: function() {
        ctx.fillRect(this.x, this.y, this.size, this.size );
    }
};

function main(){
    attachKeyListeners();
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

function attachKeyListeners(){
keystate = [];
document.addEventListener("keydown", function(evt){
  keystate[evt.keyCode] = true;
});

document.addEventListener("keyup", function(evt){
  delete keystate[evt.keyCode];
});

    
}

function init(){
    //init real player
    player.x = player.width;
    player.y = (HEIGHT - player.height)/2;
    //init ai
    ai.x = WIDTH - (player.width + ai.width);
    ai.y = (HEIGHT - ai.height)/2;
    
    //init ball
    /*ball.x = (WIDTH - ball.size)/2;
    ball.y = (HEIGHT - ball.size)/2;
    ball.velocity = {
        x: ball.speed,
        y: 0
    }*/
     ball.server(1);
 
}

function update(){
    player.update();
    ai.update();
    ball.update();
}

function draw(){
    //backgrond in black by default
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.save(); //save context - black background.
    ctx.fillStyle =  "#FFF"; //now start a new color  - white
    //draw with white color
    player.draw();
    ai.draw();
    ball.draw();
    drawNet();
    // now restore to black backgroud
    ctx.restore();
    
}

function drawNet(){
    var w =4;
    var x = (WIDTH - w)/2;
    var y= 0;
    var step = HEIGHT / 20;
    while (y < HEIGHT){
       ctx.fillRect(x, y+step*0.25, w, step*0.5);
        y = y+step;
    }
}

function logme(txtArray){
    var txt= "[";
    for(i in txtArray){
     txt +=txtArray[i]+ " ,  ";
     }
    txt +="]"
 if(logger) logger.innerHTML = txt;
}

main();