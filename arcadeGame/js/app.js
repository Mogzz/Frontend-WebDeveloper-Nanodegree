// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speedArr = [100, 150, 200, 250];
    this.hypSpeedArr = [300,350,400];
    this.yArr = [64, 147, 230];
    this.x = 1;
    this.height = 50;
    this.width = 50;
    this.y = this.yArr[Math.floor(Math.random() * this.yArr.length)];
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = this.speedArr[Math.floor(Math.random() * this.speedArr.length)];
    this.hyperSpeed = this.hypSpeedArr[Math.floor(Math.random() * this.hypSpeedArr.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(points < 50){
        this.x += this.speed*dt;
    } else {
        this.x += this.hyperSpeed*dt;
    }
    
    if(this.x > 500) {
        this.respawn();
    }
    

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.respawn = function(rand){ //reset the bugs when they reach other side.
        this.x = -105; //randomly assign x and y 
        this.y = this.yArr[Math.floor(Math.random() * this.yArr.length)];
}


// Now write your own player class
function Player(){ //Player contructor with starting position 
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.height = 101;
    this.width = 101;
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

    if(this.y == 440 || this.x == -60 || this.x == 460){ //if we reach the end, bottom or sides of frame. Reset
    }
    if(this.y == 0) {
        points += 10;
        score.innerText = points;
        this.respawn();
        console.log(points);
    }
    if(points == 100) {
        winnerModal();
    }
    this.checkCollisions();


};
Player.prototype.render = function() { //render the sprite for the player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(key) { //handle all key presses
    this.update(key);
}
Player.prototype.respawn = function(){ //reset the character at edge of game and when we reach the water
    this.x = 200;
    this.y = 400;
}
Player.prototype.checkCollisions = function(){

   for (var i = 0; i < allEnemies.length; i++) {
       const enemy = allEnemies[i];
        if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.height + enemy.y > this.y) {
            //moves the player back to it's start position
            this.respawn();
            if(points >= 20) {
                points -= 20;
                score.innerText = points;
            } else  {
                points = 0;
                        
            }
        
            console.log('collision!!');
        }
    } 
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var enemy = new Enemy(); 
//assign starting positions that are offset so no bugs are grouped when reset

var enemyTwo = new Enemy();
var enemyThree = new Enemy();
var allEnemies = [enemy,enemyTwo,enemyThree];
// Place the player object in a variable called player
var player = new Player();
var points = 0;
var score = document.getElementById('score');
score.innerText = points;

function winnerModal() {

}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    e.preventDefault();
    player.handleInput(allowedKeys[e.keyCode]);
});
