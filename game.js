document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const jumper = document.createElement('div');
    let jumperLeftSpace = 50;
    let startPoint = 150;
    let jumperBottomSpace = startPoint;
    let platformsNumber = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId = false;
    let rightTimerId = false;
    let isGameOver = false;


    function createJumper() {
        grid.appendChild(jumper);
        jumper.classList.add('jumper');
        jumperLeftSpace = platforms[0].leftSpacing;
        jumper.style.left = jumperLeftSpace + 'px';
        jumper.style.bottom = jumperBottomSpace + 'px';
    }

    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom;
            this.leftSpacing = Math.random() * 315;
            this.visual = document.createElement('div');
            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.leftSpacing + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createPlatforms() {
        for (let i = 0; i < platformsNumber; i++) {
            let spaceBetweenPlatforms = 600 / platformsNumber;
            let newPlatformBottom = 100 + i * spaceBetweenPlatforms;
            let newPlatform = new Platform(newPlatformBottom);
            platforms.push(newPlatform);
            console.log(platforms);
        }
    }

    function movePlatforms() {
        if (jumperBottomSpace > 200) {
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';
            })
        }
    }

    function doJump() {
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function() {
            jumperBottomSpace += 20;
            jumper.style.bottom = jumperBottomSpace + 'px';
            if (jumperBottomSpace > startPoint + 200) {
                isJumping = false;
                fallDown();
            }
        }, 30)
    }

    function jumperControls(e) {
        if (e.key === "ArrowLeft") {
            moveLeft();
        } else if (e.key === "ArrowRight") {
            //move right
        } else if (e.key === "ArrowUp") {
            jumpStraight();
        }
    }

    function moveLeft() {
        isGoingLeft = true;
        leftTimerId - setInterval(function() {
            jumperLeftSpace -= 5;
            jumper.style.left = jumperLeftSpace + 'px';
        }, 30)
    }

    function jumpStraight() {

    }

    function fallDown() {
        isJumping = false;
        clearInterval(upTimerId);
        downTimerId = setInterval(function() {
            jumperBottomSpace -= 5;
            jumper.style.bottom = jumperBottomSpace + 'px';
            if (jumperBottomSpace <= 0) {
                gameOver();
            }
            platforms.forEach(platform => {
                if (
                    (jumperBottomSpace >= platform.bottom) &&
                    (jumperBottomSpace <= (platform.bottom + 15)) &&
                    ((jumperLeftSpace + 60) >= platform.leftSpacing) &&
                    (jumperLeftSpace <= (platform.leftSpacing + 85)) &&
                    !isJumping
                ) {
                    console.log('TICK');
                    startPoint = jumperBottomSpace;
                    doJump();
                    console.log('start', startPoint);
                    isJumping = true;
                }
            })

        }, 20)
    }

    function gameOver() {
        console.log('gameOver');
        isGameOver = true;
        clearInterval(downTimerId);
        clearInterval(upTimerId);
    }

    function startGame() {
        if (!isGameOver) {
            createPlatforms()
            createJumper();;
            setInterval(movePlatforms, 30);
            doJump();
        }
    }
    startGame(); //add buttons later to start/exit game

})