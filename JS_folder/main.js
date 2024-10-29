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
var platform;
function preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("obstacle", "assets/obstacle.png");
    this.load.image("wall", "assets/wall.jpg");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/Purple_Head.png", {frameWidth: 24, frameHeight: 36});
}
function create() {
    //background
    this.add.image(400, 300, "sky");

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground. scale is used to make it fit the sprite
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    //  Obstacles of level 1
    //1st obstacle
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

    player = this.physics.add.sprite(100, 450, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1,
    });

    this.anims.create({
        key: "turn",
        frames: [{key: "dude", frame: 4}],
        frameRate: 20,
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1,
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {}
