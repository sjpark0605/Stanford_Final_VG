var PLAYGROUND_WIDTH = 1420;
var PLAYGROUND_HEIGHT = 770;
var REFRESH_RATE = 15;
var farParallaxSpeed = 1; 
var closeParallaxSpeed = 3; 
var enemyHeight = 50;
var enemyWidth = 84;
var enemy2Height = 50;
var enemy2Width = 50;
var enemySpawnRate = 500;
var shipHealth = 250;
var playerStamina = 250;
var playerHit = false;
var score = 0;
var enemy2SpawnRate = 1000;
var cargoshipSpawnRate = 5000;
var enemyCount = 0;
var cargoshipHeight = 88;
var cargoshipWidth = 50;
var bossHeight = 512;
var bossWidth = 512;
var bossHealth = 1250;
var bossCount = 50;
var notSpawned = true;
var vel = 10;  
var bossKilled = 0;


$("#startbutton").click(function(){
  $.playground().startGame(function(){
	  $("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
	});
  setInterval(function () {playerStamina -=3}, 1000);
  document.getElementById('score').style.display = 'block';
});

function Enemy(node, value){
  this.speed = 15;
  this.node = node;
  this.update = function(){
if (shipHealth <= 0){
            $("#playground").append('<div style="position: absolute; top: 300px; width: 1440; color: white; font-family: verdana, sans-serif;"><center><h1>Game Over</h1><br><a style="cursor: pointer;" id="restartbutton">Please refresh the page!</a></center></div>');
						$("#restartbutton").click(function(){$.playground().startGame(function(){$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();})
});
            }
            )}
    this.node.x(-this.speed, true);
    this.Health = 2;
    document.getElementById('rectangle').style.width = shipHealth.toString();
    document.getElementById('rectangle3').style.width = playerStamina.toString();
    if (playerStamina == 0) {
      shipHealth = 50;
    };
 }
   
 
 if (enemyCount >= bossCount && notSpawned) {


        notSpawned = false;
        var bossValue = Math.ceil(Math.random()*21) - 11;
       var name4 = "boss_"+(new Date).getTime();
       $("#enemies").addSprite(name4, {animation: '', posx: PLAYGROUND_WIDTH, posy: Math.random()*PLAYGROUND_HEIGHT*0.9,width: bossWidth, height: bossHeight});
       var bossElement = $("#"+name4);
       bossElement.addClass("boss");
       bossElement[0].enemy = new Boss(bossElement, bossValue);
  
  }
  
  
if (bossHealth <= 0 && notSpawned == false) {
    notSpawned = true;
    bossKilled +=1;
    bossCount += bossCount;
    score+=100 + (25*bossKilled);
    enemySpawnRate -= 50;
    enemy2SpawnRate -= 50;
    $('.boss').remove();
    bossHealth = 1250 + (bossKilled * 250);  
    shipHealth = 250;
  }
};
 

function Enemy2(node, value) {
  this.value = value;
  this.speed = 10;
  this.node = node;
  this.update = function(){
    this.node.y(-this.speed, true);
  };
}; 

function Cargoship(node, value){
  this.speed = 6;
  this.node = node;
  this.update = function(){
    this.node.y(-this.speed, true);
  };
};
    
function Boss(node, value){
  this.speed = 5;
  this.node = node,

  this.update = function(){
  this.y = Math.abs($('.boss').y() - $('#player').y());
  this.x = Math.abs($('.boss').x() - $('#player').x());
  this.deltax = this.speed*Math.cos(Math.atan2(this.y,this.x)); 
  this.deltay = this.speed*Math.sin(Math.atan2(this.y,this.x));

if ($('.boss').x() > $('#player').x()){
  this.node.x(-this.deltax, true);
    }
if ($('.boss').x() < $('#player').x()) {
    this.node.x(this.deltax, true);
} 
if ($('.boss').y() > $('#player').y()) {
    this.node.y(-this.deltay, true);
} 
if ($('.boss').y() < $('#player').y()) {
    this.node.y(this.deltay, true);
} 
  };
};

function Player() {
  
};

var playerHeight = 86;
var playerWidth = 151;



var missileSpeed = 20;




