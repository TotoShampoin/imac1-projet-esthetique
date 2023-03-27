class Vector {
    x = 0; y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    neg() {
        return new Vector(
            -this.x,
            -this.y
        );
    }
    plus(other) {
        return new Vector(
            this.x + other.x,
            this.y + other.y
        );
    }
    minus(other) {
        return new Vector(
            this.x - other.x,
            this.y - other.y
        );
    }
    times(scalar) {
        return new Vector(
            this.x * scalar,
            this.y * scalar
        );
    }

    distance(other) {
        const delta = this.minus(other);
        return Math.hypot(delta.x, delta.y);
    }

    static fromAngle(angle) {
        return new Vector(
            Math.cos(angle),
            Math.sin(angle)
        );
    }
}

export class Boid {
    position = new Vector(0, 0);
    angle = 0;
    constructor(x, y, angle) {
        this.position = new Vector(x, y);
        this.angle = angle;
    }
    adaptTo(boids = []) {
        let ang = 0;
        if(boids.length == 0) return;
        for(let b of boids) {
            ang = ang + b.angle;
        }
        ang = ang / boids.length;
        this.angle = this.angle * .99 + ang * .01;
    }
    update(delta) {
        const speed = Vector.fromAngle(this.angle).times(150);
        // position = position + (speed * delta)
        this.position = this.position.plus(speed.times(delta));
    }
}

const DISTANCE = 40;
const COUNT = 50;

/** @type {Boid[]} */
export const boids = Array(COUNT).fill();
for(let i in boids) {
    boids[i] = new Boid(
        Math.random() * 480,
        Math.random() * 480,
        Math.random() * 2 * Math.PI
    );
}
export function updateBoids(delta) {
    boids.forEach(boid => {
        const neighboors = boids.filter(b => b != boid && boid.position.distance(b.position) < DISTANCE);
        boid.adaptTo(neighboors);
        boid.update(delta);
        if(boid.position.x < 0) boid.position.x += 480;
        if(boid.position.y < 0) boid.position.y += 480;
        if(boid.position.x > 480) boid.position.x -= 480;
        if(boid.position.y > 480) boid.position.y -= 480;
    });
}

window.boid = boids[0]