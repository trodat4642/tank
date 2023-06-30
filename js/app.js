function init() {
    app.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px"></div>`;
    player.el = document.querySelector(".player");
}

function addBullet() {
    if (player.side == 1) {
        const bulletLeft = (player.x + (player.w / 2)) - 7;
        const bulletTop = player.y - 16;
        app.innerHTML += `<div class="bullet" direction="top" style="left: ${bulletLeft}px; top: ${bulletTop}px"></div>`;
    }
    else if (player.side == 2) {
        const bulletLeft = player.x + player.w;
        const bulletTop = player.y + 30;
        app.innerHTML += `<div class="bullet" direction="right" style="left: ${bulletLeft}px; top: ${bulletTop}px"></div>`;
    }
    else if (player.side == 3) {
        const bulletLeft = (player.x + (player.w / 2)) - 7;
        const bulletTop = player.y + player.h;
        app.innerHTML += `<div class="bullet" direction="bottom" style="left: ${bulletLeft}px; top: ${bulletTop}px"></div>`;
    }
    else if (player.side == 4) {
        const bulletLeft = player.x - 16;
        const bulletTop = (player.y + (player.h / 2)) - 10;
        app.innerHTML += `<div class="bullet" direction="left" style="left: ${bulletLeft}px; top: ${bulletTop}px"></div>`;
    }

    player.el = document.querySelector(".player");
}

function controllers() {
    document.addEventListener("keydown", e => {
        switch (e.keyCode) {
            case 38: // top
                player.el.style.backgroundImage = `url(${player.sprites.top})`;
                player.run = true;
                player.side = 1;
                break;
            case 39: // right
                player.el.style.backgroundImage = `url(${player.sprites.right})`;
                player.run = true;
                player.side = 2;
                break;
            case 40: // bottom
                player.el.style.backgroundImage = `url(${player.sprites.bottom})`;
                player.run = true;
                player.side = 3;
                break;
            case 37: // left
                player.el.style.backgroundImage = `url(${player.sprites.left})`;
                player.run = true;
                player.side = 4;
                break;
            case 32: // space
                addBullet();
                break;
        }
    });

    document.addEventListener("keyup", e => {
        // if ([37, 38, 39, 40].)
        player.run = false;
    })
}

