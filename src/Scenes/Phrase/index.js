import Scene from "./PhraseScene"

new Phaser.Game({
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: [Scene],
})
