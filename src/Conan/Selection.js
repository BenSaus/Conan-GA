function rouletteWheel(ga, population) {
    let slice = Math.random() * ga.totalFitnessScore
    let total = 0

    for (let i = 0; i < population.length; i++) {
        total += population[i].fitness

        if (total >= slice) {
            return population[i]
        }
    }

    throw new Error("There was an error in selection")
}

export default {
    rouletteWheel,
}