function randomInt(min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function intervals() {
    const appBottom = app.getBoundingClientRect().bottom;
    const appRight = app.getBoundingClientRect().right;
    const appWidth = app.getBoundingClientRect().width;
    const appHeight = app.getBoundingClientRect().height;

    ints.run = setInterval(() => {
        if (player.run) {
            if (player.side == 1) { // top
                if (player.y > 0) {
                    player.y -= player.step;
                    player.el.style.top = `${player.y}px`;
                }
            }
            else if (player.side == 3) { // bottom
                if (player.y < appBottom - player.h) {
                    player.y += player.step;
                    player.el.style.top = `${player.y}px`;
                }
            }
            else if (player.side == 2) { // right
                if (player.x < appRight - player.w) {
                    player.x += player.step;
                    player.el.style.left = `${player.x}px`;
                }
            }
            else if (player.side == 4) { // left
                if (player.x > 0) {
                    player.x -= player.step;
                    player.el.style.left = `${player.x}px`;
                }
            }
        }
    }, fps);
    ints.bullet = setInterval(() => {
        let bullets = document.querySelectorAll(".bullet");
        bullets.forEach(bullet => {
            let direction = bullet.getAttribute("direction");

            let bulletTop = bullet.getBoundingClientRect().top;
            let bulletBottom = bullet.getBoundingClientRect().bottom;
            let bulletRight = bullet.getBoundingClientRect().right;
            let bulletLeft = bullet.getBoundingClientRect().left;

            if (direction == "top") {
                if (bulletTop < 0) {
                    bullet.parentNode.removeChild(bullet);
                }
                else {
                    bullet.style.top = bulletTop - bulletSpeed + "px";
                }
            }
            else if (direction == "bottom") {
                if (bulletBottom > appHeight) {
                    bullet.parentNode.removeChild(bullet);
                }
                else {
                    bullet.style.top = bulletTop + bulletSpeed + "px";
                }
            }
            else if (direction == "left") {
                if (bulletLeft < 0) {
                    bullet.parentNode.removeChild(bullet);
                }
                else {
                    bullet.style.left = bulletLeft - bulletSpeed + "px";
                }
            }
            else if (direction == "right") {
                if (bulletLeft > appWidth) {
                    bullet.parentNode.removeChild(bullet);
                }
                else {
                    bullet.style.left = bulletLeft + bulletSpeed + "px";
                }
            }
        })
    }, fps);
    ints.enemy = setInterval(() => {
        let enemies = document.querySelectorAll(".enemy");
        enemies.forEach(enemy => {
            let direction = enemy.getAttribute("direction");

            let enemyTop = enemy.getBoundingClientRect().top;
            let enemyLeft = enemy.getBoundingClientRect().left;
            let enemyBottom = enemy.getBoundingClientRect().bottom;
            let enemyRight = enemy.getBoundingClientRect().right;

            let bullets = document.querySelectorAll(".bullet");

            bullets.forEach(bullet => {
                let direction = bullet.getAttribute.direction;

                let bulletTop = bullet.getBoundingClientRect().top;
                let bulletLeft = bullet.getBoundingClientRect().left;
                let bulletRight = bullet.getBoundingClientRect().right;
                let bulletBottom = bullet.getBoundingClientRect().bottom;

                if (["top", "left", "right"].includes(direction)) {
                    if (bulletTop < enemyBottom && bulletBottom > enemyTop && bulletRight > enemyLeft && bulletLeft > enemyRight) {

                    }
                }
            })

            

            if (direction == "top") {
                if (enemyTop <= 0) {
                    enemy.parentNode.removeChild(enemy);
                }
                else {
                    enemy.style.top = enemyTop - 3 + "px";
                }
            }
            else if (direction == "right") {
                if (enemyLeft >= appWidth) {
                    enemy.parentNode.removeChild(enemy);
                }
                else {
                    enemy.style.left = enemyLeft + 3 + "px";
                }
            }
            else if (direction == "bottom") {
                if (enemyTop >= appHeight) {
                    enemy.parentNode.removeChild(enemy);
                }
                else {
                    enemy.style.top = enemyTop + 3 + "px";
                }
            }
            else if (direction == "left") {
                if (enemyLeft <= 0 ) {
                    enemy.parentNode.removeChild(enemy);
                }
                else {
                    enemy.style.left = enemyLeft - 3 + "px";
                }
            }
        })
    }, fps);
    ints.generateEnemy = setInterval(() => {
        let direction = randomInt(1, 4);

        if (direction == 1) {
            const enemyTop = appHeight - player.h;
            const enemyLeft = randomInt(0, appWidth - player.w);
            app.innerHTML += `<div class="enemy" direction="top" style="transform: rotate(-90deg); top: ${enemyTop}px; left: ${enemyLeft}px"></div>`
        }
        else if (direction == 3) {
            const enemyTop = 0;
            const enemyLeft = randomInt(0, appWidth - player.w);
            app.innerHTML += `<div class="enemy" direction="bottom" style="transform: rotate(90deg); top: ${enemyTop}px; left: ${enemyLeft}px"></div>`
        }
        else if (direction == 2) {
            const enemyTop = randomInt(0, appHeight - player.h);
            const enemyLeft = 0;
            app.innerHTML += `<div class="enemy" direction="right" style="top: ${enemyTop}px; left: ${enemyLeft}px"></div>`
        }
        else if (direction == 4) {
            const enemyTop = randomInt(0, appHeight - player.h)
            const enemyLeft = appWidth - player.w;
            app.innerHTML += `<div class="enemy" direction="left" style="transform: rotate(180deg); top: ${enemyTop}px; left: ${enemyLeft}px"></div>`
        }

        player.el = document.querySelector(".player");
    }, 3000); 
}

let app = document.querySelector(".app"), fps = 1000 / 60, player = {
    sprites: {
        top: "img/player-top.png",
        right: "img/player-right.png",
        bottom: "img/player-bottom.png",
        left: "img/player-left.png",
    },
    el: false,
    x: 500,
    y: 400,
    step: 10,
    run: false,
    side: 1, // 1 - top, 2 - right, 3 - bottom, 4 - left
    w: 78,
    h: 77,
}, ints = {
    run: false,
    enemy: false,
    bullet: false,
    generateEnemy: false
}, 
bulletSpeed = 11,
points = 0

init();
controllers();
intervals();