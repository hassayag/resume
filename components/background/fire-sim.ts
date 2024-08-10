import { EventEmitter } from "events"
import {Mesh} from 'three';


export class FireSim {
    emitter = new EventEmitter()
    private fires: Fire[] = []
    private intervalId: NodeJS.Timeout
    constructor(private meshes: Mesh[]) {
        this.intervalId = setInterval(() => this.update(), 1000)
    }

    startFire(mesh: Mesh) {
        const fireExists = this.fires.find(fire => fire.id === mesh.id)
        if (fireExists) {
            return
        }

        const fire = new Fire(mesh, 'new', this.emitter)
        this.fires.push(fire)
    }

    update() {
        for (const fire of this.fires) {
            switch(fire.level) {
                case 'new':
                    fire.update('red')
                    break
                case 'red':
                    fire.update('orange')
                    break               
                case 'orange':
                    fire.update('black')
                    break                
                case 'black':
                    this.killFire(fire)
                    break
            }
        }
    }

    killFire(fireToKill: Fire) {
        this.fires = this.fires.filter(fire => fire.id !== fireToKill.id)
    }

    stop() {
        clearInterval(this.intervalId)
    }
}

export type FireLevel = 'red' | 'orange' | 'black' | 'new'
export type FireUpdateEvent = {
    mesh: Mesh
    level: FireLevel
}
class Fire {
    constructor(public mesh: Mesh, public level: FireLevel, private emitter: EventEmitter) {
        this.start()
    }

    private start() {
        this.update('red')
    }

    public update(level: FireLevel) {
        this.level = level
        const event: FireUpdateEvent = {mesh: this.mesh, level}
        this.emitter.emit('update', event)
    }

    get id() {
        return this.mesh.id
    }
}