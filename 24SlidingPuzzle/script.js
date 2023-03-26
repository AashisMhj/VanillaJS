// https://developerslogblog.wordpress.com/2020/04/01/how-to-shuffle-an-slide-puzzle/
const container = document.getElementById('container');

const boxes = document.querySelectorAll('.box');

const sideBoxes = {
    "1": [2, 4],
    "2": [1, 3, 5],
    "3": [2, 6],
    "4": [1, 5, 7],
    "5": [2, 4, 6, 8],
    "6": [3, 5, 9],
    "7": [4, 8],
    "8": [5, 7, 9],
    "9": [6, 8]
}

function handleClick() {
    // check if any of the negbours are empty
    // if yes replace image
    // how to get neghibour elements
    const id = this.id.charAt(this.id.length - 1);
    const CurrentBox = boxes[id - 1];
    if (CurrentBox.querySelector('img') === "") {
        return
    }

    // check if the side boxes are empty
    for (let value of sideBoxes[id]) {
        if (boxes[value - 1].querySelector('img').src.includes('default.jpg')) {
            let temp = boxes[value - 1].querySelector('img').src;
            boxes[value - 1].querySelector('img').src = CurrentBox.querySelector('img').src;
            CurrentBox.querySelector('img').src = temp;
            break
        }
    }

    // check if the puzzle has been solved
    for(const [i, value] of boxes.entries()){
        console.log(i, value);
        if(i === 8){
            alert('puzzle solved');
            break;
        }
        if(value.querySelector('img').src.includes(`image_part_00${i+1}.jpg`)){
            continue;
        }else{
            break;
        }
    }
}

/**
 * 
 * @param {Array} array 
 * @returns 
 */
function isSolvable(array) {
    /**
     * If the puzzle´s grid is odd the puzzle is solvable when the number of inversions is even
        If the puzzle´s grid is  even and the empty tile is in an odd row counting from the bottom, the puzzle is solvable if the number of inversions is even.
        If the puzzle´s grid is  even and the empty tile is in an even row counting from the bottom, the puzzle is solvable if the number of inversions is odd.
     */
    // since we know the grid is odd the no of inversion should be even
    let emptyTile = -1;
    let noOfInversions = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === emptyTile) {
            continue;
        }
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] === emptyTile) {
                continue;
            }
            if (array[i] > array[j]) {
                noOfInversions++;
            }
        }
    }
    return noOfInversions % 2 == 0
}

// Fisher-Yates (knuth)shuffle
// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;

}
function setUp() {
    let images = Array(8).fill(0).map((_, index) => index + 1);
    let is_solvable = false;
    do {
        images = shuffle(images);
        is_solvable = isSolvable(images);
    } while (!is_solvable)
    // set click handler
    for (let i = 0; i < 9; i++) {
        boxes[i].addEventListener('click', handleClick);
        if (i !== 8) {
            const image = boxes[i].querySelector('img')
            // boxes[i].i
            image.src = `images/image_part_00${images[i]}.jpg`;
        }
    }
}

setUp();