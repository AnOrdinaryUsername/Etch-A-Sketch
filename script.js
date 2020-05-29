
// https://stackoverflow.com/questions/59793332/vanilla-js-hover-over-div-change-background-color
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

function addTrail() {
    document.querySelector(".etch-a-sketch").addEventListener('mouseover', function(e) {
        // e.target was the clicked element
       e.target.classList.add('color');
    }, false);
}

function main() {
    createGrid(16);
    addTrail();
}

main();