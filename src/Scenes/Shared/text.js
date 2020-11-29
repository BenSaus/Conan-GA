export function createGAText(scene, name) {
    scene.text = scene.add.text(30, 20, name, {
        font: "30px Impact",
    })
    scene.fitnessText = scene.add.text(30, 300, "Best Fitness: 0", {
        font: "20px Arial",
    })
    scene.avgFitnessText = scene.add.text(30, 325, "Best Fitness: 0", {
        font: "20px Arial",
    })
    scene.generationNumberText = scene.add.text(30, 350, "Generation: 0", {
        font: "20px Arial",
    })
    scene.mutationRateText = scene.add.text(30, 375, "Mutation Rate: ", {
        font: "20px Arial",
    })
    scene.populationSizeText = scene.add.text(30, 400, "Population Size: ", {
        font: "20px Arial",
    })
}

export function updateGAText(scene) {
    const bestFitnessText = scene.ga.bestFitnessScore.toFixed(2)
    scene.fitnessText.setText(`Best Fitness: ${bestFitnessText}`)

    const avgFitnessText = scene.ga.getAvgFitness().toFixed(2)
    scene.avgFitnessText.setText(`Avg Fitness: ${avgFitnessText}`)

    const mutationRateText =
        (scene.ga.settings.mutationRate * 100).toFixed(2) + "%"
    scene.mutationRateText.setText(`Mutation Rate: ${mutationRateText}`)
    scene.generationNumberText.setText(`Generation: ${scene.ga.generation}`)
    scene.populationSizeText.setText(
        `Population Size: ${scene.ga.populationSize}`
    )
}
