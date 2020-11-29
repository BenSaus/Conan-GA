import Phaser from "phaser"
import MenuScene from "./Menu/MenuScene"
import KnapsackScene from "./Knapsack/KnapsackScene"
import PhraseScene from "./Phrase/PhraseScene"

new Phaser.Game({
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    scene: [MenuScene, KnapsackScene, PhraseScene],
})
