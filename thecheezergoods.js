class Begin extends Phaser.Scene {
    constructor() {
        super('begin')
    }
    create() {

    }
    update() {

    }
}

class Fridge extends Phaser.Scene {
    constructor() {
        super('fridge')
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
    create() {

    }
    update() {

    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    backgroundColor: 0x90ee90,
    scene: [Begin]
}

let game = new Phaser.Game(config);