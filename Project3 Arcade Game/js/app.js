// Enemies our player must avoid
var Enemy = function(y,speed) {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 505) {
      this.x = 0;
    }else {
      this.x = this.x + 50*this.speed*dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//global method for handling collision;
//if the player colide with any enemy, it will return to its starting position
function checkCollision(player,enemies) {
  for(let i = 0; i < enemies.length; i++) {
    if(player.x < enemies[i].x +30 && player.x >enemies[i].x-30 &&
       player.y < enemies[i].y +30 && player.y > enemies[i].y-30) {
      player.x = 200;
      player.y = 380;
    }
  }
}

// code for player class
// a player class has update(), render() and handleInput() methods.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 380;
};

Player.prototype.update = function() {
  checkCollision(player,allEnemies);
  //if the player reached the water, player will return to the original position
  var self = this;
  if(self.y === -45) {
    setTimeout(function() {
      self.x = 200;
      self.y = 380;
    },1000);
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(moveTo) {
  if(moveTo === "left" && this.x > 0) {
    this.x = this.x - 100;
  }else if (moveTo === "right" && this.x < 400) {
    this.x = this.x + 100;
  }else if (moveTo === "up" && this.y > 0) {
    this.y = this.y - 85;
  }else if (moveTo === "down" && this.y < 380) {
    this.y = this.y + 85;
  }

};

// instantiate enemies.
var enemy1 = new Enemy(60,1);
var enemy2 = new Enemy(143,3);
var enemy3 = new Enemy(226,5);
var allEnemies = [enemy1,enemy2,enemy3];

// instantiate player
var player = new Player();


// This listens for key presses and sends the keys to Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
