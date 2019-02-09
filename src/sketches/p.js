export default function sketch (p) {
    let width = 600;
    let height = 400;

    let x = width / 2;
    let y = height - 50;

    // lineX and lineY of enemies series
    let lineY = 50;
    let lineX = 0;

    // handle all enemies and shoots
    let enemies = [];
    let shoots = [];

    p.setup = function () {
        p.createCanvas(width, height);

        // create and add to list series of enemies
        for(var i = 0; i < 20; i++) {
            let b = new Enemy(170 + lineX, lineY);
            enemies.push(b);
            b.enemies = enemies;
            
            lineX += 60;

            if((i === 4) || (i === 9) || (i === 14) || (i === 19)) {
                lineY += 20; 
                lineX = 0;
            }
        }    
    };
  
    p.draw = function () {
        p.background(100);
        p.strokeWeight(2);
  
        p.fill(255);
        p.stroke(255);

        // left and right borders
        p.line((width - 130), 0 , (width - 130), height);
        p.line(140, 0 , 140, height);

        // draw enemies
        enemies.forEach(enemy => { 
            if(enemy.onScreen) {
                p.fill(70,130,180);
                enemy.show();
            }
            enemy.detection(shoots);
        });

        // draw shoots
        shoots.forEach(shoot => {
            p.stroke(255, 0, 0);
            shoot.show();
            shoot.move();
        });

        p.stroke(255);

        // draw ship
        p.triangle(x, y + 15, x + 5,y, x + 10, y + 15);
    };

    p.keyPressed = function () {
        if(p.keyCode === p.LEFT_ARROW) {
            if(x > 150) {
                x = x - 10;
            }
            
        }else if (p.keyCode === p.RIGHT_ARROW) {
            if(x < width - 160) {
                x = x + 10;
            }
        }else if (p.keyCode === p.UP_ARROW) {
            // take preset x and y coordinate
            let centerX = Math.abs((x + (x + 10)) / 2);
            let centerY = height - 75;

            // create shoot and add to list
            let shoot = new Shoot(centerX, centerY);
            shoots.push(shoot);
        }
    }

    class Enemy {
        constructor(x1, y1) {
            this.x1 = x1;
            this.y1 = y1;
            this.onScreen = true;

            // get and handle list of enemies
            this.enemies = [];
        }

        show() {
            p.rect(this.x1, this.y1, 30, 6);
        }

        detection(shoots) {
            
            // take handled list of enemies and list of shoots and for every enemy test if has been hitted
            this.enemies.forEach(enemy => {
                if(enemy.onScreen){
                    shoots.forEach(shoot => {
                        if(shoot.onScreen){
                            if((shoot.y - 5 === this.y1) && (shoot.x >= this.x1 && shoot.x <= this.x1 + 30) && this.onScreen === true) {
                                
                                // disable draw hitted rectangle and shoot
                                shoot.onScreen = false;
                                this.onScreen = false;
                            }
                        }
                    });
                }
            });
        }
    }

    class Shoot {
        constructor(centerX, centerY) {
            this.x = centerX;
            this.y = centerY;
            this.onScreen = true;
        }

        show() {
            if(this.onScreen){
                p.line(this.x, this.y, this.x, this.y + 10);
            }
        }

        move() {
            this.y -= 5;
        }
    }
};