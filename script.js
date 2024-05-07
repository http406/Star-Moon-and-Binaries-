


window.addEventListener('load', checkJSLoaded)

function checkJSLoaded() {    

(function makeStars(){
    // vary size for fun
  var colors = ['#ffffff','#c9cdff','#ffcac9','#fff9c9'];
    var divsize = ((Math.random()*2)).toFixed();
    var color = colors[Math.floor(Math.random()*colors.length)];
    $newdiv = $('<div/>').addClass("star").css({
        'width':divsize+'px',
        'height':divsize+'px',
        'background-color': color,
        'box-shadow': '0px 0px ' + (divsize * 5) +'px #fff',
        'z-index': divsize
    });

    // make position sensitive to size and document's width
    var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
    var posy = (Math.random() * ($(document).height() - divsize)).toFixed();

    $newdiv.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none'
    }).appendTo( 'body' ).fadeIn(.001, function(){

      makeStars(); 
    }); 
})();

(function makeBrightStars(){
    // vary size for fun
  var colors = ['#ffffff','#c9cdff','#ffcac9','#fff9c9'];
    var divsize = ((Math.random()*3)).toFixed();
    var color = colors[Math.floor(Math.random()*colors.length)];
    $newdiv = $('<div/>').addClass("star").css({
        'width':divsize+'px',
        'height':divsize+'px',
        'background-color': color,
        'box-shadow': '0px 0px ' + (divsize * 5) +'px #fff',
        'z-index': divsize
    });

    // make position sensitive to size and document's width
    var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
    var posy = (Math.random() * ($(document).height() - divsize)).toFixed();

    $newdiv.css({
        'position':'absolute',
        'left':posx+'px',
        'top':posy+'px',
        'display':'none'
    }).appendTo( 'body' ).delay(1000).fadeIn(.1, function(){

      makeBrightStars(); 
    }); 
})();


let canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    letters = '01101100110010110110011001',
    height = canvas.height = window.innerHeight,
    width = canvas.width = window.innerWidth,
    font_size = 8,
    columns = width / font_size,
    drops = [],
    frame = 1;

letters = letters.split("");

for(let i = 0; i <columns; i++){
  drops[i] = 1;
}

clear();

function draw(){
  if(frame == 1){
    clear();
    showLetters();
  }else if(frame == 2){
    frame = 0;
  }

  frame++;
  window.requestAnimationFrame(draw);
}

function showLetters(){
  ctx.fillStyle='hsl(' + 5000 * Math.random() + ', 150%, 50%)';
  ctx.font = font_size + "px Gotham";
  
  for(let i = 0; i < drops.length; i++){ 
    let text = letters[Math.floor(Math.random()*letters.length)];
    
     let textPosY =  drops[i] * font_size; 
    ctx.fillText(text,i*font_size,textPosY); 
  if(textPosY > height && Math.random() > 0.976){
        drops[i] = 0;
      }

      drops[i]++;
    }
}



//*******************************

// current application time, in milliseconds.
var applicationTime = 0;    
// scale applied to time. 
// 1 means no scale, <1 is slower, >1 faster.
var timeSpeed = 1;

// after launchAnimation is called, 
//  draw/handleInput/update will get called on each rAF
function launchAnimation() {
    requestAnimationFrame(_launchAnimation);
}

// ------------- Private methods ----------------

function _launchAnimation(now) {
    _lastTime = now;
    applicationTime = 0
    requestAnimationFrame(_animate);
}

// ----------------------------------------------
// Animation.
//   Use launchAnimate() to start the animation.
//     draw, handleInput, update will be called every frame.
// ----------------------------------------------
function _animate(now) {
    requestAnimationFrame(_animate);
    // _______________________
    var dt = now - _lastTime;
    if (dt < 12) return; // 60 HZ max
    if (dt > 200) dt = 16; // consider 1 frame elapse on tab-out 
    _lastTime = now;
    dt *= timeSpeed;
    applicationTime += dt;
    // _______________________
    handleInput(); // ...
    // update everything with this frame time step.
    update(dt);
    // draw everything    
    draw();
}
var _lastTime = 0;



//*******************************



function clear(){
  ctx.fillStyle = 'rgb(0,0,0,0.05)';
  ctx.fillRect(0,0,width,height);
}
window.requestAnimationFrame(draw);
window.addEventListener('resize', function(){
  height = canvas.height = window.innerHeight;
  width = canvas.width = window.innerWidth;
})

/*
var sound = new Howl({
  src: ['http://dl.dropbox.com/s/e889ya1zrvu1wr3/dev%20n%20chanda%20theme%202-dev%20d%20%28%20256kbps%20cbr%20%29.mp3'],
  autoplay: true,
  loop: true,     //for sound looping 
  volume: .3,
});

// Clear listener after first call.
sound.once('load', function(){
  sound.play();
});
*/
//________replace audio________
var url = 'http://dl.dropbox.com/s/e889ya1zrvu1wr3/dev%20n%20chanda%20theme%202-dev%20d%20%28%20256kbps%20cbr%20%29.mp3';
    window.AudioContext = window.AudioContext||window.webkitAudioContext; //fix up prefixing
    var context = new AudioContext(); //context
    var source = context.createBufferSource(); //source node
    source.connect(context.destination); //connect source to speakers so we can hear it
    var request = new XMLHttpRequest();
    request.open('GET', url, true); 
    request.responseType = 'arraybuffer'; //the  response is an array of bits
    request.onload = function() {
        context.decodeAudioData(request.response, function(response) {
            source.buffer = response;
            source.start(0); //play audio immediately
            source.loop = true;
        }, function () { console.error('The request failed.'); } );
    }
    request.send();
//________________________________________



var DEBUG = false;
if(!DEBUG){
    if(!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for(var i=0;i<methods.length;i++){
        console[methods[i]] = function(){};
    }
}


};


 
