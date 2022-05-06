import * as PIXI from 'pixi.js'
import { config } from '.'
import Chest from './Chest'
import GraphicsButton from './GraphicsButton'

export default class Board extends PIXI.Container {
    private chests: Chest[] = []
    private playButton: GraphicsButton
    constructor() {
        super()
        this.drawChests()
        this.drawPlay()
    }
    private drawChests() {
        let { height } = config
        const { width } = config
        height -= 200
        const wPad = width / 3
        const hPad = height / 4
        for (let x = wPad; x < width; x += wPad) {
            for (let y = hPad; y < height; y += hPad) {
                const chest = this.addChild(new Chest())
                chest.addListener('buttonClick', () => this.openChest(chest))
                chest.position.set(x, y)
                this.chests.push(chest)
            }
        }
    }
    private drawPlay() {
        const { width, height } = config
        const button = this.addChild(new GraphicsButton(100, 50, 0xcebde7))
        button.position.set(width / 2, height - 200)
        const text = button.addChild(new PIXI.Text('Play'))
        this.playButton = button
        text.anchor.set(0.5)
        button.addListener('buttonClick', () => this.startChoosing())
    }
    private startChoosing() {
        this.playButton.disabled = true
        for (const chest of this.chests) {
            chest.disabled = false
        }
    }
    async startNewGame() {
        this.playButton.disabled = false
        const promises: Promise<void>[] = []
        for (const chest of this.chests) {
            promises.push(chest.close())
            chest.disabled = true
        }
        await Promise.all(promises)
    }
    private async openChest(chest: Chest) {
        const random = Math.random()
        const { win, bonus } = config
        const type = random < bonus * win ? 'bonus' : random < win ? 'win' : 'lose'
        this.chests.forEach(chest => chest.disabled = true)
        await chest.playOpen(type)
        if (type === 'bonus') {
            this.emit('bonusWin')
        }
        let allDisabled = true
        this.chests.forEach(chest => chest.opened || (allDisabled = chest.disabled = false))
        if (allDisabled) {
            this.startNewGame()
        }
    }
}
