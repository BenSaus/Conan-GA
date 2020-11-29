import { singlePoint, order1 } from "./Crossover"

export default class GA {
    constructor(settings, individualClass) {
        // TODO: Test individual class for needed functions

        this._testSettings(settings)
        this.settings = settings
        this._setDefaults(settings)

        this._setCrossoverFunc(settings.crossover)

        this.individualClass = individualClass

        this.population = this._createInitalPopulation(
            this.settings.populationSize
        )

        this.generation = 0
        this.bestFitnessScore = 0
        this.totalFitnessScore = 0
        this.populationSize = this.settings.populationSize
    }

    _createInitalPopulation(popSize) {
        let population = []

        for (let x = 0; x < popSize; x++) {
            population.push(new this.individualClass(true))
        }

        return population
    }

    _testSettings(settings) {
        if (!settings.populationSize) {
            throw new Error("Population size is not defined")
        }
        if (!settings.crossover) {
            throw new Error(
                "Choose a crossover function ['singlePoint', 'order1']"
            )
        }
    }

    _setDefaults(settings) {
        if (!settings.mutationRate) {
            this.settings.mutationRate = 0.01
        }
        if (!settings.crossoverRate) {
            this.settings.crossoverRate = 0.7
        }
        if (typeof settings.elitism === "undefined") {
            this.settings.elitism = true
        }
    }

    _setCrossoverFunc(crossover) {
        // TODO: Change to constants
        if (crossover === "singlePoint") this.crossover = singlePoint
        else if (crossover === "order1") this.crossover = order1
    }

    evolve() {
        // If this is the first generation evaluate fitness
        if (this.generation === 0) this._calcFitnessScores()

        let babyNum = 0
        const babies = []

        // Keep two copies of the best genome if elitism is on
        // TODO: Change elite-number-kept to a setting
        if (this.settings.elitism) {
            babyNum = 2
            babies.push(this.fittestIndividual)
            babies.push(this.fittestIndividual)
        }

        while (babyNum < this.settings.populationSize) {
            const baby = this._createBaby()
            babies[babyNum] = baby
            babyNum++
        }

        this.population = babies
        this.generation++

        this._calcFitnessScores()
    }

    _createBaby() {
        // Select mother and father
        const mother = this.settings.selectionFunc(this, this.population)
        const father = this.settings.selectionFunc(this, this.population)

        // Produce children with crossover
        const child = this.crossover(
            mother,
            father,
            this.settings.crossoverRate,
            this.individualClass
        )

        child.mutate(this.settings.mutationRate)

        return child
    }

    _calcFitnessScores() {
        this.bestFitnessScore = 0
        this.fittestIndividual = null
        this.totalFitnessScore = 0

        for (let individual of this.population) {
            individual.calcFitness()
            this.totalFitnessScore += individual.fitness

            if (individual.fitness > this.bestFitnessScore) {
                this.bestFitnessScore = individual.fitness
                this.fittestIndividual = individual
            }
        }
    }

    getBestFitnessScore() {
        return this.bestFitnessScore
    }

    getFittestIndividual() {
        return this.fittestIndividual
    }

    getAvgFitness() {
        return this.totalFitnessScore / this.population.length
    }
}
