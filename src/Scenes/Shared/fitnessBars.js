const HSV_NUMBER_OF_HUES = 359

export function setupFitnessBars(scene) {
    scene.hsv = Phaser.Display.Color.HSVColorWheel()
    scene.graphics = scene.add.graphics({
        lineStyle: { width: 2, color: 0x0000ff },
        fillStyle: { color: 0xff0000 },
    })
}

export function renderFitnessBars(
    scene,
    populationSize,
    maxFitness,
    barCoords
) {
    scene.graphics.clear()

    for (let i = 0; i < populationSize; i++) {
        // Normalized fitness is between 0 and 1
        const normalizedFitness = Math.min(
            scene.ga.population[i].fitness / maxFitness,
            1
        )
        // Multiply normalized fitness by the HSV Hue angle
        //  this will produce different hues of color depending on fitness
        const hsvHueIndex = Math.floor(normalizedFitness * HSV_NUMBER_OF_HUES)

        scene.graphics.fillStyle(scene.hsv[hsvHueIndex].color, 1)
        scene.graphics.fillRect(
            barCoords.BAR_X_ORIGIN,
            barCoords.BAR_Y_ORIGIN +
                i * barCoords.BAR_Y_GAP +
                barCoords.BAR_Y_OFFSET,
            barCoords.BAR_WIDTH * normalizedFitness,
            barCoords.BAR_HEIGHT
        )
    }
}
