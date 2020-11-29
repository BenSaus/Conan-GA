import { Genomes, Individual, Utils } from "../../Conan"

const GENOME_LENGTH = 5

export function createFloatIndividual() {
    const indiv = new Individual(createFloatGenome(GENOME_LENGTH))
    return indiv
}

// TODO: generalize if possible
function createFloatGenome(length) {
    const genome = []
    for (let x = 0; x < length; x++) {
        genome.push(Math.random())
    }
    return genome
}

export function simpleFloatFitness(genome) {
    let total = 0

    for (let chromo of genome.chromosomes) {
        total += chromo
        // TODO: instead add all the chromosomes, the closer to 5 they are the fitter they are
    }

    return total
}

export function floatPerturbMutation(genome) {
    for (let x = 0; x < genome.chromosomeCount; x++) {
        genome.chromosomes[x] = Utils.clamp01(
            genome.chromosomes[x] + Utils.rangeFloat(-1, 1)
        ) // WARNING: Only works when a chromosome is a number
    }
}
