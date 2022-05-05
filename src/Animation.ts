import * as PIXI from 'pixi.js'
import { config, delay } from '.'
import HalfRenderer from './HalfRenderer'
export default class Animation extends PIXI.Container {
    private halfsRunner = new PIXI.Runner('draw')
    private _background?: PIXI.Graphics
    private text?: PIXI.Text
    async showBonusWin() {
        this.background.clear()
        const { width, height } = config
        await this.drawHalfs(0, 0, width, height)
    }
    async showRegulatWin() {

    }
    private async drawHalfs(x: number, y: number, width: number, height: number) {
        this.background.beginFill(Math.random() * 0xffffff).drawRect(x, y, width, height)
        new HalfRenderer(this.halfsRunner, this.background, { x, y, width, height })
        for (let i = Math.log2(width) + Math.log2(height); i--;) {
            await delay(500)
            this.halfsRunner.emit()
        }
        
        /* if (width < 20 && height < 20) {
            return
        }
        await delay(100)
        const isVertical = width < height
        width = isVertical ? width : width / 2
        height = isVertical ? height / 2 : height
        this.background.beginFill(Math.random() * 0xffffff).drawRect(x, y, width, height)
        const newX = isVertical ? x : x + width
        const newY = isVertical ? y + height : y
        await Promise.all([this.drawHalfs(x, y, width, height), this.drawHalfs(newX, newY, width, height)]) */
    }
    private showText(value: string) {
        if (!this.text) {
            this.text = this.addChild(new PIXI.Text(value, { align: 'center', fontSize: 100 }))
            this.text.anchor.set(0.5)
        }
        this.text.visible = true
    }
    private hideText() {
        this.text ?? (this._background.visible = false)
    }
    private get background() {
        return this._background ??= this.addChildAt(new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, config.width, config.height), 0)
    }
}