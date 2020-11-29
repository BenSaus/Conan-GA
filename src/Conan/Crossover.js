import Utils from "./RandUtil"

// Single point crossover
// TODO: Too many parameters
export function singlePoint(
    partner1,
    partner2,
    crossoverRate,
    individualClass
) {
    const child = new individualClass()

    // If the mother and father are the same simply return both of them as children
    if (Math.random() > crossoverRate || partner1 === partner2) {
        child.chromosomes = [...partner1.chromosomes]
    } else {
        let genomeLen = partner1.getGenomeLength()
        let crossoverPoint = Utils.rangeInt(0, genomeLen - 1)

        for (let i = 0; i <= crossoverPoint; i++) {
            child.chromosomes[i] = partner1.chromosomes[i]
        }

        for (let i = crossoverPoint + 1; i < genomeLen; i++) {
            child.chromosomes[i] = partner2.chromosomes[i]
        }
    }

    return child
}

// Order1 crossover is used to permutation problems
export function order1(partner1, partner2, crossoverRate, individualClass) {
    const child = new individualClass()

    if (Math.random() > crossoverRate || partner1 === partner2) {
        child.chromosomes = [...partner1.chromosomes]
    } else {
        const genomeLen = partner1.getGenomeLength()
        const sectionStart = Utils.rangeInt(0, genomeLen - 1)
        const sectionEnd = Utils.rangeInt(sectionStart + 1, genomeLen - 1) // TODO: FIX ME

        for (let i = sectionStart; i < sectionEnd; i++) {
            child.chromosomes[i] = partner1[i]
        }

        for (let i = 0; i < genomeLen; i++) {
            if (i >= sectionStart && i <= sectionEnd) continue
            child.chromosomes[i] = partner2[i]
        }
    }

    return child
}