var background1 = new $.gQ.Animation({imageURL: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Galaxy_history_revealed_by_the_Hubble_Space_Telescope_%28GOODS-ERS2%29.jpg"});
var background2 = new $.gQ.Animation({imageURL: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Galaxy_history_revealed_by_the_Hubble_Space_Telescope_%28GOODS-ERS2%29.jpg"}); 
var background3 = new $.gQ.Animation({imageURL: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Galaxy_history_revealed_by_the_Hubble_Space_Telescope_%28GOODS-ERS2%29.jpg"});
var background4 = new $.gQ.Animation({imageURL: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Galaxy_history_revealed_by_the_Hubble_Space_Telescope_%28GOODS-ERS2%29.jpg"});

$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});

$.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
.addSprite("background1", {animation: background1, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
.addSprite("background2", {animation: background2, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
.addSprite("background3", {animation: background3, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
.addSprite("background4", {animation: background4, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
.end()
.addGroup("enemies", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})

.end()
.addGroup("player", {posx: 0, posy: PLAYGROUND_HEIGHT/2, width: playerWidth, height: playerHeight})
.addSprite("playerBody",{animation: '', posx: 0, posy: 0, width: playerWidth, height: playerHeight})
.end()
  .addGroup("playerMissileLayer",{width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT}).end()



$("#player")[0].player = new Player();

$.playground().registerCallback(function(){
  $("#background1").x(($("#background1").x() - farParallaxSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH);
  $("#background2").x(($("#background2").x() - farParallaxSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH);
  $("#background3").x(($("#background3").x() - closeParallaxSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH);
  $("#background4").x(($("#background4").x() - closeParallaxSpeed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH);
  $(".enemy").each(function(){
    this.enemy.update();
    if(($(this).x()+ enemyWidth) < 0){
      $(this).remove();
    } else {
      var collided = $(this).collision("#playerBody,."+$.gQ.groupCssClass);
      if(collided.length > 0){
        $(this).remove();
        shipHealth-=25;
        enemyCount ++; 
        if (shipHealth <= 0) {
          $('#player').remove();
        }   
        };
      };
  });
  $(".enemy2").each(function(){
    this.enemy.update()
        if(($(this).y()+ enemy2Height) < 0){
          $(this).remove();
  } else {
    var collided2 = $(this).collision("#playerBody,."+$.gQ.groupCssClass);
      if(collided2.length > 0){
        $(this).remove();
        shipHealth-=25;
        enemyCount ++;
        if (shipHealth <= 0) {
           $('#player').remove();
        }       
      };
  };
  });
  
   $(".cargoship").each(function(){
    this.enemy.update()
        if(($(this).y()+ cargoshipHeight) < 0){
          $(this).remove();
  } else {
    var collided3 = $(this).collision("#playerBody,."+$.gQ.groupCssClass);
      if(collided3.length > 0){
        $(this).remove();
        shipHealth-=25;
        enemyCount ++;
        if (shipHealth <= 0) {
           $('#player').remove();
        }       
      };
  };
  });
  
  

  
   $(".boss").each(function(){
    this.enemy.update()
    var collided4 = $(this).collision("#playerBody,."+$.gQ.groupCssClass);
      if(collided4.length > 0){
        shipHealth-=5;
        if (shipHealth <= 0) {
           $('#player').remove();      
      };
    };
  });
 

  $(".playerMissiles").each(function(){
    var posx = $(this).x()
    if(posx > PLAYGROUND_WIDTH){
      $(this).remove();
    }else{
      $(this).x(missileSpeed, true);
      var collided = $(this).collision(".enemy,."+$.gQ.groupCssClass);
      if (collided.length > 0){
        collided.remove();
        $(this).remove();
        score = score + 10;
        enemyCount++;
        shipHealth = shipHealth + 3;
        
      };
    };
  });
  
  
    $(".playerMissiles").each(function(){
    var posx = $(this).x()
    if(posx > PLAYGROUND_WIDTH){
      $(this).remove();
    }else{
      $(this).x(missileSpeed, true);
      var collided = $(this).collision(".enemy2,."+$.gQ.groupCssClass);
      if (collided.length > 0){
        collided.remove();
        $(this).remove();
        score = score + 10;
        enemyCount++;
        shipHealth = shipHealth + 3;
      };
    };
  });
   $(".playerMissiles").each(function(){
    var posx = $(this).x()
    if(posx > PLAYGROUND_WIDTH){
      $(this).remove();
    }else{
      $(this).x(missileSpeed, true);
      var collided = $(this).collision(".cargoship,."+$.gQ.groupCssClass);
      if (collided.length > 0){
        collided.remove();
        playerStamina+=30;
        $(this).remove();
        score = score + 10;
        enemyCount++;
        shipHealth = shipHealth + 3;
        
      };
    };
  });
     $(".playerMissiles").each(function(){
    var posx = $(this).x()
    if(posx > PLAYGROUND_WIDTH){
      $(this).remove();
    }else{
      $(this).x(missileSpeed, true);
      var collided = $(this).collision(".boss,."+$.gQ.groupCssClass);
      if (collided.length > 0){
        bossHealth-=25;
        $(this).remove();
        score = score + 10;
          shipHealth = shipHealth + 1;
      };
    };
  });

  if(jQuery.gameQuery.keyTracker[37]){ 
    var nextpos = $("#player").x()-10;
    if(nextpos > 0){
      $("#player").x(nextpos);
    }
  }
  if(jQuery.gameQuery.keyTracker[39]){
    var nextpos = $("#player").x()+10;
    if(nextpos < PLAYGROUND_WIDTH - playerWidth){
      $("#player").x(nextpos);
    }
  }
  if(jQuery.gameQuery.keyTracker[38]){ 
    var nextpos = $("#player").y()-10;
    if(nextpos > 0){
      $("#player").y(nextpos);
    }
  }
  if(jQuery.gameQuery.keyTracker[40]){ 
    var nextpos = $("#player").y()+10;
    if(nextpos < PLAYGROUND_HEIGHT - playerHeight){
      $("#player").y(nextpos);
    }
  }
}, REFRESH_RATE);

$.playground().registerCallback(function(){
  var enemyValue = Math.ceil(Math.random()*21) - 11;
  var name = "enemy_"+(new Date).getTime();
  $("#enemies").addSprite(name, {animation: '', posx: PLAYGROUND_WIDTH, posy: Math.random()*PLAYGROUND_HEIGHT*0.9,width: enemyWidth, height: enemyHeight});
  var enemyElement = $("#"+name);
  enemyElement.addClass("enemy");
  enemyElement[0].enemy = new Enemy(enemyElement, enemyValue);
}, enemySpawnRate); 

$.playground().registerCallback(function(){
  var enemy2Value = Math.ceil(Math.random()*21) - 11;
  var name2 = "enemy2_"+(new Date).getTime();
  $("#enemies").addSprite(name2, {animation: '', posx: Math.random()*PLAYGROUND_HEIGHT*1.3, posy: PLAYGROUND_WIDTH,width: enemy2Width, height: enemy2Height});
  var enemy2Element = $("#"+name2);
  enemy2Element.addClass("enemy2");
  enemy2Element[0].enemy = new Enemy2(enemy2Element, enemy2Value);
}, enemy2SpawnRate); 

$.playground().registerCallback(function(){
  var cargoshipValue = Math.ceil(Math.random()*21) - 11;
  var name3 = "cargoship_"+(new Date).getTime();
  $("#enemies").addSprite(name3, {animation: '', posx: Math.random()*PLAYGROUND_HEIGHT*1.3, posy: PLAYGROUND_WIDTH,width: cargoshipWidth, height: cargoshipHeight});
  var cargoshipElement = $("#"+name3);
  cargoshipElement.addClass("cargoship");
  cargoshipElement[0].enemy = new Cargoship(cargoshipElement, cargoshipValue);
}, cargoshipSpawnRate); 

$(document).keydown(function(e){
  if(e.keyCode === 32){
      var playerposx = $("#player").x();
      var playerposy = $("#player").y();
      var name = "playerMissile_"+(new Date()).getTime();
      $("#playerMissileLayer").addSprite(name, {posx: playerposx + playerWidth - 5, posy: playerposy + 40, width: playerWidth/15,height: playerHeight/14});
      $("#"+name).addClass("playerMissiles");
      shipHealth--;
  } 
});






