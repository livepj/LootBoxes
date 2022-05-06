import * as PIXI from 'pixi.js'
import { buttonSubscribed } from './buttonSubscribed'

@buttonSubscribed
export default class GraphicsButton extends PIXI.Graphics {
    protected colors: number[]
    private _buttonState: State
    protected size: { width: number, height: number }
    constructor(width: number, height: number, color: number) {
        super()
        this.colors = [color, this.changeColor(color, -25), this.changeColor(color, 15), 0xeeeeee]
        this.size = { width, height }
        this.buttonState = State.Normal
    }
    onDown() {
        this.buttonState = State.Pressed
    }
    onOver() {
        this.buttonState = this.buttonState === State.Pressed ? State.Pressed : State.Over
    }
    onOut() {
        this.buttonState = this.buttonState === State.Pressed ? State.Pressed : State.Normal
    }
    onUp() {
        this.buttonState = State.Over
        this.emit("buttonClick")
    }
    onUpOutside() {
        this.buttonState = State.Normal
    }
    set disabled(value: boolean) {
        this.buttonState = value ? State.Disabled : State.Normal
        this.interactive = this.buttonMode = !value
    }
    private get buttonState() {
        return this._buttonState
    }
    private set buttonState(value: State) {
        if (this._buttonState === value) {
            return
        }
        this.drawOnGraphics(this.clear(), this.colors[value])
        this._buttonState = value
        this.buttonMode = this.interactive = value !== State.Disabled
    }
    private changeColor(origin: number, offset: number) {
        let result = 0
        for (let bit = 255, i = 3; i--; bit <<= 8, offset <<= 8) {
            result |= Math.max(Math.min((origin & bit) + offset, bit), 0)
        }
        return result
    }
    protected drawOnGraphics(graphics: PIXI.Graphics, color: number) {
        const { width, height } = this.size
        return graphics.beginFill(color).drawRect(-width / 2, -height / 2, width, height)
    }
}

enum State {
    Normal,
    Pressed,
    Over,
    Disabled
}