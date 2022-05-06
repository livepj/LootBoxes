import * as PIXI from 'pixi.js'

export default class Tween {
    private promise = Promise.resolve()
    private ticker?: PIXI.Ticker
    constructor(useSharedTicker = true) {
        if (!useSharedTicker) {
            this.ticker = new PIXI.Ticker()
        }
    }
    to<T>(source: T, results: { [key in keyof T]?: T[key] extends number ? number : never }, time: number) {
        const settings: { key: keyof T, perFrame: number }[] = []
        const ticker = this.ticker ?? PIXI.Ticker.shared
        time *= ticker.FPS
        for (const key in results) {
            settings.push({ key, perFrame: (results[key] - +source[key]) / time })
        }
        this.promise = this.promise.then(() => new Promise(resolve => {
            this.ticker?.start()
            const callback = (delta: number) => {
                time -= delta
                if (time <= 0) {
                    settings.forEach(set => source[set.key] = results[set.key] as any)
                    ticker.remove(callback)
                    this.ticker?.stop()
                    resolve()
                } else {
                    settings.forEach(set => (source[set.key] as any) += set.perFrame * delta)
                }
            }
            ticker.add(callback)
        }))
        return this
    }
    then(callback: () => void) {
        this.promise = this.promise.then(callback)
        return this
    }
}