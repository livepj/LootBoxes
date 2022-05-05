import * as PIXI from 'pixi.js'
import { config } from '.'
import Chest from './GraphicsButtton'

export default class Board extends PIXI.Container {
    constructor() {
        super()
        this.drawChests()
    }

    private drawChests() {
        const { width, height } = config
        const wPad = width / 3
        const hPad = height / 4
        for (let x = wPad; x < width; x += wPad) {
            for (let y = hPad; y < height; y += hPad) {
                const chest = this.addChild(new Chest(100, 50, 0xAAAAAA, 0x999999, 0xCCCCCC, 0xEEEEEE))
                chest.addListener('buttonClick', () => this.openChest(chest))
                chest.position.set(x, y)
            }
        }
    }

    openChest(chest: Chest) {
        
    }
}
