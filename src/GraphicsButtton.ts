import * as PIXI from 'pixi.js'
import { buttonSubscribed } from './buttonSubscribed'

@buttonSubscribed
export default class GraphicsButtton extends PIXI.Graphics {
    private colors: number[]
    private _buttonState: State
    private size: { width: number, height: number }
    constructor(width: number, height: number, normal: number, pressed: number, over: number, disabled: number) {
        super()
        this.colors = [normal, pressed, over, disabled]
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
        this.emit("buttonClick");
    }
    onUpOutside() {
        this.buttonState = State.Normal
    }
    private get buttonState() {
        return this._buttonState
    }
    private set buttonState(value: State) {
        if (this._buttonState === value) {
            return
        }
        const { width, height } = this.size
        this.clear().beginFill(this.colors[value]).drawRect(-width / 2, -height / 2, width, height)
        this._buttonState = value
        this.buttonMode = this.interactive = value !== State.Disabled
    }
}

enum State {
    Normal,
    Pressed,
    Over,
    Disabled
}