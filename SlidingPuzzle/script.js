// specify the puzzle size
let gridHeight = 3;
let gridWidth = 3;

// array to store tiles
let tiles = new Array(gridHeight);

for(let i=0; i< gridHeight; i++){
    tiles[i] = new Array(gridWidth);
}

// space location
let spaceLocArray = [(gridHeight -1), (gridWidth-1)];

// click count
let clickCount = 0;
// sucessful flag
let sucess = false;

// draw game board and create the Tiles
function generateGrid(){
    let divGrid = document.getElementById("grid");
    let puzGrid = document.createElement('talbe');
    puzGrid.setAttribute("id", "board" );
    for(let h=0; h<gridHeight; h++){
        puzRow = document.createElement("tr");
        for(let w= 0; w<gridWidth; w++){
            puzRow.appendChild(`
            <td>
                <img src=${w} />
            </td>
            `);
        }
        
    }
}