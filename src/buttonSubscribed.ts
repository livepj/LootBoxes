/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from 'pixi.js'
export type TButton = {
    onDown: () => void
    onOver: () => void
    onOut: () => void
    onUp: () => void
    onUpOutside: () => void
}
export function buttonSubscribed<K extends { new(...args: any[]): PIXI.Container & TButton }>(source: K) {
    return class extends source {
        constructor(...args: any[]) {
            super(...args)
            this.on('pointerover', this.onOver, this)
            this.on('pointerdown', this.onDown, this)
            this.on('pointerout', this.onOut, this)
            this.on('pointerup', this.onUp, this)
            this.on('pointerupoutside', this.onUpOutside, this)
            this.interactive = this.buttonMode = true
        }
    }
}
