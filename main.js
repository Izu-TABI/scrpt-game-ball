const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Rect{
    constructor(w, h) {
        this.pos = new Vec;
        this.size = new Vec(w, h)
    }
}

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }
    get left() {
        return this.pos.x;
    }

    get right() {
        return this.pos.x + this.size.x;
    }

    get top() {
        return this.pos.y;
    }

    get bottom() {
        return this.pos.y + this.size.y; 
    }
}

class Pong {
    constructor(canvas){
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
    

        this.ball = new Ball;

        this.ball.pos.x = 100;
        this.ball.pos.y = 50;

        this.ball.vel.x = 100;
        this.ball.vel.y = 100;
    }

    update(dt){
        ball.pos.x += ball.vel.x * dt;
        ball.pos.y += ball.vel.y * dt;
        



        if(ball.left < 0 || ball.right > _canvas.width) ball.vel.x = -ball.vel.x; 
        _
        if(ball.top < 0 || ball.bottom > _canvas.height) ball.vel.y = -ball.vel.y;
    
        _ctx.fillStyle = '#ddd'
        _ctx.fillRect(0, 0, _canvas.width, _canvas.height);
   
        _ctx.fillStyle = 'black'
        _ctx.fillRect(ball.pos.x, ball.pos.y, ball.size.x, ball.size.y);
    }
}


let lastTime;

function callback(millis) {
    if(lastTime) {
        update((millis - lastTime) / 1000);
    }
    lastTime = millis;
    requestAnimationFrame(callback);
}



callback();