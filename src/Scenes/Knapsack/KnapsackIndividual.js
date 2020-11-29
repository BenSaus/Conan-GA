import { Individual, Utils } from "../../Conan"
import ITEM_DATA from "./itemData.json"

export const GENOME_LENGTH = 16
const MINIMUM_FITNESS = 0.01
const MAX_WEIGHT = 200

export default class KnapsackIndividual extends Individual {
    constructor(randomGenome) {
        super(randomGenome)
    }

    calcFitness() {
        let totalValue = 0
        let totalWeight = 0

        for (let x = 0; x < this.getGenomeLength(); x++) {
            if (this.chromosomes[x]) {
                totalValue += ITEM_DATA[x].value
                totalWeight += ITEM_DATA[x].weight
            }
        }

        if (totalWeight <= MAX_WEIGHT) {
            this.fitness = totalValue
        } else {
            this.fitness = MINIMUM_FITNESS
        }

        return this.fitness
    }

    mutate(mutationRate) {
        // Randomly flip bits in the genome
        for (let x = 0; x < this.getGenomeLength(); x++) {
            if (Math.random() < mutationRate) {
                this.chromosomes[x] = !this.chromosomes[x]
            }
        }
    }

    getRandomGenome() {
        return this._randomBooleanArray(GENOME_LENGTH)
    }

    _randomBooleanArray(length) {
        let result = []
        for (let x = 0; x < length; x++) {
            result.push(Utils.randBool())
        }

        return result
    }

    toString() {
        const result = []

        for (let x = 0; x < this.getGenomeLength(); x++) {
            if (this.chromosomes[x]) {
                result.push("1")
            } else {
                result.push("0")
            }
        }

        return result.join("")
    }
}
