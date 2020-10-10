document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const jumper = document.createElement('div');
    let jumperLeftSpace = 50;
    let jumperBottomSpace = 150;
    let platformsNumber = 5;
    // let platforms = [];
    let isGameOver = false;


    function createJumper() {
        grid.appendChild(jumper);
        jumper.classList.add('jumper');
        jumper.style.left = jumperLeftSpace + 'px';
        jumper.style.bottom = jumperBottomSpace + 'px';
    }

    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = new newPlatformBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');
            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);



        }
    }

    function createPlatforms() {
        for (let i = 0; i < platformsNumber; i++) {
            let spaceBetweenPlatforms = 600 / platformsNumber;
            let newPlatformBottom = 100 + i * spaceBetweenPlatforms;
            let newPlatform = new Platform(newPlatformBottom);
            console.log(platforms);
        }
    }

    createPlatforms();

    function startGame() {
        if (!isGameOver) {
            createJumper();
            createPlatforms();
        }
    }
    startGame(); //add button later to start/exit game

})