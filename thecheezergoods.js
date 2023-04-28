class Begin extends Phaser.Scene {
    constructor() {
        super('begin')
    }
    preload() {
        this.load.path = './images/';
        this.load.image('beginningBG', 'GreenGradient.png')
    }
    create() {
        // Add Gradient Background
        this.imageObject = this.add.image(
            480,
            360,
            'beginningBG',
        )
        this.textObject = this.add.text(
            0,
            0,
            "Click to begin...", //text
            {
                font: "40px Arial",
                color: "#000000",
            } //style
        );
        this.input.on('pointerdown', () => {
            console.log('It worked');
            this.scene.start('fridge');
        });
    }
    update() {

    }
}

class Fridge extends Phaser.Scene {
    constructor() {
        super('fridge')
    }
    preload() {

    }
    create() {

    }
    update() {

    }
}

class Gameplay extends Phaser.Scene {
    constructor() {
        super('gameplay')
    }
    preload() {

    }
    create() {

    }
    update() {

    }
}

let config = {
    type: Phaser.WEBGL,
    width: 960,
    height: 720,
    backgroundColor: 0x90ee90,
    scene: [Begin, Fridge, Gameplay]
}

let game = new Phaser.Game(config);