// Create grid boxes in Etch-A-Sketch
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

// Remove all color from grid boxes and resets them back to lightgray
function resetGrid() {
    document.querySelector('.reset-shake').addEventListener('click', function(e) {
    let totalNodes = document.querySelector('.etch-a-sketch').childElementCount;

    let etchToy = document.querySelector('.etch-wrapper');
    // Add shake up and down animation to etch-wrapper
    etchToy.classList.add('shake');
        
    for (let i = 0; i < totalNodes; i++) {
        let box = document.getElementsByClassName('box')[i];

        // Remove inline styles that have a colored background
        // (resets to original lightgray property)
        if (box.style.background != 'lightgray') 
            box.style.removeProperty('background');
    }
    
    // Wait until animation is done playing
    setTimeout(function () {
        etchToy.classList.remove('shake');
    }, 800);
    });
}

function addTrail(color, manyColors) {
    // Event delegation
    document.querySelector('.etch-a-sketch').addEventListener('mouseover', function(e) {
        // e.target was the mouseovered div box element
        if (manyColors) {
            // Grab random Hex color code and change background to it
            let hexColor = Math.floor(Math.random()*16777215).toString(16);
            e.target.style.background = `#${hexColor}`;
        } else {
            e.target.style.background = `${color}`;
        }
    }, false);
}

// Grab a random color in either HSL or RGB or HEX on button press
function clickColorButton() {
    let singleColorOnly = false;
    let manyColors = true;

    document.querySelector('.hsl-button').addEventListener('click', function(e) {
        let hslColor = `hsl(${random(0, 360)}, ${random(0, 100)}%, ${random(0, 100)}%)`;
        addTrail(hslColor, singleColorOnly);
    });

    document.querySelector('.default-button').addEventListener('click', function(e) { 
        addTrail("black", singleColorOnly);
    });

    // In HEX (which is the same colorwise as RGB, but let's try it)
    document.querySelector('.rainbow-vomit').addEventListener('click', function(e) {
        addTrail(``, manyColors);
    });
}

// Grab a random number between a lower bound and upper bound
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Allow user to choose the size of the grid
function inputGridSize() {
    let inputs = document.querySelectorAll('input');

    
    document.querySelectorAll('.arrow-submit')[0].addEventListener('click', function(e) {
        // Check if input is empty or is not a valid number
        if ( (inputs[0].value === '' || isNaN(inputs[0].value) ) 
              || (inputs[0].value > 100 || inputs[0].value < 0) )
              return;
              
        // Loop through NodeList and remove all Etch-A-Sketch boxes
        document.querySelectorAll('.box').forEach(e => e.remove());

        createGrid(parseInt(inputs[0].value));
    });
}

// Choose a color from HTMl input type="color"
function inputColor() {
    let inputs = document.querySelector('.pick-color');
    let singleColorOnly = false;

    document.querySelectorAll('.arrow-submit')[1].addEventListener('click', function(e) {
        addTrail(inputs.value, singleColorOnly);
    });
}

function main() {
    let initialColor = 'black';
    let initialSize = 64;

    // Size and color draw on page load
    createGrid(initialSize);
    addTrail(initialColor);

    // Grabs user input
    inputGridSize();
    inputColor();

    // The buttons on the blue slant background
    resetGrid(); 
    clickColorButton();
}

main();