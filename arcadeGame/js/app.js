// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 100*dt;
    if(this.x > 500) {
        this.respawn();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.respawn = function(rand){ //reset the bugs when they reach other side.
        this.x = Math.floor(Math.random() * 50) - 200; //randomly assign x and y 
        this.y = Math.floor(Math.random() * 100) + 100;
    
}

// Now write your own player class
function Player(){ //Player contructor with starting position 
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}
// This class requires an update(), render() and
Player.prototype.update = function(key) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(key == 'up') {
        this.y -= 20;
    }
    if(key == 'down'){
        this.y += 20;
    }
    if(key == 'left') {
        this.x -= 20;
    }
    if(key == 'right'){
        this.x +=20;
    }

    if(this.y == 20 || this.y == 440 || this.x == -60 || this.x == 460){
        this.respawn();
    }
};
Player.prototype.render = function() { //render the sprite for the player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(key) { //handle all key presses
    player.update(key);
}
Player.prototype.respawn = function(){ //reset the character at edge of game and when we reach the water
    this.x = 200;
    this.y = 400;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy = new Enemy(); 
//assign starting positions that are offset so no bugs are grouped when reset
enemy.x = -100;
enemy.y = 200;
var enemyTwo = new Enemy();
enemyTwo.x = -300;
enemyTwo.y = 120;
var enemyThree = new Enemy();
enemyThree.x = - 500;
enemyThree.y = 40;
var allEnemies = [enemy,enemyTwo,enemyThree];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
