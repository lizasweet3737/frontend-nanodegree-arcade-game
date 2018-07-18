//create Player instance
const player = new Player();

//create Enemy instances- one per line
const allEnemies = [
    new Enemy (0,.75),
    new Enemy (0,1.75),
    new Enemy (0,2.75)
]

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


