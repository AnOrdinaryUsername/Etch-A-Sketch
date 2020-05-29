function createGrid(sizeOfGrid) {
    // Split the entire grid (100% of it) by the amount of boxes
    const splitEvenly = 100 / sizeOfGrid;
    const parent = document.querySelector('.etch-a-sketch'); 

    for(let column = 0; column < sizeOfGrid; column++) {
        for(let row = 0; row < sizeOfGrid; row++) {
            const child = document.createElement('div');
            child.classList.add('box');
            child.style.cssText = `width: ${splitEvenly}%; height: ${splitEvenly}%`; 
            parent.appendChild(child);        
        }
    } 
}

function addTrail(color) {
    document.querySelector(".etch-a-sketch").addEventListener('mouseover', function(e) {
        // e.target was the mouseovered div box element
        e.target.style.background = `${color}`;
    }, false);
}

function resetGrid(color) {
    document.querySelector(".reset-shake").addEventListener('click', function(e) {
        let totalNodes = document.querySelector('.etch-a-sketch').childElementCount;

        let etchToy = document.querySelector('.etch-wrapper');
        // Add shake up and down animation to etch-wrapper
        etchToy.classList.add('shake');
        
        for (let i = 0; i < totalNodes; i++) {
            let box = document.getElementsByClassName('box')[i];

            // Remove inline styles that have a colored background
            // (resets to original lightgray property)
            if (box.style.background == `${color}`) 
                box.style.removeProperty('background');
        }

        setTimeout(function () {
            etchToy.classList.remove('shake');
        }, 10);
    });
}

function randomizeColor() {
    
}

function main() {
    createGrid(64);
    resetGrid('blue');
    addTrail('blue');
}

main();