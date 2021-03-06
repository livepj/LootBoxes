import * as PIXI from 'pixi.js'
export default class HalfRenderer {
    constructor(
        private readonly runner: PIXI.Runner,
        private readonly graphics: PIXI.Graphics,
        private readonly params: { x: number, y: number, width: number, height: number }
    ) {
        runner.add(this)
        this.runner = runner
        this.graphics = graphics
        this.params = params
    }

    draw(withNew = false) {
        let { x, y } = this.params
        const isVertical = this.params.height > this.params.width
        if (withNew) {
            this.params[isVertical ? 'height' : 'width'] /= 2
        }
        const { width, height } = this.params
        this.graphics.beginFill(Math.random() * 0xffffff).drawRect(x, y, width, height)
        if (withNew) {
            if (isVertical) {
                y += height
            } else {
                x += width
            }
            new HalfRenderer(this.runner, this.graphics, { x, y, width, height })
        }
    }
}