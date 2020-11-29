export default class Individual {
    constructor(randomizeGenome) {
        this.fitness = 0

        if (randomizeGenome) {
            this.chromosomes = this.getRandomGenome()
        } else {
            this.chromosomes = []
        }
    }

    setGenome(chromosomes) {
        // TODO: chromosomes must be an array length > 0
        this.chromosomes = chromosomes
    }

    getGenomeLength() {
        return this.chromosomes.length
    }
}
