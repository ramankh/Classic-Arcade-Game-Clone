// Enemies our player must avoid
var Enemy = function(index,x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.index = index;
    this.rx = this.x+94;
    this.ry = this.y+67;
    this.speed = speed;
    this.name = name;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x+diff[0]>ctx.canvas.width){
        this.x = this.startX;
        this.rx = this.x+94;
        this.y = this.startY;
    }
    else {
        this.x += this.speed*dt;
        this.rx = this.x +94;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.rx = this.x + 68;
    this.ry = this.y + 77;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
   // ctx.drawImage(Resources.get('images/Gem Blue.png'), 50, 50);
};

Player.prototype.update = function(dt){

//checks if player cross the borders
if(this.x>= ctx.canvas.width-65){
    this.x = ctx.canvas.width-65
}
else if(this.x<=0){
    this.x = -diff[2];
}
else if(this.y<=0){
    this.y = -diff[3];
}
else if(this.y>=ctx.canvas.height-171){
    this.y = ctx.canvas.height-(171);
}

this.rx = this.x + 68;
this.ry = this.y + 77;
};

Player.prototype.handleInput = function(inp){
    var mov = 95;
    switch(inp) {
        case 'left':
        this.x-=mov;
        break;
        case 'right':
        this.x+=mov
        break;
        case 'up':
        this.y-=mov;
        break;
        case 'down':
        this.y+=mov;
        break;
        default:
        break;
    }
    this.update();
};

// diff represents the white spaces around each character (to find exact collision):
// diff[0] -> enemies x-whiteSpace/2
// diff[1] -> enemies y-whiteSpaces/2
// diff[2] -> players x-whiteSpaces/2
// diff[3] -> players y-whiteSpaces/2
var diff = [0,53,18,45];

function collisionDetect(){
    allEnemies.forEach(function(enemy){
            //this condition checks either one rectangles is on the left side of
            //next one or is below that using two up-left most coordinate and the bottom-right
            //most coordinate. If these two main conditions doesnt meet means that two rects
            //are overlapped !
            if(!(enemy.ry<player.y+diff[3] || player.ry<enemy.y+diff[1] ||
                enemy.rx<player.x+diff[2] || player.rx < enemy.x+diff[0])){
                player.x = ctx.canvas.width/2-53.5;
            player.y = 430;
            player.render();
        }
        else {

        }
    });
}

var playerChar = function(x, y, imageIndex){
    this.imageIndex = imageIndex;
    this.x = x;
    this.y = y;
    this.selected = false;
    //this function checks if the character is hovered
    //to find out if the cursor is on the char we need to check if the cursor is
    //between X and Y coordinates!
    this.isHovered = function(mouseX,mouseY, offsetLeft, offsetTop) {
        if((mouseX>this.x+diff[2]+offsetLeft && mouseX<this.x+diff[2]+offsetLeft+68) &&
            (mouseY>this.y+diff[3]+offsetTop && mouseY<this.y+diff[3]+offsetTop+77)){
            //console.log(this.name+": "+mouseX+","+mouseY +"|| offsetLeft: "+ offsetLeft+" offsetTop: "+offsetTop);
        return true;
    }
}
    //this function draws a yellow border around char if it is selected
    this.isSelected = function(){
        this.selected = true;
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 5;
        ctx.strokeRect(this.x,this.y+diff[3],68+2*diff[2],77+diff[3]);
    }
}

playerChar.prototype.handleInput = function(inp){
    var index = this.imageIndex;
    switch(inp) {
        case 'left':
        if(this.imageIndex!=0){
            playerChars[--index].isSelected();
        };
        break;
        case 'right':
        if(this.imageIndex!=3){
            playerChars[++index].isSelected();
        }
        else{
            playerChars[0].isSelected();
        }
        break;
        default:
        break;
    }
};

//this array keeps every blocks starting point
var playerChars = [];

// gemPlacer randomly creats gems in the play field
// gems have diffrent styles and diffrent scores!

function gemPlacer(){
    //xRange and yRange defines the x and y ranges where gems can possibly appear
    //first itme is the minimum and the second one is max
    var xRange = [200,400];
    var yRange = [200,400];

    var startX = Math.floor(Math.random()*(xRange[1]-xRange[0])+xRange[0]);
    var startY = Math.floor(Math.random()*(yRange[1]-yRange[0])+yRange[0]);
    ctx.drawImage(Resources.get('images/Gem Blue.png'), 50, 50);
    console.log(startX + " " + startY);
}









// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(ctx.canvas.width/2-53.5, 430);
var selectedPc = new playerChar();
var enemy = new Enemy(0,-101,60,80);
var enemy2 = new Enemy(1,-101,150,50);
var enemy3 = new Enemy(2,-101,240,120);
allEnemies.push(enemy);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(player.active!=false){
        player.handleInput(allowedKeys[e.keyCode]);
    }
    else {

        for(pc in playerChars) {
            if(playerChars[pc].selected==true){
                playerChars[pc].selected=false;
                playerChars[pc].handleInput(allowedKeys[e.keyCode]);
                break;
            }
        }
    }
});