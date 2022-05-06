import * as PIXI from 'pixi.js'
import GraphicsButton from './GraphicsButton'
import Tween from './Tween'

export default class Chest extends GraphicsButton {
    private content = this.addChild(new PIXI.Container())
    private bottom = this.content.addChild(this.drawOnGraphics(new PIXI.Graphics().lineStyle(4, this.colors[0]), 0xffffff))
    private resultText = this.bottom.addChild(new PIXI.Text(''))
    private topCase = this.content.addChild(new PIXI.Graphics())
    private _opened = false
    constructor() {
        super(200, 60, 0xAAAAAA)
        const text = this.topCase.addChild(new PIXI.Text('Chest'))
        text.anchor.set(0.5)
        this.resultText.anchor.set(0.5)
        this.disabled = true
        this.bottom.visible = false
    }
    playOpen(type: 'lose' | 'win' | 'bonus') {
        return new Promise<void>(resolve => {
            this.resultText.text = type
            this._opened = true
            const { width } = this.size
            this.bottom.visible = true
            this.drawOnGraphics(this.topCase, this.colors[0])
            new Tween().to(this.topCase, { x: -width }, 0.8).then(() => {
                this.drawOnGraphics(this.topCase, this.colors[3])
                resolve()
            })
        })
    }
    get opened() {
        return this._opened
    }
    close() {
        return new Promise<void>(resolve => {
            this._opened = false
            this.drawOnGraphics(this.topCase, this.colors[0])
            new Tween().to(this.topCase, { x: 0 }, 0.1).then(() => {
                this.topCase.clear()
                this.bottom.visible = false
                resolve()
            })
        })
    }
}