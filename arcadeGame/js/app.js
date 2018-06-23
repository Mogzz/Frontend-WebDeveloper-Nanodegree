// Enemies our player must avoid
var Enemy = function() {
    this.speedArr = [100, 150, 200, 250];
    this.hypSpeedArr = [300,350,400];
    this.yArr = [64, 147, 230];
    this.x = 1;
    this.height = 25; //set width and height for collision detectiobn
    this.width = 25;
    this.y = this.yArr[Math.floor(Math.random() * this.yArr.length)]; //assign random y position from array 
    this.sprite = 'images/enemy-bug.png'; //default img for enemy
    this.speed = this.speedArr[Math.floor(Math.random() * this.speedArr.length)];  //create a random speed from speed array
    this.hyperSpeed = this.hypSpeedArr[Math.floor(Math.random() * this.hypSpeedArr.length)];
};


Enemy.prototype.update = function(dt) {
    if(easyMode){
        this.x += this.speed*dt; //set speed based on difficulty
    } else if(hardMode) {
        this.x += this.hyperSpeed*dt;
    }
    if(this.x > 500) {
        this.respawn(); //reset off page
    }
    

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.respawn = function(rand){ //reset the bugs when they reach other side.
        this.x = -105; //randomly assign y
        this.y = this.yArr[Math.floor(Math.random() * this.yArr.length)];
}


// Now write your own player class
function Player(){ //Player contructor with starting position 
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.height = 75;
    this.width = 35;
}
// This class requires an update(), render() and
Player.prototype.update = function(key) {

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
    if(this.y == 0) { //add 10 points when we reach the water
        points += 10;
        score.innerText = points;
        this.respawn();
        console.log(points);
    }
    if(points === 100) {
        winnerModal(); //at 100 points show winner title
    }
    this.checkCollisions(); //check for collisions each update


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
            this.respawn(); // if we collide reset
            if(points >= 10) { //deduct 10 points 
                points -= 10;
                score.innerText = points;
            } else  {
                points = 0;
                score.innerText = points;          
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
var hardMode = false;
var easyMode = true;


/* ---- Difficulty Events ---- */
var hardBtn = document.getElementById('hardBtn');
hardBtn.addEventListener('click',function(){
    points = 0;
    score.innerText = points;
    hardMode = true;
    easyMode = false;
    player.respawn();
    hardBtn.style.color = 'tomato';
    easyBtn.style.color = 'black';
});

var easyBtn = document.getElementById('easyBtn');
easyBtn.addEventListener('click',function(){
    points = 0;
    score.innerText = points;
    player.respawn();
    hardMode = false;
    easyMode = true;
    easyBtn.style.color = 'tomato';
    hardBtn.style.color = 'black';
});


/* --- Modal content ---- */
var modalDiv = document.getElementById('myModal');

function winnerModal() {
    points = 0;
    score.innerText = points;
    player.respawn();
    modalDiv.style.display = 'block';
    var closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click',closeModal);
}
document.addEventListener('click',function(e){
    if (e.target == modalDiv) {
        modalDiv.style.display = "none";
    }
});
function closeModal() {  
    modalDiv.style.display = 'none';
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        83: 'down',
        87: 'up',
        68: 'right'
    };
    e.preventDefault();
    player.handleInput(allowedKeys[e.keyCode]);
});
