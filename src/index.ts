import * as PIXI from 'pixi.js'
import Animation from './Animation'
import Board from './Board'

const width = 1280
const height = 720

export const config = {
    width,
    height,
}
const app = new PIXI.Application({ sharedTicker: true, sharedLoader: true, width, height, backgroundColor: 0xffffff })
document.body.appendChild(app.view)


const board = app.stage.addChild(new Board())
const frontLayer = app.stage.addChild(new Animation())

;(window as any).frontLayer = frontLayer

function start() {
}

export function delay(time: number) {
    const ticker = PIXI.Ticker.shared
    return new Promise<void>(resolve => {
        const delayFunc = () => {
            time -= ticker.deltaMS
            if (time <= 0) {
                ticker.remove(delayFunc)
                resolve()
            }
        }
        ticker.add(delayFunc)
    })
}

start()