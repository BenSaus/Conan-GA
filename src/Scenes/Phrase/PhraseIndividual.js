import { Individual, Utils } from "../../Conan"

const POSSIBLE_CHARACTERS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "
export const TARGET_PHRASE = "Do you want to live forever"
const MINIMUM_FITNESS = 0.01

export default class PhraseIndividual extends Individual {
    constructor(randomGenome) {
        super(randomGenome)
    }

    calcFitness() {
        let total = 0

        for (let x = 0; x < this.getGenomeLength(); x++) {
            if (this.chromosomes[x] === TARGET_PHRASE[x]) total++
        }

        const normalizedFitness = total / this.getGenomeLength()
        this.fitness = Math.max(normalizedFitness, MINIMUM_FITNESS)
        return this.fitness
    }

    mutate(mutationRate) {
        for (let x = 0; x < this.getGenomeLength(); x++) {
            if (Math.random() < mutationRate) {
                const newCharacter =
                    POSSIBLE_CHARACTERS[
                        Utils.rangeInt(0, POSSIBLE_CHARACTERS.length)
                    ]

                this.chromosomes[x] = newCharacter
            }
        }
    }

    getRandomGenome() {
        return this._randomString(TARGET_PHRASE.length)
    }

    _randomString(length) {
        let result = []
        for (let x = 0; x < length; x++) {
            let characterChoice = Utils.rangeInt(0, POSSIBLE_CHARACTERS.length)
            result.push(POSSIBLE_CHARACTERS[characterChoice])
        }

        return result
    }

    toString() {
        return this.chromosomes.join("")
    }
}
