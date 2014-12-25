var WIDTH=700, HEIGHT=600;

var canvas, ctx, keystate;

function main(){
    canvas = document.createElement("canvas");
    canvas.width=WIDTH;
    canvas.height=HEIGHT;
    ctx= canvas.getContext("2d");
    document.body.appendChild(canvas);
    var loop = function(){
        update();
        draw();
        window.requestAnimationFrame(loop, canvas);
    }
   
    window.requestAnimationFrame(loop, canvas);
}

var counter=0;
var txt = document.getElementById("txt");


function update(){
}

var operation;
function draw(){
    console.log(counter);
    txt.innerHTML=counter;
    
     ctx.fillRect(0,0,counter,counter);
    
    if(counter == 0){
      operation =1; //increment
      ctx.fillStyle="rgb(255,255,"+counter+100+")";  
    }
    if(counter == 200){
      operation = -1; //decrement
      ctx.fillStyle="rgb(255,0,"+counter+100+")"; 
      
        // ctx.clearRect ( 0 , 0 ,WIDTH, HEIGHT );  
    }
    
    if(operation == 1){
        counter++;
    }else if(operation ==-1){
        counter--;
    }
}

main();