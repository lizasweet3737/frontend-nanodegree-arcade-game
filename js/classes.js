
class Entity {
    constructor(){
        this.sprite = 'images/';
        this.x = 0; //x axis is from 0-4, 0 is the left-most on the grid
        this.y = 0; //y axis is 0-5, 5 is the bottom-most of the grid
    }

    update(dt){ //sets out of bounds limits
        this.isOutOfBOundsX = this.x > 5; 
        this.isOutOfBOundsY = this.y < 0; 
    }

    render(){ //renders image of player and enemy
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83); 
    }

    checkCollissions(playerOrEnemy){ //checks for collissions if player or enemy are within the other's range
        if(this.x >= playerOrEnemy.x - 0.5 && this.x <= playerOrEnemy.x + 0.5){
            if (this.y >= playerOrEnemy.y - 0.3 && this.y <= playerOrEnemy.y + 0.3){
                return true;
            }
        }
        else {
            return false;
        }
    }
}

class Player extends Entity {
    constructor (){
        super(); 
        this.sprite += 'char-boy.png'; //image path
        this.x= 2; //starting x position
        this.y= 4 * 1.15; //starting y position, offset to center
        this.moving = false; //for win condition check- tracks movement
    }

    update(dt){ //update player position
        super.update(); //reference super update function which sets out of bound limits
        if(this.isOutOfBOundsY && !this.moving){  //if player reaches water, reloads game
            alert("Congratulations! You won! Press ok to restart.");
            location.reload();
            this.reset();
        }
    }

    render(){ //renders player
        super.render(); 
        this.moving = false;
    }

    handleInput(input){ //moves player according to user input until edges of board
        switch (input){
            case 'left':
                this.x = this.x > 0 ? this.x - 1 : this.x; //move left block
                break;
            case 'up':
                this.y = this.y > 0 ? this.y - 1 : this.y; //move up one block
                break;
            case 'right':
                this.x = this.x < 4 ? this.x + 1 : this.x; //move right one block
                break;
            case 'down':
                this.y = this.y < 4 ? this.y + 1 : this.y; //move down one block
                break;
        }
        this.moving = true; //move is in progress until re-rendered
    }

    reset(){ //sends player to initial position
        this.x = 2;
        this.y= 4 * 1.15;
    }
}

class Enemy extends Entity {
    constructor (x, y){
        super();
        this.sprite += 'enemy-bug.png'; //img path
        this.x = x; //set x-axis position
        this.y = y; //set y-axis position
    }

    update (dt){ //update enemy position
        super.update();
        if(this.isOutOfBOundsX){ //resets enemy postion and pace once enemy goes off-board (out of bounds)
            this.reset();
        }
        else{
            this.x = this.x + this.pace * dt; //moves enemy to the right releative to the pace and dt
        }
    }

    changePace(max){ //changes pace of enemy movement
        this.pace = 1 + Math.random() * max; 
    }

    reset(){ 
        this.changePace(5.0); //resets enemy pace
        this.x = -(Math.floor(1 + Math.random() * 3)); //resets enemy position randomly to increase time between enemies
    }
}

