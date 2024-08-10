import { EventEmitter } from "events"

export class FireSim {
    emitter = new EventEmitter()
    private fires: Fire[] = []

    constructor(private meshIds: number[]) {}
    
    startFire(meshId: number) {
        if (this.fires.find(fire => fire.meshId === meshId)) {
            return
        }

        const fire = new Fire(meshId, 'red', this.emitter)
        this.fires.push(fire)
    }
}

export type FireLevel = 'red' | 'orange' | 'black'
export type FireUpdateEvent = {
    meshId: number
    level: FireLevel
}
class Fire {
    constructor(public meshId: number, private level: FireLevel, private emitter: EventEmitter) {
        this.start()
    }

    
    private start() {
        this.update('red')
    }

    private update(level: FireLevel) {
        this.level = level
        const event: FireUpdateEvent = {meshId: this.meshId, level}
        this.emitter.emit('update', event)
        if (this.level === 'red') {
            setTimeout(() => this.update('orange'), 1000)
        }
        if (this.level === 'orange') {
            setTimeout(() => {
                this.update('black')
                this.stop()
            }, 1000)
        }
    }

    private stop() {
        this.emitter.removeAllListeners()
    }
}