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
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('studiointro');
            });
        });
    }
    update() {

    }
}

class StudioIntro extends Phaser.Scene {
    constructor() {
        super('studiointro')
    }
    preload() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.load.audio('sfxOpen', './sfx/FridgeOpen.wav');
        this.load.audio('sfxClose', './sfx/FridgeClose.wav');
        this.load.path = './assets/';
        this.load.image('gfc', 'GreenFridgeClosed.png');
        this.load.image('gfho', 'GreenFridgeHalfOpened.png');
        this.load.image('gfo', 'GreenFridgeOpened.png');
    }
    create() {
        let studioText = this.add.text(
            530,
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

        let fridge = this.add.sprite(480, 250, 'gfc');
        fridge.setScale(0,0);
        studioText.depth = fridge.depth + 1;
        this.tweens.add({
            targets: fridge,
            scale: 0.113,
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
                        duration: 1000,
                        hold: 2000,
                        yoyo: true,
                        onComplete: () => {
                            this.sound.play('sfxClose');
                            fridge.play('GreenFridgeCloseAnimation');
                            fridge.on('animationcomplete', () => {
                                this.scene.start('cinematicmenu');
                            });
                        }
                    });
                });
            }
        });
    }
    update() {

    }
}

class CinematicMenu extends Phaser.Scene {
    constructor() {
        super('cinematicmenu')
    }
    preload() {
        this.load.audio('cheeseslap', './sfx/CheeseSlap.wav');
        this.load.audio('cheesefall', './sfx/CheeseFall.wav');
        this.load.path = './assets/';
        this.load.image('gfc', 'GreenFridgeClosed.png');
        this.load.image('cheese', 'CheeseSlice.png');
        this.load.image('thecheezer', 'The Cheezer.png');
        // Draw "temp" fridge (so its seamless)
        let fridge = this.add.sprite(480, 250, 'gfc');
        fridge.setScale(0.113);
    }
    create() {
        // Draw fridge
        let fridge = this.add.sprite(480, 250, 'gfc');
        fridge.setScale(0.113);

        // Load Cheese picture
        let cheese = this.add.sprite(480, 360, 'cheese');
        cheese.setOrigin(0.5,0.5);
        cheese.setScale(0.7);

        // Visible = false, to make it appear in delayedCall
        cheese.visible = false;

        // Load The Cheezer fancy font
        let thecheezer = this.add.sprite(430, -190, 'thecheezer');
        thecheezer.setScale(0.3);

        // Create the left chat bubble shape
        let cbLShape = this.add.graphics();
        cbLShape.fillStyle(0xffffff);
        cbLShape.fillTriangle(20, 270, 50, 200, 200, 200);
        cbLShape.fillEllipse(120, 200, 200, 100);

        // Add text to the left chat bubble
        let cbLText = this.add.text(50, 170, "Why'd you throw the cheese at the fridge?!", {
            fontFamily: 'Impact',
            fontSize: 20,
            color: '#000000',
            wordWrap: { width: 150 },
            align: 'center'
        });

        // Add the left bubble shape and text to group
        let cbLGroup = this.add.group();
        cbLGroup.add(cbLShape);
        cbLGroup.add(cbLText);
        cbLGroup.setVisible(false);

        // Create the right chat bubble shape
        let cbRShape = this.add.graphics();
        cbRShape.fillStyle(0xffffff);
        cbRShape.fillTriangle(940, 420, 910, 350, 760, 350);
        cbRShape.fillEllipse(840, 350, 200, 100);
 
        // Add text to the right chat bubble
        let cbRText = this.add.text(770, 330, "Because I'm The Cheezer!", {
            fontFamily: 'Impact',
            fontSize: 20,
            color: '#000000',
            wordWrap: { width: 150 },
            align: 'center'
        });
 
        // Add the right bubble shape and text to group
        let cbRGroup = this.add.group();
        cbRGroup.add(cbRShape);
        cbRGroup.add(cbRText);
        cbRGroup.setVisible(false);

        // Load play text
        let playText = this.add.text(300, 400, "PLAY", {
            fontFamily: 'Impact',
            fontSize: 40,
            color: '#F9E93C'
        });
        playText.alpha = 0;

        // Load settings text
        let settingsText = this.add.text(300, 490, "SETTINGS", {
            fontFamily: 'Impact',
            fontSize: 40,
            color: '#F9E93C'
        });
        settingsText.alpha = 0;

        // Load quit text
        let quitText = this.add.text(300, 580, "QUIT", {
            fontFamily: 'Impact',
            fontSize: 40,
            color: '#F9E93C'
        });
        quitText.alpha = 0;

        // Load Not Implemented text
        let notImpText = this.add.text(480, 390, "Feature Not Implemented...", {
            fontFamily: 'Impact',
            fontSize: 30,
            wordWrap: { width: 150 },
            color: '#FFFFFF'
        });
        notImpText.visible = false;

        // Do the cheeseSlap and every other animation
        this.time.delayedCall(700, () => {
            this.sound.play('cheeseslap');
            cheese.visible = true;
            cheese.rotation = Phaser.Math.DegToRad(335);
            this.tweens.add({
                targets: cheese,
                scale: 0.15,
                duration: 200,
                onComplete: () => {
                    this.time.delayedCall(500, () => {
                        cbLGroup.setVisible(true);
                        this.time.delayedCall(2000, () => {
                            cbRGroup.setVisible(true);
                            this.time.delayedCall(2000, () => {
                                this.tweens.add({
                                    targets: cheese,
                                    y: 824,
                                    duration: 2000,
                                    ease: 'Linear',
                                    onComplete: () => {
                                        this.sound.play('cheesefall');
                                    }
                                });
                                this.tweens.add({
                                    targets: thecheezer,
                                    y: 270,
                                    duration: 2000,
                                    ease: 'Linear',
                                    onComplete: () => {
                                        cbLGroup.setVisible(false);
                                        cbRGroup.setVisible(false);
                                        this.tweens.add({
                                            targets: [playText, settingsText, quitText],
                                            alpha: 1,
                                            duration: 1000,
                                            ease: 'Linear',
                                        });
                                        playText.setInteractive();
                                        playText.on('pointerover', () => {
                                            this.tweens.add({
                                                targets: playText,
                                                scaleX: 1.2,
                                                scaleY: 1.2,
                                                duration: 200
                                            });
                                        });
                                        
                                        playText.on('pointerout', () => {
                                            this.tweens.add({
                                                targets: playText,
                                                scaleX: 1,
                                                scaleY: 1,
                                                duration: 200
                                            });
                                        });

                                        playText.on('pointerdown', () => {
                                            this.scene.start('gameplay');
                                        });
                                        
                                        settingsText.setInteractive();
                                        settingsText.on('pointerover', () => {
                                            this.tweens.add({
                                                targets: settingsText,
                                                scaleX: 1.2,
                                                scaleY: 1.2,
                                                duration: 200
                                            });
                                        });
                                        
                                        settingsText.on('pointerout', () => {
                                            notImpText.visible = false;
                                            this.tweens.add({
                                                targets: settingsText,
                                                scaleX: 1,
                                                scaleY: 1,
                                                duration: 200
                                            });
                                        });

                                        settingsText.on('pointerdown', () => {
                                            notImpText.visible = true;
                                            this.tweens.add({
                                                targets: settingsText,
                                                x: '+=10',
                                                y: '+=10',
                                                duration: 50,
                                                yoyo: true,
                                            });
                                        });

                                        quitText.setInteractive();
                                        quitText.on('pointerover', () => {
                                            this.tweens.add({
                                                targets: quitText,
                                                scaleX: 1.2,
                                                scaleY: 1.2,
                                                duration: 200
                                            });
                                        });
                                        
                                        quitText.on('pointerout', () => {
                                            notImpText.visible = false;
                                            this.tweens.add({
                                                targets: quitText,
                                                scaleX: 1,
                                                scaleY: 1,
                                                duration: 200
                                            });
                                        });

                                        quitText.on('pointerdown', () => {
                                            notImpText.visible = true;
                                            this.tweens.add({
                                                targets: quitText,
                                                x: '+=10',
                                                y: '+=10',
                                                duration: 50,
                                                yoyo: true,
                                            });
                                        });
                                    }
                                });
                            });
                        });
                    });
                }
            });
        });
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
    scene: [Begin, StudioIntro, CinematicMenu, Gameplay]
    //scene: [CinematicMenu, Gameplay]
}

let game = new Phaser.Game(config);