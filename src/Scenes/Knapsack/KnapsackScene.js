import Phaser from "phaser"
import { GA, Selection } from "../../Conan"
import KnapsackIndividual, { GENOME_LENGTH } from "./KnapsackIndividual"
import { createGAText, updateGAText } from "../Shared/text"
import {
    setupControls,
    setupControlText,
    updateControlText,
} from "../Shared/controls.js"
import { setupFitnessBars, renderFitnessBars } from "../Shared/fitnessBars"

import ITEM_DATA from "./itemData.json"
import imagePaths from "../Assets/imagePaths"

const FITNESS_UPPER_BOUND = 700
const POPULATIION_SIZE = 15
const MUTATION_RATE = 0.02
const BarCoords = {
    BAR_X_ORIGIN: 430,
    BAR_Y_ORIGIN: 50,
    BAR_Y_GAP: 50,
    BAR_Y_OFFSET: 15,
    BAR_HEIGHT: 25,
    // Negative so the bars will grow to the left
    BAR_WIDTH: -100,
}
const FADED_ITEM_ALPHA = 0.25

export default class KnapsackScene extends Phaser.Scene {
    constructor() {
        super({ key: "KnapsackScene" })
    }

    preload() {
        this.loadItemImages()
    }

    loadItemImages() {
        for (let item of ITEM_DATA) {
            this.load.image(item.name, imagePaths[item.name])
        }
    }

    create() {
        this.ga = new GA(
            {
                selectionFunc: Selection.rouletteWheel,
                populationSize: POPULATIION_SIZE,
                mutationRate: MUTATION_RATE,
                crossover: "singlePoint", // TODO: Make this a constant
            },
            KnapsackIndividual
        )

        this.createItemImages()
        createGAText(this, "Conan's Knapsack")
        setupControls(this)
        setupControlText(this)
        setupFitnessBars(this)
    }

    createItemImages() {
        this.itemImages = []

        const ROW_X_ORIGIN = 450
        const ITEM_X_GAP = 32
        const ROW_Y_ORIGIN = 60
        const ITEM_Y_GAP = 50
        const ITEM_SCALE = 0.06

        for (let y = 0; y < POPULATIION_SIZE; y++) {
            const row = []
            for (let x = 0; x < GENOME_LENGTH; x++) {
                const image = this.add
                    .image(
                        ROW_X_ORIGIN + x * ITEM_X_GAP,
                        ROW_Y_ORIGIN + y * ITEM_Y_GAP,
                        ITEM_DATA[x].name
                    )
                    .setOrigin(0, 0)
                    .setScale(ITEM_SCALE, ITEM_SCALE)
                row.push(image)
            }
            this.itemImages.push(row)
        }
    }

    update(delta) {
        this.updateChosenItems()
        renderFitnessBars(
            this,
            POPULATIION_SIZE,
            FITNESS_UPPER_BOUND,
            BarCoords
        )
        updateGAText(this)
        updateControlText(this)
    }

    updateChosenItems() {
        for (let j = 0; j < POPULATIION_SIZE; j++) {
            for (let i = 0; i < GENOME_LENGTH; i++) {
                if (this.ga.population[j].chromosomes[i]) {
                    this.itemImages[j][i].setAlpha(1)
                } else {
                    this.itemImages[j][i].setAlpha(FADED_ITEM_ALPHA)
                }
            }
        }
    }
}
