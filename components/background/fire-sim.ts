import { EventEmitter } from 'events';
import { Mesh } from 'three';
import { AMOUNT } from './background';

const FIRE_SPREAD_CHANCE = 0.6;
const UPDATE_INTERVAL = 500;

export class FireSim {
    emitter = new EventEmitter();
    private fires: Fire[] = [];
    private intervalId: NodeJS.Timeout;
    constructor(private meshes: Mesh[]) {
        this.intervalId = setInterval(() => this.updateLoop(), UPDATE_INTERVAL);
    }

    startFire(mesh: Mesh) {
        const fireExists = this.fires.find((fire) => fire.id === mesh.id);
        if (fireExists) {
            return;
        }

        const fire = new Fire(mesh, 'new', this.emitter);
        this.fires.push(fire);
    }

    updateLoop() {
        for (const fire of this.fires) {
            switch (fire.level) {
                case 'new':
                    fire.update('red');
                    break;
                case 'red':
                    fire.update('orange');
                    this.spread(fire);
                    break;
                case 'orange':
                    fire.update('black');
                    break;
                case 'black':
                    // this.killFire(fire)
                    break;
            }
        }
    }

    spread(fire: Fire) {
        const fireIndex = this.meshes.findIndex((mesh) => mesh.id === fire.id);
        if (fireIndex == null) {
            return;
        }

        const adjacentIndices = [fireIndex + 1, fireIndex - 1, fireIndex + 2 * AMOUNT, fireIndex - 2 * AMOUNT];

        adjacentIndices
            // make sure they are within bounds of array
            .filter((index) => index < this.meshes.length && index > -1)
            // fire wont always spread
            .filter((index) => Math.random() < FIRE_SPREAD_CHANCE)
            .filter((index) => !this.fires[index])
            .forEach((index) => this.startFire(this.meshes[index]));
    }

    killFire(fireToKill: Fire) {
        this.fires = this.fires.filter((fire) => fire.id !== fireToKill.id);
    }

    stop() {
        clearInterval(this.intervalId);
    }
}

export type FireLevel = 'red' | 'orange' | 'black' | 'new';
export type FireUpdateEvent = {
    mesh: Mesh;
    level: FireLevel;
};
class Fire {
    constructor(
        public mesh: Mesh,
        public level: FireLevel,
        private emitter: EventEmitter
    ) {
        this.update('new');
    }

    public update(level: FireLevel) {
        this.level = level;
        const event: FireUpdateEvent = { mesh: this.mesh, level };
        this.emitter.emit('update', event);
    }

    get id() {
        return this.mesh.id;
    }
}
