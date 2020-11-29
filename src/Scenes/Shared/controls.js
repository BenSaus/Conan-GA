export function setupControls(scene) {
    scene.input.keyboard.on("keyup_G", () => {
        scene.ga.evolve()
    })

    scene.speed = 100
    scene.evolveIntervalId = null
    scene.evolving = false

    scene.input.keyboard.on("keyup_G", (event) => {
        scene.ga.evolve()
    })

    scene.input.keyboard.on("keyup_ESC", (event) => {
        //TODO: Use constant here
        scene.scene.start("MenuScene")
        stopTimer(scene)
    })

    scene.input.keyboard.on("keyup_SPACE", (event) => {
        if (scene.evolving) {
            stopTimer(scene)
        }
    })
    scene.input.keyboard.on("keyup_ENTER", (event) => {
        if (!scene.evolving) {
            scene.evolveIntervalId = setInterval(() => {
                scene.ga.evolve()
            }, scene.speed)
            scene.evolving = true
        }
    })

    scene.input.keyboard.on("keyup_NUMPAD_ADD", (event) => {
        if (scene.evolving) {
            if (scene.evolveIntervalId) clearInterval(scene.evolveIntervalId)
        }

        scene.speed = Math.max(20, scene.speed - 10)

        if (scene.evolving) {
            scene.evolveIntervalId = setInterval(() => {
                scene.ga.evolve()
            }, scene.speed)
        }
    })
    scene.input.keyboard.on("keyup_NUMPAD_SUBTRACT", (event) => {
        if (scene.evolving) {
            if (scene.evolveIntervalId) clearInterval(scene.evolveIntervalId)
        }

        scene.speed = Math.min(1000, scene.speed + 10)

        if (scene.evolving) {
            scene.evolveIntervalId = setInterval(() => {
                scene.ga.evolve()
            }, scene.speed)
        }
    })
}

export function stopTimer(scene) {
    clearInterval(scene.evolveIntervalId)
    scene.evolving = false
}

export function setupControlText(scene) {
    scene.controlsText = scene.add.text(
        30,
        475,
        "Controls\n=======\nStart: Enter\nStop: Space\nStep: G\nIncrease Speed: +\nDecrease Speed: -",
        {
            font: "20px Arial",
        }
    )

    scene.speedText = scene.add.text(30, 725, "Speed: ", {
        font: "20px Arial",
    })
}

export function updateControlText(scene) {
    scene.speedText.setText(`Speed: ${scene.speed}ms`)
}
