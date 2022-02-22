class Vec {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // get len() {
    //     return Math.sqrt(this.x * this.x + this.y * this.y);

    // }

    // set len(value) {
    //     const fact = value / this.len;
    //     this.x *= fact;
    //     this.y *= fact;
    // }
}

class Rect {
    constructor(w, h) {
        this.pos = new Vec;
        this.size = new Vec(w, h);
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

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }
}


class Player extends Rect {
    constructor() {
        super(15, 80);
        this.x = new Vec;
        this.y = new Vec;

        this.score = 0;

    }
}


class Pong {
    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");

        //ball

        this.ball = new Ball;

        //player
        this.players = [new Player, new Player];
        this.players[0].pos.x = 40 - this.players[0].size.x;
        this.players[1].pos.x = this._canvas.width - 40;

        this.players.forEach((player) => {
            player.pos.y = canvas.height / 2 - player.size.y / 2;
        })

        let lastTime;

        const callback = (millis) => {

            if(lastTime) {
                this.update((millis - lastTime) / 1000);
            }
            lastTime = millis;
            requestAnimationFrame(callback);
        };
        callback();

        this.CHAR_PIXCEL = 10;

        this.CHARS = [
        "111101101101111",
        "010010010010010",
        "111001111100111",
        "111001111001111",
        "101101111001001",
        "111100111001111",
        "111100111101111",
        "111001001001001",
        "111101111101111",
        "111101111001111"
        ].map(str => {
            const canvas = document.createElement('canvas');
            canvas.height = this.CHAR_PIXCEL * 5;
            canvas.width = this.CHAR_PIXCEL * 3;
            
            const context = canvas.getContext('2d');
            context.fillStyle = '#fff';
            str.split("").forEach((fill, index) => {
                if(fill === '1') {
                    context.fillRect(
                        (index % 3) * this.CHAR_PIXCEL,
                        (index / 3 | 0) * this.CHAR_PIXCEL,
                        this.CHAR_PIXCEL,
                        this.CHAR_PIXCEL)
                }
            });
            
            return canvas;
        })

        this.reset();
    }

    collide(player, ball) {
        if(ball.left < player.right && ball.right > player.left && player.top < ball.bottom && player.bottom > ball.top) {
            // const len = ball.vel.len;
            this.ball.vel.x += 10;
            // ball.vel.y = 300 * (Math.random() - .5);
            // ball.vel.len = len * 1.05;
           this.ball.vel.x *= -1; 
        }
    }

    drawScore() {
        const align = this._canvas.width / 3;
        const CHAR_W = this.CHAR_PIXCEL * 4;
        this.players.forEach((player, index) => {
            const chars = player.score.toString().split("");
            const offset = align * (index + 1) - (CHAR_W * chars.length / 2) + this.CHAR_PIXCEL / 2;

            chars.forEach((char, pos) => {
                this._ctx.drawImage(this.CHARS[char | 0], 
                offset + pos  * CHAR_W, 20);
            });
        });
    }
    
    drawRect(rect) {
        this._ctx.fillStyle = '#fff';
        this._ctx.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
    }


    draw() {
        this._ctx.fillStyle = 'black';
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this.drawScore();
    }

    reset() {
        this.ball.pos.x = this._canvas.width / 2;
        this.ball.pos.y = this._canvas.height / 2;

        this.ball.vel.x = 0;
        this.ball.vel.y = 0;
    }


    start() {
        if(this.ball.vel.x === 0 && this.ball.vel.y === 0) {
            this.ball.vel.x = 300 * (Math.random() > .5 ? 1 : -1);
            this.ball.vel.y = 300 * (Math.random() * 2 - 1);

            this.ball.vel.len = 200;
        }
    }

    update(dt) {
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;


        if(this.ball.left < 0 | this.ball.right > this._canvas.width) {
            const playerId = this.ball.pos.x < 0 | 0;

            this.players[playerId].score++;
            this.ball.vel.x = -this.ball.vel.x;
            this.reset();
        }
        if(this.ball.top < 0 | this.ball.bottom > this._canvas.height) {
            this.ball.vel.y *= -1;
        }

        //players移動
        this.players.forEach((player, index) => {
            if(!(this.players[index].bottom > this._canvas.height || this.players[index].top < 0)) this.players[1].pos.y = this.ball.pos.y - this.players[1].size.y / 2;
           
           
            if(this.players[index].bottom > this._canvas.height || this.players[index].top < 0) {
                if(player.bottom > this._canvas.height) {
                    this.players[index].pos.y = this._canvas.height - this.players[index].size.y;

                }else{
                    this.players[index].pos.y = 0;
                }
            }
        });
            
            
        this.players.forEach((player,index) => {
            this.collide(this.players[index], this.ball);
        });

        this.draw();
        this.drawRect(this.ball);
        
        this.players.forEach(function(player, index) {
            pong.drawRect(pong.players[index]);
        });
        // this.drawRect(this.players[1]);


    }


}



const canvas = document.getElementById('pong');
const pong = new Pong(canvas);

pong._canvas.addEventListener('click', function(){
    pong.start();
})

pong._canvas.addEventListener('mousemove', e => {

    if(pong.players[0].top > 0 | pong.players[0].bottom < pong._canvas.height) {
        pong.players[0].pos.y = e.clientY - pong.players[0].size.y / 2;
    }

})


