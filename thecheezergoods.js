class Begin extends Phaser.Scene {
    constructor() {
        super('begin')
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('beginningBG', 'GreenGradient.png');
        // Load the WebFontLoader plugin
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('gfc', 'GreenFridgeClosed.png');
        this.load.image('gfho', 'GreenFridgeHalfOpened.png');
        this.load.image('gfo', 'GreenFridgeOpened.png');
    }
    create() {
        // Add Gradient Background
        this.imageObject = this.add.image(
            480,
            360,
            'beginningBG',
        );

        // Ensure font loads in for user since it's the first scene
        WebFont.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                // Load font
                let beginText = this.add.text(
                    270,
                    670,
                    "Click to begin...",
                    {
                        fontFamily: "'Press Start 2P', sans-serif",
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: 24
                    }
                );

                // Have Text fade in
                beginText.alpha = 0;
                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: beginText,
                        alpha: 1,
                        duration: 2000,
                        ease: 'Linear',
                        yoyo: true,
                        repeat: -1
                    });
                });
            }
        });
          
        //On click switch to Fridge scene
        this.input.on('pointerdown', () => {
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
        this.load.audio('sfxOpen', './sfx/FridgeOpen.wav');
        this.load.audio('sfxClose', './sfx/FridgeClose.wav');
        this.load.path = './assets/';
        this.load.image('gfc', 'GreenFridgeClosed.png');
        this.load.image('gfho', 'GreenFridgeHalfOpened.png');
        this.load.image('gfo', 'GreenFridgeOpened.png');
    }
    create() {
        let studioText = this.add.text(
            540,
            400,
            "Green\nCheeze\nStudios",
            {
                fontFamily: "'Press Start 2P', sans-serif",
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 40,
                fill: "#000000",
                lineSpacing: 30,
                align: 'center',
                wordWrap: true,
                wordWrapWidth: 400
            }
        );
        studioText.setOrigin(0.5,0.5);
        studioText.setScale(0);

        this.anims.create({
            key: 'GreenFridgeOpenAnimation',
            frames: [
                { key: 'gfc' },
                { key: 'gfho' },
                { key: 'gfo' }
            ],
            frameRate: 3, // frames per second
        });

        this.anims.create({
            key: 'GreenFridgeCloseAnimation',
            frames: [
                { key: 'gfo' },
                { key: 'gfho' },
                { key: 'gfc' }
            ],
            frameRate: 15, // frames per second
        });

        let fridge = this.add.sprite(500, 250, 'gfc')
        fridge.setScale(0,0);
        studioText.depth = fridge.depth + 1;
        let openFridge = this.tweens.add({
            targets: fridge,
            scale: (0.5, 0.113),
            duration: 3000,
            ease: 'Linear',
            onComplete: () => {
                this.sound.play('sfxOpen');
                fridge.play('GreenFridgeOpenAnimation');
                fridge.on('animationcomplete', () => {
                    studioText.visible = true;
                    this.tweens.add({
                        targets: studioText,
                        angle: 360,
                        scale: 1,
                        duration: 2000,
                        hold: 2000,
                        yoyo: true,
                        onComplete: () => {
                            this.sound.play('sfxClose');
                            fridge.play('GreenFridgeCloseAnimation');
                            fridge.on('animationcomplete', () => {
                                this.scene.start('cinematic');
                            });
                        }
                    });
                    return;
                });
            }
        });
          
        // Wait for the promise to resolve before proceeding
        
    }
    update() {

    }
}
class Cinematic extends Phaser.Scene {
    constructor() {
        super('cinematic')
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
    scene: [Begin, Fridge, Cinematic, Gameplay]
}

let game = new Phaser.Game(config);