import Phaser from "phaser"
import { GA, Functions } from "../../Conan"
import {
    simpleFloatFitness,
    createFloatIndividual,
    floatPerturbMutation,
} from "./FloatFunctions"

export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene1" })
    }

    preload() {}

    create() {
        this.text = this.add.text(10, 0, "Genetic Algorithm", {
            font: "30px Impact",
        })
        this._fitnessText = this.add.text(10, 400, "Best Fitness: 0", {
            font: "20px Impact",
        })

        this.ga = new GA({
            mutationFunc: floatPerturbMutation,
            fitnessFunc: simpleFloatFitness,
            crossoverFunc: Functions.Crossover.singlePointCrossover,
            selectionFunc: Functions.Selection.rouletteWheelSelection,
            createIndividualFunc: createFloatIndividual,
            populationSize: 15,
        })

        this.input.keyboard.on("keyup_G", (event) => {
            this.ga.Evolve()
        })

        this._text = this.add.text(20, 100)
        this._hsv = Phaser.Display.Color.HSVColorWheel()

        this._graphics = this.add.graphics({
            lineStyle: { width: 2, color: 0x0000ff },
            fillStyle: { color: 0xff0000 },
        })
    }

    update(delta) {
        this._graphics.clear()

        let output = []

        for (let i = 0; i < this.ga.population.length; i++) {
            const fitness = this.ga.population[i].fitness
            const hsvFitness = Math.floor((fitness / 5) * 359) // Here we first normalize fitness (0 to 5). Then multiply to the number of hsv values returned by _hsv[hsvFitness].color

            this._graphics.fillStyle(this._hsv[hsvFitness].color, 1)
            this._graphics.fillRect(50, 100 + i * 15, 50 * fitness, 8)
            output.push(`${i}`)
        }

        this._fitnessText.setText(`Best Fitness: ${this.ga.bestFitnessScore}`)
        this._text.setText(output)
    }
}
