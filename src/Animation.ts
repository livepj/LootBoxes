import * as PIXI from 'pixi.js'
import { config, delay } from '.'
import HalfRenderer from './HalfRenderer'
export default class Animation extends PIXI.Container {
    private halfsRunner = new PIXI.Runner('draw')
    private _background?: PIXI.Graphics
    private text?: PIXI.Text
    constructor() {
        super()
        this.interactive = true
    }
    async showBonusWin() {
        this.background.visible = true
        this.showText('BONUS WIN')
        await this.drawHalfs()
        this.background.visible = false
        this.hideText()
    }
    private async drawHalfs() {
        this.background.clear()
        const { width, height } = config
        this.background.beginFill(Math.random() * 0xffffff).drawRect(0, 0, width, height)
        new HalfRenderer(this.halfsRunner, this.background, { x: 0, y: 0, width, height })
        for (let i = Math.log2(width) + Math.log2(height) - 9; i-- > 0;) {
            await delay(100)
            this.halfsRunner.emit(true)
        }
        for (let i = 20; i--;) {
            await delay(100)
            this.halfsRunner.emit()
        }
        this.halfsRunner.removeAll()
    }
    private showText(value: string) {
        if (!this.text) {
            this.text = this.addChild(new PIXI.Text(value, {
                align: 'center', fontSize: 100, fontWeight: 'bold', fill: 0xffffff, stroke: 0,
                strokeThickness: 4,
            }))
            this.text.position.set(config.width / 2, config.height / 2)
            this.text.anchor.set(0.5)
        }
        this.text.visible = true
    }
    private hideText() {
        this.text && (this.text.visible = false)
    }
    private get background() {
        return this._background ??= this.addChildAt(new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, config.width, config.height), 0)
    }
}