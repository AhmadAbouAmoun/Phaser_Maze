var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 300},
            debug: false,
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};
var game = new Phaser.Game(config);
var character = "Purple_Head";
var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var currentLevel = 1;

function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("obstacle", "assets/obstacle.png");
    this.load.image("wall", "assets/wall.jpg");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/Purple_Head.png", {frameWidth: 24, frameHeight: 36});
}


function update() {
    if (gameOver) {
        return;
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play("left", true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play("right", true);
    } else {
        player.setVelocityX(0);

        player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}



function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;
}

function create() {
    // Initialize the first level
    createLevel1.call(this);
}

function createLevel1() {
    // A simple background for our game
    this.add.image(400, 300, "sky");

    // The platforms group contains the ground and the obstacles we can jump on
    platforms = this.physics.add.staticGroup();

    // Here we create the ground.
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

   //1st obstacle
   platforms.create(600, 400, "obstacle");
   platforms.create(400, 400, "obstacle");
   platforms.create(200, 400, "obstacle");
   platforms.create(400, 350, "wall");
   //2nd obstacle
   platforms.create(450, 300, "obstacle");
   platforms.create(700, 300, "obstacle");
   platforms.create(200, 300, "obstacle");
   platforms.create(292, 250, "wall");
   platforms.create(500, 250, "wall");

   //3rd obstacle
   platforms.create(750, 200, "obstacle");
   platforms.create(650, 200, "obstacle");
   platforms.create(350, 200, "obstacle");
   platforms.create(100, 200, "obstacle");
   platforms.create(500, 150, "wall");
   platforms.create(280, 150, "wall");

   //4th obstacle
   platforms.create(800, 100, "obstacle");
   platforms.create(188, 100, "obstacle");
   platforms.create(258, 100, "obstacle");
   platforms.create(488, 100, "obstacle");
   platforms.create(550, 50, "wall");
   platforms.create(170, 50, "wall");


    // The player and its settings
    player = this.physics.add.sprite(100, 450, "dude");
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Create player animations
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });
    this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
    });
    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
    });

    
    cursors = this.input.keyboard.createCursorKeys();

    // Stars to collect
    stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    // The score
    scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "32px", fill: "#000" });

    // Collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function createLevel2() {
    // Clear existing platforms and obstacles
    platforms.clear(true, true);

    // Create Level 2 platforms and obstacles
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    //1st obstacle

    platforms.create(700, 400, "obstacle");
    platforms.create(380, 400, "obstacle");
    platforms.create(150, 400, "obstacle");
    platforms.create(50, 400, "obstacle");
    platforms.create(180, 350, "wall");
    platforms.create(472, 350, "wall");

    //2nd obstacle
    platforms.create(450, 300, "obstacle");
    platforms.create(700, 300, "obstacle");
    platforms.create(200, 300, "obstacle");
    platforms.create(292, 250, "wall");
    platforms.create(500, 250, "wall");

    //3rd
    platforms.create(750, 200, "obstacle");
    platforms.create(650, 200, "obstacle");
    platforms.create(350, 200, "obstacle");
    platforms.create(180, 200, "obstacle");
    platforms.create(500, 150, "wall");
    platforms.create(280, 150, "wall");

    //4th obstacle
    platforms.create(800, 100, "obstacle");
    platforms.create(188, 100, "obstacle");
    platforms.create(258, 100, "obstacle");
    platforms.create(488, 100, "obstacle");
    platforms.create(396, 50, "wall");

    // Create stars for Level 2
    stars = this.physics.add.group({
        key: "star",
        repeat: 5,
        setXY: { x: 12, y: 0, stepX: 150 },
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    // Collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
}

function createLevel3() {
    // Clear existing platforms and obstacles
    platforms.clear(true, true);

    // Create Level 3 platforms and obstacles
    platforms.create(400, 568, "ground").setScale(2).refreshBody();
    platforms.create(800, 400, "obstacle");
    platforms.create(480, 400, "obstacle");
    platforms.create(430, 400, "obstacle");
    platforms.create(150, 400, "obstacle");
    platforms.create(50, 400, "obstacle");
    platforms.create(180, 350, "wall");
    platforms.create(472, 350, "wall");
    platforms.create(572, 450, "wall");
    platforms.create(572, 500, "wall");

    //2nd obstacle
    platforms.create(450, 300, "obstacle");
    platforms.create(780, 300, "obstacle");
    platforms.create(200, 300, "obstacle");
    platforms.create(150, 250, "wall");
    platforms.create(500, 250, "wall");

    //3rd
    platforms.create(780, 200, "obstacle");
    platforms.create(500, 200, "obstacle");
    platforms.create(180, 200, "obstacle");
    platforms.create(272, 150, "wall");

    //4th obstacle
    platforms.create(800, 100, "obstacle");
    platforms.create(188, 100, "obstacle");
    platforms.create(230, 100, "obstacle");
    platforms.create(488, 100, "obstacle");
    platforms.create(396, 50, "wall");



    // Create stars for Level 3
    stars = this.physics.add.group({
        key: "star",
        repeat: 7,
        setXY: { x: 12, y: 0, stepX: 100 },
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    // Collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
}

function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText("Score: " + score);

    if (stars.countActive(true) === 0) {
        // Move to the next level based on the current level
        if (currentLevel === 1) {
            currentLevel++;
            createLevel2.call(this); 
        } else if (currentLevel === 2) {
            currentLevel++;
            createLevel3.call(this); 
        } else {
            console.log(" Congarts, you've completed all levels!");
            
        }
    }
}

