import Phaser from "phaser"
import { GA, Selection } from "../../Conan"
import { createGAText, updateGAText } from "../Shared/text"
import {
    setupControls,
    setupControlText,
    updateControlText,
    stopTimer,
} from "../Shared/controls"
import { setupFitnessBars, renderFitnessBars } from "../Shared/fitnessBars"
import PhraseIndividual, { TARGET_PHRASE } from "./PhraseIndividual"

const POPULATIION_SIZE = 40
const MUTATION_RATE = 0.005
const BarCoords = {
    BAR_X_ORIGIN: 550,
    BAR_Y_ORIGIN: 105,
    BAR_Y_GAP: 15,
    BAR_Y_OFFSET: 0,
    BAR_HEIGHT: 8,
    // Negative so the bars will grow to the left
    BAR_WIDTH: -100,
}

export default class PhraseScene extends Phaser.Scene {
    constructor() {
        super({ key: "PhraseScene" })
    }

    create() {
        this.ga = new GA(
            {
                selectionFunc: Selection.rouletteWheel,
                populationSize: POPULATIION_SIZE,
                mutationRate: MUTATION_RATE,
                crossover: "singlePoint", // TODO: Make this a constant
            },
            PhraseIndividual
        )

        createGAText(this, "Phrase Evolution")
        setupControls(this)
        setupControlText(this)
        setupFitnessBars(this)

        this.populationPhrases = this.add.text(560, 100)
        this.targetSolutionLabel = this.add.text(30, 120, `Target Solution:`, {
            font: "20px Arial",
        })
        this.targetSolution = this.add.text(30, 150, `${TARGET_PHRASE}`)

        this.bestSolutionLabel = this.add.text(30, 200, "Best Solution: ", {
            font: "20px Arial",
        })

        this.bestSolution = this.add.text(30, 230, "")
    }

    update(delta) {
        renderFitnessBars(this, POPULATIION_SIZE, 1, BarCoords)
        updateGAText(this)
        updateControlText(this)
        this.renderPhrases()
        this.updateBestSolution()

        if (this.ga.bestFitnessScore === 1) {
            stopTimer(this)
        }
    }

    renderPhrases() {
        let output = []

        for (let i = 0; i < this.ga.population.length; i++) {
            const individualGenome = this.ga.population[i].toString()
            output.push(`${individualGenome}`)
        }
        this.populationPhrases.setText(output)
    }

    updateBestSolution() {
        const bestSolution = this.ga.getFittestIndividual()
        if (bestSolution) {
            const bestString = bestSolution.chromosomes.join("")
            this.bestSolution.setText(`${bestString}`)
        }
    }
}
