import imagePaths from "../Assets/imagePaths"

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: "MenuScene" })
    }

    preload() {
        this.load.image("heavy-helm", imagePaths["heavy-helm"])
    }

    create() {
        this.createTitle()
        this.createSceneSelectText()
        this.createControls()
    }

    createTitle() {
        this.conan = this.add.text(425, 110, "Conan", {
            font: "70px Impact",
        })
        this.title = this.add.text(275, 200, "Gentic Algorithm Visualization", {
            font: "40px Impact",
        })
        this.axe = this.add
            .image(450, 300, "heavy-helm")
            .setOrigin(0, 0)
            .setScale(0.25, 0.25)
    }

    createSceneSelectText() {
        this.press1Text = this.add.text(
            330,
            550,
            "Press '1' for the Knapsack visualization"
        )
        this.press1Text = this.add.text(
            340,
            600,
            "Press '2' for the Phrase visualization"
        )
    }

    createControls() {
        this.input.keyboard.on("keyup_ONE", (event) => {
            this.scene.start("KnapsackScene")
        })
        this.input.keyboard.on("keyup_TWO", (event) => {
            this.scene.start("PhraseScene")
        })
    }
}
